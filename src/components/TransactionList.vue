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
import { deleteTransaction } from "@/services/apiService";

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
      errorMessage: "", // Fehlermeldungen speichern
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
      if (confirm("Sind Sie sicher, dass Sie diese Transaktion löschen möchten?")) {
        try {
          await deleteTransaction(id); // API-Aufruf zum Löschen
          console.log(`Transaktion mit ID ${id} erfolgreich gelöscht.`);
          this.$emit("reloadTransactions"); // Fordert die Hauptkomponente auf, die Liste neu zu laden
        } catch (error) {
          console.error(`Fehler beim Löschen der Transaktion mit ID ${id}:`, error);
          this.errorMessage =
            "Fehler beim Löschen der Transaktion. Bitte versuchen Sie es erneut.";
        }
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
</style>
