<template>
  <div class="chart-container">
    <canvas id="transactionChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

export default {
  props: ["transactions"],
  data() {
    return {
      chart: null, // Referenz zum Chart-Objekt
    };
  },
  mounted() {
    Chart.register(...registerables);
    this.createChart(); // Chart beim Mount erstellen
  },
  watch: {
    transactions: {
      handler: "updateChart", // Aktualisiert den Chart bei Änderungen
      deep: true, // Reaktive Beobachtung auch bei Array-Änderungen
    },
  },
  methods: {
    createChart() {
      const ctx = document.getElementById("transactionChart").getContext("2d");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [], // Initial leer
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
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      this.updateChart(); // Initiale Daten laden
    },
    updateChart() {
      if (!this.chart) return;

      // Kategorien und Werte sammeln
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

      // Chart-Daten aktualisieren
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = incomeData; // Einnahmen
      this.chart.data.datasets[1].data = expenseData; // Ausgaben
      this.chart.update();
    },
  },
  beforeUnmount() {
    // Chart zerstören, um Speicherlecks zu vermeiden
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
