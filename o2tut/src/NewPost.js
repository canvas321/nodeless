import React from "react";
import { useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { format } from "date-fns";

const NewPost = () => {
  // Use useStoreState to access current state values
  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);

  // Use actions to modify state
  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate new post ID
    const id = posts.length ? Math.max(...posts.map((post) => post.id)) + 1 : 1;
    const datetime = format(new Date(), "MMMM dd yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };

    // Save new post and navigate back to home
    await savePost(newPost);
    navigate("/");
  };

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
