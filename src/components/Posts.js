import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Posts({ currentPosts, setCurrentPage, setTag }) {
  const location = useLocation();
  useEffect(() => {
    const paramsArr = location.pathname.slice(1).split("-");
    setTag(paramsArr[0]);
    setCurrentPage(paramsArr[1] - 1);
  }, [location.pathname, setTag, setCurrentPage]);
  return (
    <div className="posts">
      {currentPosts.map((source) => {
        return (
          <div className="card" key={source.link}>
            <p className="story">{source.shortStory}</p>
            <a href={source.link}>Link</a>{" "}
            <span>
              <small>({source.linkType})</small>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
