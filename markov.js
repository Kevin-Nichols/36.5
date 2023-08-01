/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = new Map();

    for (let i = 0; i<this.words.length; i+=1){
      let startWord = this.words[i];
      let nextWord = this.words[i+1] || null;

      if(chain.has(startWord)){
        chain.get(startWord).push(nextWord);
      } else {
        chain.set(startWord, [nextWord]);
      }
    }
    this.chain = chain;
  }

  static chooseRand(arg){
    return arg[Math.floor(Math.random() * arg.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.chain.keys());
    let key = MarkovMachine.chooseRand(keys);
    let res = [];

    while(key !== null && res.length < numWords){
      res.push(key);
      key = MarkovMachine.chooseRand(this.chain.get(key));
    }
    return res.join(' ');
  }
}

module.exports = {MarkovMachine};