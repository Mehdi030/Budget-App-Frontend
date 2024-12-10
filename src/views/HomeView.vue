<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.svg" />
    <h1>Willkommen zur Budget-App</h1>

    <!-- Gesamtbudget anzeigen -->
    <BudgetSummary />

    <!-- Formular für neue Transaktionen -->
    <TransactionForm @transactionAdded="loadTransactions" />

    <!-- Transaktionsliste anzeigen -->
    <TransactionList :transactions="transactions" />
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
  margin-top: 50px;
}
</style>
