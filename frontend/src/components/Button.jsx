const Button = ({ children, type = 'button', onClick, isLoading, disabled }) => {
  return (
    <button
      type={type}
      className="btn-primary"
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Chargement...' : children}
    </button>
  );
};

export default Button;