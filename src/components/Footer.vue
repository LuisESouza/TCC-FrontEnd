<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <footer>
    <nav class="nav">
      <li class="nav-item">
        <RouterLink class="nav-link" active-class="active-btn" to="/home">
          <i class="fas fa-home"></i>
          <span>Home</span>
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink class="nav-link" active-class="active-btn" to="/training">
          <i class="fas fa-dumbbell"></i>
          <span>Treino</span>
        </RouterLink>         
      </li>

      <li class="nav-item">
        <RouterLink class="nav-link" active-class="active-btn" to="/diet">
          <i class="fas fa-utensils"></i>
          <span>Dieta</span>
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink class="nav-link" active-class="active-btn" to="/profile" >
          <i class="fas fa-user"></i>
          <span>Perfil</span>
        </RouterLink>
      </li>
    </nav>
  </footer>
</template>

<style scoped>
footer {
  background-color: #202024;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  z-index: 1000;
}

.nav {
  list-style: none;
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0;
  margin: 0;
}

.nav-item {
  text-align: center;
  flex-grow: 1;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
}

.nav-link i {
  font-size: 20px;
  margin-bottom: 5px;
}

.active-btn {
  color: #00875F;
  transform: scale(1.1);
}
</style>
