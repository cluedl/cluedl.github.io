<script setup>
import { computed, reactive } from 'vue'
import wordSvc from '@/services/wordService'
import gameStore from '@/stores/gameStore'
import '@/helpers/date'

const sharedGameState = gameStore.state

const state = reactive({
    daysOffset: 0,
    nextSuffix: `_gray`,
    prevSuffix: ``
})

const isNext = computed(() => {
    return true
})

const isPrev = computed(() => {
    return true
})

const go = (direction) => {
    if (direction == 1 && state.nextSuffix == `_gray`) return
    if (direction == -1 && state.prevSuffix == '_gray') return

    state.daysOffset += direction
    const today = new Date()
    var newDate = today.addDays(state.daysOffset)
    //if (state.daysOffset)
    if (state.daysOffset == 0) {
        state.nextSuffix = `_gray`
    } else {
        state.nextSuffix = ``
    }
    // to: enable/disable prev suffix

    if (state.daysOffset == 0) {
        sharedGameState.dateLabel = `Today`
        sharedGameState.date = today
        sharedGameState.dateIsoShort = today.toIsoShort()
    } else {
        sharedGameState.dateLabel = newDate.toLocaleString('en-US', { month:'numeric', day: 'numeric', year: 'numeric' })
        sharedGameState.date = newDate
        sharedGameState.dateIsoShort = newDate.toIsoShort()
    }
    try {
        //window.confetti.clear()
    } catch(err) {}
    gameStore.load()
}

const ws = new wordSvc()
</script>

<template>
    <div class="container">
        <img @click.prevent="go(-1)" :src="`/left-arrow${state.prevSuffix}.svg`" />
        <span class="date">{{sharedGameState.dateLabel}}</span>
        <img @click.prevent="go(1)" :src="`/right-arrow${state.nextSuffix}.svg`" />
    </div>
</template>

<style scoped>
    img { width: 30px; cursor: pointer; }
    a.disabled { color: #3a3a3c; }
    .container { display: flex; justify-content: center; align-items: center; }
    .date { width: 120px; }
    /*.separator:before { content: '|'; color: #3a3a3c; padding-left: 10px; padding-right: 10px; }*/
</style>
