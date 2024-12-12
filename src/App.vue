<template>
  <div class="budget-container">
    <h1 class="title">Budgetverwaltung</h1>
    <div class="content">
      <!-- Chart und Liste im flexiblen Layout -->
      <div class="left-panel">
        <TransactionChart />
      </div>
      <div class="right-panel">
        <TransactionList @openEditModal="openEditModal" />
      </div>
    </div>

    <!-- Formular für neue Transaktionen -->
    <div class="form-container">
      <TransactionForm @transactionAdded="loadTransactions" />
    </div>

    <!-- Modal für Transaktionsbearbeitung -->
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

<style scoped>
.budget-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

.content {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 40px;
}

.left-panel,
.right-panel {
  flex: 1;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
