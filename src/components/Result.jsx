import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

export default function Result({ shortUrl, adminUrl, error }) {
  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg text-center">
        {error}
      </div>
    );
  }

  if (!shortUrl) {
    return null;
  }

  const getPathFromUrl = (url) => {
    try {
      return new URL(url).pathname + new URL(url).search;
    } catch {
      return '/';
    }
  };

  const shortPath = getPathFromUrl(shortUrl);
  const adminPath = getPathFromUrl(adminUrl);

  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center space-y-6 flex flex-col md:flex-row items-center md:text-left">
      {/* <div className="flex-shrink-0 bg-white p-2 rounded-md">
        <QRCodeSVG value={shortUrl} size={128} />
      </div> */}
      <div className="md:ml-6 flex-grow">
        <div className="mb-4">
          <h3 className="font-bold text-gray-400">✅ Link Curto (para compartilhar):</h3>
          <Link to={shortPath} target="_blank" rel="noopener noreferrer" className="text-cyan-400 break-all hover:underline text-lg">
            {shortUrl}
          </Link>
        </div>
        <div>
          <h3 className="font-bold text-gray-400">🔑 Link de Administração (GUARDE!):</h3>
          <Link to={adminPath} target="_blank" rel="noopener noreferrer" className="text-yellow-400 break-all hover:underline text-sm">
            {adminUrl}
          </Link>
        </div>
      </div>
    </div>
  );
}