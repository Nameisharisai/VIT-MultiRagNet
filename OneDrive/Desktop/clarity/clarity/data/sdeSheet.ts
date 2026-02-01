// Comprehensive SDE Sheet Data - Full DSA Learning Path
import { IntentGate, LeetCodeProblem, Pattern } from '../types';

// Extended LeetCode Problems Database - Complete SDE Sheet
export const EXTENDED_LEETCODE_PROBLEMS: Record<string, LeetCodeProblem[]> = {
  // Arrays & Strings - Foundation
  'p-arr': [
    { id: 'lc-217', number: 217, title: 'Contains Duplicate', difficulty: 'Easy', url: 'https://leetcode.com/problems/contains-duplicate/', companies: ['Amazon', 'Apple', 'Adobe'], tags: ['Array', 'Hash Table', 'Sorting'], acceptance: 61.2, practicalUse: 'Data validation, detecting duplicate entries in databases' },
    { id: 'lc-268', number: 268, title: 'Missing Number', difficulty: 'Easy', url: 'https://leetcode.com/problems/missing-number/', companies: ['Amazon', 'Microsoft', 'Facebook'], tags: ['Array', 'Math', 'Bit Manipulation'], acceptance: 62.5, practicalUse: 'Data integrity checks, sequence validation' },
    { id: 'lc-448', number: 448, title: 'Find All Numbers Disappeared in an Array', difficulty: 'Easy', url: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/', companies: ['Google', 'Amazon'], tags: ['Array', 'Hash Table'], acceptance: 59.8, practicalUse: 'Inventory management, tracking missing records' },
    { id: 'lc-136', number: 136, title: 'Single Number', difficulty: 'Easy', url: 'https://leetcode.com/problems/single-number/', companies: ['Amazon', 'Google', 'Apple'], tags: ['Array', 'Bit Manipulation'], acceptance: 70.5, practicalUse: 'Error detection in data transmission' },
    { id: 'lc-169', number: 169, title: 'Majority Element', difficulty: 'Easy', url: 'https://leetcode.com/problems/majority-element/', companies: ['Amazon', 'Google', 'Microsoft'], tags: ['Array', 'Hash Table', 'Sorting'], acceptance: 64.0, practicalUse: 'Voting systems, consensus algorithms' },
    { id: 'lc-283', number: 283, title: 'Move Zeroes', difficulty: 'Easy', url: 'https://leetcode.com/problems/move-zeroes/', companies: ['Facebook', 'Bloomberg', 'Apple'], tags: ['Array', 'Two Pointers'], acceptance: 61.3, practicalUse: 'Data partitioning, memory optimization' },
    { id: 'lc-75', number: 75, title: 'Sort Colors (Dutch National Flag)', difficulty: 'Medium', url: 'https://leetcode.com/problems/sort-colors/', companies: ['Microsoft', 'Amazon', 'Facebook'], tags: ['Array', 'Two Pointers', 'Sorting'], acceptance: 58.7, practicalUse: 'Traffic light systems, priority sorting' },
  ],
  // Two Pointers
  'p-2p': [
    { id: 'lc-1', number: 1, title: 'Two Sum', difficulty: 'Easy', url: 'https://leetcode.com/problems/two-sum/', companies: ['Google', 'Amazon', 'Facebook', 'Microsoft', 'Apple'], tags: ['Array', 'Hash Table'], acceptance: 49.1, practicalUse: 'Financial calculations, pair matching in recommendations' },
    { id: 'lc-167', number: 167, title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', companies: ['Amazon', 'Bloomberg'], tags: ['Array', 'Two Pointers'], acceptance: 60.0, practicalUse: 'Optimized search in sorted datasets' },
    { id: 'lc-15', number: 15, title: '3Sum', difficulty: 'Medium', url: 'https://leetcode.com/problems/3sum/', companies: ['Facebook', 'Amazon', 'Google', 'Microsoft', 'Bloomberg'], tags: ['Array', 'Two Pointers', 'Sorting'], acceptance: 32.2, practicalUse: 'Chemical compound matching, financial portfolio balancing' },
    { id: 'lc-11', number: 11, title: 'Container With Most Water', difficulty: 'Medium', url: 'https://leetcode.com/problems/container-with-most-water/', companies: ['Amazon', 'Facebook', 'Google', 'Goldman Sachs'], tags: ['Array', 'Two Pointers', 'Greedy'], acceptance: 54.3, practicalUse: 'Resource optimization, warehouse storage planning' },
    { id: 'lc-125', number: 125, title: 'Valid Palindrome', difficulty: 'Easy', url: 'https://leetcode.com/problems/valid-palindrome/', companies: ['Facebook', 'Microsoft', 'Apple', 'Uber'], tags: ['Two Pointers', 'String'], acceptance: 44.2, practicalUse: 'DNA sequence analysis, text validation' },
    { id: 'lc-42', number: 42, title: 'Trapping Rain Water', difficulty: 'Hard', url: 'https://leetcode.com/problems/trapping-rain-water/', companies: ['Amazon', 'Google', 'Facebook', 'Goldman Sachs', 'Bloomberg'], tags: ['Array', 'Two Pointers', 'Stack', 'DP'], acceptance: 59.2, practicalUse: 'Urban flood modeling, terrain analysis' },
  ],
  // Sliding Window
  'p-sw': [
    { id: 'lc-3', number: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', companies: ['Amazon', 'Google', 'Facebook', 'Microsoft', 'Bloomberg', 'Apple'], tags: ['Hash Table', 'String', 'Sliding Window'], acceptance: 34.0, practicalUse: 'Text processing, unique session tracking' },
    { id: 'lc-76', number: 76, title: 'Minimum Window Substring', difficulty: 'Hard', url: 'https://leetcode.com/problems/minimum-window-substring/', companies: ['Facebook', 'Amazon', 'LinkedIn', 'Google', 'Uber'], tags: ['Hash Table', 'String', 'Sliding Window'], acceptance: 40.7, practicalUse: 'DNA sequencing, search optimization' },
    { id: 'lc-424', number: 424, title: 'Longest Repeating Character Replacement', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/', companies: ['Google', 'Amazon', 'Uber'], tags: ['Hash Table', 'String', 'Sliding Window'], acceptance: 52.1, practicalUse: 'Data compression, error correction codes' },
    { id: 'lc-567', number: 567, title: 'Permutation in String', difficulty: 'Medium', url: 'https://leetcode.com/problems/permutation-in-string/', companies: ['Microsoft', 'Amazon', 'Oracle', 'Yandex'], tags: ['Hash Table', 'Two Pointers', 'Sliding Window'], acceptance: 43.8, practicalUse: 'Pattern detection, anagram search engines' },
    { id: 'lc-239', number: 239, title: 'Sliding Window Maximum', difficulty: 'Hard', url: 'https://leetcode.com/problems/sliding-window-maximum/', companies: ['Amazon', 'Google', 'Citadel', 'Facebook'], tags: ['Array', 'Queue', 'Sliding Window', 'Heap'], acceptance: 46.4, practicalUse: 'Stock price analysis, real-time monitoring systems' },
    { id: 'lc-209', number: 209, title: 'Minimum Size Subarray Sum', difficulty: 'Medium', url: 'https://leetcode.com/problems/minimum-size-subarray-sum/', companies: ['Facebook', 'Goldman Sachs', 'Microsoft'], tags: ['Array', 'Binary Search', 'Sliding Window'], acceptance: 45.1, practicalUse: 'Network packet optimization, resource allocation' },
  ],
  // Frequency Map / Hashing
  'p-fc': [
    { id: 'lc-242', number: 242, title: 'Valid Anagram', difficulty: 'Easy', url: 'https://leetcode.com/problems/valid-anagram/', companies: ['Amazon', 'Microsoft', 'Apple', 'Bloomberg'], tags: ['Hash Table', 'String', 'Sorting'], acceptance: 63.4, practicalUse: 'Spell checkers, word games' },
    { id: 'lc-49', number: 49, title: 'Group Anagrams', difficulty: 'Medium', url: 'https://leetcode.com/problems/group-anagrams/', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bloomberg'], tags: ['Array', 'Hash Table', 'String', 'Sorting'], acceptance: 67.0, practicalUse: 'Search engines, document clustering' },
    { id: 'lc-347', number: 347, title: 'Top K Frequent Elements', difficulty: 'Medium', url: 'https://leetcode.com/problems/top-k-frequent-elements/', companies: ['Amazon', 'Facebook', 'Apple', 'Google', 'Yelp'], tags: ['Array', 'Hash Table', 'Heap'], acceptance: 62.7, practicalUse: 'Trending topics, recommendation systems' },
    { id: 'lc-438', number: 438, title: 'Find All Anagrams in a String', difficulty: 'Medium', url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google'], tags: ['Hash Table', 'String', 'Sliding Window'], acceptance: 49.9, practicalUse: 'Plagiarism detection, code similarity' },
    { id: 'lc-128', number: 128, title: 'Longest Consecutive Sequence', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-consecutive-sequence/', companies: ['Google', 'Amazon', 'Facebook', 'Microsoft'], tags: ['Array', 'Hash Table', 'Union Find'], acceptance: 47.4, practicalUse: 'Timeline analysis, version tracking' },
    { id: 'lc-560', number: 560, title: 'Subarray Sum Equals K', difficulty: 'Medium', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', companies: ['Facebook', 'Google', 'Amazon', 'Microsoft'], tags: ['Array', 'Hash Table', 'Prefix Sum'], acceptance: 43.5, practicalUse: 'Financial accounting, budget tracking' },
  ],
  // Binary Search
  'p-bs': [
    { id: 'lc-704', number: 704, title: 'Binary Search', difficulty: 'Easy', url: 'https://leetcode.com/problems/binary-search/', companies: ['Amazon', 'Microsoft', 'Apple'], tags: ['Array', 'Binary Search'], acceptance: 55.2, practicalUse: 'Database indexing, dictionary lookups' },
    { id: 'lc-33', number: 33, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', companies: ['Facebook', 'Amazon', 'Microsoft', 'LinkedIn', 'Google'], tags: ['Array', 'Binary Search'], acceptance: 39.0, practicalUse: 'Log file analysis, circular buffer search' },
    { id: 'lc-153', number: 153, title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', companies: ['Amazon', 'Microsoft', 'Facebook'], tags: ['Array', 'Binary Search'], acceptance: 48.8, practicalUse: 'Finding shift point in cyclic data' },
    { id: 'lc-4', number: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', companies: ['Amazon', 'Google', 'Apple', 'Goldman Sachs'], tags: ['Array', 'Binary Search', 'Divide and Conquer'], acceptance: 36.1, practicalUse: 'Statistical analysis, data merging' },
    { id: 'lc-74', number: 74, title: 'Search a 2D Matrix', difficulty: 'Medium', url: 'https://leetcode.com/problems/search-a-2d-matrix/', companies: ['Amazon', 'Microsoft', 'Apple'], tags: ['Array', 'Binary Search', 'Matrix'], acceptance: 47.2, practicalUse: 'Spreadsheet search, image processing' },
    { id: 'lc-875', number: 875, title: 'Koko Eating Bananas', difficulty: 'Medium', url: 'https://leetcode.com/problems/koko-eating-bananas/', companies: ['Facebook', 'Google', 'Airbnb'], tags: ['Array', 'Binary Search'], acceptance: 52.0, practicalUse: 'Rate optimization, capacity planning' },
  ],
  // State Tracking / Kadane's
  'p-st': [
    { id: 'lc-121', number: 121, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', companies: ['Amazon', 'Facebook', 'Microsoft', 'Goldman Sachs', 'Bloomberg'], tags: ['Array', 'Dynamic Programming'], acceptance: 54.1, practicalUse: 'Stock trading algorithms, investment optimization' },
    { id: 'lc-53', number: 53, title: 'Maximum Subarray (Kadane\'s Algorithm)', difficulty: 'Medium', url: 'https://leetcode.com/problems/maximum-subarray/', companies: ['Amazon', 'Microsoft', 'LinkedIn', 'Apple', 'Google'], tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'], acceptance: 50.1, practicalUse: 'Financial analysis, signal processing' },
    { id: 'lc-152', number: 152, title: 'Maximum Product Subarray', difficulty: 'Medium', url: 'https://leetcode.com/problems/maximum-product-subarray/', companies: ['Amazon', 'LinkedIn', 'Google', 'Microsoft'], tags: ['Array', 'Dynamic Programming'], acceptance: 34.9, practicalUse: 'Risk analysis, compound calculations' },
    { id: 'lc-238', number: 238, title: 'Product of Array Except Self', difficulty: 'Medium', url: 'https://leetcode.com/problems/product-of-array-except-self/', companies: ['Amazon', 'Facebook', 'Apple', 'Microsoft', 'Google'], tags: ['Array', 'Prefix Sum'], acceptance: 66.0, practicalUse: 'Statistical normalization, feature engineering' },
    { id: 'lc-122', number: 122, title: 'Best Time to Buy and Sell Stock II', difficulty: 'Medium', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/', companies: ['Amazon', 'Microsoft', 'Facebook'], tags: ['Array', 'Dynamic Programming', 'Greedy'], acceptance: 63.6, practicalUse: 'Multiple transaction optimization' },
  ],
  // Greedy
  'p-gr': [
    { id: 'lc-55', number: 55, title: 'Jump Game', difficulty: 'Medium', url: 'https://leetcode.com/problems/jump-game/', companies: ['Amazon', 'Apple', 'Google', 'Microsoft'], tags: ['Array', 'Dynamic Programming', 'Greedy'], acceptance: 38.4, practicalUse: 'Game development, network hop optimization' },
    { id: 'lc-45', number: 45, title: 'Jump Game II', difficulty: 'Medium', url: 'https://leetcode.com/problems/jump-game-ii/', companies: ['Amazon', 'Google', 'Microsoft', 'Facebook'], tags: ['Array', 'Dynamic Programming', 'Greedy'], acceptance: 39.7, practicalUse: 'Minimum hop routing' },
    { id: 'lc-134', number: 134, title: 'Gas Station', difficulty: 'Medium', url: 'https://leetcode.com/problems/gas-station/', companies: ['Amazon', 'Google', 'Bloomberg', 'Microsoft'], tags: ['Array', 'Greedy'], acceptance: 45.4, practicalUse: 'Route planning, resource management' },
    { id: 'lc-763', number: 763, title: 'Partition Labels', difficulty: 'Medium', url: 'https://leetcode.com/problems/partition-labels/', companies: ['Amazon', 'Google', 'Facebook'], tags: ['Hash Table', 'Two Pointers', 'String', 'Greedy'], acceptance: 79.7, practicalUse: 'Text segmentation, data partitioning' },
    { id: 'lc-846', number: 846, title: 'Hand of Straights', difficulty: 'Medium', url: 'https://leetcode.com/problems/hand-of-straights/', companies: ['Google', 'Amazon'], tags: ['Array', 'Hash Table', 'Greedy', 'Sorting'], acceptance: 56.2, practicalUse: 'Card game logic, grouping algorithms' },
    { id: 'lc-621', number: 621, title: 'Task Scheduler', difficulty: 'Medium', url: 'https://leetcode.com/problems/task-scheduler/', companies: ['Facebook', 'Amazon', 'Microsoft', 'Google'], tags: ['Array', 'Hash Table', 'Greedy', 'Heap'], acceptance: 57.2, practicalUse: 'CPU scheduling, job queue optimization' },
  ],
  // Linked Lists
  'p-ll': [
    { id: 'lc-206', number: 206, title: 'Reverse Linked List', difficulty: 'Easy', url: 'https://leetcode.com/problems/reverse-linked-list/', companies: ['Amazon', 'Microsoft', 'Apple', 'Facebook', 'Google'], tags: ['Linked List', 'Recursion'], acceptance: 73.4, practicalUse: 'Undo functionality, browser history' },
    { id: 'lc-21', number: 21, title: 'Merge Two Sorted Lists', difficulty: 'Easy', url: 'https://leetcode.com/problems/merge-two-sorted-lists/', companies: ['Amazon', 'Microsoft', 'Apple', 'Facebook'], tags: ['Linked List', 'Recursion'], acceptance: 62.5, practicalUse: 'Merge sort, data stream merging' },
    { id: 'lc-141', number: 141, title: 'Linked List Cycle', difficulty: 'Easy', url: 'https://leetcode.com/problems/linked-list-cycle/', companies: ['Amazon', 'Microsoft', 'Apple'], tags: ['Hash Table', 'Linked List', 'Two Pointers'], acceptance: 47.2, practicalUse: 'Memory leak detection, deadlock detection' },
    { id: 'lc-142', number: 142, title: 'Linked List Cycle II', difficulty: 'Medium', url: 'https://leetcode.com/problems/linked-list-cycle-ii/', companies: ['Amazon', 'Microsoft', 'Bloomberg'], tags: ['Hash Table', 'Linked List', 'Two Pointers'], acceptance: 46.8, practicalUse: 'Finding loop entry in cyclic structures' },
    { id: 'lc-19', number: 19, title: 'Remove Nth Node From End of List', difficulty: 'Medium', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', companies: ['Amazon', 'Facebook', 'Microsoft'], tags: ['Linked List', 'Two Pointers'], acceptance: 41.0, practicalUse: 'Buffer management, queue operations' },
    { id: 'lc-23', number: 23, title: 'Merge k Sorted Lists', difficulty: 'Hard', url: 'https://leetcode.com/problems/merge-k-sorted-lists/', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google', 'Uber'], tags: ['Linked List', 'Divide and Conquer', 'Heap'], acceptance: 51.0, practicalUse: 'External sorting, log aggregation' },
    { id: 'lc-143', number: 143, title: 'Reorder List', difficulty: 'Medium', url: 'https://leetcode.com/problems/reorder-list/', companies: ['Amazon', 'Facebook', 'Microsoft'], tags: ['Linked List', 'Two Pointers', 'Stack', 'Recursion'], acceptance: 52.6, practicalUse: 'Memory-efficient data interleaving' },
  ],
  // Stack & Queue
  'p-sq': [
    { id: 'lc-20', number: 20, title: 'Valid Parentheses', difficulty: 'Easy', url: 'https://leetcode.com/problems/valid-parentheses/', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google', 'Bloomberg'], tags: ['String', 'Stack'], acceptance: 40.5, practicalUse: 'Code syntax validation, expression parsing' },
    { id: 'lc-155', number: 155, title: 'Min Stack', difficulty: 'Medium', url: 'https://leetcode.com/problems/min-stack/', companies: ['Amazon', 'Microsoft', 'Bloomberg', 'Google'], tags: ['Stack', 'Design'], acceptance: 52.3, practicalUse: 'Tracking minimum in real-time systems' },
    { id: 'lc-150', number: 150, title: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', companies: ['Amazon', 'LinkedIn', 'Google'], tags: ['Array', 'Math', 'Stack'], acceptance: 44.5, practicalUse: 'Calculator implementation, compiler design' },
    { id: 'lc-739', number: 739, title: 'Daily Temperatures', difficulty: 'Medium', url: 'https://leetcode.com/problems/daily-temperatures/', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], tags: ['Array', 'Stack', 'Monotonic Stack'], acceptance: 66.5, practicalUse: 'Weather prediction, stock analysis' },
    { id: 'lc-84', number: 84, title: 'Largest Rectangle in Histogram', difficulty: 'Hard', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', companies: ['Amazon', 'Google', 'Facebook', 'Microsoft'], tags: ['Array', 'Stack', 'Monotonic Stack'], acceptance: 43.0, practicalUse: 'Image processing, skyline problems' },
    { id: 'lc-232', number: 232, title: 'Implement Queue using Stacks', difficulty: 'Easy', url: 'https://leetcode.com/problems/implement-queue-using-stacks/', companies: ['Amazon', 'Microsoft', 'Apple'], tags: ['Stack', 'Design', 'Queue'], acceptance: 61.4, practicalUse: 'System design, data structure implementation' },
  ],
  // Trees
  'p-tr': [
    { id: 'lc-104', number: 104, title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', companies: ['Amazon', 'Google', 'LinkedIn'], tags: ['Tree', 'DFS', 'BFS'], acceptance: 74.0, practicalUse: 'DOM depth analysis, decision tree evaluation' },
    { id: 'lc-226', number: 226, title: 'Invert Binary Tree', difficulty: 'Easy', url: 'https://leetcode.com/problems/invert-binary-tree/', companies: ['Google', 'Amazon', 'Facebook'], tags: ['Tree', 'DFS', 'BFS'], acceptance: 74.5, practicalUse: 'Mirror image generation, tree transformation' },
    { id: 'lc-100', number: 100, title: 'Same Tree', difficulty: 'Easy', url: 'https://leetcode.com/problems/same-tree/', companies: ['Amazon', 'Microsoft', 'Bloomberg'], tags: ['Tree', 'DFS', 'BFS'], acceptance: 57.5, practicalUse: 'Structure comparison, version diffing' },
    { id: 'lc-102', number: 102, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google', 'Bloomberg'], tags: ['Tree', 'BFS'], acceptance: 64.4, practicalUse: 'Hierarchical data display, org chart rendering' },
    { id: 'lc-98', number: 98, title: 'Validate Binary Search Tree', difficulty: 'Medium', url: 'https://leetcode.com/problems/validate-binary-search-tree/', companies: ['Amazon', 'Facebook', 'Microsoft', 'Bloomberg'], tags: ['Tree', 'DFS', 'BST'], acceptance: 32.0, practicalUse: 'Data integrity validation, BST operations' },
    { id: 'lc-230', number: 230, title: 'Kth Smallest Element in a BST', difficulty: 'Medium', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', companies: ['Amazon', 'Facebook', 'Google'], tags: ['Tree', 'DFS', 'BST'], acceptance: 70.0, practicalUse: 'Order statistics, ranking systems' },
    { id: 'lc-235', number: 235, title: 'Lowest Common Ancestor of a BST', difficulty: 'Medium', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', companies: ['Amazon', 'Facebook', 'Microsoft', 'LinkedIn'], tags: ['Tree', 'DFS', 'BST'], acceptance: 61.0, practicalUse: 'Org hierarchy queries, file system paths' },
    { id: 'lc-297', number: 297, title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'LinkedIn'], tags: ['Tree', 'DFS', 'BFS', 'Design'], acceptance: 55.8, practicalUse: 'Data serialization, distributed systems' },
  ],
  // Heaps / Priority Queue
  'p-hp': [
    { id: 'lc-215', number: 215, title: 'Kth Largest Element in an Array', difficulty: 'Medium', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', companies: ['Facebook', 'Amazon', 'Microsoft', 'Google', 'LinkedIn'], tags: ['Array', 'Divide and Conquer', 'Heap'], acceptance: 66.0, practicalUse: 'Leaderboards, top-N queries' },
    { id: 'lc-295', number: 295, title: 'Find Median from Data Stream', difficulty: 'Hard', url: 'https://leetcode.com/problems/find-median-from-data-stream/', companies: ['Amazon', 'Google', 'Microsoft', 'Facebook', 'Apple'], tags: ['Two Pointers', 'Design', 'Heap'], acceptance: 51.2, practicalUse: 'Real-time analytics, streaming statistics' },
    { id: 'lc-703', number: 703, title: 'Kth Largest Element in a Stream', difficulty: 'Easy', url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/', companies: ['Amazon', 'Facebook'], tags: ['Tree', 'Design', 'Heap'], acceptance: 55.6, practicalUse: 'Real-time ranking, live leaderboards' },
    { id: 'lc-355', number: 355, title: 'Design Twitter', difficulty: 'Medium', url: 'https://leetcode.com/problems/design-twitter/', companies: ['Amazon', 'Twitter', 'Facebook'], tags: ['Hash Table', 'Linked List', 'Design', 'Heap'], acceptance: 37.0, practicalUse: 'Social media feeds, news aggregation' },
    { id: 'lc-973', number: 973, title: 'K Closest Points to Origin', difficulty: 'Medium', url: 'https://leetcode.com/problems/k-closest-points-to-origin/', companies: ['Amazon', 'Facebook', 'Google', 'LinkedIn'], tags: ['Array', 'Math', 'Divide and Conquer', 'Heap'], acceptance: 65.8, practicalUse: 'Location-based services, nearest neighbor search' },
  ],
  // Backtracking
  'p-bt': [
    { id: 'lc-78', number: 78, title: 'Subsets', difficulty: 'Medium', url: 'https://leetcode.com/problems/subsets/', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google', 'Bloomberg'], tags: ['Array', 'Backtracking', 'Bit Manipulation'], acceptance: 75.0, practicalUse: 'Feature combination testing, power set generation' },
    { id: 'lc-46', number: 46, title: 'Permutations', difficulty: 'Medium', url: 'https://leetcode.com/problems/permutations/', companies: ['Amazon', 'Microsoft', 'Facebook', 'Google'], tags: ['Array', 'Backtracking'], acceptance: 75.7, practicalUse: 'Password generation, arrangement problems' },
    { id: 'lc-39', number: 39, title: 'Combination Sum', difficulty: 'Medium', url: 'https://leetcode.com/problems/combination-sum/', companies: ['Amazon', 'Facebook', 'Microsoft', 'Airbnb'], tags: ['Array', 'Backtracking'], acceptance: 69.0, practicalUse: 'Financial planning, resource allocation' },
    { id: 'lc-79', number: 79, title: 'Word Search', difficulty: 'Medium', url: 'https://leetcode.com/problems/word-search/', companies: ['Amazon', 'Microsoft', 'Facebook', 'Bloomberg'], tags: ['Array', 'Backtracking', 'Matrix'], acceptance: 41.0, practicalUse: 'Word games, pattern matching' },
    { id: 'lc-51', number: 51, title: 'N-Queens', difficulty: 'Hard', url: 'https://leetcode.com/problems/n-queens/', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], tags: ['Array', 'Backtracking'], acceptance: 63.2, practicalUse: 'Constraint satisfaction, scheduling' },
    { id: 'lc-131', number: 131, title: 'Palindrome Partitioning', difficulty: 'Medium', url: 'https://leetcode.com/problems/palindrome-partitioning/', companies: ['Amazon', 'Google', 'Bloomberg'], tags: ['String', 'DP', 'Backtracking'], acceptance: 63.5, practicalUse: 'Text segmentation, string analysis' },
  ],
  // Dynamic Programming
  'p-dp': [
    { id: 'lc-70', number: 70, title: 'Climbing Stairs', difficulty: 'Easy', url: 'https://leetcode.com/problems/climbing-stairs/', companies: ['Amazon', 'Google', 'Apple', 'Adobe'], tags: ['Math', 'Dynamic Programming', 'Memoization'], acceptance: 52.0, practicalUse: 'Path counting, Fibonacci applications' },
    { id: 'lc-198', number: 198, title: 'House Robber', difficulty: 'Medium', url: 'https://leetcode.com/problems/house-robber/', companies: ['Amazon', 'Google', 'Microsoft', 'LinkedIn'], tags: ['Array', 'Dynamic Programming'], acceptance: 49.5, practicalUse: 'Optimal selection, resource scheduling' },
    { id: 'lc-322', number: 322, title: 'Coin Change', difficulty: 'Medium', url: 'https://leetcode.com/problems/coin-change/', companies: ['Amazon', 'Microsoft', 'Goldman Sachs', 'Google'], tags: ['Array', 'Dynamic Programming', 'BFS'], acceptance: 42.0, practicalUse: 'Currency systems, minimum change problems' },
    { id: 'lc-300', number: 300, title: 'Longest Increasing Subsequence', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', companies: ['Amazon', 'Microsoft', 'Google', 'Facebook'], tags: ['Array', 'Binary Search', 'Dynamic Programming'], acceptance: 52.5, practicalUse: 'Trend analysis, sequence optimization' },
    { id: 'lc-1143', number: 1143, title: 'Longest Common Subsequence', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-common-subsequence/', companies: ['Amazon', 'Google', 'Microsoft'], tags: ['String', 'Dynamic Programming'], acceptance: 58.8, practicalUse: 'Diff tools, DNA comparison, version control' },
    { id: 'lc-62', number: 62, title: 'Unique Paths', difficulty: 'Medium', url: 'https://leetcode.com/problems/unique-paths/', companies: ['Amazon', 'Google', 'Facebook', 'Microsoft'], tags: ['Math', 'Dynamic Programming', 'Combinatorics'], acceptance: 63.0, practicalUse: 'Robot navigation, grid pathfinding' },
    { id: 'lc-139', number: 139, title: 'Word Break', difficulty: 'Medium', url: 'https://leetcode.com/problems/word-break/', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Bloomberg'], tags: ['Hash Table', 'String', 'DP', 'Trie'], acceptance: 46.0, practicalUse: 'NLP tokenization, dictionary matching' },
    { id: 'lc-416', number: 416, title: 'Partition Equal Subset Sum', difficulty: 'Medium', url: 'https://leetcode.com/problems/partition-equal-subset-sum/', companies: ['Amazon', 'Facebook', 'Google'], tags: ['Array', 'Dynamic Programming'], acceptance: 46.4, practicalUse: 'Load balancing, task distribution' },
  ],
  // Graphs
  'p-gp': [
    { id: 'lc-200', number: 200, title: 'Number of Islands', difficulty: 'Medium', url: 'https://leetcode.com/problems/number-of-islands/', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google', 'Bloomberg', 'LinkedIn'], tags: ['Array', 'DFS', 'BFS', 'Union Find'], acceptance: 57.0, practicalUse: 'Image segmentation, connected component analysis' },
    { id: 'lc-133', number: 133, title: 'Clone Graph', difficulty: 'Medium', url: 'https://leetcode.com/problems/clone-graph/', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google'], tags: ['Hash Table', 'DFS', 'BFS', 'Graph'], acceptance: 52.0, practicalUse: 'Deep copy of data structures, network replication' },
    { id: 'lc-207', number: 207, title: 'Course Schedule', difficulty: 'Medium', url: 'https://leetcode.com/problems/course-schedule/', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Apple'], tags: ['DFS', 'BFS', 'Graph', 'Topological Sort'], acceptance: 45.7, practicalUse: 'Dependency resolution, build systems, package managers' },
    { id: 'lc-210', number: 210, title: 'Course Schedule II', difficulty: 'Medium', url: 'https://leetcode.com/problems/course-schedule-ii/', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], tags: ['DFS', 'BFS', 'Graph', 'Topological Sort'], acceptance: 48.5, practicalUse: 'Task scheduling, compilation order' },
    { id: 'lc-417', number: 417, title: 'Pacific Atlantic Water Flow', difficulty: 'Medium', url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', companies: ['Amazon', 'Google', 'Facebook'], tags: ['Array', 'DFS', 'BFS', 'Matrix'], acceptance: 54.0, practicalUse: 'Water flow simulation, drainage systems' },
    { id: 'lc-684', number: 684, title: 'Redundant Connection', difficulty: 'Medium', url: 'https://leetcode.com/problems/redundant-connection/', companies: ['Amazon', 'Google', 'Facebook'], tags: ['DFS', 'BFS', 'Union Find', 'Graph'], acceptance: 62.0, practicalUse: 'Network cycle detection, redundancy removal' },
    { id: 'lc-743', number: 743, title: 'Network Delay Time (Dijkstra)', difficulty: 'Medium', url: 'https://leetcode.com/problems/network-delay-time/', companies: ['Amazon', 'Google', 'Facebook', 'Microsoft'], tags: ['DFS', 'BFS', 'Graph', 'Heap', 'Shortest Path'], acceptance: 51.5, practicalUse: 'Network routing, GPS navigation' },
    { id: 'lc-269', number: 269, title: 'Alien Dictionary', difficulty: 'Hard', url: 'https://leetcode.com/problems/alien-dictionary/', companies: ['Facebook', 'Amazon', 'Google', 'Airbnb', 'Bloomberg'], tags: ['Array', 'String', 'DFS', 'BFS', 'Graph', 'Topological Sort'], acceptance: 35.0, practicalUse: 'Language processing, ordering inference' },
  ],
  // Advanced Graphs
  'p-agp': [
    { id: 'lc-778', number: 778, title: 'Swim in Rising Water', difficulty: 'Hard', url: 'https://leetcode.com/problems/swim-in-rising-water/', companies: ['Google', 'Amazon'], tags: ['Array', 'Binary Search', 'DFS', 'BFS', 'Union Find', 'Heap', 'Matrix'], acceptance: 60.0, practicalUse: 'Flood routing, path optimization' },
    { id: 'lc-787', number: 787, title: 'Cheapest Flights Within K Stops', difficulty: 'Medium', url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', companies: ['Amazon', 'Facebook', 'Google', 'Airbnb'], tags: ['DFS', 'BFS', 'Graph', 'Heap', 'Shortest Path', 'DP'], acceptance: 36.0, practicalUse: 'Flight booking, constrained routing' },
    { id: 'lc-332', number: 332, title: 'Reconstruct Itinerary', difficulty: 'Hard', url: 'https://leetcode.com/problems/reconstruct-itinerary/', companies: ['Google', 'Facebook', 'Amazon', 'Uber'], tags: ['DFS', 'Graph', 'Eulerian Circuit'], acceptance: 41.5, practicalUse: 'Travel planning, Eulerian path problems' },
    { id: 'lc-1584', number: 1584, title: 'Min Cost to Connect All Points (MST)', difficulty: 'Medium', url: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', companies: ['Amazon', 'Google'], tags: ['Array', 'Union Find', 'Graph', 'MST'], acceptance: 65.0, practicalUse: 'Network design, infrastructure planning' },
    { id: 'lc-127', number: 127, title: 'Word Ladder', difficulty: 'Hard', url: 'https://leetcode.com/problems/word-ladder/', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'LinkedIn'], tags: ['Hash Table', 'String', 'BFS'], acceptance: 37.0, practicalUse: 'Spell correction, word transformation' },
  ],
};

// Extended DSA Patterns - Complete SDE Sheet
export const EXTENDED_DSA_PATTERNS: Pattern[] = [
  // Foundation
  { 
    id: 'p-arr', 
    gate: IntentGate.DSA, 
    title: 'Arrays & Strings', 
    description: 'Foundation of DSA - Understanding array manipulation, in-place operations, and string processing.', 
    difficulty: 'Easy', 
    coreLogic: 'Master indexing, iteration, and basic transformations. Understand time-space trade-offs.', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-arr'],
    xpReward: 80, 
    estimatedTime: '25 min' 
  },
  // Two Pointers
  { 
    id: 'p-2p', 
    gate: IntentGate.DSA, 
    title: 'Two Pointers', 
    description: 'Converging or trailing pointers to optimize search space and reduce complexity.', 
    difficulty: 'Easy', 
    coreLogic: 'Initialize start/end pointers. Move pointers based on comparison to target value. Common patterns: opposite ends, same direction, fast-slow.', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-2p'],
    prerequisites: ['p-arr'], 
    xpReward: 100, 
    estimatedTime: '30 min' 
  },
  // Sliding Window
  { 
    id: 'p-sw', 
    gate: IntentGate.DSA, 
    title: 'Sliding Window', 
    description: 'Dynamic sub-array tracking for continuous data segments and optimization problems.', 
    difficulty: 'Medium', 
    coreLogic: 'Expand right boundary, shrink left boundary when constraints are violated. Track window state efficiently.', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-sw'],
    prerequisites: ['p-2p'], 
    xpReward: 150, 
    estimatedTime: '45 min' 
  },
  // Hashing
  { 
    id: 'p-fc', 
    gate: IntentGate.DSA, 
    title: 'Hashing & Frequency Maps', 
    description: 'Using hash tables to achieve O(1) lookups and eliminate nested loops.', 
    difficulty: 'Easy', 
    coreLogic: 'Map elements to occurrence counts. Compare states between maps. Use prefix sums with hash maps.', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-fc'],
    prerequisites: ['p-arr'], 
    xpReward: 120, 
    estimatedTime: '35 min' 
  },
  // Binary Search
  { 
    id: 'p-bs', 
    gate: IntentGate.DSA, 
    title: 'Binary Search', 
    description: 'Divide and conquer for logarithmic time complexity on sorted or monotonic data.', 
    difficulty: 'Medium', 
    coreLogic: 'Find the mid point, decide which half to search. Applicable to answer-space searching and optimization.', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-bs'],
    prerequisites: ['p-2p'], 
    xpReward: 140, 
    estimatedTime: '40 min' 
  },
  // State Tracking
  { 
    id: 'p-st', 
    gate: IntentGate.DSA, 
    title: 'State Tracking & Kadane\'s', 
    description: 'Maintaining state across traversal for optimal subarray problems.', 
    difficulty: 'Easy', 
    coreLogic: 'Track current state (max/min ending here) and global best. Update based on current element.', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-st'],
    prerequisites: ['p-fc'], 
    xpReward: 130, 
    estimatedTime: '40 min' 
  },
  // Greedy
  { 
    id: 'p-gr', 
    gate: IntentGate.DSA, 
    title: 'Greedy Algorithms', 
    description: 'Making locally optimal choices to achieve global optimum.', 
    difficulty: 'Medium', 
    coreLogic: 'Sort by constraint. Make the best immediate choice. Prove greedy choice property holds.', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-gr'],
    prerequisites: ['p-st'], 
    xpReward: 180, 
    estimatedTime: '50 min' 
  },
  // Linked Lists
  { 
    id: 'p-ll', 
    gate: IntentGate.DSA, 
    title: 'Linked Lists', 
    description: 'Sequential data structure with dynamic memory and O(1) insertions/deletions.', 
    difficulty: 'Medium', 
    coreLogic: 'Use dummy nodes, fast-slow pointers for cycle detection, reverse in-place, and merge techniques.', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-ll'],
    prerequisites: ['p-2p'], 
    xpReward: 160, 
    estimatedTime: '45 min' 
  },
  // Stack & Queue
  { 
    id: 'p-sq', 
    gate: IntentGate.DSA, 
    title: 'Stacks & Queues', 
    description: 'LIFO and FIFO structures for expression evaluation, parsing, and monotonic patterns.', 
    difficulty: 'Medium', 
    coreLogic: 'Use stack for matching brackets, monotonic stack for next greater/smaller, queue for BFS.', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-sq'],
    prerequisites: ['p-ll'], 
    xpReward: 170, 
    estimatedTime: '45 min' 
  },
  // Trees
  { 
    id: 'p-tr', 
    gate: IntentGate.DSA, 
    title: 'Binary Trees & BST', 
    description: 'Hierarchical data structure with DFS/BFS traversal and BST properties.', 
    difficulty: 'Medium', 
    coreLogic: 'Use recursion for DFS (preorder, inorder, postorder), queue for BFS. BST: left < root < right.', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-tr'],
    prerequisites: ['p-sq'], 
    xpReward: 200, 
    estimatedTime: '60 min' 
  },
  // Heaps
  { 
    id: 'p-hp', 
    gate: IntentGate.DSA, 
    title: 'Heaps & Priority Queues', 
    description: 'Efficient min/max extraction and top-K element problems.', 
    difficulty: 'Medium', 
    coreLogic: 'Use min-heap for K largest, max-heap for K smallest. Two heaps for median. O(log n) operations.', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-hp'],
    prerequisites: ['p-tr'], 
    xpReward: 190, 
    estimatedTime: '50 min' 
  },
  // Backtracking
  { 
    id: 'p-bt', 
    gate: IntentGate.DSA, 
    title: 'Recursion & Backtracking', 
    description: 'Exploring all possibilities through recursive enumeration with pruning.', 
    difficulty: 'Medium', 
    coreLogic: 'Build solution incrementally. At each step: choose, explore, unchoose. Prune invalid branches early.', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-bt'],
    prerequisites: ['p-tr'], 
    xpReward: 220, 
    estimatedTime: '60 min' 
  },
  // Dynamic Programming
  { 
    id: 'p-dp', 
    gate: IntentGate.DSA, 
    title: 'Dynamic Programming', 
    description: 'Optimal substructure and overlapping subproblems solved through memoization or tabulation.', 
    difficulty: 'Hard', 
    coreLogic: 'Define state, write recurrence relation, identify base cases. Top-down (memo) or bottom-up (tabulation).', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-dp'],
    prerequisites: ['p-bt'], 
    xpReward: 300, 
    estimatedTime: '90 min' 
  },
  // Graphs
  { 
    id: 'p-gp', 
    gate: IntentGate.DSA, 
    title: 'Graphs - BFS/DFS', 
    description: 'Network structures with vertices and edges. Traversal, connectivity, and pathfinding.', 
    difficulty: 'Hard', 
    coreLogic: 'Build adjacency list. DFS for connectivity/cycles, BFS for shortest path. Track visited nodes.', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-gp'],
    prerequisites: ['p-dp'], 
    xpReward: 280, 
    estimatedTime: '75 min' 
  },
  // Advanced Graphs
  { 
    id: 'p-agp', 
    gate: IntentGate.DSA, 
    title: 'Advanced Graphs', 
    description: 'Dijkstra, Bellman-Ford, Union-Find, Topological Sort, and MST algorithms.', 
    difficulty: 'Hard', 
    coreLogic: 'Weighted shortest path with Dijkstra/heap. Union-Find for connectivity. Topological sort for DAG ordering.', 
    leetcodeProblems: EXTENDED_LEETCODE_PROBLEMS['p-agp'],
    prerequisites: ['p-gp'], 
    xpReward: 350, 
    estimatedTime: '90 min' 
  },
];

// Extended Aptitude Patterns
export const EXTENDED_APTITUDE_MODELS: Pattern[] = [
  { 
    id: 'm-nm', 
    gate: IntentGate.APTITUDE, 
    title: 'Number Systems', 
    description: 'Understanding divisibility, factors, HCF, LCM, and prime numbers.', 
    difficulty: 'Easy', 
    coreLogic: 'Apply divisibility rules. HCF = product of common prime factors. LCM = product of highest powers.', 
    xpReward: 70, 
    estimatedTime: '20 min' 
  },
  { 
    id: 'm-pc', 
    gate: IntentGate.APTITUDE, 
    title: 'Percentages & Changes', 
    description: 'Calculating percentage increase/decrease and successive changes.', 
    difficulty: 'Easy', 
    coreLogic: 'Change% = (Difference/Original) × 100. Successive: Use multiplication factors (1 + x%)(1 - y%).', 
    prerequisites: ['m-nm'], 
    xpReward: 80, 
    estimatedTime: '20 min' 
  },
  { 
    id: 'm-wr', 
    gate: IntentGate.APTITUDE, 
    title: 'Work-Rate Reasoning', 
    description: 'Logic for combining individual capacities and work efficiency.', 
    difficulty: 'Easy', 
    coreLogic: 'Calculate individual rates (1/Time). Sum rates to find total capacity. Work = Rate × Time.', 
    prerequisites: ['m-pc'], 
    xpReward: 90, 
    estimatedTime: '25 min' 
  },
  { 
    id: 'm-rc', 
    gate: IntentGate.APTITUDE, 
    title: 'Ratio & Proportion', 
    description: 'Evaluating relationships and proportional reasoning.', 
    difficulty: 'Medium', 
    coreLogic: 'Use cross-multiplication. a:b = c:d means ad = bc. Scale ratios to common base.', 
    prerequisites: ['m-pc'], 
    xpReward: 100, 
    estimatedTime: '25 min' 
  },
  { 
    id: 'm-sp', 
    gate: IntentGate.APTITUDE, 
    title: 'Speed, Time & Distance', 
    description: 'Relative motion, average speed, and meeting point problems.', 
    difficulty: 'Medium', 
    coreLogic: 'D = S × T. Relative speed: Same direction (subtract), Opposite (add). Average speed ≠ average of speeds.', 
    prerequisites: ['m-wr'], 
    xpReward: 110, 
    estimatedTime: '30 min' 
  },
  { 
    id: 'm-pf', 
    gate: IntentGate.APTITUDE, 
    title: 'Profit & Loss', 
    description: 'Business mathematics including markup, discount, and cost price calculations.', 
    difficulty: 'Medium', 
    coreLogic: 'Profit = SP - CP. Profit% = (Profit/CP) × 100. MP × (1 - Discount%) = SP.', 
    prerequisites: ['m-pc'], 
    xpReward: 100, 
    estimatedTime: '25 min' 
  },
  { 
    id: 'm-si', 
    gate: IntentGate.APTITUDE, 
    title: 'Simple & Compound Interest', 
    description: 'Financial mathematics for investment and loan calculations.', 
    difficulty: 'Medium', 
    coreLogic: 'SI = PRT/100. CI = P(1 + R/100)^T - P. Use successive percentage for CI.', 
    prerequisites: ['m-pc'], 
    xpReward: 110, 
    estimatedTime: '30 min' 
  },
  { 
    id: 'm-eb', 
    gate: IntentGate.APTITUDE, 
    title: 'Estimation & Bounds', 
    description: 'Using extreme values and approximation to eliminate options.', 
    difficulty: 'Easy', 
    coreLogic: 'Determine min/max possible values. Use rounding strategically. Eliminate clearly wrong options.', 
    prerequisites: ['m-nm'], 
    xpReward: 80, 
    estimatedTime: '20 min' 
  },
  { 
    id: 'm-pm', 
    gate: IntentGate.APTITUDE, 
    title: 'Permutations & Combinations', 
    description: 'Counting principles and arrangement/selection problems.', 
    difficulty: 'Hard', 
    coreLogic: 'P(n,r) = n!/(n-r)! for arrangements. C(n,r) = n!/[r!(n-r)!] for selections. Use multiplication principle.', 
    prerequisites: ['m-rc'], 
    xpReward: 150, 
    estimatedTime: '40 min' 
  },
  { 
    id: 'm-pb', 
    gate: IntentGate.APTITUDE, 
    title: 'Probability', 
    description: 'Calculating likelihood of events and conditional probability.', 
    difficulty: 'Hard', 
    coreLogic: 'P(A) = Favorable/Total. P(A∪B) = P(A) + P(B) - P(A∩B). Independent: P(A∩B) = P(A)×P(B).', 
    prerequisites: ['m-pm'], 
    xpReward: 160, 
    estimatedTime: '45 min' 
  },
  { 
    id: 'm-di', 
    gate: IntentGate.APTITUDE, 
    title: 'Data Interpretation', 
    description: 'Reading and analyzing charts, graphs, and tabular data.', 
    difficulty: 'Medium', 
    coreLogic: 'Calculate averages, percentages from data. Compare trends. Watch for scale and base differences.', 
    prerequisites: ['m-pc'], 
    xpReward: 120, 
    estimatedTime: '35 min' 
  },
  { 
    id: 'm-lr', 
    gate: IntentGate.APTITUDE, 
    title: 'Logical Reasoning', 
    description: 'Puzzles, seating arrangements, blood relations, and syllogisms.', 
    difficulty: 'Medium', 
    coreLogic: 'Draw diagrams, use elimination. For syllogisms use Venn diagrams. Track constraints carefully.', 
    prerequisites: ['m-eb'], 
    xpReward: 130, 
    estimatedTime: '35 min' 
  },
];

// Extended Coding Concepts
export const EXTENDED_CODE_CONCEPTS: Pattern[] = [
  { 
    id: 'c-st', 
    gate: IntentGate.CODING, 
    title: 'Variables & Data Types', 
    description: 'Understanding primitive types, type conversion, and memory representation.', 
    difficulty: 'Easy', 
    coreLogic: 'Choose appropriate types. Understand overflow/underflow. Use meaningful names.', 
    xpReward: 50, 
    estimatedTime: '15 min' 
  },
  { 
    id: 'c-op', 
    gate: IntentGate.CODING, 
    title: 'Operators & Expressions', 
    description: 'Arithmetic, logical, bitwise operators and operator precedence.', 
    difficulty: 'Easy', 
    coreLogic: 'Know precedence order. Use bitwise for optimization. Short-circuit evaluation in logical ops.', 
    prerequisites: ['c-st'], 
    xpReward: 60, 
    estimatedTime: '15 min' 
  },
  { 
    id: 'c-cl', 
    gate: IntentGate.CODING, 
    title: 'Conditional Logic', 
    description: 'If-else, switch-case, and ternary operators for decision making.', 
    difficulty: 'Easy', 
    coreLogic: 'Test logical conditions to select execution paths. Use switch for multiple discrete values.', 
    prerequisites: ['c-op'], 
    xpReward: 70, 
    estimatedTime: '20 min' 
  },
  { 
    id: 'c-it', 
    gate: IntentGate.CODING, 
    title: 'Loops & Iteration', 
    description: 'For, while, do-while loops and iteration control (break/continue).', 
    difficulty: 'Medium', 
    coreLogic: 'Define bounds clearly. Avoid infinite loops. Use break/continue judiciously.', 
    prerequisites: ['c-cl'], 
    xpReward: 80, 
    estimatedTime: '25 min' 
  },
  { 
    id: 'c-fn', 
    gate: IntentGate.CODING, 
    title: 'Functions & Modularity', 
    description: 'Creating reusable code blocks with parameters and return values.', 
    difficulty: 'Medium', 
    coreLogic: 'Single responsibility. Clear inputs/outputs. Minimize side effects. Use recursion appropriately.', 
    prerequisites: ['c-it'], 
    xpReward: 100, 
    estimatedTime: '30 min' 
  },
  { 
    id: 'c-ar', 
    gate: IntentGate.CODING, 
    title: 'Arrays & Collections', 
    description: 'Working with arrays, lists, sets, and maps in code.', 
    difficulty: 'Medium', 
    coreLogic: 'Choose right data structure. Arrays for indexed access, sets for uniqueness, maps for key-value.', 
    prerequisites: ['c-fn'], 
    xpReward: 110, 
    estimatedTime: '35 min' 
  },
  { 
    id: 'c-oo', 
    gate: IntentGate.CODING, 
    title: 'Object-Oriented Design', 
    description: 'Classes, objects, inheritance, polymorphism, and encapsulation.', 
    difficulty: 'Hard', 
    coreLogic: 'Encapsulate data. Use inheritance for IS-A, composition for HAS-A. Program to interfaces.', 
    prerequisites: ['c-ar'], 
    xpReward: 150, 
    estimatedTime: '45 min' 
  },
  { 
    id: 'c-ex', 
    gate: IntentGate.CODING, 
    title: 'Exception Handling', 
    description: 'Handling errors gracefully with try-catch-finally blocks.', 
    difficulty: 'Medium', 
    coreLogic: 'Catch specific exceptions. Never swallow exceptions silently. Use finally for cleanup.', 
    prerequisites: ['c-fn'], 
    xpReward: 90, 
    estimatedTime: '25 min' 
  },
];

// Extended Communication Frameworks
export const EXTENDED_COMM_FRAMEWORKS: Pattern[] = [
  { 
    id: 'f-intro', 
    gate: IntentGate.COMMUNICATION, 
    title: 'Self Introduction', 
    description: 'Crafting a compelling 2-minute professional introduction.', 
    difficulty: 'Easy', 
    coreLogic: 'Present → Past → Future. Hook with current role, highlight key achievements, connect to opportunity.', 
    xpReward: 60, 
    estimatedTime: '15 min' 
  },
  { 
    id: 'f-star', 
    gate: IntentGate.COMMUNICATION, 
    title: 'STAR Method', 
    description: 'Structured behavioral answer: Situation, Task, Action, Result.', 
    difficulty: 'Easy', 
    coreLogic: 'Set context (20%), define responsibility (20%), detail your actions (40%), quantify outcomes (20%).', 
    prerequisites: ['f-intro'], 
    xpReward: 80, 
    estimatedTime: '20 min' 
  },
  { 
    id: 'f-proj', 
    gate: IntentGate.COMMUNICATION, 
    title: 'Project Deep Dive', 
    description: 'Explaining technical projects with architecture and impact.', 
    difficulty: 'Medium', 
    coreLogic: 'Problem → Solution → Architecture → Challenges → Learnings → Impact. Use diagrams mentally.', 
    prerequisites: ['f-star'], 
    xpReward: 100, 
    estimatedTime: '25 min' 
  },
  { 
    id: 'f-td', 
    gate: IntentGate.COMMUNICATION, 
    title: 'Technical Trade-offs', 
    description: 'Articulating why you chose one approach over another.', 
    difficulty: 'Medium', 
    coreLogic: 'State options → Compare on criteria (performance, maintainability, cost) → Justify selection → Acknowledge limitations.', 
    prerequisites: ['f-proj'], 
    xpReward: 110, 
    estimatedTime: '25 min' 
  },
  { 
    id: 'f-ec', 
    gate: IntentGate.COMMUNICATION, 
    title: 'Concept Explanation', 
    description: 'Teaching technical topics to non-technical audience.', 
    difficulty: 'Medium', 
    coreLogic: 'Real-world analogy → Simple definition → Concrete example → Why it matters.', 
    prerequisites: ['f-star'], 
    xpReward: 100, 
    estimatedTime: '20 min' 
  },
  { 
    id: 'f-wh', 
    gate: IntentGate.COMMUNICATION, 
    title: 'Why This Company?', 
    description: 'Articulating genuine interest and cultural fit.', 
    difficulty: 'Easy', 
    coreLogic: 'Research products → Find personal connection → Align with career goals → Show enthusiasm authentically.', 
    prerequisites: ['f-intro'], 
    xpReward: 70, 
    estimatedTime: '15 min' 
  },
  { 
    id: 'f-fl', 
    gate: IntentGate.COMMUNICATION, 
    title: 'Handling Failures', 
    description: 'Discussing mistakes and failures constructively.', 
    difficulty: 'Medium', 
    coreLogic: 'Own the failure → Explain context briefly → Focus on learning → Show changed behavior.', 
    prerequisites: ['f-star'], 
    xpReward: 90, 
    estimatedTime: '20 min' 
  },
  { 
    id: 'f-ng', 
    gate: IntentGate.COMMUNICATION, 
    title: 'Salary Negotiation', 
    description: 'Professional negotiation techniques for compensation.', 
    difficulty: 'Hard', 
    coreLogic: 'Research market rates → Delay first number → Focus on total comp → Use competing offers wisely → Be ready to walk.', 
    prerequisites: ['f-td'], 
    xpReward: 130, 
    estimatedTime: '30 min' 
  },
];
