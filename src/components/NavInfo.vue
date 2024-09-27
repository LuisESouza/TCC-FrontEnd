<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const plano = ref('free');
</script>

<template>
  <div class="container">
    <header class="header">
      <div v-show="route.name !== 'Perfil' && route.name !== 'Recuperar Senha'" class="plan-container"> 
          <p class="plan">{{ plano }}</p>
      </div>

      <div class="page-info">
        <h1>{{ route.name }}</h1>
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
  color: #23f8b8;
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
</style>