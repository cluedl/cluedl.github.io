<script setup>
// next: restore state for keyboard! colors are not persisting on keys ATM when toggling dates.

import 'animate.css'
import Keyboard from './components/Keyboard.vue'
import Grid from './components/Grid.vue'
import DateSwitcher from './components/DateSwitcher.vue'
import Hint from './components/Hint.vue'
import gameStore from '@/stores/gameStore'
import { ref } from 'vue'

gameStore.load()

const keyboard = ref(null)
</script>

<template>
    <div class="main">
        <div class="mt-50 mt-20_m">
            <Grid />
        </div>
        <div class="controls mt-25">
            <div></div>
            <!-- <div></div> -->
            <DateSwitcher class="ta-c" />
            <Hint />
        </div>
        <!-- <Keyboard @enter-key="keyEntered" msg="You did it!" /> -->
        <div class="mt-25 mt-20_m">
            <Keyboard ref="keyboard" />
        </div>
    </div>
</template>

<style>
@import './assets/base.css';

#app {
}

.controls { font-size: 18px; display:grid; grid-template-columns: 1fr 1fr 1fr; }

.main { width: 500px; margin: 0 auto; }

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

/* TABLET AND BELOW */
@media screen and (max-width: 499px) {
    .main { width: 100%; }
    .controls { margin: 20px 20px 30px 20px; }
}
</style>
