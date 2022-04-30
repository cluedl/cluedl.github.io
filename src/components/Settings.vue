<script setup>
import { ref, onMounted } from 'vue'
import gameStore from '@/stores/gameStore'

const sharedGameState = gameStore.state

let modal = null

onMounted(() => {
    modal = document.getElementById("modal")
})

const displayModal = () => {
    modal.showModal()
}

const closeModal = () => {
    modal.close()
}
</script>

<template>
    <img class="settings" @click.prevent="displayModal" src="/icons8-settings.svg" width="44" height="44" />
    <dialog class="modal" id="modal">
        <div class="actions">
            <button class="close-modal-btn" @click.prevent="closeModal">Close</button>
        </div>
    </dialog>
</template>

<style scoped>
    .settings { position: fixed; top: 8px; right: 8px; cursor: pointer; }

dialog {
  background-color: #222831;
  color: #F9FFEE;
  text-align: center;
  border: none;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 40px rgba(0,0,0,0.1), 0 0 10px rgba(0,0,0,0.25);
}

dialog[open] {
  animation: appear .15s cubic-bezier(0, 1.8, 1, 1.8);
}

dialog::backdrop {
  background: linear-gradient(45deg, rgba(0,143,104,.5), rgba(250,224,66,.5));
}

@keyframes appear {
  from {
    opacity: 0;
    transform: translateX(-3rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

    /* TABLET AND BELOW */
    @media screen and (max-width: 499px) {
        .settings { width:24px; height:24px; }
    }
</style>
