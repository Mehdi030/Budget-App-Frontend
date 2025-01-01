<template>
  <div class="transaction-list-container">
    <h2 class="transaction-list-title">Transaktionsliste</h2>
    <transition-group name="fade" tag="ul" class="transaction-list">
      <li
        v-for="transaction in localTransactions"
        :key="transaction.id"
        class="transaction-item"
      >
        <div class="transaction-info">
          <!-- Bearbeiten-Button -->
          <button
            class="transaction-button"
            @click="handleEditTransaction(transaction)"
            :disabled="isLoading"
          >
            <div class="transaction-description">
              {{ transaction.beschreibung }} - {{ transaction.betrag }} €
            </div>
            <div class="transaction-details">
              ({{ transaction.kategorie }}) am {{ formatDatum(transaction.datum) }}
            </div>
          </button>
          <!-- Löschen-Button -->
          <button
            class="delete-button"
            @click="deleteTransaction(transaction.id)"
            :disabled="isLoading"
          >
            Löschen
          </button>
        </div>
      </li>
    </transition-group>

    <!-- Fehlermeldung -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { getTransactions, deleteTransaction } from "@/services/apiService";

export default {
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      localTransactions: [],
      isLoading: false,
      errorMessage: "",
    };
  },
  watch: {
    transactions: {
      immediate: true,
      handler(newTransactions) {
        this.localTransactions = [...newTransactions];
      },
    },
  },
  methods: {
    async loadTransactions() {
      try {
        this.isLoading = true;
        this.localTransactions = await getTransactions();
        console.log("Transaktionen geladen:", this.localTransactions);
      } catch (error) {
        console.error("Fehler beim Laden der Transaktionen:", error);
        this.errorMessage = "Fehler beim Laden der Transaktionen.";
      } finally {
        this.isLoading = false;
      }
    },
    formatDatum(datum) {
      const date = new Date(datum);
      return date.toLocaleDateString("de-DE");
    },
    handleEditTransaction(transaction) {
      this.$emit("openEditModal", transaction);
    },
    async deleteTransaction(id) {
      if (confirm("Sind Sie sicher, dass Sie diese Transaktion löschen möchten?")) {
        this.isLoading = true;
        try {
          await deleteTransaction(id);
          this.localTransactions = this.localTransactions.filter(
            (transaction) => transaction.id !== id
          );
          console.log(`Transaktion mit ID ${id} erfolgreich gelöscht.`);
        } catch (error) {
          console.error(`Fehler beim Löschen der Transaktion mit ID ${id}:`, error);
          this.errorMessage = "Fehler beim Löschen der Transaktion. Bitte versuchen Sie es erneut.";
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
  async mounted() {
    await this.loadTransactions();
  },
};
</script>

<style scoped>
/* Styles hier einfügen */
</style>
