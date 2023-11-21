import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCodeBranch, FaCrosshairs, FaRegIdCard } from "react-icons/fa";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="flex justify-between items-center p-3">
      <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span>ROBO</span>
          <span style={{ color: "#058c42" }}>CODE</span>
        </h1>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="header-form p-2 flex items-center"
      >
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none w-24 sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <FaCrosshairs style={{ color: "#058c42" }} />
        </button>
      </form>
      <ul className="flex gap-3 text-center items-center flex-wrap justify-around">
        <Link to="/profile">
          {currentUser ? (
            <img
              className="rounded-full h-7 w-7 object-cover"
              src={currentUser.avatar}
              alt="Profile image."
            />
          ) : (
            <li className="header-li">
              <FaCodeBranch />
            </li>
          )}
        </Link>
        <Link to="/about">
          <li className="header-li">
            <FaRegIdCard />
          </li>
        </Link>
      </ul>
    </header>
  );
}
