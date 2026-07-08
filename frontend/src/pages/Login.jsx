import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, LogIn, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Small delay for UX polish
    await new Promise((r) => setTimeout(r, 400));

    const success = login(username.trim(), password);

    if (success) {
      navigate('/add-property', { replace: true });
    } else {
      setError('Usuario o contraseña incorrectos. Por favor intenta nuevamente.');
      setPassword('');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/40 to-white flex flex-col">
      {/* Decorative blobs */}
      <div className="fixed top-1/4 right-10 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
      <div className="fixed bottom-1/4 left-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />

      {/* Top bar */}
      <div className="bg-black/80 backdrop-blur-xl shadow-2xl py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/80 hover:text-amber-400 transition-colors text-sm font-medium"
          >
            ← Volver al inicio
          </Link>
          <div className="flex items-center gap-2 text-white font-semibold">
            <Home className="h-5 w-5 text-amber-400" />
            <span className="text-amber-400">Zegers</span>
            <span>Propiedades</span>
          </div>
        </div>
      </div>

      {/* Login card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg mb-4">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <span className="block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">
              Acceso restringido
            </span>
            <h1 className="text-3xl font-bold text-gray-900">Iniciar sesión</h1>
            <p className="text-gray-500 text-sm mt-2">
              Ingresa tus credenciales para acceder al panel de administración.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-5"
          >
            {/* Error message */}
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                <span className="mt-0.5 shrink-0">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Username */}
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Usuario
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-11 focus-visible:ring-amber-400"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-11 focus-visible:ring-amber-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full h-11 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg font-semibold text-sm uppercase tracking-wider mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Verificando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Ingresar
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
