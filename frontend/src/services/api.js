const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  login: async (name, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Une erreur est survenue lors de la connexion");
    }

    return data;
  }
};