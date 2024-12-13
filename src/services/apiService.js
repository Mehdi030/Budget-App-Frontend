const API_BASE_URL = "https://budget-app-backend-1k4q.onrender.com";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Fehler: ${response.status} - ${response.statusText}`);
  }
  return response.json();
};

export const getTransactions = async () => {
  const response = await fetch(`${API_BASE_URL}/api/transactions`);
  return handleResponse(response);
};

export const addTransaction = async (transaction) => {
  const response = await fetch(`${API_BASE_URL}/api/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
  return handleResponse(response);
};

export const deleteTransaction = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/transactions/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete transaction: ${response.statusText}`);
  }
};

export const getTotalBudget = async () => {
  const response = await fetch(`${API_BASE_URL}/api/totalBudget`);
  return handleResponse(response);
};

// Reload-Methode ergänzt
export const reloadTransactions = async () => {
  const response = await fetch(`${API_BASE_URL}/api/transactions/reload`);
  return handleResponse(response);
};

// Dummy-Funktion, um bestehende Zeilenzahl zu halten
export const dummyFunction = () => {
  return null;
};
