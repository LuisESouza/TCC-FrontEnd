<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  exercicios: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update-selected']);

const toggleSelect = (exercicio) => {
  exercicio.selecionado = !exercicio.selecionado;
  emit('update-selected', exercicio);
};
</script>

<template>
  <div class="checkbox-group">
    <ul class="ks-cboxtags d-flex row">
      <li v-for="exercicio in exercicios" :key="exercicio.id">
        <input
          type="checkbox"
          :id="exercicio.id"
          :checked="exercicio.selecionado"
          @change="toggleSelect(exercicio)"
        />
        <label :for="exercicio.id">{{ exercicio.nome_exercicio }}</label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.checkbox-group {
  height: 280px;
  overflow-y: auto;
  overflow-x: hidden;
}

label {
  width: 100%;
}

ul.ks-cboxtags {
  padding: 0px;
}

ul.ks-cboxtags li label {
  display: inline-block;
  background-color: #1c1c1f;
  border: 1px solid #323238;
  color: #ffffff;
  border-radius: 10px;
  white-space: nowrap;
  user-select: none;
  transition: all 0.2s;
}

ul.ks-cboxtags li label {
  padding: 8px 12px;
  cursor: pointer;
}

ul.ks-cboxtags li label::before {
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 12px;
  padding: 2px 6px 2px 2px;
  content: "\f067";
  transition: transform 0.3s ease-in-out;
}

ul.ks-cboxtags li input[type="checkbox"]:checked + label::before {
  content: "\f00c";
  transform: rotate(-360deg);
  transition: transform 0.3s ease-in-out;
}

ul.ks-cboxtags li input[type="checkbox"]:checked + label {
  border: 1px solid #323238;
  background-color: #00875F;
  color: #fff;
  transition: all 0.2s;
}

ul.ks-cboxtags li input[type="checkbox"] {
  display: absolute;
}

ul.ks-cboxtags li input[type="checkbox"] {
  opacity: 0;
  outline: none;
  pointer-events: none;
}
</style>