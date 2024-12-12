<template>
  <div class="chart-container">
    <canvas id="transactionChart"></canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js";

export default {
  props: ["transactions"],
  mounted() {
    // Initialisiere das Chart.js-Diagramm
    const ctx = document.getElementById("transactionChart").getContext("2d");
    this.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [], // Kategorien
        datasets: [
          {
            label: "Einnahmen",
            data: [],
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Ausgaben",
            data: [],
            backgroundColor: "rgba(255, 99, 132, 0.7)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) =>
                `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)} €`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Betrag (€)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Kategorien",
            },
          },
        },
      },
    });

    this.updateChart();
  },
  watch: {
    // Beobachte Änderungen an den Transaktionen
    transactions: "updateChart",
  },
  methods: {
    updateChart() {
      const incomeData = [];
      const expenseData = [];
      const labels = [];

      // Daten aus Transaktionen extrahieren
      this.transactions.forEach((transaction) => {
        const index = labels.indexOf(transaction.category);
        if (index === -1) {
          // Neue Kategorie hinzufügen
          labels.push(transaction.category);
          incomeData.push(
            transaction.transactionType === "Einnahme" ? transaction.amount : 0
          );
          expenseData.push(
            transaction.transactionType === "Ausgabe" ? transaction.amount : 0
          );
        } else {
          // Bestehende Kategorie aktualisieren
          if (transaction.transactionType === "Einnahme") {
            incomeData[index] += transaction.amount;
          } else {
            expenseData[index] += transaction.amount;
          }
        }
      });

      // Aktualisiere die Diagrammdaten
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
