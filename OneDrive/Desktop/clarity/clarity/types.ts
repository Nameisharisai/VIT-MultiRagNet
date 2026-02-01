export enum IntentGate {
  DSA = 'DSA',
  APTITUDE = 'APTITUDE',
  CODING = 'CODING',
  COMMUNICATION = 'COMMUNICATION'
}

/**
 * User Tiers for the Clarity Terminal
 * FREE: Explorer Edition
 * PRO: Pro Edition (Enhanced Limits)
 * ELITE: Ultra Edition (Placement Mode + Resume Integration)
 */
export enum UserTier {
  FREE = 'FREE',
  PRO = 'PRO',
  ELITE = 'ELITE'
}

export enum AppState {
  ONBOARDING = 'ONBOARDING',
  HOME = 'HOME',
  CLASSROOM = 'CLASSROOM',
  LEARNING_PATH = 'LEARNING_PATH'
}

export interface ProjectEntry {
  name: string;
  problem: string;
  tech: string;
  role: string;
}

export interface Milestone {
  goal: string;
  date: string;
}

// Learning Path Progress
export interface PathProgress {
  patternId: string;
  completed: boolean;
  score: number;
  attempts: number;
  lastAttempt?: string;
  leetcodeProblems: LeetCodeProgress[];
}

export interface LeetCodeProgress {
  problemId: string;
  solved: boolean;
  attempts: number;
  bestTime?: number;
}

// Achievement System
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface UserState {
  name: string;
  isProfileComplete: boolean;
  targetRole: string;
  techStack: string[];
  projects: ProjectEntry[];
  milestone: Milestone;
  completedToday: number;
  dailyGoal: number;
  language?: 'Python' | 'Java' | 'C' | 'JavaScript';
  tier: UserTier;
  isPlacementModeActive: boolean;
  resumeContent?: string;
  dailyUsage?: DailyUsage;
  // New fields for enhanced learning
  pathProgress: Record<string, PathProgress>;
  achievements: Achievement[];
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
  lastActiveDate?: string;
}

export interface DailyUsage {
  date: string;       // ISO date string YYYY-MM-DD
  dsa: number;
  coding: number;
  aptitude: number;
  communication: number;
}

// LeetCode Problem Reference
export interface LeetCodeProblem {
  id: string;
  number: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  url: string;
  companies: string[];
  tags: string[];
  acceptance: number;
  practicalUse?: string;
}

// --- Pattern Engine Definitions ---

export interface Pattern {
  id: string;
  gate: IntentGate;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  coreLogic: string;
  leetcodeProblems?: LeetCodeProblem[];
  prerequisites?: string[];
  xpReward: number;
  estimatedTime: string;
}

