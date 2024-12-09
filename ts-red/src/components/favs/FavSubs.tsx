import { useEffect, useState } from "react";
import { useFavorite } from "../../context/subreddit/subs";

type FavsProps = {
  title: string;
  id: number;
  permalink: string;
};

export function FavSub({ title, id, permalink }: FavsProps) {
  const { removeFromList } = useFavorite();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    function getSubs() {
      try {
        const stored = localStorage.getItem("favorite-subs");
        if (!stored) {
          throw new Error("NO Favs found");
        }
        const storedList = JSON.parse(stored);
        const favPosts = storedList.find((fav: any) => fav.id === id);
        if (!favPosts) {
          throw new Error("NO POst found");
        }
        setPost(favPosts);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    getSubs();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <div className="favCardLO">
          <div className="favCard">
            <h4>{title}</h4>
            <hr />
            <a
              href={`https://www.reddit.com/${permalink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="favLink"
            >
              View Post
            </a>
          </div>
          <button onClick={() => removeFromList(post.id)} className="favRemove">
            Remove
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}
