<template>
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

    <!-- Datum -->
    <input
      type="date"
      v-model="newTransaction.datum"
      required
    />

    <!-- Button -->
    <button type="submit" :disabled="isLoading">
      {{ isLoading ? "Hinzufügen..." : "Hinzufügen" }}
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newTransaction: {
        beschreibung: "",
        betrag: 0,
        kategorie: "",
        typ: "",
        datum: "", // Neues Feld
      },
      isLoading: false,
      errorMessage: "",
    };
  },
  methods: {
    async saveTransaction() {
      // Validierung und API-Aufruf hier
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
