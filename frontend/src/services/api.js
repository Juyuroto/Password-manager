const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  // 1. Inscription
  register: async (email, password) => {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Une erreur est survenue lors de l'inscription");
    }

    return data;
  },

  // 2. Connexion
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Une erreur est survenue lors de la connexion");
    }

    return data;
  }
};