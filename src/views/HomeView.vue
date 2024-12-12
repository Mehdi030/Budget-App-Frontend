<template>
  <div class="home">
    <img class="logo" alt="Vue logo" src="../assets/logo.svg" />
    <h1>Budgetverwaltung</h1>

    <!-- Gesamtbudget anzeigen -->
    <BudgetSummary />

    <!-- Formular für neue Transaktionen -->
    <div class="form-container">
      <h2>Neue Transaktion hinzufügen</h2>
      <TransactionForm @transactionAdded="loadTransactions" />
    </div>

    <!-- Transaktionsliste anzeigen -->
    <div class="list-container">
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
  margin-top: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #555;
}

.form-container,
.list-container {
  margin: 30px auto;
  padding: 20px;
  max-width: 800px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

form input,
form select,
form button {
  width: calc(100% - 20px);
  max-width: 300px;
  margin: 10px auto;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: block;
}

form button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

form button:hover {
  background-color: #0056b3;
}
</style>
