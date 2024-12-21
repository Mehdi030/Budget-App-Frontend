const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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


export const handleOptimisticUpdate = async (id, updatedTransaction, transactions, setTransactions) => {

  const originalTransactions = [...transactions];
  setTransactions(
    transactions.map((transaction) =>
      transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
    )
  );

  try {

    await updateTransaction(id, updatedTransaction);
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Transaktion:", error);
    setTransactions(originalTransactions);
  }
};
