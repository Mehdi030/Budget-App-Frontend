<template>
  <div class="home">
    <h1>Budgetverwaltung</h1>

    <!-- Gesamtbudget anzeigen -->
    <div class="section">
      <BudgetSummary />
    </div>

    <!-- Formular für neue Transaktionen -->
    <div class="section">
      <h2>Neue Transaktion hinzufügen</h2>
      <TransactionForm @transactionAdded="loadTransactions" />
    </div>

    <!-- Transaktionsliste anzeigen -->
    <div class="section">
      <h2>Transaktionsliste</h2>
      <TransactionList :transactions="transactions" />
    </div>
  </div>
</template>

<script>
import BudgetSummary from "@/components/BudgetSummary.vue";
import TransactionForm from "@/components/TransactionForm.vue";
import TransactionList from "@/components/TransactionList.vue";
import { getTransactions } from "@/services/apiService";

export default {
  name: "HomeView",
  components: {
    BudgetSummary,
    TransactionForm,
    TransactionList,
  },
  data() {
    return {
      transactions: [], // Speichert die Transaktionsdaten
    };
  },
  methods: {
    async loadTransactions() {
      try {
        this.transactions = await getTransactions(); // Lade Transaktionen aus der API
        console.log("Transaktionen aktualisiert:", this.transactions);
      } catch (error) {
        console.error("Fehler beim Laden der Transaktionen:", error);
      }
    },
  },
  async mounted() {
    // Lade Transaktionen, wenn die Seite geladen wird
    await this.loadTransactions();
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  margin: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

h1 {
  font-size: 2rem;
  color: #222;
}

h2 {
  font-size: 1.5rem;
  color: #555;
}

button {
  font-size: 1rem;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
