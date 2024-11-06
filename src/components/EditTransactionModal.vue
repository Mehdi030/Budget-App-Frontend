<template>
  <div class="modal" v-if="transaction">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Transaktion bearbeiten</h2>
      <input type="text" v-model="transaction.description" required />
      <input type="number" v-model="transaction.amount" required />
      <select v-model="transaction.category" required>
        <!-- Kategorie-Optionen -->
      </select>
      <select v-model="transaction.transactionType" required>
        <option value="Einnahme">Einnahme</option>
        <option value="Ausgabe">Ausgabe</option>
      </select>
      <button @click="saveTransaction">Speichern</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["transaction"],
  methods: {
    saveTransaction() {
      // Hier API-Aufruf zum Speichern der bearbeiteten Transaktion
      this.$emit("transactionUpdated");
      this.$emit("close");
    },
  },
};
</script>