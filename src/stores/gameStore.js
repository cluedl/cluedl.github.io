import { reactive } from "vue"
import hints from '@/assets/hints.json'
import '@/helpers/date'

import wordService from '@/services/wordService.js'
const ws = new wordService()

const launchDate = new Date(`03/29/2022`)
const lsKeyPrefix = `v2_`

const origGrid = [ 
    [{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``}],
    [{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``}],
    [{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``}],
    [{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``}],
    [{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``}],
    [{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``}],
]

const origAllLetters = {
    top: [...'qwertyuiop'].map(ltr => ({ ltr,s:`` })),
    mid: [...'asdfghjkl'].map(ltr => ({ ltr,s:`` })),
    low: [...'zxcvbnm'].map(ltr => ({ ltr,s:`` }))
}

const gameStore = {
    load() {
        var date = this.state.date
        date.setHours(0,0,0,0) // to midnight
        const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
        const diffDays = Math.round(Math.abs((launchDate - date) / oneDay))
        this.state.answer = Object.keys(hints)[diffDays]
        this.state.hint = hints[this.state.answer]
        this.resetGrid()
        this.resetKeyboard()
        this.restoreSavedState()
        this.clearOldSavedStates()
        this.refreshLetterStates()
    },
    state: reactive({
        dateLabel: `Today`,
        date: new Date(),
        dateIsoShort: (new Date()).toIsoShort(),
        answer: ``,
        hint: ``,
        currentRowIdx: 0,
        currentColIdx: 0,
        grid: origGrid,
        allLetters: origAllLetters,        
        invalidWordRowIdx: -1,
        shareable: false,
        shareText: ``
    }),
    refreshLetterStates() {
        Object.keys(this.state.allLetters).forEach(k => {
            this.state.allLetters[k].forEach(obj => {
                obj.s = this.getKeyState(obj.ltr)
            })
        })
    },  
    getShareText() {
        // nope (n), wrong (w), correct (c)
        const cellChars = {
            n: '⬜',
            w: '🟨',
            c: '🟩'
        }
    },
    restoreSavedState() {
        const today = (new Date()).toIsoShort()
        const currentDate = this.state.dateIsoShort
        if (today == currentDate) {
            const currRowIdxLsKey = `${lsKeyPrefix}${today}_currRowIdx`
            const gridLsKey = `${lsKeyPrefix}${today}_grid`
            const allLettersLsKey = `${lsKeyPrefix}${today}_allLetters`
            const grid = localStorage.getItem(gridLsKey) && JSON.parse(localStorage.getItem(gridLsKey))
            const allLetters = localStorage.getItem(allLettersLsKey) && JSON.parse(localStorage.getItem(allLettersLsKey))
            const currRowIdx = localStorage.getItem(currRowIdxLsKey) && parseInt(localStorage.getItem(currRowIdxLsKey))
            if (!grid || !allLetters) return // no saved state yet (user hasn't submitted a row for today)
            this.state.grid = grid
            this.state.allLetters = allLetters
            this.state.currentRowIdx = currRowIdx
        } else {
            this.state.grid = origGrid
            this.state.allLetters = origAllLetters
            this.state.currRowIdx = 0
        }
    },
    clearOldSavedStates() {
        const today = (new Date()).toIsoShort()
        for(const key in localStorage) {
            if (key.startsWith(lsKeyPrefix)) {
                if (today !== key.split('_')[1]) {
                    localStorage.removeItem(key)
                }
            }
        }
    },
    resetKeyboard() {
        Object.keys(this.state.allLetters).forEach(k => {
            this.state.allLetters[k].forEach(obj => {
                obj.s = ``
            })
        })
    },
    resetGrid() {
        this.state.grid.forEach(row => row.forEach(cell => {
            cell.ltr = ``
            cell.s = ``
        }))
        this.state.currentColIdx = 0
        this.state.currentRowIdx = 0
    },
    constants: {
        numRows: 6,
        numCols: 5
    },    
    currentRowHasSpace() {
        return this.state.currentColIdx < this.constants.numCols
    },
    getKeyState(ltr) {
        if (!ltr) return ``
        const states = ['c','w','n'] // nope, wrong, correct
        for(var i = 0; i < states.length; i++) {
            const s = states[i]
            const exists = this.state.grid.some(arr => arr.some(cell => cell.ltr == ltr && cell.s == s))
            if (exists) return s
        }
        return ``
    },
    backspace() {
        if (this.state.currentColIdx == 0) return // prevent backspace if row is empty
        this.state.currentColIdx -= 1
        let rowIdx = this.state.currentRowIdx
        this.state.grid[rowIdx][this.state.currentColIdx].ltr = ``
    },
    submitRow() {
        const letters = this.state.grid[this.state.currentRowIdx].map(x => x.ltr)
        const word = letters.join('')
        try {
            const res = ws.submit(word,this.state.answer) // success
            this.state.grid[this.state.currentRowIdx].map(c => c.s = `c`)
            this.state.shareable = true
            const numTries = this.state.currentRowIdx + 1
            this.state.shareText = `Took me ${numTries} tr${numTries == 1 ? 'y' : 'ies'}!`
            return `Success`
        } catch (err) {
            if (err.msg) {
                // invalid word
                this.state.invalidWordRowIdx = this.state.currentRowIdx
                setTimeout(() => this.state.invalidWordRowIdx = -1, 1500)
                return `That is not a word`
            }
            else if (err.newRow) {
                // not a match, but the word is a valid word
                this.state.grid[this.state.currentRowIdx] = err.newRow
                this.state.currentRowIdx += 1
                this.state.currentColIdx = 0
                this.refreshLetterStates()

                // row updated. save this state to localStorage IF date is `Today`
                const today = (new Date()).toIsoShort()
                const currentDate = this.state.dateIsoShort
                
                if (today == currentDate) {
                    localStorage.setItem(`${lsKeyPrefix}${today}_currRowIdx`,this.state.currentRowIdx)
                    localStorage.setItem(`${lsKeyPrefix}${today}_grid`,JSON.stringify(this.state.grid))
                    localStorage.setItem(`${lsKeyPrefix}${today}_allLetters`,JSON.stringify(this.state.allLetters))
                }

                return `Next`
            }
        }
    },
    addLetter(ltr) {
        let rowIdx = this.state.currentRowIdx
        let colIdx = this.state.currentColIdx
        this.state.grid[rowIdx][colIdx].ltr = ltr
        this.state.currentColIdx += 1
    }
}

export default gameStore