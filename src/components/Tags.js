import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Tags({ tagsArr, setTag, setCurrentPage }) {
  const history = useHistory();
  const [active, setActive] = useState(true);
  const [currentBtn, setCurrentBtn] = useState(0);
  return (
    <div className="tags">
      {tagsArr.map((tag, index) => (
        <button
          key={tag}
          onClick={(e) => {
            setTag(tag);
            setCurrentPage(0);
            history.push(`/${tag}-1`);
            setCurrentBtn(index);
          }}
          className={index === currentBtn ? "btn-tag active" : "btn-tag"}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default Tags;
