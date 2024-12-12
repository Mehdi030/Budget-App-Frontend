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
      step="0.01"
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

    <!-- Buttons -->
    <div class="button-group">
      <button type="submit" :disabled="isLoading">
        {{ isEditing ? "Aktualisieren" : "Hinzufügen" }}
      </button>
      <button type="button" @click="deleteTransaction" v-if="isEditing">
        Löschen
      </button>
    </div>

    <!-- Fehlermeldung -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </form>
</template>

<script>
import { addTransaction, deleteTransaction, getTransactions } from "@/services/apiService";

export default {
  props: {
    transactionToEdit: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      newTransaction: {
        beschreibung: "",
        betrag: 0,
        kategorie: "",
        typ: "",
        datum: "",
      },
      isLoading: false,
      errorMessage: "",
      isEditing: false,
      transactions: [], // Hinzugefügt für die Liste
    };
  },
  methods: {
    async saveTransaction() {
      if (!this.validateTransaction()) {
        this.errorMessage =
          "Bitte füllen Sie alle Felder aus und geben Sie einen gültigen Betrag ein.";
        return;
      }

      this.isLoading = true;
      this.errorMessage = "";

      try {
        await addTransaction(this.newTransaction); // API-Aufruf
        this.$emit("transactionAdded"); // Event auslösen
        await this.loadTransactions(); // Transaktionen neu laden
        this.resetForm(); // Formular zurücksetzen
      } catch (error) {
        this.errorMessage =
          "Fehler beim Hinzufügen der Transaktion. Bitte erneut versuchen.";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteTransaction() {
      if (!this.newTransaction.id) {
        this.errorMessage = "Keine Transaktion zum Löschen ausgewählt.";
        return;
      }

      this.isLoading = true;
      try {
        await deleteTransaction(this.newTransaction.id); // API-Aufruf
        this.$emit("transactionDeleted", this.newTransaction.id);
        await this.loadTransactions(); // Transaktionen neu laden
        this.resetForm();
      } catch (error) {
        this.errorMessage = "Fehler beim Löschen der Transaktion. Bitte erneut versuchen.";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async loadTransactions() {
      try {
        this.transactions = await getTransactions(); // Transaktionen laden
      } catch (error) {
        console.error("Fehler beim Laden der Transaktionen:", error);
      }
    },
    validateTransaction() {
      const { beschreibung, betrag, kategorie, typ, datum } = this.newTransaction;
      return beschreibung && betrag > 0 && kategorie && typ && datum;
    },
    resetForm() {
      this.newTransaction = {
        beschreibung: "",
        betrag: 0,
        kategorie: "",
        typ: "",
        datum: "",
      };
      this.isEditing = false;
    },
  },
  watch: {
    transactionToEdit: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.newTransaction = { ...newValue };
          this.isEditing = true;
        } else {
          this.resetForm();
        }
      },
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

.transaction-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

button {
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #dc3545;
  color: white;
}

button[type="button"]:hover {
  background-color: #a71d2a;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>
