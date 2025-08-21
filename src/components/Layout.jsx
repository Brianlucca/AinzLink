export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-10">
        <h1 className="text-6xl md:text-7xl font-black text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
            AinzLink
          </span>
        </h1>
        <p className="text-gray-400 mt-2 font-mono">O Encurtador de URLs Definitivo</p>
      </div>
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}