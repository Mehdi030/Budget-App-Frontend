<template>
  <div class="form-container">
    <h2>Neue Transaktion hinzufügen</h2>
    <select v-model="transactionType" required>
      <option value="">Transaktionstyp wählen</option>
      <option value="Einnahme">Einnahme</option>
      <option value="Ausgabe">Ausgabe</option>
    </select>
    <input type="text" v-model="description" placeholder="Beschreibung" required />
    <input type="number" v-model="amount" placeholder="Betrag in €" required />
    <select v-model="category" required>
      <option value="">Kategorie wählen</option>
      <option value="Lebensmittel">Lebensmittel</option>
      <option value="Miete">Miete</option>
      <option value="Transport">Transport</option>
      <option value="Unterhaltung">Unterhaltung</option>
      <option value="Gesundheit">Gesundheit</option>
      <option value="Bildung">Bildung</option>
      <option value="Sonstiges">Sonstiges</option>
    </select>
    <button @click="addTransaction">Hinzufügen</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: "",
      amount: null,
      category: "",
      transactionType: "",
    };
  },
  methods: {
    addTransaction() {
      if (this.description && this.amount && this.category && this.transactionType) {
        fetch('/api/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            description: this.description,
            amount: this.amount,
            category: this.category,
            transactionType: this.transactionType
          })
        })
            .then(response => response.json())
            .then(() => {
              this.$emit("transactionAdded");
              this.clearForm();
            })
            .catch(error => console.error('Fehler:', error));
      } else {
        alert('Bitte füllen Sie alle Felder aus.');
      }
    },
    clearForm() {
      this.description = "";
      this.amount = null;
      this.category = "";
      this.transactionType = "";
    }
  }
};
</script>