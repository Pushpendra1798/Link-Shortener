import { useState, useEffect } from "react";
import api from "./api/urls";

const App = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");

  const fetchUrls = async () => {
    try {
      const response = await api.get("/getAll");
      setUrls(response.data.urls);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  useEffect(() => {
    const loadUrls = async () => {
      try {
        const response = await api.get("/getAll");
        setUrls(response.data.urls);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };
    loadUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!originalUrl.trim()) {
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/create", {
        originalUrl,
      });

      setShortUrl(response.data.shortUrl);
      setOriginalUrl("");
      await fetchUrls();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (shortCode) => {
    try {
      await api.delete(`/${shortCode}`);

      if (urls.length === 1) {
        setShortUrl("");
      }

      await fetchUrls();
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-6 sm:px-5 sm:py-10 flex flex-col">
      <div className="mx-auto w-full max-w-5xl">
        {/* Main Card */}
        <div className="min-h-150 rounded-3xl bg-white px-4 py-7 shadow-xl shadow-slate-200/60 sm:px-10 sm:py-10 md:px-14">
          {/* Heading */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Link Shortener
            </h1>

            <p className="mt-3 text-slate-500">
              Shorten your long URLs in seconds.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 rounded-2xl bg-slate-100 p-3 sm:flex-row"
          >
            <input
              type="text"
              placeholder="Enter your long link here..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="h-14 flex-1 rounded-xl border border-slate-200 bg-white px-5 text-slate-800 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            /> 

            <button
              type="submit"
              disabled={loading}
              className="h-14 rounded-xl bg-indigo-600 px-8 font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98] cursor-pointer disabled:opacity-70"
            >
              {loading ? "Shortening..." : "Shorten Link"}
            </button>
          </form>
          {error && (
            <p className="mt-2 ml-4 text-xs font-medium text-red-500">
              {error} 
            </p>
          )}

          {urls.length > 0 && (
            <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Your Short URL
              </p>

              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block font-semibold text-indigo-600 hover:text-indigo-700"
              >
                {shortUrl}
              </a>
            </div>
          )}

          {/* All Links */}
          <div className="mt-12">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold text-slate-900">All Links</h2>

              <span className="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600">
                {urls.length} Links
              </span>
            </div>

            {/* Short links---> */}
            {urls.length === 0 ? (
              // Empty State
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <p className="font-medium text-slate-600">
                  No short links yet.
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Create your first short link using the form above.
                </p>
              </div>
            ) : (
              // Real Links
              urls.map((url) => (
                <div
                  key={url._id}
                  className="mb-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
                >
                  {/* Short Link */}
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                      Short Link
                    </p>

                    <a
                      href={`https://link-shortener-vmbw.onrender.com/${url.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      https://link-shortener-vmbw.onrender.com/{url.shortCode}
                    </a>
                  </div>

                  {/* Clicks */}
                  <div className="sm:w-24">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                      Clicks
                    </p>

                    <p className="font-semibold text-slate-800">{url.clicks}</p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      handleDelete(url.shortCode);
                    }}
                    className="cursor-pointer rounded-xl border border-red-200 px-5 py-2.5 font-medium text-red-500 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Footer */}
        <footer className="mt-auto pt-8 text-center">
          <p className="text-sm text-slate-400">
            Made with <span className="text-red-500">♥</span> by{" "}
            <span className="font-semibold text-slate-600">Pushpendra</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
