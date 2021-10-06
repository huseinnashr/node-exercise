import { checkAreAnagram } from "./check_are_anagram";

export const groupByAnagram = (words: string[]) => {
  const anagramGroup: string[][] = [];

  for(const word of words){
    let matchGroupIndex = null;
    
    for(let i = 0; i < anagramGroup.length; i++){
      const areAnagram = checkAreAnagram(anagramGroup[i][0], word)
      if(areAnagram){
        matchGroupIndex = i;
        break;
      }
    }

    if(matchGroupIndex != null) {
      anagramGroup[matchGroupIndex].push(word); 
    } else {
      anagramGroup.push([word]);
    }
  }

  return anagramGroup;
}