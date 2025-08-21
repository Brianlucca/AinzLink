import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

export default function Result({ shortUrl, adminUrl, error }) {
  const [copied, setCopied] = useState('');

  const handleCopy = (textToCopy, type) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  if (error) {
    return (
      <div className="h-full bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center shadow-lg flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  if (!shortUrl) {
    return (
      <div className="h-full bg-gray-800 border border-gray-700 text-gray-400 p-8 rounded-lg text-center shadow-lg flex items-center justify-center">
        <p>Seu link aparecerá aqui...</p>
      </div>
    );
  }

  const getPathFromUrl = (url) => new URL(url).pathname + new URL(url).search;
  
  const shortPath = getPathFromUrl(shortUrl);
  const adminPath = getPathFromUrl(adminUrl);

  const appDomain = import.meta.env.VITE_APP_DOMAIN || window.location.origin;

  const displayShortUrl = `${appDomain}${shortPath}`;
  const displayAdminUrl = `${appDomain}${adminPath}`;

  return (
    <div className="h-full bg-gray-800 p-6 rounded-lg text-center space-y-6 flex flex-col md:flex-row items-center md:text-left border border-gray-700">
      <div className="flex-shrink-0 bg-white p-2 rounded-md shadow-md">
        <QRCodeSVG value={displayShortUrl} size={128} />
      </div>
      <div className="w-full md:ml-6 flex-grow">
        <div className="mb-4">
          <h3 className="font-bold text-sm text-gray-400">✅ LINK CURTO</h3>
          <div className="flex items-center">
            <Link to={shortPath} target="_blank" rel="noopener noreferrer" className="text-cyan-400 break-all hover:underline text-lg flex-grow">
              {displayShortUrl}
            </Link>
            <button onClick={() => handleCopy(displayShortUrl, 'short')} className="ml-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded transition-colors text-xs whitespace-nowrap">
              {copied === 'short' ? 'COPIADO!' : 'COPIAR'}
            </button>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-sm text-gray-400">🔑 LINK DE ADMINISTRAÇÃO</h3>
          <div className="flex items-center">
            <Link to={adminPath} target="_blank" rel="noopener noreferrer" className="text-yellow-400 break-all hover:underline text-sm flex-grow">
              {displayAdminUrl}
            </Link>
            <button onClick={() => handleCopy(displayAdminUrl, 'admin')} className="ml-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded transition-colors text-xs whitespace-nowrap">
              {copied === 'admin' ? 'COPIADO!' : 'COPIAR'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}