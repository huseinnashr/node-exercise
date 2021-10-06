const findFirstStringInBracket = (str: string) => {
  if(str.length == 0){
    return '';
  }

  let indexFirstBracketFound = str.indexOf("(");
  if(indexFirstBracketFound == -1){
    return '';
  }

  let wordsAfterFirstBracket = str.substr(indexFirstBracketFound);
  if(!wordsAfterFirstBracket){
    return '';
  }

  wordsAfterFirstBracket = wordsAfterFirstBracket.substr(1);

  let indexClosingBracketFound = wordsAfterFirstBracket.indexOf(")");
  if(indexClosingBracketFound == -1){
    return '';
  }
  
  return wordsAfterFirstBracket.substring(0, indexClosingBracketFound);
}