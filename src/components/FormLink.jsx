import { useState } from 'react';
import axios from 'axios';

export default function FormLink({ setIsLoading, setLoadingMessage, setResultado, setError }) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [password, setPassword] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  
const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setLoadingMessage('Encurtando sua URL...');
    setError('');
    setResultado({ shortUrl: '', adminUrl: '' });

    try {
      const response = await axios.post(`${API_URL}/api/v1/urls/shorten`, {
        originalUrl,
        customCode: customCode || undefined,
        password: password || undefined,
        expiresAt: expiresAt || undefined,
      });
      setResultado(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-2xl space-y-4 border border-gray-700">
      <div>
        <label htmlFor="originalUrl" className="block mb-2 text-sm font-bold text-gray-300">URL Original</label>
        <input
          id="originalUrl"
          type="url"
          className="w-full p-3 bg-gray-900 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          placeholder="https://sua-url-super-longa..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
      </div>
      
      <details className="bg-gray-900/50 p-4 rounded-md border border-gray-700">
        <summary className="cursor-pointer text-sm font-bold text-gray-400 hover:text-white transition-colors">Opções Avançadas</summary>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="customCode" className="block mb-2 text-sm font-bold text-gray-300">Nome Personalizado</label>
            <input
              id="customCode"
              type="text"
              className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="ex: meu-evento"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-300">Proteger com Senha</label>
            <input
              id="password"
              type="password"
              className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Deixe em branco para ser público"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="expiresAt" className="block mb-2 text-sm font-bold text-gray-300">Data de Expiração</label>
            <input
              id="expiresAt"
              type="date"
              className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
            />
          </div>
        </div>
      </details>
      
      <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold p-4 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105">
        Encurtar URL
      </button>
    </form>
  );
}