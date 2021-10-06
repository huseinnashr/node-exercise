export const sortStringAsc = (str: string) => {
  const chars = str.split("");

  for(let i = 0; i < chars.length - 1; i++){
    for(let j = 0; j < chars.length - i - 1; j++){
      if(chars[j] > chars[j+1]){
        const temp = chars[j];
        chars[j] = chars[j+1];
        chars[j+1] = temp;
      }
    }
  }

  return chars.join("");
}