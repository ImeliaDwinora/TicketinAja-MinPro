export default function CreateEvent() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-amber-50 px-4 py-8">
      <form className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg space-y-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create New Article
        </h1>
        <div>
          <label
            htmlFor="articleTitle"
            className="block mb-1 font-medium text-gray-700"
          >
            Article Title
          </label>
          <input
            type="text"
            id="articleTitle"
            placeholder="Enter article title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label
            htmlFor="author"
            className="block mb-1 font-medium text-gray-700"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            placeholder="Enter article author"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label
            htmlFor="slug"
            className="block mb-1 font-medium text-gray-700"
          >
            Slug
          </label>
          <input
            type="text"
            id="slug"
            placeholder="Enter article slug"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label
            htmlFor="summary"
            className="block mb-1 font-medium text-gray-700"
          >
            Article Summary
          </label>
          <input
            type="text"
            id="summary"
            placeholder="Enter article summary"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label
            htmlFor="createDate"
            className="block mb-1 font-medium text-gray-700"
          >
            Article Date
          </label>
          <input
            type="date"
            id="createDate"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="articleImage"
            className="block mb-1 font-medium text-gray-700"
          >
            Article Image URL
          </label>
          <input
            type="text"
            id="articleImage"
            placeholder="Enter image URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label
            htmlFor="articleContent"
            className="block mb-1 font-medium text-gray-700"
          >
            Article Content
          </label>
          <textarea
            id="articleContent"
            placeholder="Enter article content"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Add New Event
        </button>
      </form>
    </main>
  );
}
