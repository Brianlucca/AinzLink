import { useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

const API_URL = import.meta.env.VITE_API_URL;

export default function PasswordInput({ shortCode, onSuccess }) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/api/v1/urls/${shortCode}/verify`, { password });
      if (response.data.originalUrl) {
        onSuccess(response.data.originalUrl);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao verificar a senha.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading message="Verificando senha..." />;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl text-gray-400 font-bold text-center mb-4">Link Protegido</h2>
        <p className="text-center text-gray-400 mb-6">Este link requer uma senha para continuar.</p>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-400">Senha</label>
          <input
            id="password"
            type="password"
            className="w-full p-3 text-gray-300 bg-gray-900 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
        </div>
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 font-bold p-3 rounded-lg transition-colors">
          Desbloquear
        </button>
      </form>
    </div>
  );
}