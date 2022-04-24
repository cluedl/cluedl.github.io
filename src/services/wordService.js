import words from '@/assets/five-letter-words.json'

class WordService {
    constructor() {
    }
    submit(word, answer) {
        // deeds = https://i.imgur.com/8szRrgQ.png

        if (!words.includes(word))
            throw { msg: 'Not a real word' }

        if (answer === word) // solved!
            return true

        this.#processWrongWord(word, answer)
    }
    #processWrongWord(word, answer) {                           // word =    t,r,a,m,p
        let tempAns = answer
        let newRow = [null,null,null,null,null]
        // mark any as c (green)                 
        ;[...answer].forEach((ltr,idx) => {                     // forEach   w,a,t,e,r
            if (word[idx] == ltr) {                             // tempAns = w,a,t,e,r
                newRow[idx] = {ltr, s: `c`}                     // newRow = [?,?,?,{'e^c'},{'r^c'}]
                tempAns = 
                    this.#markCharAsAccountedFor(tempAns, idx)  // tempAns = w,a,t,_,_ 
            }
        })
        // fill in remaining empty slots in newRow
        newRow.forEach((obj,idx) => {
            if (obj) return // this slot is filled
            const wordLtr = [...word][idx]      // r
            if (tempAns.includes(wordLtr)) {    // w,a,t,_,_ contains r?
                newRow[idx] = {ltr:wordLtr,s:'w'} // wrong position
                const correctIdx = tempAns.indexOf(wordLtr)
                tempAns = 
                    this.#markCharAsAccountedFor(tempAns, correctIdx)
            } else {
                newRow[idx] = {ltr:wordLtr,s:'n'}
            }
        })
        throw { newRow }
    }
    #markCharAsAccountedFor(str, idx) {
        str = str.split('')
        str[idx] = `_`
        str = str.join('')
        return str
    }
}

export default WordService