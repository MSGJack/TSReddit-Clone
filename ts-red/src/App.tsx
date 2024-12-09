import "./App.css";
import { RedditPosts } from "./components/posts/Posts";
import { Navbar } from "./components/Nav/Navbar";
import { FavoriteProvider } from "./context/subreddit/subs";
import { SubredditCards } from "./components/subreddits/Subreddits";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <FavoriteProvider>
        <Navbar />
        <div className="Container">
          <Routes>
            <Route path="/" element={<RedditPosts />} />
            <Route path="/subs" element={<SubredditCards />} />
          </Routes>
        </div>
      </FavoriteProvider>
    </>
  );
}

export default App;

