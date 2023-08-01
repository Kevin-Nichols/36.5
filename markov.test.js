const { MarkovMachine } = require("./markov");

describe('Test Markov Machine', function(){
    test('Create Chain', function(){
        let mm = new MarkovMachine("test kevin sam test KEVIN test SAM");

        expect(mm.chain).toEqual(new Map([
            ['test', ['kevin', 'KEVIN', 'SAM']],
            ['kevin', ['sam']],
            ['sam', ['test']],
            ['KEVIN', ['test']],
            ['SAM', [null]]
        ]));
    });

    test('Choose random from array', function(){
        expect(MarkovMachine.chooseRand([1, 1, 1])).toEqual(1);
        expect([4, 5, 6]).toContain(MarkovMachine.chooseRand([4, 5, 6]));
    });

    test('End at given length', function () {
        let bigrams = ["the cat", "cat in", "in the", "the hat", "hat "];
        let mm = new MarkovMachine("the cat in the hat");
        let res = mm.makeText(2);
    
        let resWords = res.split(/[ \r\n]+/);
        expect([1, 2]).toContain(resWords.length);
    });
});