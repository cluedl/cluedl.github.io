<script setup>
import { computed, onMounted } from 'vue'
import DateSwitcher from "@/components/DateSwitcher.vue";
import githubService from "@/services/githubService.js";
import gameStore from "@/stores/gameStore";
import Icons8Close from '@/components/icons/Icons8Close.vue'

const exclude = async () => {
    // find this word from hints.js
    if (!confirm("Are you sure?")) return;
    delete gameStore.state.hints[gameStore.state.answer];
    await githubService.uploadFile(
        "hints.json",
        JSON.stringify(gameStore.state.hints)
    );
};

const renderExclude = computed(() => {
    const today = new Date()
    today.setHours(0,0,0,0)

    const gameDate = new Date(gameStore.state.date.valueOf())
    gameDate.setHours(0,0,0,0)

    return gameDate > today
})
</script>

<template>
    <div class="container">
        <div class="inner mt" style="--mt: 40px">
            <div class="mb" style="--mb: 40px">
                <DateSwitcher class="ta-c" />
            </div>

            <div class="answer">
                <span>{{gameStore.state.answer}}</span>
                <Icons8Close @click.prevent="exclude" v-show="renderExclude" />
            </div>

            <div class="snapshot d-grid gap" style="--gap: 25px">
                <div>
                    <span>Hint</span>
                    <span>{{ gameStore.state.hint }}</span>
                    <a href="#">Edit</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    font-size: 18px;
}
.container {
    width: 330px;
    margin: 0 auto;
}
.snapshot > div {
    display: grid;
    grid-template-columns: 60px 100px 60px;
}
.snapshot > div span:first-child {
    font-weight: bold;
}
.answer { text-align: center; color: white; display:flex; gap: 10px; justify-content: center; }
.answer span { font-size: 48px; }
.answer svg { width: 40px; height: 40px; cursor: pointer; }
</style>
