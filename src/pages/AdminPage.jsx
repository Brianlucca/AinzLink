import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import Loading from '../components/Loading';
import Layout from '../components/Layout';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminPage() {
  const { shortCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get('token');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [newOriginalUrl, setNewOriginalUrl] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Token de administração não fornecido.');
      setLoading(false);
      return;
    }

    const fetchInitialStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/urls/${shortCode}/stats?token=${token}`);
        setStats(response.data);
        setNewOriginalUrl(response.data.originalUrl);
      } catch (err) {
        setError(err.response?.data?.error || 'Não foi possível buscar os dados do link.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialStats();

    const socket = io(API_URL);
    socket.on('connect', () => {
      socket.emit('subscribeToLinkStats', shortCode);
    });
    socket.on('linkStatsUpdate', (update) => {
      setStats(prevStats => ({ ...prevStats, ...update }));
    });
    return () => {
      socket.disconnect();
    };
  }, [shortCode, token]);
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setSuccessMessage('');
    setError('');
    try {
      await axios.put(`${API_URL}/api/v1/urls/${shortCode}?token=${token}`, {
        originalUrl: newOriginalUrl,
        password: newPassword || null,
      });
      setSuccessMessage('Link atualizado com sucesso!');
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Falha ao atualizar o link.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Você tem certeza que deseja deletar este link? Esta ação é irreversível.')) {
      setIsProcessing(true);
      try {
        await axios.delete(`${API_URL}/api/v1/urls/${shortCode}?token=${token}`);
        setSuccessMessage('Link deletado com sucesso! Você será redirecionado.');
        setTimeout(() => navigate('/'), 2000);
      } catch (err) {
        setError(err.response?.data?.error || 'Falha ao deletar o link.');
        setIsProcessing(false);
      }
    }
  };
  
  const renderContent = () => {
    if (loading) {
      return <Loading message="Buscando dados do link..." />;
    }
  
    if (error && !stats) {
      return (
        <div className="w-full max-w-lg mx-auto bg-red-900/50 border border-red-700 text-red-300 p-8 rounded-lg text-center shadow-lg">
          <h2 className="text-3xl font-bold">Acesso Negado</h2>
          <p className="text-xl mt-2">{error}</p>
        </div>
      );
    }

    if (stats) {
      return (
        <div className="w-full max-w-2xl mx-auto">
          {successMessage && <div className="mb-4 bg-green-500/20 text-green-300 p-3 rounded-md text-center">{successMessage}</div>}
          {error && <div className="mb-4 bg-red-500/20 text-red-300 p-3 rounded-md text-center">{error}</div>}
          
          {!isEditing ? (
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-bold text-gray-400">LINK CURTO</h2>
                  <Link to={new URL(stats.shortUrl).pathname} target="_blank" rel="noopener noreferrer" className="text-cyan-400 break-all text-lg hover:underline">
                    {stats.shortUrl}
                  </Link>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-400">DESTINO ATUAL</h2>
                  <p className="text-gray-300 break-all text-lg">{stats.originalUrl}</p>
                </div>
                <div className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
                  <h2 className="text-lg font-bold text-gray-300">CLIQUES TOTAIS</h2>
                  <p className="text-4xl font-bold text-purple-400">{stats.clicks}</p>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-400">STATUS DA SENHA</h2>
                  <p className="text-gray-300 text-lg">{stats.passwordProtected ? 'Protegido por Senha' : 'Público'}</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col md:flex-row gap-4">
                <button onClick={() => setIsEditing(true)} className="w-full bg-blue-600 hover:bg-blue-700 font-bold p-3 rounded-lg transition-colors">Editar Link</button>
                <button onClick={handleDelete} disabled={isProcessing} className="w-full bg-red-600 hover:bg-red-700 font-bold p-3 rounded-lg transition-colors disabled:bg-red-900 disabled:cursor-not-allowed">
                  {isProcessing ? 'Deletando...' : 'Deletar Link'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
              <h2 className="text-2xl font-bold mb-4">Editando Link</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="newOriginalUrl" className="block mb-2 text-sm font-bold">Novo Destino Original</label>
                  <input
                    id="newOriginalUrl"
                    type="url"
                    className="w-full p-3 bg-gray-900 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newOriginalUrl}
                    onChange={(e) => setNewOriginalUrl(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block mb-2 text-sm font-bold">Nova Senha</label>
                  <input
                    id="newPassword"
                    type="text"
                    className="w-full p-3 bg-gray-900 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Deixe em branco para remover a senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <button type="button" onClick={() => setIsEditing(false)} className="w-full bg-gray-600 hover:bg-gray-700 font-bold p-3 rounded-lg">Cancelar</button>
                <button type="submit" disabled={isProcessing} className="w-full bg-purple-600 hover:bg-purple-700 font-bold p-3 rounded-lg disabled:bg-purple-900">
                  {isProcessing ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
}