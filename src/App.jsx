import { useState } from "react";
import Comments from "./components/Comments";
import useNode from "./hooks/useNode";

const comments = {
  id: 1,
  items: [],
};

function App() {
  const [commentsData, setCommentsData] = useState(comments);

  const { insertNode, deleteNode, isEmptyNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };

  const handleIsEmptyNode = (folderId) => {
    isEmptyNode(commentsData, folderId);
  };

  return (
    <div className="w-screen h-screen flex justify-center bg-black text-white">
      <div className="w-1/2  flex justify-center h-screen overflow-hidden">
        <Comments
          comment={commentsData}
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          handleIsEmptyNode={handleIsEmptyNode}
        />
      </div>
    </div>
  );
}

export default App;
