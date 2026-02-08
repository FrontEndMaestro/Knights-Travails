function findMoves(arr) {
  let x = arr[0];
  let y = arr[1];
  let distinctMoves = [
    [x + 1, y + 2],
    [x - 1, y + 2],
    [x + 1, y - 2],
    [x + 2, y + 1],
    [x - 1, y - 2],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x + 2, y - 1],
  ];
  //removing out of bound moves and sorting with 0th element having higher priority
  return distinctMoves.filter(
    (element) =>
      element[0] < 8 && element[0] >= 0 && element[1] < 8 && element[1] >= 0,
  );
}

function bfsTraversal(startVertex) {
  let startVertexObj = { vertex: startVertex, parent: startVertex };
  let parentArray = [startVertexObj];
  let queue = [startVertexObj];
  let visitedVertices = [];
  let previousVertex = startVertexObj;
  while (queue.length != 0) {
    let currentvertex = queue.shift();
    if (findIndexOfObject(currentvertex, visitedVertices) == -1)
      visitedVertices.push({
        vertex: currentvertex.vertex,
        parent:
          currentvertex.parent.vertex == undefined
            ? startVertex
            : currentvertex.parent.vertex,
      });

    let currentVertexMoves = findMoves(currentvertex.vertex);
    currentVertexMoves.forEach((vertex) => {
      if (findIndex(vertex, visitedVertices) == -1)
        queue.push({
          vertex,
          parent: currentvertex.vertex,
        });

      let index = findIndex(vertex, parentArray);
      if (index == -1) {
        parentArray.push({
          vertex: vertex,
          parent: currentvertex.vertex,
        });
      }
    });

    previousVertex = currentvertex;
  }

  return parentArray;
}

//compare object with array of objects
function findIndexOfObject(currentVertex, VerticesArray) {
  return VerticesArray.findIndex(
    (element) =>
      element.vertex[0] == currentVertex.vertex[0] &&
      element.vertex[1] == currentVertex.vertex[1],
  );
}

//compare array with array of objects
function findIndex(currentVertex, VerticesArray) {
  return VerticesArray.findIndex(
    (element) =>
      element.vertex[0] == currentVertex[0] &&
      element.vertex[1] == currentVertex[1],
  );
}

function knightMoves(startVertex, endVertex) {
  let parentArray = bfsTraversal(startVertex, endVertex);

  console.log(`Shortest Path from [${startVertex}] to [${endVertex}]`);
  console.log(constructPath(startVertex, endVertex, parentArray));
}

function constructPath(startVertex, endVertex, parentArray) {
  let path = [];
  let endIndex = findIndex(endVertex, parentArray);
  let currentVertex = parentArray[endIndex];
  while (JSON.stringify(currentVertex.vertex) != JSON.stringify(startVertex)) {
    path.push(currentVertex.vertex);
    currentVertex = parentArray[findIndex(currentVertex.parent, parentArray)];
  }
  path.push(startVertex);
  return path.reverse();
}
knightMoves([3, 3], [0, 0]);
