<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const plano = ref('free');
</script>

<template>
  <div class="container">
    <header class="header d-flex">
      <div v-show="route.name !== 'Perfil'" class="plan-container"> 
          <p class="plan">{{ plano }}</p>
      </div>

      <div class="page-info">
        <h1>{{ route.name }}</h1>
      </div>
      <span></span>
      
      <div class="sign-out-container">
        <button class="btn-sign-out" v-if="route.name !== 'Perfil'">
          <i class="fas fa-sign-out-alt"></i>
          <span>Sair</span>
        </button>
      </div>
    </header>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #121214;
}

.container {
  padding-top: 60px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #202024;
  padding: 10px;
  border-radius: 0 0 8px 8px;
  color: #fff;
  display: flex;
  align-items: center;
  z-index: 1000;
  justify-content: space-between;
  height: 20px;
  padding: 25px;
}

.plan-container {
  border: 1px solid #00875F;
  padding-left: 10px;
  padding-right: 10px;
  height: 23px;
  position: absolute;
  left: 10%;
  transform: translateX(-50%);
  border-radius: 7px;
}

.plan {
  font-size: 15px;
  color: #00875F;
}

.page-info {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.page-info h1 {
  font-size: 18px;
  margin: 0;
  color: #fff;
  margin-top: 5px;
}

.sign-out-container {
  display: flex;
  align-items: center;
}

.btn-sign-out {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 5px;
  font-size: 12px;
  background-color: transparent;
  color: #00875F;
  border: 1px solid #00875F;
  border-radius: 7px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.btn-sign-out:hover {
  background-color: #00875F;
  color: white;
  border-color: #ffffff;
}
</style>
