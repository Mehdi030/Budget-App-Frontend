<template>
  <form @submit.prevent="handleSubmit">
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
    <input type="date" v-model="newTransaction.datum" required />
    <!-- Buttons -->
    <div class="button-group">
      <button type="submit" :disabled="isLoading" class="add-button">
        {{ isEditing ? "Aktualisieren" : "Hinzufügen" }}
      </button>
      <button
        type="button"
        @click="deleteTransaction"
        class="delete-button"
        v-if="isEditing"
      >
        Löschen
      </button>
    </div>
    <!-- Fehlermeldung -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </form>
</template>

<script>
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "@/services/apiService";

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
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.validateTransaction()) {
        this.errorMessage =
          "Bitte füllen Sie alle Felder aus und geben Sie einen gültigen Betrag ein.";
        return;
      }

      this.isLoading = true;
      this.errorMessage = "";

      try {
        if (this.isEditing) {
          // API-Aufruf für Update
          await updateTransaction(this.newTransaction.id, this.newTransaction);
          this.$emit("transactionUpdated", this.newTransaction);
        } else {
          // API-Aufruf für Add
          const addedTransaction = await addTransaction(this.newTransaction);
          this.$emit("transactionAdded", addedTransaction);
        }
        this.resetForm(); // Eingabefelder zurücksetzen
      } catch (error) {
        this.errorMessage =
          "Fehler beim Speichern der Transaktion. Bitte erneut versuchen.";
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
        this.$emit("transactionDeleted", this.newTransaction.id); // Event auslösen
        this.resetForm(); // Formular zurücksetzen
      } catch (error) {
        this.errorMessage =
          "Fehler beim Löschen der Transaktion. Bitte erneut versuchen.";
        console.error(error);
      } finally {
        this.isLoading = false;
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

</style>
