import Comment from "./Comment";

type CommentType = {
  id: string;
  text: string;
  author: string;
  body: string;
  created: number;
};

type CommentsProps = {
  comments: CommentType[];
  setShowComments: (value: boolean) => void;
};

export default function Comments({ comments, setShowComments }: CommentsProps) {
  return (
    <>
      <div className="CommentsContainer">
        <div className="CommentsLayout">
          <h3>Top Comments</h3>
          <br />
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              setShowComments={setShowComments}
            />
          ))}
        </div>
      </div>
    </>
  );
}
