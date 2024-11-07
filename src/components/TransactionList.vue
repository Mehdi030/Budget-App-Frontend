<template>
  <div class="history-container">
    <h2>Transaktionshistorie</h2>
    <ul>
      <li v-for="transaction in transactions" :key="transaction.id">
        {{ transaction.description }} - {{ transaction.amount }} € - {{ transaction.category }}
        <button @click="$emit('openEditModal', transaction)">Aktualisieren</button>
        <button @click="deleteTransaction(transaction.id)">Löschen</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactions: []
    };
  },
  mounted() {
    this.loadTransactions();
  },
  methods: {
    loadTransactions() {
      fetch('/api/transactions')
        .then(response => response.json())
        .then(data => {
          this.transactions = data;
        })
        .catch(error => console.error('Fehler beim Laden der Transaktionen:', error));
    },
    deleteTransaction(id) {
      fetch(`/api/transactions/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(() => {
          this.loadTransactions();
        })
        .catch(error => console.error('Fehler beim Löschen der Transaktion:', error));
    }
  }
};
</script>
