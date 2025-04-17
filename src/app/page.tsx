
export default function LibraryPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Library</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Request
        </button>
      </header>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Type to search..."
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <nav className="flex space-x-4 mb-8">
        {["Featured", "KPI", "Layouts", "Storyboards"].map((tab) => (
          <button
            key={tab}
            className="px-3 py-1 border-b-2 border-transparent hover:border-gray-400"
          >
            {tab}
          </button>
        ))}
      </nav>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* assets listing */}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Trending</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* assets listing */}
        </div>
      </section>
    </div>
  );
}
