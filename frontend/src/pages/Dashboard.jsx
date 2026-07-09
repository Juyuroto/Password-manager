const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('lockbox_token');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '2rem', color: 'black', textAlign: 'center' }}>
      <h1>Mon Coffre-fort (Dashboard)</h1>
      <p>Bienvenue ! Si tu vois ceci, c'est que la route protégée a fonctionné.</p>
      <button onClick={handleLogout} className="btn-primary" style={{ width: 'auto', padding: '0.5rem 1rem' }}>
        Se déconnecter
      </button>
    </div>
  );
};

export default Dashboard;