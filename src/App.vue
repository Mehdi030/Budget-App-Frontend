<template>
  <div class="budget-container">
    <h1 class="title">Budgetverwaltung</h1>
    <div class="content">
      <!-- Chart und Liste im flexiblen Layout -->
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

    <!-- Formular für neue Transaktionen -->
    <div class="form-container">
      <TransactionForm @transactionAdded="reloadTransactions" />
    </div>

    <!-- Modal für Transaktionsbearbeitung -->
    <EditTransactionModal
      v-if="showModal"
      :transaction="selectedTransaction"
      @close="closeModal"
      @transactionUpdated="handleTransactionUpdated"
      @transactionDeleted="reloadTransactions"
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
      transactions: [], // Die Liste aller Transaktionen
      showModal: false, // Status des Modals
      selectedTransaction: null, // Die aktuell ausgewählte Transaktion
    };
  },
  methods: {
    /**
     * Lädt die Transaktionsdaten vom Server und aktualisiert die Anzeige.
     */
    async reloadTransactions() {
      try {
        this.transactions = await getTransactions(); // Lade Transaktionen vom Server
        console.log("Transaktionsliste erfolgreich aktualisiert.", this.transactions);
      } catch (error) {
        console.error("Fehler beim Laden der Transaktionen:", error);
      }
    },
    /**
     * Handhabung von aktualisierten Transaktionen.
     * Findet die Transaktion und ersetzt sie durch die neue.
     */
    handleTransactionUpdated(updatedTransaction) {
      const index = this.transactions.findIndex(
        (transaction) => transaction.id === updatedTransaction.id
      );
      if (index !== -1) {
        this.transactions.splice(index, 1, updatedTransaction);
      }
    },
    /**
     * Öffnet das Modal zur Bearbeitung einer Transaktion.
     * @param {Object} transaction Die zu bearbeitende Transaktion
     */
    openEditModal(transaction) {
      this.selectedTransaction = transaction;
      this.showModal = true;
    },
    /**
     * Schließt das Modal.
     */
    closeModal() {
      this.selectedTransaction = null;
      this.showModal = false;
    },
  },
  /**
   * Lädt die Transaktionen beim Laden der Komponente.
   */
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
  transition: opacity 1.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
