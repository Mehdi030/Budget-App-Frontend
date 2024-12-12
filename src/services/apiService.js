  const API_BASE_URL = "https://budget-app-backend-1k4q.onrender.com";

// Hilfsfunktion zur Verarbeitung von API-Antworten
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorDetails = await response.text();
    console.error(`API Error: ${response.status} - ${response.statusText}, Details: ${errorDetails}`);
    throw new Error(`Fehler: ${response.status} - ${response.statusText}`);
  }
  return response.json();
};

// Transaktionen abrufen
export const getTransactions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/transactions`);
    return handleResponse(response);
  } catch (error) {
    console.error("Fehler beim Abrufen der Transaktionen:", error);
    throw error;
  }
};

// Neue Transaktion hinzufügen
export const addTransaction = async (transaction) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Fehler beim Hinzufügen der Transaktion:", error);
    throw error;
  }
};

// Transaktion bearbeiten
export const updateTransaction = async (id, transaction) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Transaktion:", error);
    throw error;
  }
};

// Transaktion löschen
export const deleteTransaction = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/transactions/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(`Failed to delete transaction: ${errorDetails}`);
      throw new Error(`Failed to delete transaction: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Fehler beim Löschen der Transaktion:", error);
    throw error;
  }
};

// Gesamtbudget abrufen
export const getTotalBudget = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/totalBudget`);
    return handleResponse(response);
  } catch (error) {
    console.error("Fehler beim Abrufen des Gesamtbudgets:", error);
    throw error;
  }
};
