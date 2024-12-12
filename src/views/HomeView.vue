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
import TransactionList from "@/components/TransactionList.vue";
import TransactionForm from "@/components/TransactionForm.vue";
import { getTransactions } from "@/services/apiService";

export default {
  components: {
    TransactionChart,
    TransactionList,
    TransactionForm,
  },
  data() {
    return {
      transactions: [],
    };
  },
  methods: {
    async loadTransactions() {
      try {
        this.transactions = await getTransactions();
      } catch (error) {
        console.error("Fehler beim Laden der Transaktionen:", error);
      }
    },
  },
  mounted() {
    this.loadTransactions();
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
