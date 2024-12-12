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

// Wiederverwendbare Fetch-Hilfsfunktion
const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    return handleResponse(response);
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

// Transaktionen abrufen
export const getTransactions = async () => {
  return fetchApi("/api/transactions");
};

// Neue Transaktion hinzufügen
export const addTransaction = async (transaction) => {
  return fetchApi("/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
};

// Transaktion löschen
export const deleteTransaction = async (id) => {
  await fetchApi(`/api/transactions/${id}`, {
    method: "DELETE",
  });
};

// Gesamtbudget abrufen
export const getTotalBudget = async () => {
  return fetchApi("/api/totalBudget");
};
