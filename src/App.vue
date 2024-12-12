<template>
  <div class="container">
    <h1>Budgetverwaltung</h1>
    <div style="display: flex; justify-content: space-between;">
      <TransactionChart :transactions="transactions" />
      <TransactionList :transactions="transactions" @openEditModal="openEditModal" />
    </div>
    <TransactionForm @transactionAdded="loadTransactions" />
    <EditTransactionModal
      v-if="showModal"
      :transaction="selectedTransaction"
      @close="closeModal"
      @transactionUpdated="loadTransactions"
    />
  </div>
</template>

<script>
import TransactionChart from "./components/TransactionChart.vue";
import TransactionList from "./components/TransactionList.vue";
import TransactionForm from "./components/TransactionForm.vue";
import EditTransactionModal from "./components/EditTransactionModal.vue";
import { getTransactions } from "@/services/apiService";

export default {
  components: {
    TransactionChart,
    TransactionList,
    TransactionForm,
    EditTransactionModal,
  },
  data() {
    return {
      showModal: false,
      selectedTransaction: null,
      transactions: [],
    };
  },
  methods: {
    openEditModal(transaction) {
      this.selectedTransaction = transaction;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async loadTransactions() {
      try {
        this.transactions = await getTransactions(); // API-Aufruf
        console.log("Transaktionen geladen:", this.transactions);
      } catch (error) {
        console.error("Fehler beim Laden der Transaktionen:", error);
      }
    },
  },
  async mounted() {
    await this.loadTransactions(); // Transaktionen beim Start laden
  },
};
</script>

<style src="./styles/styles.css"></style>
