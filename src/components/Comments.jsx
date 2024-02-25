import React, { useEffect, useState } from "react";
import Action from "./Action";

function Comments({
  comment,
  handleInsertNode,
  handleDeleteNode,
  handleIsEmptyNode,
}) {
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [oldest, setOldest] = useState(false);
  const [mostReplies, setMostReplies] = useState(false);

  const addComment = () => {
    setExpand(true);
    if (input.length > 0) {
      handleInsertNode(comment.id, input);
    }
    setShowInput(false);
    setInput("");
  };

  const handleNewComment = () => {
    setShowInput(true);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  const handleOldest = () => {
    // setMostReplies((mostReplies) => false);
    if (!mostReplies) {
      if (oldest) {
        setOldest(!oldest);
        comment?.items?.sort((a, b) => b.id - a.id);
      } else {
        setOldest(!oldest);
        comment?.items?.sort((a, b) => a.id - b.id);
      }
    }
  };

  const sortToMostReplies = () => {
    // setOldest((oldest) => false);
    if (!oldest) {
      if (mostReplies) {
        setMostReplies(!mostReplies);
        comment?.items?.sort((a, b) => a.items?.length - b.items?.length);
      } else {
        setMostReplies(!mostReplies);
        comment?.items?.sort((a, b) => b.items?.length - a.items?.length);
      }
      console.log("oldest", oldest, "mostReplies", mostReplies);
    }
  };

  return (
    <div className="w-full overflow-y-scroll no-scrollbar">
      {comment.id == 1 ? (
        <div className="sticky top-0 overflow-y-hidden overflow-x-hidden mb-4">
          <div className="m-4 w-full md:flex">
            <input
              type="text"
              className="py-2 px-1 mr-2 border-b-[1px] w-3/4 border-b-gray bg-[#383636] text-white  outline-none"
              autoFocus={true}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What's Your thought..."
            />
            <Action
              className="px-4 py-2 rounded-sm bg-blue-500 text-white cursor-pointer"
              type="Post"
              handleClick={addComment}
            />
          </div>
          {comment?.items?.length != 0 && (
            <div className="text-white flex justify-start mx-4 space-x-8 w-full sticky">
              <span className="text-white items-center text-xl">
                Sort in...
              </span>
              <div className="flex space-x-2">
                <Action
                  type={oldest ? "Latest" : "Oldest"}
                  className={
                    mostReplies
                      ? "border-2 border-gray-500 text-gray-500 rounded-md px-4 py-1 cursor-pointer"
                      : oldest
                      ? " bg-white rounded-md px-6 py-1 text-black cursor-pointer"
                      : "border-2 border-white rounded-md px-6 py-1 cursor-pointer"
                  }
                  handleClick={handleOldest}
                />
              </div>
              <div className="flex space-x-2">
                <Action
                  type={mostReplies ? "Least Replies" : "Most Replies"}
                  className={
                    oldest
                      ? "border-2 border-gray-500 text-gray-500 rounded-md px-4 py-1 cursor-pointer"
                      : mostReplies
                      ? " bg-white rounded-md px-6 py-1 text-black cursor-pointer"
                      : "border-2 border-white rounded-md px-4 py-1 cursor-pointer"
                  }
                  handleClick={sortToMostReplies}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex text-white justify-start">
          <div className="w-3/4 my-2">
            <div className="text-2xl w-full border-b-2 border-b-[#201f1f]">
              {comment.content}
            </div>
            <div className="text-xs flex justify-between px-4 mx-4 mt-1 space-x-4">
              <Action
                className="text-blue-600 cursor-pointer font-semibold"
                type="Reply"
                handleClick={handleNewComment}
              />
              <Action
                className="text-gray-600 cursor-pointer font-semibold"
                type={expand ? "hide reply" : "show reply"}
                handleClick={() => {
                  setExpand(!expand);
                  console.log(handleIsEmptyNode(comment.id) == true);
                }}
              />
              <Action
                className="text-red-600 cursor-pointer font-semibold"
                type="Delete"
                handleClick={handleDelete}
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <div className={"pl-6"}>
          {showInput && (
            <div className="w-full flex ">
              <input
                className="px-1 mr-2 border-b-[1px] border-b-gray text-white bg-black  outline-none"
                type="text"
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="flex space-x-4 w-1/2 ml-4">
                <Action
                  className="text-blue-500 cursor-pointer"
                  type="Post"
                  handleClick={addComment}
                />
                <Action
                  className="text-gray-600 cursor-pointer"
                  type="Cancel"
                  handleClick={() => {
                    setShowInput(false);
                  }}
                />
              </div>
            </div>
          )}
          <div className={expand ? "pl-6" : "hidden"}>
            {comment?.items?.map((cmt) => (
              <Comments
                key={cmt.id}
                comment={cmt}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleIsEmptyNode={handleIsEmptyNode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
