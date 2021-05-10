import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import "./App.css";
import Pagination from "./components/Pagination";
import Posts from "./components/Posts";
import Tags from "./components/Tags";
import { sources } from "./source/sites";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [tagsArr, setTagsArr] = useState([]);
  const [tagsObj, setTagsObj] = useState({ all: sources });
  const [tag, setTag] = useState("all");

  const postsPerPage = 5;
  useEffect(() => {
    setTagsObj(groupByTags(sources));
  }, []);

  useEffect(() => {
    setCurrentPosts(
      tagsObj
        ? tagsObj[tag].slice(
            currentPage * postsPerPage,
            currentPage * postsPerPage + postsPerPage
          )
        : {}
    );
  }, [currentPage, tag, tagsObj]);

  function groupByTags(arr) {
    let objByTags = tagsObj;
    arr.forEach((elem) => {
      elem.tags.forEach((tag) => {
        if (!(tag in objByTags)) {
          objByTags[tag] = [elem];
          return;
        }
        objByTags[tag].push(elem);
      });
    });
    setTagsArr([...tagsArr, ...Object.keys(objByTags)]);
    return objByTags;
  }
  return (
    <BrowserRouter>
      <a className="btn-github" href="https://github.com/NikolaGolubovic/tips">
        {" "}
        Github <FaGithub className="github" />{" "}
      </a>

      <div className="container">
        <Tags
          tagsArr={tagsArr}
          setTag={setTag}
          setCurrentPage={setCurrentPage}
        />

        <Switch>
          <Route exact path="/" render={() => <Redirect to="/all-1" />} />
          <Route
            path="/:page"
            render={(props) => (
              <Posts
                {...props}
                currentPosts={currentPosts}
                setCurrentPage={setCurrentPage}
                setTag={setTag}
              />
            )}
          />
        </Switch>
        {/* <Posts currentPosts={currentPosts} /> */}
        <Pagination
          setCurrentPage={setCurrentPage}
          setTag={setTag}
          tagsObj={tagsObj}
          postsPerPage={postsPerPage}
          tag={tag}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
