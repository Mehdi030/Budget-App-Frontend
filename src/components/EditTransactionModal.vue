<template>
  <div class="modal" v-if="transaction">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Transaktion bearbeiten</h2>
      <input type="text" v-model="transaction.beschreibung" required />
      <input type="number" v-model="transaction.betrag" required />
      <select v-model="transaction.kategorie" required>
        <option value="Lebensmittel">Lebensmittel</option>
        <option value="Miete">Miete</option>
        <option value="Transport">Transport</option>
        <option value="Unterhaltung">Unterhaltung</option>
        <option value="Gesundheit">Gesundheit</option>
        <option value="Bildung">Bildung</option>
        <option value="Sonstiges">Sonstiges</option>
      </select>
      <select v-model="transaction.typ" required>
        <option value="Einnahme">Einnahme</option>
        <option value="Ausgabe">Ausgabe</option>
      </select>
      <input type="date" v-model="transaction.datum" required />
      <button @click="saveTransaction">Speichern</button>
    </div>
  </div>
</template>

<script>
import { updateTransaction } from "@/services/apiService";

export default {
  props: ["transaction"],
  data() {
    return {
      localTransaction: { ...this.transaction }, // Lokale Kopie der Transaktion
    };
  },
  methods: {
    async saveTransaction() {
      try {
        // API-Aufruf zum Speichern der bearbeiteten Transaktion
        await updateTransaction(this.localTransaction.id, this.localTransaction);
        this.$emit("transactionUpdated", this.localTransaction); // Parent benachrichtigen
        this.$emit("close"); // Modal schließen
      } catch (error) {
        console.error("Fehler beim Speichern der Transaktion:", error);
        alert("Fehler beim Speichern. Bitte versuchen Sie es erneut.");
      }
    },
  },
  watch: {
    transaction: {
      immediate: true,
      handler(newTransaction) {
        // Lokale Kopie aktualisieren, wenn sich die Transaktion ändert
        this.localTransaction = { ...newTransaction };
      },
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #555;
}

.close:hover {
  color: #000;
}

label {
  display: block;
  margin: 10px 0 5px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input:focus,
select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.save-btn {
  display: inline-block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.save-btn:hover {
  background-color: #0056b3;
}
</style>
