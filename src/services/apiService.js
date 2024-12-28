const API_BASE_URL = "https://budget-app-backend-4ckr.onrender.com"; // Produktions-Backend

// Hilfsfunktion zur Verarbeitung von API-Antworten
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorDetails;
    try {
      errorDetails = await response.json(); // JSON-Fehlerdetails abrufen
    } catch {
      errorDetails = await response.text(); // Fallback auf Text-Fehlerdetails
    }
    console.error(`API Error: ${response.status} - ${response.statusText}, Details:`, errorDetails);
    throw {
      status: response.status,
      message: response.statusText,
      details: errorDetails,
    };
  }
  return response.json();
};

// Allgemeine Fetch-Funktion
const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: { "Content-Type": "application/json" },
    ...options,
  };
  try {
    const response = await fetch(url, defaultOptions);
    return handleResponse(response);
  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    throw error;
  }
};

// API-Funktionen
export const getTransactions = async () => apiFetch("/api/transactions");

export const addTransaction = async (transaction) =>
  apiFetch("/api/transactions", {
    method: "POST",
    body: JSON.stringify(transaction),
  });

export const updateTransaction = async (id, transaction) => {
  console.log("Update-Request an API: ", id, transaction);
  return apiFetch(`/api/transactions/${id}`, {
    method: "PUT",
    body: JSON.stringify(transaction),
  });
};


export const deleteTransaction = async (id) =>
  apiFetch(`/api/transactions/${id}`, { method: "DELETE" });

export const getTotalBudget = async () => apiFetch("/api/totalBudget");

// Beispiel: Optimistisches Update für bessere UX
export const handleOptimisticUpdate = async (id, updatedTransaction, transactions, setTransactions) => {
  // 1. Temporär UI aktualisieren
  const originalTransactions = [...transactions];
  setTransactions(
    transactions.map((transaction) =>
      transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
    )
  );

  try {
    // 2. API-Aufruf für das Update
    await updateTransaction(id, updatedTransaction);
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Transaktion:", error);
    // 3. Rollback, falls API fehlschlägt
    setTransactions(originalTransactions);
  }
};
