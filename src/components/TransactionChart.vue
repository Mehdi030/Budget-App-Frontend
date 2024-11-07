<template>
  <canvas id="transactionChart"></canvas>
</template>

<script>
import { Chart } from "chart.js";

export default {
  props: ['transactions'],
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
        scales: { y: { beginAtZero: true } },
      },
    });

    this.updateChart();
  },
  watch: {
    transactions: 'updateChart'
  },
  methods: {
    updateChart() {
      const incomeData = [];
      const expenseData = [];
      const labels = [];

      this.transactions.forEach(transaction => {
        const index = labels.indexOf(transaction.category);
        if (index === -1) {
          labels.push(transaction.category);
          incomeData.push(transaction.transactionType === 'Einnahme' ? transaction.amount : 0);
          expenseData.push(transaction.transactionType === 'Ausgabe' ? transaction.amount : 0);
        } else {
          if (transaction.transactionType === 'Einnahme') incomeData[index] += transaction.amount;
          else expenseData[index] += transaction.amount;
        }
      });

      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = incomeData;
      this.chart.data.datasets[1].data = expenseData;
      this.chart.update();
    }
  }
};
</script>
