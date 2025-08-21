import { useState, useEffect } from 'react';
import axios from 'axios';
import FormLink from '../components/FormLink';
import Result from '../components/Result';
import Loading from '../components/Loading';
import Layout from '../components/Layout';

const API_URL = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Acordando o servidor...');
  const [error, setError] = useState('');
  const [resultado, setResultado] = useState({ shortUrl: '', adminUrl: '' });

  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        await axios.get(API_URL);
        setIsLoading(false);
      } catch (err) {
        setError('O servidor não respondeu. Tente recarregar a página.');
        setIsLoading(false);
      }
    };
    wakeUpServer();
  }, []);

  return (
    <Layout>
      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <Loading message={loadingMessage} />
            </div>
          </div>
        ) : (
          <div>
            {!resultado.shortUrl ? (
              <div className="w-full max-w-lg mx-auto">
                <FormLink
                  setIsLoading={setIsLoading}
                  setLoadingMessage={setLoadingMessage}
                  setResultado={setResultado}
                  setError={setError}
                />
                <Result error={error} />
              </div>
            ) : (
              <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="w-full">
                  <FormLink
                    setIsLoading={setIsLoading}
                    setLoadingMessage={setLoadingMessage}
                    setResultado={setResultado}
                    setError={setError}
                  />
                </div>
                <div className="w-full">
                  <Result
                    shortUrl={resultado.shortUrl}
                    adminUrl={resultado.adminUrl}
                    error={error}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}