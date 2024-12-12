<template>
  <div class="about-container">
    <div class="about-content">
      <h1>Über Uns</h1>
      <p>
        Willkommen bei der Budget-App! Mit unserer App können Sie Ihre Finanzen
        einfach und effizient verwalten. Verfolgen Sie Ihre Einnahmen und
        Ausgaben, erstellen Sie Budgets und behalten Sie den Überblick über
        Ihre Finanzen.
      </p>
      <p>
        Unsere Mission ist es, Ihnen dabei zu helfen, finanzielle Freiheit zu
        erreichen und Ihre Ziele zu verwirklichen.
      </p>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-background-soft);
}

.about-content {
  text-align: center;
  max-width: 600px;
  padding: 20px;
  background: var(--color-background);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.about-content h1 {
  color: var(--color-heading);
  font-size: 2rem;
  margin-bottom: 20px;
}

.about-content p {
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 10px;
}
</style>
