import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  return children;
}
