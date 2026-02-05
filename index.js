//function

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
  return distinctMoves
    .filter(
      (element) =>
        element[0] < 8 && element[0] >= 0 && element[1] < 8 && element[1] >= 0,
    )
    .sort((a, b) => {
      if (a[0] - b[0] == 0) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });
}

function bfsTraversal(startVertex, endVertex) {
  let queue = [startVertex];
  let visitedVertices = [];

  while (queue.length != 0 && !visitedVertices.includes(endVertex)) {
console.log(" ")
    console.log("queue", queue);
    let currentvertex = queue.shift();
    visitedVertices.push(currentvertex);
    let currentVertexMoves = findMoves(currentvertex);

    currentVertexMoves.forEach((element) => {
      if (!comparison(element, visitedVertices)) queue.push(element);
    });
    console.log("visited", visitedVertices);
    if (comparison(endVertex, visitedVertices)) {
      break;
    }
  }
  console.log("final visited", visitedVertices);
}

function comparison(currentVertex, visitedVertices) {
  return visitedVertices.some((Vertex) => {
    return currentVertex.every((element, index) => element === Vertex[index]);
  });
}

function knightMoves(startVertex, endVertex) {
  let possibleMoves = findMoves(startVertex);

  console.log("possible moves", possibleMoves);
  bfsTraversal(startVertex, endVertex);
}

//knightMoves([0, 0]);
knightMoves([0, 0], [3, 3]);
//console.log(findMoves([1, 2]));
