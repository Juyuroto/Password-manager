function Main() {
  return (
    <main>
      <section className="hero-card">
        <h2>Bienvenue sur Lockbox</h2>
        <p>Entrez votre mot de passe pour continuer.</p>
        <form className="password-form">
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            autoComplete="current-password"
            required
          />
          <button className="login-btn" type="submit">
            Continuer
          </button>
        </form>
      </section>
    </main>
  );
}

export default Main;
