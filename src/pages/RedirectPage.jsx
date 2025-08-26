import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import PasswordInput from '../components/PasswordInput';
import Layout from '../components/Layout';

const API_URL = import.meta.env.VITE_API_URL;

export default function RedirectPage() {
  const { shortCode } = useParams();
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const handlePasswordSuccess = (originalUrl) => {
    window.location.replace(originalUrl);
  };

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await axios.get(`${API_URL}/${shortCode}?json=true`);
        
        if (response.data.passwordProtected) {
          setStatus('needsPassword');
        } else if (response.data.originalUrl) {
          window.location.replace(response.data.originalUrl);
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Não foi possível encontrar este link.');
        setStatus('error');
      }
    };
    fetchUrl();
  }, [shortCode]);

  if (status === 'loading') {
    return (
      <Layout>
        <div className="flex justify-center">
            <div className="w-full max-w-lg">
                <Loading message="Redirecionando..." />
            </div>
        </div>
      </Layout>
    );
  }

  if (status === 'error') {
    return (
      <Layout>
         <div className="w-full max-w-lg mx-auto bg-red-900/50 border border-red-700 text-red-300 p-8 rounded-lg text-center shadow-lg">
            <h2 className="text-3xl font-bold">Erro</h2>
            <p className="text-xl mt-2">{error}</p>
        </div>
      </Layout>
    );
  }

  if (status === 'needsPassword') {
    return (
      <Layout>
        <PasswordInput shortCode={shortCode} onSuccess={handlePasswordSuccess} />
      </Layout>
    );
  }

  return null;
}