import { TimeAgo } from "../../utilities/utilities";
import { FaBookmark } from "react-icons/fa";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { useFavorite } from "../../context/subreddit/subs";
import Comments from "../comments/Comments";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { LiaCommentsSolid } from "react-icons/lia";

type PostProps = {
  id: number;
  url: string;
  subreddit: string;
  permalink: string;
  author: string;
  score: number;
  created_utc: number;
  num_comments: number;
  title: string;
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

export default function Post({
  id,
  url,
  subreddit,
  permalink,
  author,
  num_comments,
  created_utc,
  title,
  selftext,
  ups,
  isVideo,
  mediaUrl,
}: PostProps) {
  const { addToList, isSaved, removeFromList } = useFavorite();
  const postIsSaved = isSaved(id);

  const [comments, setComments] = useState<any[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [loading, isLoading] = useState(false);

  const toggleComments = async () => {
    if (showComments) {
      setShowComments(false);
      return;
    }
    setShowComments(true);
    isLoading(true);
    try {
      const response = await fetch(`https://www.reddit.com${permalink}.json`);
      const data = await response.json();
      const postComments = data[1].data.children.map((item: any) => item.data);
      setComments(postComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      isLoading(false);
      setShowComments(true);
    }
  };

  const handleSave = () => {
    if (postIsSaved) {
      removeFromList(id);
    } else {
      addToList(id, title, permalink);
    }
  };

  return (
    <>
      <div className="Card">
        <div className="CardTitle">
          <a
            href={`https://www.reddit.com/${permalink}`}
            target="_blank"
            rel="noreferrer"
          >
            <h2 className="CardName">{title}</h2>
          </a>{" "}
          <hr />
          Posted In{" "}
          <a>
            <span>/r/{subreddit}</span>
          </a>{" "}
          By:<span>{author}</span>
          <div>
            Posted:
            <span>
              {TimeAgo({
                submitted_at: created_utc,
                time_now: Date.now() / 1000,
              })}
            </span>
          </div>
        </div>
        <div className="Card-Img">
          {mediaUrl && (
            <div>
              {isVideo ? (
                <>
                  <video controls style={{ width: "100%", maxWidth: "500px" }}>
                    <source src={mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </>
              ) : (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <img src={mediaUrl} alt={title} />
                </a>
              )}
            </div>
          )}
        </div>
        <div className="CardBody">{selftext}</div>
        <div className="CardFooter">
          <div className="CardScore">
            <FaArrowAltCircleUp />
            {ups}
          </div>
          <div className="CardComments">
            <span className="NumberComs">
              <button onClick={toggleComments} className="ComsButton">
                {showComments ? (
                  <FaWindowClose title="Close Comments" />
                ) : (
                  <LiaCommentsSolid title="Open Comments" />
                )}
              </button>
              {num_comments}
            </span>
          </div>
          <div className="SavePost">
            <button onClick={handleSave}>
              {postIsSaved ? (
                <BsBookmarkCheckFill className="addedPost" />
              ) : (
                <FaBookmark />
              )}
            </button>
          </div>
        </div>
        {loading && (
          <div className="loadtest">
            <div className="loadingComs">Loading</div>
          </div>
        )}
        {showComments && !loading && (
          <Comments comments={comments} setShowComments={setShowComments} />
        )}
      </div>
    </>
  );
}
