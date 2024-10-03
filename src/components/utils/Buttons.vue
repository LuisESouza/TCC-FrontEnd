<script setup>
const props = defineProps(["titleButton", "idButton", "typeButton"]);
</script>

<template>
    <b-button class="button" :type="typeButton" :id="idButton">
        {{ titleButton }} 
    </b-button>
</template>

<style scoped>
.button {
    width: 100%;
    background-color: #00875F;
    height: 50px;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, transform 0.1s ease-in-out;
}

.button:hover {
    color: white;
    background-color: #025c41;
}

.button:active {
    color: white;
    background-color: #006e4e;
    transform: scale(0.98);
}

.button:focus {
    color: white;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 135, 95, 0.4);
}
</style>