// LeetCode Problems Database
export const LEETCODE_PROBLEMS: Record<string, LeetCodeProblem[]> = {
  'p-2p': [
    { id: 'lc-1', number: 1, title: 'Two Sum', difficulty: 'Easy', url: 'https://leetcode.com/problems/two-sum/', companies: ['Google', 'Amazon', 'Facebook', 'Microsoft'], tags: ['Array', 'Hash Table'], acceptance: 49.1 },
    { id: 'lc-167', number: 167, title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', companies: ['Amazon', 'Bloomberg'], tags: ['Array', 'Two Pointers'], acceptance: 60.0 },
    { id: 'lc-15', number: 15, title: '3Sum', difficulty: 'Medium', url: 'https://leetcode.com/problems/3sum/', companies: ['Facebook', 'Amazon', 'Google', 'Microsoft'], tags: ['Array', 'Two Pointers', 'Sorting'], acceptance: 32.2 },
    { id: 'lc-11', number: 11, title: 'Container With Most Water', difficulty: 'Medium', url: 'https://leetcode.com/problems/container-with-most-water/', companies: ['Amazon', 'Facebook', 'Google'], tags: ['Array', 'Two Pointers', 'Greedy'], acceptance: 54.3 },
    { id: 'lc-125', number: 125, title: 'Valid Palindrome', difficulty: 'Easy', url: 'https://leetcode.com/problems/valid-palindrome/', companies: ['Facebook', 'Microsoft', 'Apple'], tags: ['Two Pointers', 'String'], acceptance: 44.2 },
  ],
  'p-sw': [
    { id: 'lc-3', number: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', companies: ['Amazon', 'Google', 'Facebook', 'Microsoft', 'Bloomberg'], tags: ['Hash Table', 'String', 'Sliding Window'], acceptance: 34.0 },
    { id: 'lc-76', number: 76, title: 'Minimum Window Substring', difficulty: 'Hard', url: 'https://leetcode.com/problems/minimum-window-substring/', companies: ['Facebook', 'Amazon', 'LinkedIn', 'Google'], tags: ['Hash Table', 'String', 'Sliding Window'], acceptance: 40.7 },
    { id: 'lc-424', number: 424, title: 'Longest Repeating Character Replacement', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/', companies: ['Google', 'Amazon'], tags: ['Hash Table', 'String', 'Sliding Window'], acceptance: 52.1 },
    { id: 'lc-567', number: 567, title: 'Permutation in String', difficulty: 'Medium', url: 'https://leetcode.com/problems/permutation-in-string/', companies: ['Microsoft', 'Amazon', 'Oracle'], tags: ['Hash Table', 'Two Pointers', 'Sliding Window'], acceptance: 43.8 },
    { id: 'lc-239', number: 239, title: 'Sliding Window Maximum', difficulty: 'Hard', url: 'https://leetcode.com/problems/sliding-window-maximum/', companies: ['Amazon', 'Google', 'Citadel'], tags: ['Array', 'Queue', 'Sliding Window', 'Heap'], acceptance: 46.4 },
  ],
  'p-fc': [
    { id: 'lc-242', number: 242, title: 'Valid Anagram', difficulty: 'Easy', url: 'https://leetcode.com/problems/valid-anagram/', companies: ['Amazon', 'Microsoft', 'Apple'], tags: ['Hash Table', 'String', 'Sorting'], acceptance: 63.4 },
    { id: 'lc-49', number: 49, title: 'Group Anagrams', difficulty: 'Medium', url: 'https://leetcode.com/problems/group-anagrams/', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], tags: ['Array', 'Hash Table', 'String', 'Sorting'], acceptance: 67.0 },
    { id: 'lc-347', number: 347, title: 'Top K Frequent Elements', difficulty: 'Medium', url: 'https://leetcode.com/problems/top-k-frequent-elements/', companies: ['Amazon', 'Facebook', 'Apple', 'Google'], tags: ['Array', 'Hash Table', 'Heap'], acceptance: 62.7 },
    { id: 'lc-438', number: 438, title: 'Find All Anagrams in a String', difficulty: 'Medium', url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', companies: ['Amazon', 'Facebook', 'Microsoft'], tags: ['Hash Table', 'String', 'Sliding Window'], acceptance: 49.9 },
    { id: 'lc-128', number: 128, title: 'Longest Consecutive Sequence', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-consecutive-sequence/', companies: ['Google', 'Amazon', 'Facebook'], tags: ['Array', 'Hash Table', 'Union Find'], acceptance: 47.4 },
  ],
  'p-st': [
    { id: 'lc-121', number: 121, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', companies: ['Amazon', 'Facebook', 'Microsoft', 'Goldman Sachs'], tags: ['Array', 'Dynamic Programming'], acceptance: 54.1 },
    { id: 'lc-53', number: 53, title: 'Maximum Subarray', difficulty: 'Medium', url: 'https://leetcode.com/problems/maximum-subarray/', companies: ['Amazon', 'Microsoft', 'LinkedIn', 'Apple'], tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'], acceptance: 50.1 },
    { id: 'lc-152', number: 152, title: 'Maximum Product Subarray', difficulty: 'Medium', url: 'https://leetcode.com/problems/maximum-product-subarray/', companies: ['Amazon', 'LinkedIn', 'Google'], tags: ['Array', 'Dynamic Programming'], acceptance: 34.9 },
    { id: 'lc-238', number: 238, title: 'Product of Array Except Self', difficulty: 'Medium', url: 'https://leetcode.com/problems/product-of-array-except-self/', companies: ['Amazon', 'Facebook', 'Apple', 'Microsoft'], tags: ['Array', 'Prefix Sum'], acceptance: 66.0 },
  ],
  'p-gr': [
    { id: 'lc-55', number: 55, title: 'Jump Game', difficulty: 'Medium', url: 'https://leetcode.com/problems/jump-game/', companies: ['Amazon', 'Apple', 'Google'], tags: ['Array', 'Dynamic Programming', 'Greedy'], acceptance: 38.4 },
    { id: 'lc-45', number: 45, title: 'Jump Game II', difficulty: 'Medium', url: 'https://leetcode.com/problems/jump-game-ii/', companies: ['Amazon', 'Google', 'Microsoft'], tags: ['Array', 'Dynamic Programming', 'Greedy'], acceptance: 39.7 },
    { id: 'lc-134', number: 134, title: 'Gas Station', difficulty: 'Medium', url: 'https://leetcode.com/problems/gas-station/', companies: ['Amazon', 'Google', 'Bloomberg'], tags: ['Array', 'Greedy'], acceptance: 45.4 },
    { id: 'lc-763', number: 763, title: 'Partition Labels', difficulty: 'Medium', url: 'https://leetcode.com/problems/partition-labels/', companies: ['Amazon', 'Google'], tags: ['Hash Table', 'Two Pointers', 'String', 'Greedy'], acceptance: 79.7 },
  ],
};

export const DSA_PATTERNS: Pattern[] = [
  { id: 'p-2p', gate: IntentGate.DSA, title: 'Two Pointers', description: 'Converging or trailing pointers to optimize search space.', difficulty: 'Easy', coreLogic: 'Initialize start/end pointers. Move pointers based on comparison to target value.', leetcodeProblems: LEETCODE_PROBLEMS['p-2p'], xpReward: 100, estimatedTime: '30 min' },
  { id: 'p-sw', gate: IntentGate.DSA, title: 'Sliding Window', description: 'Dynamic sub-array tracking for continuous data segments.', difficulty: 'Medium', coreLogic: 'Expand right boundary, shrink left boundary when constraints are violated.', leetcodeProblems: LEETCODE_PROBLEMS['p-sw'], prerequisites: ['p-2p'], xpReward: 150, estimatedTime: '45 min' },
  { id: 'p-fc', gate: IntentGate.DSA, title: 'Frequency Map', description: 'Using hashes or dictionaries to eliminate nested loops.', difficulty: 'Easy', coreLogic: 'Map elements to occurrence counts. Compare states between two maps.', leetcodeProblems: LEETCODE_PROBLEMS['p-fc'], xpReward: 120, estimatedTime: '35 min' },
  { id: 'p-st', gate: IntentGate.DSA, title: 'State Tracking', description: 'Maintaining boolean or numeric state across a traversal.', difficulty: 'Easy', coreLogic: 'Update a state variable based on the relationship between current and previous elements.', leetcodeProblems: LEETCODE_PROBLEMS['p-st'], prerequisites: ['p-fc'], xpReward: 130, estimatedTime: '40 min' },
  { id: 'p-gr', gate: IntentGate.DSA, title: 'Greedy Choice', description: 'Making locally optimal choices to achieve a global result.', difficulty: 'Medium', coreLogic: 'Sort by a specific constraint. Select the highest value or earliest available end time.', leetcodeProblems: LEETCODE_PROBLEMS['p-gr'], prerequisites: ['p-st'], xpReward: 180, estimatedTime: '50 min' }
];

export const APTITUDE_MODELS: Pattern[] = [
  { id: 'm-wr', gate: IntentGate.APTITUDE, title: 'Work-Rate Reasoning', description: 'Logic for combining individual capacities.', difficulty: 'Easy', coreLogic: 'Calculate individual rates (1/Time). Sum rates to find total capacity.', xpReward: 80, estimatedTime: '20 min' },
  { id: 'm-rc', gate: IntentGate.APTITUDE, title: 'Ratio Comparison', description: 'Evaluating fractions without performining division.', difficulty: 'Medium', coreLogic: 'Use cross-multiplication or common denominators to determine magnitude.', prerequisites: ['m-wr'], xpReward: 100, estimatedTime: '25 min' },
  { id: 'm-eb', gate: IntentGate.APTITUDE, title: 'Estimation Bounds', description: 'Using extreme values to eliminate incorrect options.', difficulty: 'Easy', coreLogic: 'Determine minimum and maximum possible values to isolate the correct range.', xpReward: 90, estimatedTime: '20 min' },
  { id: 'm-tf', gate: IntentGate.APTITUDE, title: 'Time-Flow Logic', description: 'Relative motion and timeline state tracking.', difficulty: 'Medium', coreLogic: 'Use relative speed calculations (Time = Distance / Combined Speed).', prerequisites: ['m-eb'], xpReward: 120, estimatedTime: '30 min' }
];

export const CODE_CONCEPTS: Pattern[] = [
  { id: 'c-st', gate: IntentGate.CODING, title: 'Variables & Storage', description: 'Intentional data persistence and naming conventions.', difficulty: 'Easy', coreLogic: 'Store current state variables to enable comparison with future iterations.', xpReward: 60, estimatedTime: '15 min' },
  { id: 'c-cl', gate: IntentGate.CODING, title: 'Conditional Branching', description: 'Creating decision paths based on logical truth values.', difficulty: 'Easy', coreLogic: 'Test logical conditions to select exclusive execution paths.', prerequisites: ['c-st'], xpReward: 70, estimatedTime: '20 min' },
  { id: 'c-it', gate: IntentGate.CODING, title: 'Iterative Logic', description: 'Controlled repetition of logic blocks.', difficulty: 'Medium', coreLogic: 'Define loop boundaries and state update steps to prevent infinite recursion.', prerequisites: ['c-cl'], xpReward: 100, estimatedTime: '25 min' }
];

export const COMM_FRAMEWORKS: Pattern[] = [
  { id: 'f-star', gate: IntentGate.COMMUNICATION, title: 'Project Storytelling', description: 'Structure: Situation, Task, Action, Result.', difficulty: 'Easy', coreLogic: 'Contextualize -> Act -> Prove.', xpReward: 80, estimatedTime: '20 min' },
  { id: 'f-td', gate: IntentGate.COMMUNICATION, title: 'Defending Decisions', description: 'Explaining technical trade-offs and alternatives.', difficulty: 'Medium', coreLogic: 'Define Problem -> Present Alternative -> Justify Choice -> Show Impact.', prerequisites: ['f-star'], xpReward: 100, estimatedTime: '25 min' },
  { id: 'f-ec', gate: IntentGate.COMMUNICATION, title: 'Explaining Concepts', description: 'Teaching technical topics using analogies.', difficulty: 'Medium', coreLogic: 'Create Analogy -> Define Simplified Concept -> Provide Practical Example.', prerequisites: ['f-td'], xpReward: 110, estimatedTime: '30 min' }
];

export interface GeneratedQuestion {
  id: string;
  problem: string;
  context?: string;
  options?: string[];
  correctAnswer?: string;
  logicCheck?: string;
  simulationStep?: string;
  skeletonCode?: string;
  intentSteps?: string[];

  // Teaching Path Fields
  conceptExplanation: string; // Plain language + analogy
  logicWalkthrough: string[]; // Step-by-step thinking
  demoCode: string;           // Full code with comments (Default: Python)

  helpLayers?: {
    logic: string;
    algorithm: string;
    skeleton: string;
    fullSolution: string;
  };
}

export interface EvaluationResult {
  verdict: 'CORRECT' | 'INCORRECT' | 'PARTIAL';
  feedback: string;
  thinkingGap?: string;
  nextVariationHint?: string;
  cleanCodeTip?: string;
  explanationWhy?: string;
  correctedSnippet?: string;
}