import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCodeBranch, FaCrosshairs, FaRegIdCard } from "react-icons/fa";
import PropTypes from "prop-types";

export default function Header({ header }) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <header className={`${header} flex justify-between items-center p-3`}>
      <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span>ROBO</span>
          <span style={{ color: "#2d6a4f" }}>CODE</span>
        </h1>
      </Link>
      <form onSubmit={handleSubmit} className="header-form">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none w-24 sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <FaCrosshairs style={{ color: "#74c69d" }} />
        </button>
      </form>
      <ul className="flex gap-3 mx-1 text-center items-center flex-wrap justify-around">
        <Link to="/profile">
          {currentUser ? (
            <li className="header-userImg">
              <img
                className="h-4 w-4 object-cover"
                src={currentUser.avatar}
                alt="Profile image."
              />
            </li>
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

Header.propTypes = {
  header: PropTypes.string,
};
