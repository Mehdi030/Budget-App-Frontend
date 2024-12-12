<template>
  <div class="transaction-list-container">
    <h2 class="transaction-list-title">Transaktionsliste</h2>
    <ul class="transaction-list">
      <li
        v-for="transaction in transactions"
        :key="transaction.id"
        class="transaction-item"
      >
        <div class="transaction-description">{{ transaction.beschreibung }}</div>
        <div class="transaction-details">
          <span class="transaction-amount">{{ transaction.betrag }} €</span>
          <span class="transaction-category">({{ transaction.kategorie }})</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTransactions } from "@/services/apiService";

export default {
  data() {
    return {
      transactions: [], // Speichert die Transaktionsdaten
    };
  },
  async mounted() {
    try {
      this.transactions = await getTransactions(); // API-Aufruf
      console.log("Transaktionen geladen:", this.transactions);
    } catch (error) {
      console.error("Fehler beim Laden der Transaktionen:", error);
    }
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
  display: flex;
  justify-content: space-between; /* Platzierung der Elemente */
  align-items: center;
  padding: 12px 15px; /* Innenabstand */
  margin-bottom: 10px; /* Abstand zwischen den Einträgen */
  background-color: #f9fafc; /* Heller Hintergrund */
  border-radius: 8px; /* Abgerundete Ecken */
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05); /* Leichter Schatten */
  transition: background-color 0.3s, box-shadow 0.3s; /* Sanfte Übergänge */
}

.transaction-item:hover {
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
}

.transaction-amount {
  font-size: 16px;
  font-weight: bold;
  color: #007bff; /* Blau für Beträge */
}

.transaction-category {
  font-size: 14px;
  color: #666;
  margin-left: 8px;
}
</style>
