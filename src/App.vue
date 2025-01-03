<template>
  <div class="budget-container">
    <h1 class="title">Budgetverwaltung</h1>
    <div class="content">
      <div class="left-panel">
        <TransactionChart :transactions="transactions" />
      </div>
      <div class="right-panel">
        <transition-group name="fade" tag="div">
          <TransactionList
            :transactions="transactions"
            @openEditModal="openEditModal"
          />
        </transition-group>
      </div>
    </div>
    <div class="form-container">
      <TransactionForm
        @transactionAdded="handleTransactionAdded"
        @transactionUpdated="handleTransactionUpdated"
      />
    </div>
    <EditTransactionModal
      v-if="showModal"
      :transaction="selectedTransaction"
      @close="closeModal"
      @transactionUpdated="reloadTransactions"
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
      transactions: [],
      showModal: false,
      selectedTransaction: null,
    };
  },
  methods: {
    async reloadTransactions() {
      try {
        this.transactions = await getTransactions();
        console.log("Transaktionsliste erfolgreich aktualisiert:", this.transactions);
      } catch (error) {
        console.error("Fehler beim Laden der Transaktionen:", error);
      }
    },
    handleTransactionAdded(addedTransaction) {
      this.transactions.push(addedTransaction); // Schneller hinzufügen
      console.log("Neue Transaktion hinzugefügt:", addedTransaction);
    },
    handleTransactionUpdated(updatedTransaction) {
      const index = this.transactions.findIndex(
        (transaction) => transaction.id === updatedTransaction.id
      );
      if (index !== -1) {
        this.transactions.splice(index, 1, updatedTransaction);
        console.log("Transaktion erfolgreich aktualisiert:", updatedTransaction);
      }
    },
    openEditModal(transaction) {
      this.selectedTransaction = transaction;
      this.showModal = true;
    },
    closeModal() {
      this.selectedTransaction = null;
      this.showModal = false;
    },
  },
  async mounted() {
    await this.reloadTransactions();
  },
};
</script>

<style scoped>
/* Container für die gesamte App */
.budget-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* Titel */
.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

/* Hauptinhalt: Chart und Liste */
.content {
  display: flex;
  gap: 40px;
  justify-content: space-between;
  margin-bottom: 40px;
}

/* Chart-Panel */
.left-panel {
  flex: 2;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}

/* Listen-Panel */
.right-panel {
  flex: 1.5;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-height: 500px;
  overflow-y: auto;
}

/* Formularcontainer */
.form-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
}

/* Animationen für Fade-In/Out */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
