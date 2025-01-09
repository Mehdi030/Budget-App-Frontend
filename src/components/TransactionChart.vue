<template>
  <div class="chart-container">
    <canvas id="transactionChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

export default {
  props: ["transactions"],
  mounted() {
    Chart.register(...registerables);
    this.createChart();
  },
  watch: {
    transactions: "updateChart", // Aktualisiert die Chart-Daten, wenn sich die Transaktionen ändern
  },
  methods: {
    createChart() {
      const ctx = document.getElementById("transactionChart").getContext("2d");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "Einnahmen",
              data: [],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Ausgaben",
              data: [],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      this.updateChart(); // Initiale Aktualisierung der Chart-Daten
    },
    updateChart() {
      if (!this.chart) return;
      const labels = [];
      const incomeData = [];
      const expenseData = [];
      this.transactions.forEach((transaction) => {
        if (!labels.includes(transaction.kategorie)) {
          labels.push(transaction.kategorie);
        }
      });

      labels.forEach((label) => {
        const income = this.transactions
          .filter((t) => t.kategorie === label && t.typ === "Einnahme")
          .reduce((sum, t) => sum + t.betrag, 0);

        const expense = this.transactions
          .filter((t) => t.kategorie === label && t.typ === "Ausgabe")
          .reduce((sum, t) => sum + t.betrag, 0);

        incomeData.push(income);
        expenseData.push(expense);
      });

      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = incomeData;
      this.chart.data.datasets[1].data = expenseData;
      this.chart.update();
    },
  },
  beforeUnmount() {
    // Chart wird zerstört, um Speicherlecks zu vermeiden
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
