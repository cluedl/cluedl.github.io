<script setup>
import DateSwitcher from '@/components/DateSwitcher.vue'
import gameStore from '@/stores/gameStore'
</script>

<template>
    <div class="container">
        <div class="inner mt" style="--mt:40px">
            <div class="mb" style="--mb:40px;">
                <DateSwitcher class="ta-c" />
            </div>

            <div class="snapshot d-grid gap" style="--gap:25px;">
                <div>
                    <span>Word</span>
                    <span>{{gameStore.state.answer}}</span>
                    <a href="#">Exclude</a>
                </div>
                <div>
                    <span>Hint</span>
                    <span>{{gameStore.state.hint}}</span>
                    <a href="#">Edit</a>
                </div>                
            </div>
        </div>
    </div>
</template>

<style scoped>
* { font-size: 18px; }
.container { width: 330px; margin: 0 auto; }
.snapshot >div { display: grid; grid-template-columns: 60px 100px 60px; }
.snapshot >div span:first-child { font-weight: bold; }

</style>
