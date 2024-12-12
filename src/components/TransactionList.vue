<template>
  <div>
    <h2>Transaktionsliste</h2>
    <ul>
      <li v-for="transaction in transactions" :key="transaction.id">
        {{ transaction.beschreibung }} - {{ transaction.betrag }} € ({{ transaction.kategorie }})
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
};
</script>

