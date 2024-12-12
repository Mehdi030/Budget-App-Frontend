<template>
  <div>
    <h2>Neue Transaktion hinzufügen</h2>
    <form @submit.prevent="saveTransaction">
      <!-- Beschreibung -->
      <input
        type="text"
        v-model="newTransaction.beschreibung"
        placeholder="Beschreibung"
        required
      />

      <!-- Betrag -->
      <input
        type="number"
        v-model="newTransaction.betrag"
        placeholder="Betrag"
        required
        min="0.01"
      />

      <!-- Kategorie -->
      <select v-model="newTransaction.kategorie" required>
        <option value="">Kategorie wählen</option>
        <option value="Lebensmittel">Lebensmittel</option>
        <option value="Miete">Miete</option>
        <option value="Transport">Transport</option>
        <option value="Unterhaltung">Unterhaltung</option>
        <option value="Gesundheit">Gesundheit</option>
        <option value="Bildung">Bildung</option>
        <option value="Sonstiges">Sonstiges</option>
      </select>

      <!-- Typ -->
      <select v-model="newTransaction.typ" required>
        <option value="">Typ wählen</option>
        <option value="Einnahme">Einnahme</option>
        <option value="Ausgabe">Ausgabe</option>
      </select>

      <!-- Button -->
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Hinzufügen..." : "Hinzufügen" }}
      </button>
    </form>

    <!-- Fehlermeldung -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { addTransaction } from "@/services/apiService";

export default {
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newTransaction: {
        beschreibung: "",
        betrag: 0,
        kategorie: "",
        typ: "",
      },
      isLoading: false, // Ladezustand
      errorMessage: "", // Fehlermeldung
    };
  },
  methods: {
    async saveTransaction() {
      if (!this.validateTransaction()) {
        this.errorMessage = "Bitte alle Felder ausfüllen und einen gültigen Betrag eingeben!";
        return;
      }

      this.isLoading = true;
      this.errorMessage = "";

      try {
        const result = await addTransaction(this.newTransaction); // API-Aufruf
        console.log("Transaktion hinzugefügt:", result);

        this.$emit("transactionAdded", result); // Event auslösen

        this.newTransaction = { beschreibung: "", betrag: 0, kategorie: "", typ: "" }; // Formular zurücksetzen
      } catch (error) {
        this.errorMessage = "Fehler beim Hinzufügen der Transaktion. Bitte erneut versuchen.";
        console.error("Fehler beim Hinzufügen der Transaktion:", error);
      } finally {
        this.isLoading = false;
      }
    },
    validateTransaction() {
      const { beschreibung, betrag, kategorie, typ } = this.newTransaction;
      return beschreibung && betrag > 0 && kategorie && typ;
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>
