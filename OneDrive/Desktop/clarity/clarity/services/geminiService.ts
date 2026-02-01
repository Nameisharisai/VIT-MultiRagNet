
import { Pattern, UserState, UserTier, EvaluationResult, GeneratedQuestion, IntentGate } from "../types";
import { generateGroqResponse } from "./llmService";

export const generatePatternVariation = async (
  pattern: Pattern,
  user: UserState,
  previousContext?: string
): Promise<GeneratedQuestion> => {
  const resumeContext = user.tier === UserTier.ELITE && user.resumeContent ? `USER_RESUME: ${user.resumeContent}` : "";
  const systemInstruction = `
    You are the Clarity Teaching Engine. 
    GATE: ${pattern.gate}
    PATTERN: ${pattern.title} (${pattern.description})
    CORE_LOGIC: ${pattern.coreLogic}
    ${resumeContext}
    
    TASK: Generate a unique professional problem and full teaching materials.
    
    TIER INSTRUCTIONS:
    ${user.tier === UserTier.FREE ? `
      - MODE: TEACHING-FIRST.
      - Do NOT provide direct answers immediately.
      - Focus on "Why" and "How".
      - Do NOT ask Company-specific questions (Google, Meta, etc).
      - Difficulty: Beginner to Intermediate only.
    ` : user.tier === UserTier.PRO ? `
      - MODE: ADAPTIVE-CHALLENGE.
      - Increase difficulty if previous context suggests competence.
      - Include Company-style questions (e.g. "Google-style sliding window").
      - Provide deeper "Logic Gaps" feedback.
    ` : `
      - MODE: ELITE-PLACEMENT.
      - STRICTLY use the RESUME context below to tailor the domain. 
      - If resume mentions "Frontend", ask React/DOM related DSA.
      - If "Backend", ask Scaling/DB related DSA.
      - Simulate High-Pressure Interview components.
    `}

    FOR THE ADAPTIVE TEACHING GATE:
    - 'conceptExplanation': A calm, jargon-free explanation with a real-world analogy.
    - 'logicWalkthrough': An array of 3-5 clear steps explaining how the logic moves.
    - 'demoCode': A clean, documented code implementation of the solution.
    
    RESPONSE FORMAT:
    Strictly output JSON with no keys other than:
    {
      "id": "string",
      "problem": "string",
      "options": ["string"],
      "correctAnswer": "string",
      "logicCheck": "string",
      "simulationStep": "string",
      "conceptExplanation": "string",
      "logicWalkthrough": ["string"],
      "demoCode": "string",
      "helpLayers": {
        "logic": "string",
        "algorithm": "string",
        "skeleton": "string",
        "fullSolution": "string"
      }
    }
  `;

  const userPrompt = previousContext
    ? `PREVIOUS_LEVEL: ${previousContext}. Increase difficulty.`
    : "Generate initial pattern session.";

  return await generateGroqResponse(systemInstruction, userPrompt, true);
};

export const validateThinkingLogic = async (
  question: GeneratedQuestion,
  userInput: string,
  user: UserState,
  stage: string
): Promise<EvaluationResult> => {
  const systemInstruction = `
    You are the Clarity logic mentor. 
    PROBLEM: ${question.problem}
    EXPECTED_LOGIC: ${question.logicCheck}
    STAGE: ${stage}
    USER_TIER: ${user.tier}

    TASK: Validate the user's logic or code.
    RULES:
    1. If stage is 'CODING', check structure and variable flow.
    2. Classify verdict as CORRECT, INCORRECT, or PARTIAL.
    3. If INCORRECT: Explain WHAT is missing and WHY it fails.
    4. provide 'correctedSnippet': A brief code fragment.
    5. IMPORTANT: Be encouraging. Static analysis only.

    RESPONSE FORMAT:
    Strictly output JSON with no keys other than:
    {
      "verdict": "CORRECT" | "INCORRECT" | "PARTIAL",
      "feedback": "string",
      "thinkingGap": "string",
      "explanationWhy": "string",
      "correctedSnippet": "string",
      "nextVariationHint": "string"
    }
  `;

  return await generateGroqResponse(systemInstruction, `USER_INPUT: ${userInput}`, true);
};
