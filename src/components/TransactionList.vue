<template>
  <div class="transaction-list-container">
    <h2 class="transaction-list-title">Transaktionsliste</h2>

    <!-- Ladeanzeige -->
    <div v-if="isLoading" class="loading-overlay">Lädt...</div>

    <!-- Transaktionsliste -->
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
            aria-label="Transaktion bearbeiten"
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
            aria-label="Transaktion löschen"
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
import { deleteTransaction, updateTransaction } from "@/services/apiService";

export default {
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      localTransactions: [], // Lokale Kopie der Transaktionen
      isLoading: false, // Ladeanzeige für API-Aufrufe
      errorMessage: "", // Fehlermeldungen anzeigen
    };
  },
  watch: {
    transactions: {
      immediate: true,
      deep: true, // Reaktive Beobachtung aktivieren
      handler(newTransactions) {
        this.localTransactions = [...newTransactions]; // Lokale Kopie aktualisieren
      },
    },
  },
  methods: {
    formatDatum(datum) {
      const date = new Date(datum);
      return date.toLocaleDateString("de-DE"); // Format für deutsche Datumsanzeige
    },
    handleEditTransaction(transaction) {
      this.$emit("openEditModal", transaction); // Event auslösen, um das Bearbeiten zu starten
    },
    async deleteTransaction(id) {
      const originalTransactions = [...this.localTransactions]; // Originale Liste speichern

      // Sofortige Entfernung aus der Liste (optimistisches Löschen)
      this.localTransactions = this.localTransactions.filter(
        (transaction) => transaction.id !== id
      );

      this.isLoading = true; // Ladeanzeige aktivieren
      try {
        await deleteTransaction(id); // API-Aufruf
        this.$emit("reloadTransactions"); // Liste neu laden
      } catch (error) {
        console.error(`Fehler beim Löschen der Transaktion mit ID ${id}:`, error);
        this.localTransactions = originalTransactions; // Rollback bei Fehler
        this.errorMessage =
          "Fehler beim Löschen der Transaktion. Bitte versuchen Sie es erneut.";
      } finally {
        this.isLoading = false; // Ladeanzeige deaktivieren
      }
    },
    async updateTransaction(updatedTransaction) {
      const index = this.localTransactions.findIndex(
        (transaction) => transaction.id === updatedTransaction.id
      );
      if (index === -1) {
        console.warn("Transaction not found in local state.");
        return;
      }

      const originalTransaction = { ...this.localTransactions[index] }; // Original speichern
      this.localTransactions[index] = { ...updatedTransaction }; // Optimistisches Update

      this.isLoading = true; // Ladeanzeige aktivieren
      try {
        const response = await updateTransaction(
          updatedTransaction.id,
          updatedTransaction
        );
        this.localTransactions[index] = response; // API-Daten übernehmen
      } catch (error) {
        console.error("Fehler beim Aktualisieren der Transaktion:", error);
        this.localTransactions[index] = originalTransaction; // Rollback bei Fehler
        this.errorMessage =
          "Fehler beim Speichern der Transaktion. Bitte versuchen Sie es erneut.";
      } finally {
        this.isLoading = false; // Ladeanzeige deaktivieren
      }
    },
  },
};
</script>

<style scoped>
.transaction-list-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.transaction-list-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.transaction-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px; /* Feste Höhe für Scrollbarkeit */
  overflow-y: auto; /* Vertikales Scrollen erlauben */
}

.transaction-item {
  margin-bottom: 10px;
}

.transaction-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transaction-button {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  font-size: 16px;
  text-align: left;
  background-color: #f9fafc;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.transaction-button:hover {
  background-color: #f1f5f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.transaction-description {
  font-size: 16px;
  font-weight: bold;
  color: #555;
}

.transaction-details {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

.delete-button {
  margin-left: 10px;
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: darkred;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
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

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #333;
  z-index: 1000;
}
</style>
