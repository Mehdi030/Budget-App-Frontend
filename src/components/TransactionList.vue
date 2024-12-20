<template>
  <div class="transaction-list-container">
    <h2 class="transaction-list-title">Transaktionsliste</h2>
    <ul class="transaction-list">
      <li
        v-for="transaction in localTransactions"
        :key="transaction.id"
        class="transaction-item"
      >
        <!-- Transaktion als Button -->
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
        </button><template>
        <div class="transaction-list-container">
          <h2 class="transaction-list-title">Transaktionsliste</h2>
          <transition-group name="fade" tag="ul" class="transaction-list">
            <li
              v-for="transaction in localTransactions"
              :key="transaction.id"
              class="transaction-item"
            >
              <!-- Transaktion als Button -->
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
            </li>
          </transition-group>
        </div>
      </template>

        <style scoped>
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

      </li>
    </ul>
  </div>
</template>

<script>
import { getTransactions } from "@/services/apiService";

export default {
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      localTransactions: [], // Lokale Kopie der Transaktionsdaten
    };
  },
  watch: {
    transactions: {
      immediate: true,
      handler(newTransactions) {
        this.localTransactions = [...newTransactions]; // Lokale Kopie aktualisieren
      },
    },
  },
  methods: {
    async loadTransactions() {
      try {
        this.localTransactions = await getTransactions(); // API-Aufruf
        console.log("Transaktionen geladen:", this.localTransactions);
      } catch (error) {
        console.error("Fehler beim Laden der Transaktionen:", error);
      }
    },
    formatDatum(datum) {
      const date = new Date(datum);
      return date.toLocaleDateString("de-DE"); // Format für deutsche Datumsanzeige
    },
    handleEditTransaction(transaction) {
      this.$emit("openEditModal", transaction); // Event auslösen
    },
  },
  async mounted() {
    await this.loadTransactions();
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
}

.transaction-item {
  margin-bottom: 10px;
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
</style>
