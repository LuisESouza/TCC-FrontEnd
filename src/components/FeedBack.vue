<script setup>
import { ref } from 'vue';
const emit = defineEmits(['feed-back-emit']);
const rating = ref(1);
const hoverRating = ref(0);
const maxRating = 5;
const submitRating = () => {
    emit("feed-back-emit", rating);
}
</script>

<template>
<div class="container">
  <div class="rating-container p-3">
    <div class="container-stars">
        <span
        v-for="n in maxRating"
        :key="n"
        class="star"
        :class="{ filled: n <= (hoverRating || rating) }" 
        @click="rating = n" 
        @mouseover="hoverRating = n"
        @mouseleave="hoverRating = 0"
        >
            &#9733;
        </span>
    </div>
    <p>Avaliação: {{ rating }} estrelas</p>
    <button class="btn-enviar" @click="submitRating">Enviar</button>
  </div>
</div>
</template>

<style scoped>
.container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rating-container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #202024;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  border: 2px solid #00b37e;
  padding: 20px;
  z-index: 10000;
}



.btn-enviar {
    padding: 5px 30px;
    background-color: #00b37e;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-enviar:hover {
    background-color: #00875f;
}

.star {
  font-size: 2rem;
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
}

.star.filled {
  color: #00b37e;
}

p {
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 10px;
  color: #ffffff;
}
</style>