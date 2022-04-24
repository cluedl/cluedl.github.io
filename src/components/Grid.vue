<script setup>
import gameStore from '@/stores/gameStore'

const sharedGameState = gameStore.state
</script>

<template>
    <div class="wrapper">
        <div v-for="i in gameStore.constants.numRows" :key="i" 
            class="row animate__animated" 
            :class="{'animate__headShake':sharedGameState.invalidWordRowIdx == i-1}">
            <div class="cell" v-for="j in gameStore.constants.numCols" :key="j" :data-s="sharedGameState.grid[i-1][j-1].s">
                {{sharedGameState.grid[i-1][j-1].ltr}}
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper { width: 330px; margin: 0 auto; display:grid; gap:5px; }
.row { display: inline-flex; gap: 5px; width:100%; }
.row > div { 
    border: 2px solid #3a3a3c; flex: 1; display:grid; 
    place-items: center; height: 60px; font-weight: bold;
    text-transform: uppercase; user-select: none; 
    font-size: 30px; color:white;
}
.cell[data-s="n"] { background: var(--nope-color); }
.cell[data-s="w"] { background: var(--wrong-color); }
.cell[data-s="c"] { background: var(--correct-color); }

/* TABLET AND BELOW */
@media screen and (max-width: 499px) {
    .wrapper { width: 280px; }
    .row > div { height: 50px; }
}
</style>
