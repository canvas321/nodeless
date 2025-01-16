import React from "react";
import "./index.css";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import useAxiosFect from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";
// import { DataProvider } from "./context/DataContext";

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFect(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home isLoading={isLoading} fetchError={fetchError} />}
        />
        <Route exact path="/post" element={<NewPost />} />

        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
