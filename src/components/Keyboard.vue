<script setup>
import gameStore from '@/stores/gameStore'
import { inject } from "vue"
//import ConfettiGenerator from "confetti-js"
import confetti from 'https://cdn.skypack.dev/canvas-confetti'

const toast = inject("toast")

const enterKey = (key) => {
    if (key == 'Enter') {
        if (gameStore.currentRowHasSpace()) return 

        const res = gameStore.submitRow()
        if (res == 'Success')
        { 
            toast.success(res, { position: "bottom", pauseOnHover: false })
            confetti()
            // const confettiSettings = { target: 'confetti' }
            // window.confetti = new ConfettiGenerator(confettiSettings)
            // window.confetti.render()
        } else if (res == 'Next') {} // nothing to toast
        else {
            toast.show(res, { position: "bottom", pauseOnHover: false })
        }
        return
    }
    if (key == 'Backspace') {
        gameStore.backspace()
        return
    }
    //if (key === 'enter' || key === 'back-space') return // handle this later
    if (gameStore.currentRowHasSpace()) {
        gameStore.addLetter(key)
    }
    // emits('enter-key', key)
}

const reset = () => {
    console.log('reset from keyboard')
}

document.onkeydown = function(e) {
    if (e.key === 'Enter' || e.key === 'Backspace') {
        enterKey(e.key)
        return
    }

    // not a regular letter, so do nothing
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split(``)
    if (!alphabet.includes(e.key))
        return

    // normal letter
    enterKey(e.key)
}
</script>

<template>
    <div class="rows">
        <div class="row">
            <button :data-s="obj.s" v-for="obj in gameStore.state.allLetters.top" @click.prevent="enterKey(obj.ltr)" :key="obj.ltr">{{obj.ltr}}</button>
        </div>
        <div class="row">
            <div class="f-pt-5"></div>
            <button :data-s="obj.s" v-for="obj in gameStore.state.allLetters.mid" @click.prevent="enterKey(obj.ltr)" :key="obj.ltr">{{obj.ltr}}</button>
            <div class="f-pt-5"></div>
        </div>
        <div class="low row">
            <button class="f-1-pt-5" @click.prevent="enterKey('Backspace')">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path fill="white" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
                </svg>                
            </button>            
            <button :data-s="obj.s" v-for="obj in gameStore.state.allLetters.low" @click.prevent="enterKey(obj.ltr)" :key="obj.ltr">{{obj.ltr}}</button>
            <button id="enterKey" class="enter f-1-pt-5" @click.prevent="enterKey('Enter')">enter</button>
        </div>    
    </div>    
</template>

<style scoped>
    /* helpers */
    .f-pt-5 { flex: 0.5; }
    .f-1-pt-5 { flex: 1.5; }

    .rows { display:grid; margin: 0 8px; gap: 8px; }
    .row { display: flex; }
    button { 
        padding: 5px; text-transform: uppercase; border-radius: 4px;
        height:58px; display:grid; place-items:center; font-weight: bold; 
        color: white; background: #818384; user-select: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0.3);
        border:0;
        /* flex */
        flex:1; margin-right: 6px;
    }
    button:last-of-type { margin: 0 }
    button[data-s="c"] { background: var(--correct-color); }
    button[data-s="w"] { background: var(--wrong-color); }
    button[data-s="n"] { background: var(--nope-color); }
    .enter { font-size: 13px;}
</style>
