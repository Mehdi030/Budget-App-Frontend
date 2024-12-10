<template>
  <div>
    <h2>Gesamtbudget</h2>
    <p>{{ totalBudget }} €</p>
  </div>
</template>

<script>
import { getTotalBudget } from "@/services/apiService";

export default {
  data() {
    return {
      totalBudget: 0,
    };
  },
  async mounted() {
    try {
      this.totalBudget = await getTotalBudget(); // API-Aufruf
      console.log("Gesamtbudget:", this.totalBudget);
    } catch (error) {
      console.error("Fehler beim Abrufen des Gesamtbudgets:", error);
    }
  },
};
</script>
