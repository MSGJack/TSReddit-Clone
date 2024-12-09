import { useEffect, useState } from "react";
import Post from "./Post";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type RedditPost = {
  id: number;
  url: string;
  subreddit: string;
  permalink: string;
  author: string;
  score: number;
  num_comments: number;
  title: string;
  created_utc: number;
  selftext: string;
  ups: number;
  downs: number;
  thumbnail: string;
  isVideo?: boolean;
  is_video?: boolean;
  mediaUrl?: string;
  media?: {
    reddit_video?: {
      fallback_url: string;
    };
  };
  preview?: {
    images: {
      source: {
        url: string;
      };
    }[];
  };
};

interface ApiResponse {
  data: {
    children: {
      data: RedditPost;
    }[];
  };
}
export function RedditPosts() {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRedditPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://www.reddit.com/.json");

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const json: ApiResponse = await response.json();

        const formattedPosts = json.data.children.map((child) => {
          const post = child.data;
          let mediaUrl = "";
          let isVideo = false;

          if (post.media?.reddit_video?.fallback_url) {
            mediaUrl = post.media.reddit_video.fallback_url;
            isVideo = true;
          } else if (post.preview?.images?.[0]?.source?.url) {
            mediaUrl = post.preview.images[0].source.url.replace(/&amp;/g, "&");
          }

          return {
            ...post,
            mediaUrl,
            isVideo,
          };
        });

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Failed to fetch Reddit posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRedditPosts();
  }, []);

  return (
    <div className="PostSection">
      <h2>Reddit Posts</h2>
      {loading && (
        <h3>
          LoadingPosts... <AiOutlineLoading3Quarters className="loading" />
        </h3>
      )}
      {posts.length > 0 && !loading ? (
        posts.map((post) => (
          <div key={post.id}>
            <Post {...post} />
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
