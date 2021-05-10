import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

function Pagination({ tagsObj, tag, postsPerPage, setCurrentPage, setTag }) {
  const [btnIndex, setBtnIndex] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const numDocuments = tagsObj[tag].length;
  useEffect(() => {
    setBtnIndex(location.pathname.slice(1).split("-")[1] - 1);
  }, [location.pathname]);
  function pagPage(arrLength, page) {
    let numOfPages = Math.ceil(arrLength.length / page);
    let arrs = Array.from({ length: numOfPages }, (_v, index) => {
      const etcButton = {
        background: btnIndex > 3 && index === 2 && "rgb(241, 250, 238)",
        color: btnIndex > 3 && index === 2 && "rgb(29, 53, 87)",
        fontSize: btnIndex > 3 && index === 2 && "1.3em",
      };
      let arr = [
        0,
        1,
        2,
        btnIndex,
        btnIndex + 1,
        Math.ceil(numDocuments / postsPerPage) - 2,
        Math.ceil(numDocuments / postsPerPage) - 1,
      ];
      return (
        <button
          disabled={
            (btnIndex > 3 && index === 2) ||
            (index === Math.ceil(numDocuments / postsPerPage) - 2 &&
              btnIndex !== Math.ceil(numDocuments / postsPerPage) - 3 &&
              Math.ceil(numDocuments / postsPerPage) - 2 &&
              btnIndex !== Math.ceil(numDocuments / postsPerPage) - 1)
          }
          key={`button-${index}`}
          onClick={() => {
            setCurrentPage(index);
            setTag(tag);
            history.push(`${tag}-${index + 1}`);
          }}
          style={etcButton}
          // https://stackoverflow.com/questions/37312122/how-to-do-a-nested-if-else-statement-in-reactjs-jsx
          className={
            arr.includes(index) && index === btnIndex
              ? "btn-pagination visible active"
              : arr.includes(index)
              ? "btn-pagination visible"
              : "btn-pagination hide"
          }
        >
          <div
            className="dots-wrapper"
            style={{
              display:
                Math.ceil(numDocuments / postsPerPage) > 5 &&
                index === Math.ceil(numDocuments / postsPerPage) - 2 &&
                btnIndex !== Math.ceil(numDocuments / postsPerPage) - 3 &&
                btnIndex !== Math.ceil(numDocuments / postsPerPage) - 2 &&
                btnIndex !== Math.ceil(numDocuments / postsPerPage) - 1
                  ? "block"
                  : "none",
            }}
          >
            ...
          </div>
          {btnIndex > 3 && index === 2 && numDocuments > 5 ? "..." : index + 1}
        </button>
      );
    });
    return arrs;
  }
  return (
    <div className="pagination">{pagPage(tagsObj[tag], postsPerPage, tag)}</div>
  );
}

export default Pagination;
