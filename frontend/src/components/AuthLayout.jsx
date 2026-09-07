import AuthCarousel from './AuthCarousel';

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <div className="auth-carousel">
        <AuthCarousel />
      </div>
      <div className="auth-form-side">
        {children}
      </div>
    </div>
  );
}
