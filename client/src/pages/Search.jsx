import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    certificate: false,
    community: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const certificateFromUrl = urlParams.get("certificate");
    const communityFromUrl = urlParams.get("community");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      certificateFromUrl ||
      communityFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        certificate: certificateFromUrl === "true" ? true : false,
        community: communityFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);

      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();

      if (data.length > 2) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }

      setListings(data);
      setLoading(false);
    };

    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "subscription" ||
      e.target.id === "oneTimePurchase"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "certificate" ||
      e.target.id === "community" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();

    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("certificate", sidebarData.certificate);
    urlParams.set("community", sidebarData.community);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);

    urlParams.set("startIndex", startIndex);

    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();

    if (data.length < 3) {
      setShowMore(false);
    }

    setListings([...listings, ...data]);
  };

  return (
    <>
      <Header />
      <section className="search-section">
        <div className="flex flex-col md:flex-row">
          <div className="search-sectionInnerDiv">
            <form onSubmit={handleSubmit} className="search-form">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="Search..."
                  className="border p-2 w-full"
                  value={sidebarData.searchTerm}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Type:</label>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="all"
                    className="search-checkbox"
                    onChange={handleChange}
                    checked={sidebarData.type === "all"}
                  />
                  <span>All payment options</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="subscription"
                    className="search-checkbox"
                    onChange={handleChange}
                    checked={sidebarData.type === "subscription"}
                  />
                  <span>Subscription</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="oneTimePurchase"
                    className="search-checkbox"
                    onChange={handleChange}
                    checked={sidebarData.type === "oneTimePurchase"}
                  />
                  <span>One-time purchase</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="offer"
                    className="search-checkbox"
                    onChange={handleChange}
                    checked={sidebarData.offer}
                  />
                  <span>Offer</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Details:</label>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="certificate"
                    className="search-checkbox"
                    onChange={handleChange}
                    checked={sidebarData.certificate}
                  />
                  <span>Certificate</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="community"
                    className="search-checkbox"
                    onChange={handleChange}
                    checked={sidebarData.community}
                  />
                  <span>Community</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="font-semibold">Sort by:</label>
                <select
                  onChange={handleChange}
                  defaultValue={"created_at_desc"}
                  id="sort_order"
                  className="search-select"
                >
                  <option value="regularPrice_desc">Price - decreasing</option>
                  <option value="regularPrice_asc">Price - increasing</option>
                  <option value="createdAt_desc">Latest</option>
                  <option value="createdAt_asc">Oldest</option>
                </select>
              </div>
              <button className="p-3 uppercase hover:opacity-80">Search</button>
            </form>
          </div>
          <div className="flex-1">
            <h1 className="search-hOne">Results</h1>
            <div className="p-7 flex flex-wrap gap-4 lg:justify-start justify-center">
              {!loading && listings.length === 0 && (
                <p className="text-xl">No listings found.</p>
              )}
              {loading && (
                <p className="text-xl text-center w-full">Loading...</p>
              )}
              {!loading &&
                listings &&
                listings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              {showMore && (
                <button
                  onClick={onShowMoreClick}
                  className="hover:underline p-7 text-center w-full"
                >
                  Show more
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
