<template>
  <div class="container">
    <h1>Budgetverwaltung</h1>
    <div class="content">
      <TransactionChart :transactions="transactions" />
      <TransactionList
        :transactions="transactions"
        @openEditModal="handleEditTransaction"
      />
    </div>
    <TransactionForm @transactionAdded="loadTransactions" />

    <!-- Bearbeitungsmodal -->
    <EditTransactionModal
      v-if="showEditModal"
      :transaction="transactionToEdit"
      @close="closeEditModal"
      @transactionUpdated="loadTransactions"
    />
  </div>
</template>

<script>
import TransactionChart from "@/components/TransactionChart.vue";
import TransactionList from "@/components/TransactionList.vue";
import TransactionForm from "@/components/TransactionForm.vue";
import EditTransactionModal from "@/components/EditTransactionModal.vue";
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
      transactions: [], // Liste der Transaktionen
      showEditModal: false, // Modal-Status
      transactionToEdit: null, // Die Transaktion, die bearbeitet wird
    };
  },
  methods: {
    async loadTransactions() {
      try {
        this.transactions = await getTransactions(); // Transaktionen laden
        console.log("Transaktionen geladen:", this.transactions);
      } catch (error) {
        console.error("Fehler beim Laden der Transaktionen:", error);
      }
    },
    handleEditTransaction(transaction) {
      this.transactionToEdit = transaction; // Die zu bearbeitende Transaktion setzen
      this.showEditModal = true; // Modal anzeigen
    },
    closeEditModal() {
      this.showEditModal = false; // Modal schließen
      this.transactionToEdit = null; // Transaktion zurücksetzen
    },
  },
  async mounted() {
    await this.loadTransactions(); // Transaktionen laden
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
