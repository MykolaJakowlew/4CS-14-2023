const textSource = document.getElementById('text-source');
const text = textSource.innerText;

// console.log('text:', text);

// /**
//  * Step 1
//  * Split by sentences
//  */
// const sentences = text.split('.');
// // console.log('sentences:', sentences);

// /**
//  * Step 2
//  * Remove spaces
//  * " str1 str 4   ".trim() => "str1 str 4"
//  */
// const trimmedSentences = sentences
//   .map((sentence) => sentence.trim());

// // console.log('trimmedSentences:', trimmedSentences);

// /**
//  * Step 3
//  * remove empty sentences
//  */
// const filteredTrimmedSentences = trimmedSentences
//   .filter(sentence => sentence.length !== 0);

// console.log('filteredTrimmedSentences:', filteredTrimmedSentences);

const sentences = text
  /** Step 1 Split by sentences 
   *  "Occaecat anim laboris magna esse.".split('.') => [
   *  "Occaecat anim laboris magna esse",
   *  ""
   * ]
   */
  .split('.')
  /**
   * Step 2 Remove spaces
   * " str1 str 4   ".trim() => "str1 str 4"
   */
  .map((sentence) => sentence.trim())
  /** Step 3 remove empty sentences */
  .filter(sentence => sentence.length !== 0);

console.log('sentences:', sentences);

let wordCount = 0;
/**
 * Вхідним параметром отримує текст,
 * Резльтатом повертає текст в якому кожне друге слово загорнуте в span
 * 
 * wrapWord("str1 str2 str3 str4") => "str1 <span>str2</span> str3 <span>str4</span>"
 */
const wrapWord = (str) => {
  // words => ["str1", "str2", "str3", "str4"]
  const words = str.split(' ');

  // updatedWords => [
  //   "str1",
  //   "<span>str2</span>",
  //   "str3",
  //   "<span>str4</span>"
  // ]
  const updatedWords = words.map(word => {
    wordCount += 1;
    if (wordCount % 2 == 0) {
      return `<span>${word}</span>`;
    }
    return word;
  });

  // updatedWords.join(' ') => "str1 <span>str2</span> str3 <span>str4</span>"
  return updatedWords.join(' ');
};


const result = sentences
  .map(sentence => wrapWord(sentence));

console.log('result:', result);

textSource.innerHTML = result;

