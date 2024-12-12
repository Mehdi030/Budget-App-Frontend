<template>
  <div class="budget-summary">
    <h2>Gesamtbudget</h2>
    <p class="budget-value">{{ totalBudget.toFixed(2) }} €</p>
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

<style scoped>
.budget-summary {
  text-align: center;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin: 20px 0;
}

.budget-summary h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.budget-value {
  font-size: 2rem;
  font-weight: bold;
}
</style>
