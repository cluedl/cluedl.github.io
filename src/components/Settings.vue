<script setup>
import { ref, onMounted } from 'vue'

let modal = null

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const isAdmin = ref(false)

// emit('update:modelValue', value)

onMounted(() => {
    modal = document.getElementById("modal")
    isAdmin.value = props.modelValue == 'admin'
})

const displayModal = () => {
    alert('clicked')
    modal.showModal()
}

const onAdminChanged = () => {
    emit('update:modelValue', isAdmin.value ? 'admin' : 'site')
    modal.close()
}

const closeModal = (e) => {
    if(e.target.dataset.closeModalOnClick) {
        modal.close()
    }    
}
</script>

<template>
    <div @click.prevent="displayModal" class="settings">
        <img src="/icons8-settings.svg" width="38" height="38" />
    </div>
    <dialog class="modal" id="modal" @click="closeModal" data-close-modal-on-click="true">
        <div class="inner">
            <div class="adminContainer">
                <input type="checkbox" @change="onAdminChanged" id="admin" v-model="isAdmin" /><label for="admin">Admin mode</label>
            </div>
        </div>
    </dialog>
</template>

<style scoped>
.settings {
    position: fixed;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.adminContainer {
    display: flex; align-items: center; gap: 10px;
}
.adminContainer input { width: 20px; height: 20px; }

dialog {
    background-color: #222831;
    color: #f9ffee;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.25);
    padding:0;

    position: fixed;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
}

dialog[open] {
    animation: appear 0.15s cubic-bezier(0, 1.8, 1, 1.8);
}

dialog::backdrop {
    background: linear-gradient(
        45deg,
        rgba(0, 143, 104, 0.5),
        rgba(250, 224, 66, 0.5)
    );
}

dialog .inner {
    padding: 15px; width: 300px;
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
    .settings {
        padding: 10px;
        top: 0;
        right: 0;
    }
    .settings img {
        width: 24px;
        height: 24px;
        float: left;
    }
}
</style>
