<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    exercicios: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <div class="chekcbox-container">
        <ul class="ks-cboxtags d-flex row">
            <li v-for="exercicio in exercicios" :key="exercicio.id" class="mt-3">
                <input type="checkbox" :id="exercicio.id" :value="exercicio.nome_exercicio" />
                <label :for="exercicio.id">{{ exercicio.nome_exercicio }}</label>
            </li>
        </ul>
    </div>
</template>

<style scoped>
  .chekcbox-container {
    max-height: 280px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  label{
    width: 100%;
  }

  ul.ks-cboxtags {
    padding: 0px;
  }
  ul.ks-cboxtags li{
    display: inline;
  }
  ul.ks-cboxtags li label{
      display: inline-block;
      background-color: #1c1c1f;
      border: 1px solid #323238;
      color: #ffffff;
      border-radius: 10px;
      white-space: nowrap;
      user-select: none;
      transition: all .2s;
  }
  ul.ks-cboxtags li label {
      padding: 8px 12px;
      cursor: pointer;
  }
  ul.ks-cboxtags li label::before {
      display: inline-block;
      font-style: normal;
      font-variant: normal;
      text-rendering: auto;
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      font-size: 12px;
      padding: 2px 6px 2px 2px;
      content: "\f067";
      transition: transform .3s ease-in-out;
  }
  ul.ks-cboxtags li input[type="checkbox"]:checked + label::before {
      content: "\f00c";
      transform: rotate(-360deg);
      transition: transform .3s ease-in-out;
  }
  ul.ks-cboxtags li input[type="checkbox"]:checked + label {
      border: 1px solid #323238;
      background-color: #00875F;
      color: #fff;
      transition: all .2s;
  }
  ul.ks-cboxtags li input[type="checkbox"] {
    display: absolute;
  }
  ul.ks-cboxtags li input[type="checkbox"] {
    position: absolute;
    opacity: 0;
  }
</style>