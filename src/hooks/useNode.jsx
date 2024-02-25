const useNode = () => {
  const insertNode = function (tree, commentId, item) {
    if (tree.id === commentId) {
      tree.items.unshift({
        id: new Date().getTime(),
        content: item,
        items: [],
      });

      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, commentId, item);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree, id) => {
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === id) {
        tree.items.splice(i, 1);
        return tree;
      } else {
        deleteNode(currentItem, id);
      }
    }

    return tree;
  };

  const isEmptyNode = (tree, id) => {
    let isEmpty = true;

    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === id) {
        return tree.items.length === 0 ? false : true;
      } else {
        isEmpty = isEmpty && isEmptyNode(currentItem, id);
      }
    }

    return isEmpty;
  };

  return { insertNode, deleteNode, isEmptyNode };
};

export default useNode;
