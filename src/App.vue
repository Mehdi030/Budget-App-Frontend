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
      @transactionUpdated="reloadTransactions"
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
      transactions: [],
      showModal: false,
      selectedTransaction: null,
    };
  },
  methods: {
    async reloadTransactions() {
      try {
        this.transactions = await getTransactions(); // Lade Transaktionen vom Server
        console.log("Transaktionsliste erfolgreich aktualisiert.", this.transactions);
      } catch (error) {
        console.error("Fehler beim Laden der Transaktionen:", error);
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
    await this.reloadTransactions(); // Lade Transaktionen beim ersten Rendern
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

/* Vergrößere die Chart */
.left-panel {
  flex: 1.5; /* Chart breiter machen */
}

/* Vergrößere die Liste */
.right-panel {
  flex: 1.2;
  max-height: 400px; /* Begrenze die Höhe */
  overflow-y: auto; /* Scrollbar für viele Einträge */
}

.form-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 800px; /* Begrenze die Breite */
  margin: 20px auto; /* Zentriere das Formular */
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
