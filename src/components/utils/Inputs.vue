<script setup>
    const props = defineProps(["titleInput", "idInput", "typeInput", "Deisabled"]);
</script>

<template>
    <b-form-input
        class="input"
        :placeholder="titleInput"
        :id="idInput"
        :type="typeInput"
    />
</template>

<style scoped>
.input {
    width: 100%;
    height: 56px;
    background-color: #121214;
    color: white;
    border: 1px solid #323238;
    border-radius: 8px;
    padding: 8px 12px;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.input:focus {
    background-color: #121214;
    color: white;
    outline: none;
    border-color: #00875F;
    box-shadow: 0 0 0 2px #00875F;
}

.input::placeholder {
    color: #a8a8b3;
}
input:disabled,
input[disabled]{
    border: 1px solid #323238;
    background-color: #121214;
    color: #ffffff;
}
</style>
