export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen md:max-w-md">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>One-time purchase & subscription</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="subscription" className="w-5" />
              <span>Subscription</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="oneTimePurchase" className="w-5" />
              <span>One-time purchase</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Details:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="certificate" className="w-5" />
              <span>Certificate</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="community" className="w-5" />
              <span>Community</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort by:</label>
            <select id="sort_order" className="border rounded-lg p-3">
              <option>Price - decreasing</option>
              <option>Price - increasing</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
      </div>
    </div>
  );
}
