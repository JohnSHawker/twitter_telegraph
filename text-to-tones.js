var morse = require('morse-node').create("ITU")

var ditLength = 100
var dahLength = 3 * ditLength
var wordLength = 7 * ditLength

function textToTones(text) {
    var coded = morse.encode(text)
    var words = coded.split(' / ')  ///  ['-.-', '-.-']

    // return words.reduce(function(acc, word) {
    //     console.log('word', word, words)
    //     return acc.concat(word.split().reduce(function(ac, char) {
    //         console.log('char', char, word.split())
    //         if (char == '.') return ac.concat([dit(), ditPause()])
    //         return ac.concat([dah(), ditPause()])
    //     }), []).concat([dahPause()])
    // }, []).concat([wordPause()])
    console.log('coded', coded)

    return words.reduce(function(acc, word) {
        return acc.concat(word.split('').reduce(function(a, ch) {
            if (ch == '-') return a.concat([dah(), ditPause()])
            if (ch == '.') return a.concat([dit(), ditPause()])
            if (ch == ' ') return a.concat([dahPause()])
            // console.log("a", "|"+a+"|", "ch", "|"+ch+"|")
            throw new Error ("unrecognized char " +ch)
        }, [])).concat([wordPause()])
    }, [])
}


// function morseTone(char) {

//     if (char == ' ') return [dit(), wordPause()]
// }

function dit() {
    return {
        playing: true,
        duration: ditLength
    }
}

function ditPause() {
    return {
        playing: false,
        duration: ditLength
    }
}

function dah() {
    return {
        playing: true,
        duration: dahLength
    }
}

function dahPause() {
    return {
        playing: false,
        duration: dahLength - ditLength  //because we place default dit pauses after things
    }
}

function wordPause() {
    return {
        playing: false,
        duration: wordLength - ditLength  //because we place default dit pauses after things
    }
}


module.exports = {
    textToTones:textToTones
}