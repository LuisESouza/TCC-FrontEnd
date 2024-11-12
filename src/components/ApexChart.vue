<script setup>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

// Define as opcoes do grafico e os dados da serie
const options = ref({
  chart: {
    type: 'bar',
    height: 200,
    toolbar: {
        show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  }
});

const series = ref([
  {
    name: 'Sales',
    data: [30, 40, 35, 50, 49, 60, 70]
  }
]);
</script>

<template>
  <div>
    <apexchart type="bar" :options="options" :series="series" />
  </div>
</template>

<style scoped>
</style>