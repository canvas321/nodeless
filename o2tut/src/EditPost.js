import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useStoreState, useStoreActions } from "easy-peasy";

const EditPost = () => {
  const history = useNavigate();
  const { id } = useParams();

  // Accessing state for title and body
  const editTitle = useStoreState((state) => state.postTitle); // Use postTitle
  const editBody = useStoreState((state) => state.postBody); // Use postBody

  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setPostTitle); // Set the correct action
  const setEditBody = useStoreActions((actions) => actions.setPostBody); // Set the correct action

  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = async () => {
    // Make this function async
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {
      id: post.id,
      title: editTitle,
      datetime,
      body: editBody,
    };
    await editPost(updatedPost); // Await the editPost action
    history(`/post/${post.id}`); // Navigate after the post has been edited
  };

  return (
    <main className="NewPost">
      {post ? ( // Check if the post exists
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="button" onClick={handleEdit}>
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
