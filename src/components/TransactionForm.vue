<template>
  <div class="transaction-form-container">
    <h2 class="transaction-form-title">Neue Transaktion hinzufügen</h2>
    <form @submit.prevent="saveTransaction" class="transaction-form">
      <!-- Beschreibung -->
      <input
        type="text"
        v-model="newTransaction.beschreibung"
        placeholder="Beschreibung"
        required
        class="form-input"
      />

      <!-- Betrag -->
      <input
        type="number"
        v-model="newTransaction.betrag"
        placeholder="Betrag"
        required
        min="0.01"
        step="0.01"
        class="form-input"
      />

      <!-- Kategorie -->
      <select v-model="newTransaction.kategorie" required class="form-select">
        <option value="" disabled>Kategorie wählen</option>
        <option value="Lebensmittel">Lebensmittel</option>
        <option value="Miete">Miete</option>
        <option value="Transport">Transport</option>
        <option value="Unterhaltung">Unterhaltung</option>
        <option value="Gesundheit">Gesundheit</option>
        <option value="Bildung">Bildung</option>
        <option value="Sonstiges">Sonstiges</option>
      </select>

      <!-- Typ -->
      <select v-model="newTransaction.typ" required class="form-select">
        <option value="" disabled>Typ wählen</option>
        <option value="Einnahme">Einnahme</option>
        <option value="Ausgabe">Ausgabe</option>
      </select>

      <!-- Button -->
      <button type="submit" :disabled="isLoading" class="submit-button">
        {{ isLoading ? "Hinzufügen..." : "Hinzufügen" }}
      </button>
    </form>

    <!-- Fehlermeldung -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { addTransaction } from "@/services/apiService";

export default {
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
    // Transaktion speichern
    async saveTransaction() {
      // Validierung vor dem API-Aufruf
      if (!this.validateTransaction()) {
        this.errorMessage = "Bitte alle Felder ausfüllen und einen gültigen Betrag eingeben!";
        return;
      }

      this.isLoading = true; // Ladezustand aktivieren
      this.errorMessage = ""; // Fehlermeldung zurücksetzen

      try {
        const result = await addTransaction(this.newTransaction); // API-Aufruf
        console.log("Transaktion hinzugefügt:", result);

        // Formular zurücksetzen
        this.newTransaction = { beschreibung: "", betrag: 0, kategorie: "", typ: "" };

        // Event für Eltern-Komponente (z. B. Liste aktualisieren)
        this.$emit("transactionAdded");
      } catch (error) {
        this.errorMessage = "Fehler beim Hinzufügen der Transaktion. Bitte erneut versuchen.";
        console.error("Fehler beim Hinzufügen der Transaktion:", error);
      } finally {
        this.isLoading = false; // Ladezustand deaktivieren
      }
    },

    // Validierung der Eingaben
    validateTransaction() {
      const { beschreibung, betrag, kategorie, typ } = this.newTransaction;
      return beschreibung && betrag > 0 && kategorie && typ;
    },
  },
};
</script>

<style scoped>
.transaction-form-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.transaction-form-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.transaction-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-input,
.form-select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.form-input:focus,
.form-select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>
