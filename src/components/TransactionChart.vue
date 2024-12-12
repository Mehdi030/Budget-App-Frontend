<template>
  <canvas id="transactionChart"></canvas>
</template>

<script>
import { Chart } from "chart.js";

export default {
  props: ["transactions"],
  mounted() {
    const ctx = document.getElementById("transactionChart").getContext("2d");
    this.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          { label: "Einnahmen", data: [], backgroundColor: "rgba(75, 192, 192, 0.2)", borderColor: "rgba(75, 192, 192, 1)", borderWidth: 1 },
          { label: "Ausgaben", data: [], backgroundColor: "rgba(255, 99, 132, 0.2)", borderColor: "rgba(255, 99, 132, 1)", borderWidth: 1 },
        ],
      },
      options: {
        scales: { x: { beginAtZero: true } },
      },
    });

    this.updateChart();
  },
  watch: {
    transactions: "updateChart",
  },
  methods: {
    updateChart() {
      const incomeData = [];
      const expenseData = [];
      const labels = [];

      this.transactions.forEach((transaction) => {
        const date = new Date(transaction.datum).toLocaleDateString("de-DE");
        const index = labels.indexOf(date);
        if (index === -1) {
          labels.push(date);
          incomeData.push(transaction.typ === "Einnahme" ? transaction.betrag : 0);
          expenseData.push(transaction.typ === "Ausgabe" ? transaction.betrag : 0);
        } else {
          if (transaction.typ === "Einnahme") incomeData[index] += transaction.betrag;
          else expenseData[index] += transaction.betrag;
        }
      });

      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = incomeData;
      this.chart.data.datasets[1].data = expenseData;
      this.chart.update();
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
  margin: 20px 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

canvas {
  display: block;
  margin: 0 auto;
  max-height: 100%;
}
</style>
