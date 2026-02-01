// Core LLM Service for Groq Cloud
// Features: Multi-Key Vault, Jitter, Sequential Failover, Reactive Monitoring

export type KeyStatus = 'IDLE' | 'ACTIVE' | 'COOLDOWN';

export interface VaultState {
    [keyIndex: number]: KeyStatus;
}

// Load keys from Verified Environment Variables
const GROQ_VAULT = [
    import.meta.env.VITE_GROQ_KEY_1,
    import.meta.env.VITE_GROQ_KEY_2,
    import.meta.env.VITE_GROQ_KEY_3,
    import.meta.env.VITE_GROQ_KEY_4,
    import.meta.env.VITE_GROQ_KEY_5
].filter(Boolean) as string[];

// Start with random index to distribute load across the 5 keys
let currentKeyIndex = Math.floor(Math.random() * GROQ_VAULT.length);

// Reactive State
let keyStatusMap: VaultState = {};
GROQ_VAULT.forEach((_, i) => keyStatusMap[i] = 'IDLE');

type Listener = (state: VaultState) => void;
const listeners: Listener[] = [];

export const subscribeToKeyUpdates = (listener: Listener) => {
    listeners.push(listener);
    listener({ ...keyStatusMap }); // Initial emit
    return () => {
        const idx = listeners.indexOf(listener);
        if (idx > -1) listeners.splice(idx, 1);
    };
};

const updateKeyStatus = (index: number, status: KeyStatus) => {
    keyStatusMap[index] = status;
    // Broadcasting clone to avoid mutation bugs in UI
    listeners.forEach(l => l({ ...keyStatusMap }));
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Jitter: Random delay between 300ms and 600ms
const applyJitter = async () => {
    const jitter = Math.floor(Math.random() * 300) + 300;
    await wait(jitter);
};

export const generateGroqResponse = async (
    systemPrompt: string,
    userPrompt: string,
    jsonMode: boolean = true,
    retryCount: number = 0
): Promise<any> => {
    const apiKey = GROQ_VAULT[currentKeyIndex];
    const MAX_RETRIES = GROQ_VAULT.length; // Allow trying all keys if needed

    try {
        updateKeyStatus(currentKeyIndex, 'ACTIVE');

        // Using llama-3.3-70b-versatile as requested
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.7,
                response_format: jsonMode ? { type: "json_object" } : undefined
            })
        });

        if (response.status === 429) {
            updateKeyStatus(currentKeyIndex, 'COOLDOWN');

            if (retryCount < MAX_RETRIES) {
                console.warn(`Rate limit on key ${currentKeyIndex}. Rotating...`);

                // Sequential Failover: Move to next key
                currentKeyIndex = (currentKeyIndex + 1) % GROQ_VAULT.length;

                // Apply Jitter (300-600ms) before retry
                await applyJitter();

                return generateGroqResponse(systemPrompt, userPrompt, jsonMode, retryCount + 1);
            } else {
                updateKeyStatus(currentKeyIndex, 'IDLE');
                throw new Error("GROQ_VAULT_EXHAUSTED: All keys rate limited.");
            }
        }

        if (!response.ok) {
            updateKeyStatus(currentKeyIndex, 'IDLE');
            const errorText = await response.text();
            throw new Error(`Groq API Error: ${response.status} - ${errorText}`);
        }

        updateKeyStatus(currentKeyIndex, 'IDLE'); // Success
        const data = await response.json();
        const content = data.choices[0]?.message?.content || "{}";

        return jsonMode ? JSON.parse(content) : content;

    } catch (error: any) {
        if (retryCount >= MAX_RETRIES && error.message.includes("GROQ_VAULT_EXHAUSTED")) {
            throw error;
        }
        updateKeyStatus(currentKeyIndex, 'IDLE');
        throw error;
    }
};
