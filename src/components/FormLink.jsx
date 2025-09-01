import { useState } from 'react';
import axios from 'axios';
import { FiLink, FiTag, FiLock, FiCalendar, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';

export default function FormLink({ setIsLoading, setLoadingMessage, setResultado, setError }) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [password, setPassword] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
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

  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col bg-gray-800 p-8 rounded-xl shadow-2xl space-y-4 border border-gray-700">
      <div className="flex-grow">
        <div className="mb-4 relative">
          <label htmlFor="originalUrl" className="block mb-2 text-sm font-bold text-gray-300">URL Original</label>
          <FiLink className="absolute top-11 left-4 text-gray-400" />
          <input
            id="originalUrl"
            type="url"
            className="w-full p-3 pl-10 text-gray-300 bg-gray-900 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            placeholder="https://sua-url-super-longa..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </div>
        
        <details className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
          <summary className="cursor-pointer text-sm font-bold text-gray-400 hover:text-white transition-colors">Opções Avançadas</summary>
          <div className="mt-4 space-y-4">
            <div className="relative">
              <label htmlFor="customCode" className="block mb-2 text-sm font-bold text-gray-300">Nome Personalizado</label>
              <FiTag className="absolute top-11 left-4 text-gray-400" />
              <input
                id="customCode"
                type="text"
                className="w-full p-3 pl-10 text-gray-300 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="ex: meu-evento"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-300">Proteger com Senha</label>
              <FiLock className="absolute top-11 left-4 text-gray-400" />
              <input
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                className="w-full p-3 pl-10 text-gray-300 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Deixe em branco para ser público"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute top-11 right-4 text-gray-400 hover:text-white"
                aria-label="Mostrar ou esconder a senha"
              >
                {isPasswordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            <div className="relative">
              <label htmlFor="expiresAt" className="block mb-2 text-sm font-bold text-gray-300">Data de Expiração</label>
              <FiCalendar className="absolute top-11 left-4 text-gray-400" />
              <input
                id="expiresAt"
                type="date"
                className="w-full p-3 pl-10 text-gray-300 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                min={getTomorrowDateString()}
              />
            </div>
          </div>
        </details>
      </div>
      
      <button type="submit" className="group w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold p-4 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center">
        Encurtar URL
        <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}