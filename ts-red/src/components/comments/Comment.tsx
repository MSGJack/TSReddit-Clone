import { useState } from "react";

type Reply = {
  body: string;
  author: string;
  created: number;
  id: string;
  replies?: {
    data: {
      children: Array<{ data: Reply }>;
    };
  };
};

type CommentProps = {
  comment: Reply;
  setShowComments: (value: boolean) => void;
};

export default function Comment({ comment, setShowComments }: CommentProps) {
  const { body, author, created, replies } = comment;
  const [showReplies, setShowReplies] = useState(false);

  const handleToggleReplies = () => {
    setShowReplies((prev) => !prev);
  };

  const replyList: Reply[] =
    replies?.data?.children.map((child) => child.data) ?? [];
  /*
  const replyList: Reply[] | null =
    replies?.data?.children?.length > 0
      ? replies.data.children.map((child) => child.data)
      : null;
*/

  return (
    <div className="CommentContainer">
      <div className="CommentContent">
        <strong className="CommentTitle">@{author}</strong>
        <span>
          {" "}
          {created
            ? new Date(created * 1000).toLocaleString()
            : "Failed To Get Comment "}
        </span>

        <p>{body}</p>
        {replyList.length > 0 && (
          <>
            <button onClick={handleToggleReplies} className="ComsSign">
              {showReplies ? (
                <span className="minus-sign">-</span>
              ) : (
                <span className="plus-sign">+</span>
              )}
            </button>
            {showReplies && (
              <div className="Replies">
                {replyList.map((reply) => (
                  <Comment
                    key={reply.id}
                    comment={reply}
                    setShowComments={setShowComments}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
