import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

function Pagination({ tagsObj, tag, postsPerPage, setCurrentPage, setTag }) {
  const [btnIndex, setBtnIndex] = useState(0);
  const [numDocuments, setNumDocuments] = useState(tagsObj[tag].length);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    console.log(Math.ceil(numDocuments / postsPerPage) - 3);
    setBtnIndex(location.pathname.slice(1).split("-")[1] - 1);
  }, [location.pathname]);
  function pagPage(arrLength, page) {
    let numOfPages = Math.ceil(arrLength.length / page);
    let arrs = Array.from({ length: numOfPages }, (_v, index) => {
      const middle = Math.ceil(numDocuments / postsPerPage / 2);
      // console.log(Math.ceil(numDocuments / 5));
      const arr = [
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
            index === Math.ceil(numDocuments / postsPerPage) - 2 &&
            btnIndex !== Math.ceil(numDocuments / postsPerPage) - 3 &&
            Math.ceil(numDocuments / postsPerPage) - 2 &&
            btnIndex !== Math.ceil(numDocuments / postsPerPage) - 1
          }
          key={`button-${index}`}
          onClick={() => {
            console.log(index);
            setCurrentPage(index);
            setTag(tag);
            history.push(`${tag}-${index + 1}`);
          }}
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
          {index + 1}
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
