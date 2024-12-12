<template>
  <div>
    <h2>Transaktionsliste</h2>
    <ul>
      <li v-for="transaction in transactions" :key="transaction.id">
        {{ transaction.beschreibung }} - {{ transaction.betrag }} € ({{ transaction.kategorie }})
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
