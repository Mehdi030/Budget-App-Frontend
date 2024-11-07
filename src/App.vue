<template>
  <div class="container">
    <h1>Budgetverwaltung</h1>
    <div style="display: flex; justify-content: space-between;">
      <TransactionChart />
      <TransactionList @openEditModal="openEditModal" />
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
    loadTransactions() {
      // Lade Transaktionen, z. B. vom Server
    },
  },
};
</script>

<style src="./styles/styles.css"></style>