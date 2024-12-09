import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRedditSquare } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
import { BsMoonStarsFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { ThemeProvider } from "../../utilities/theme";
import { useFavorite } from "../../context/subreddit/subs";

export function Navbar() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const [theme, toggleTheme] = ThemeProvider("dark");
  const { openList } = useFavorite();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!term) return;
    const urlEncoded = new URLSearchParams({ search: term });
    navigate({ pathname: "/", search: `?${urlEncoded}` });
    setTerm("");
  };
  return (
    <>
      <nav>
        <div className="leftNav" onClick={() => navigate("/")}>
          <FaRedditSquare className="redditLogo" />
          <h2 className="RedditName">Reddit</h2>
        </div>
        <div className="Search">
          <form id="SearchForm" onSubmit={handleSubmit}>
            <BsSearch className="searchLogo" />
            <input
              placeholder="Search Reddit"
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </form>
        </div>
        <div className="rightNav">
          {" "}
          <div className="ThemeIcon" onClick={toggleTheme}>
            {theme === "dark" ? <IoSunnySharp /> : <BsMoonStarsFill />}
          </div>
          <div className="ListIcon">
            <button onClick={openList}>
              <FaListUl />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
