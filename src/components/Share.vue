<script setup>
    import gameStore from '@/stores/gameStore'

/*
Wordle 311 2/6
⬜⬜🟨🟨⬜
🟩🟩🟩🟩🟩
*/

    const share = async () => {
        const shareData = {
            title: 'Cluedl',
            text: gameStore.state.shareText, // 🟩
            url: 'https://cluedl.com'
        }        
        try {
            await navigator.share(shareData)
        }catch(err) {
            alert("Oops, error: " + err)
        }
    }
</script>

<template>
    <div v-if="gameStore.state.shareable">
        <a href="#" @click.prevent="$event.target.blur();share()">Share</a>
    </div>
    <div v-if="!gameStore.state.shareable"></div><!-- placeholder -->
</template>

<style scoped>
</style>
