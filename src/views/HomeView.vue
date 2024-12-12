<template>
  <div class="container">
    <h1>Budgetverwaltung</h1>
    <div class="content">
      <TransactionChart :transactions="transactions" />
      <TransactionList :transactions="transactions" />
    </div>
    <TransactionForm @transactionAdded="loadTransactions" />
  </div>
</template>

<script>
import TransactionChart from "@/components/TransactionChart.vue";
import TransactionForm from "@/components/TransactionForm.vue";
import TransactionList from "@/components/TransactionList.vue";
import { getTransactions } from "@/services/apiService";

export default {
  components: {
    TransactionChart,
    TransactionList,
    TransactionForm,
  },
  data() {
    return {
      transactions: [], // Initiale Transaktionsliste
    };
  },
  methods: {
    async loadTransactions() {
      try {
        this.transactions = await getTransactions(); // Transaktionen von der API laden
        console.log("Transaktionen geladen:", this.transactions);
      } catch (error) {
        console.error("Fehler beim Laden der Transaktionen:", error);
      }
    },
    async addTransaction(transaction) {
      try {
        this.transactions.push(transaction); // Neue Transaktion zur Liste hinzufügen
        console.log("Transaktion hinzugefügt:", transaction);
      } catch (error) {
        console.error("Fehler beim Hinzufügen der Transaktion:", error);
      }
    },
  },
  async mounted() {
    await this.loadTransactions(); // Transaktionen laden, wenn die Seite geladen wird
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
}

.content > * {
  flex: 1;
}
</style>
