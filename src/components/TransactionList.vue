<template>
  <div class="transaction-list-container">
    <h2 class="transaction-list-title">Transaktionsliste</h2>
    <ul class="transaction-list">
      <li
        v-for="transaction in localTransactions"
        :key="transaction.id"
        class="transaction-item"
      >
        <button
          class="transaction-button"
          @click="openEditModal(transaction)"
        >
          <div class="transaction-description">
            {{ transaction.beschreibung }} - {{ transaction.betrag }} €
          </div>
          <div class="transaction-details">
            ({{ transaction.kategorie }}) am {{ formatDatum(transaction.datum) }}
          </div>
        </button>
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
    openEditModal(transaction) {
      this.$emit("openEditModal", transaction); // Event für Eltern-Komponente auslösen
    },
  },
  async mounted() {
    await this.loadTransactions();
  },
};
</script>

<style scoped>
.transaction-list-container {
  background-color: #ffffff; /* Weißer Hintergrund */
  padding: 20px; /* Abstand innen */
  border-radius: 8px; /* Abgerundete Ecken */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Dezenter Schatten */
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
  list-style: none; /* Entferne Aufzählungspunkte */
  padding: 0;
  margin: 0;
}

.transaction-item {
  margin-bottom: 10px; /* Abstand zwischen den Einträgen */
}

.transaction-button {
  display: flex;
  justify-content: space-between; /* Platzierung der Elemente */
  align-items: center;
  width: 100%;
  padding: 12px 15px; /* Innenabstand */
  background-color: #f9fafc; /* Heller Hintergrund */
  border: none;
  border-radius: 8px; /* Abgerundete Ecken */
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05); /* Leichter Schatten */
  font-size: 16px;
  font-weight: bold;
  color: inherit; /* Vererbt Textfarbe */
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s; /* Sanfte Übergänge */
}

.transaction-button:hover {
  background-color: #f1f5f9; /* Leichte Hervorhebung */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Stärkere Hervorhebung */
}

.transaction-description {
  font-size: 16px;
  font-weight: bold;
  color: #555;
}

.transaction-details {
  text-align: right;
  font-size: 14px;
  color: #666;
}
</style>
