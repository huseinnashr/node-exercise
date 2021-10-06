import { groupByAnagram } from "./group_by_anagram";

const words = ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua']
console.log("Input", JSON.stringify(words));

const anagramGroup = groupByAnagram(words);
console.log("Output", anagramGroup);