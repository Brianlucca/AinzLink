import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-mono">
      <header className="text-center mb-10">
        <Link to="/">
          <h1 className="text-6xl md:text-7xl font-black text-white hover:opacity-80 transition-opacity">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
              AinzLink
            </span>
          </h1>
        </Link>
        <p className="text-gray-400 mt-2">O Encurtador de URLs Definitivo</p>
      </header>
      
      <main className="w-full flex-grow flex items-center justify-center">
        {children}
      </main>

      <footer className="w-full text-center p-4 mt-10">
        <p className="text-gray-500 text-sm">
          &copy; {currentYear} | Feito por{' '}
          <a
            href="https://brianlucca.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline"
          >
            Brian Lucca
          </a>
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Este projeto foi desenvolvido para fins exclusivamente educacionais e de portfólio.
        </p>
      </footer>
    </div>
  );
}