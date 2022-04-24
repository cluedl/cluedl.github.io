<script setup>
import { reactive } from "vue"
import gameStore from '@/stores/gameStore'

const hint = gameStore.state.hint

const state = reactive({
    hintHtml: ``
})

const closeModal = () => {
    state.hintHtml = ``
}

const revealHint = () => {
    // hint could be raw html to render
    if (gameStore.state.hint.includes("html:")) {
        state.hintHtml = gameStore.state.hint.substr(5)
        return
    }

    alert(gameStore.state.hint)
}
</script>

<template>
    <div class="backdrop" @click="closeModal" v-if="state.hintHtml"></div>
    <div class="modal" v-if="state.hintHtml">
        <div class="modalContents" v-html="state.hintHtml"></div>
    </div>
    <div class="ta-r">
        <a href="#" v-if="hint" @click.prevent="$event.target.blur();revealHint()">Hint</a>
    </div>
</template>

<style scoped>
    a { text-align: right; }
    
.modal { 
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background:white;
  padding: 10px;
  border: 1px solid black;
  z-index:1001;
  border-radius:5px;
}
.modalContents {
    width: 300px;
}
.backdrop { 
  /*opacity: var(--backdrop-opacity);*/
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index:1000;
  background:white;
}    
</style>
