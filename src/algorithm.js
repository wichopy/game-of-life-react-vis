const nextCell = (cell, neighbours) => {
  if (cell === 1 && neighbours < 2 || cell ===1 && neighbours > 3) {
    return 0
  }
  if (cell === 0 && neighbours === 3) {
    return 1
  }
  if (cell === 1 && (neighbours === 2 || neighbours === 3)) {
    return 1
  }

  return cell
}

const calculateNeighbours = (
  i, // row
  j, // col
  grid
) => {
  let neighbours = 0
  let topLeft, topCenter, topRight
  let bottomLeft, bottomCenter, bottomRight
  let left, right
  if (grid[i-1] === undefined) {
    topLeft = 0
    topCenter = 0
    topRight = 0
  } else {
    topLeft      = grid[i-1][j-1] === undefined ? 0 : grid[i-1][j-1]
    topCenter    = grid[i-1][j]   === undefined ? 0 : grid[i-1][j]
    topRight     = grid[i-1][j+1] === undefined ? 0 : grid[i-1][j+1]
  }
  if (grid[i+1] === undefined) {
    bottomLeft = 0
    bottomCenter = 0
    bottomRight = 0
  } else {
    bottomLeft   = grid[i+1][j-1] === undefined ? 0 : grid[i+1][j-1]
    bottomCenter = grid[i+1][j]   === undefined ? 0 : grid[i+1][j]
    bottomRight  = grid[i+1][j+1] === undefined ? 0 : grid[i+1][j+1]
  }
  left = grid[i][j-1] === undefined ? 0 : grid[i][j-1]
  right = grid[i][j+1] === undefined ? 0 : grid[i][j+1]
  neighbours = (
    topLeft + topCenter + topRight +
    left + right +
    bottomLeft + bottomCenter + bottomRight
  )

  return neighbours
}

const nextState = (grid) => {
  const nextState = [...grid]
  grid.forEach((row, i) => {
    nextState[i] = [...row]
    grid.forEach((col, j) => {
      const neighbours = calculateNeighbours(i, j, grid)
      // FIXME: Remove empty values
      if (nextState[i][j] === undefined) {
        return
      }
      nextState[i][j] = nextCell(nextState[i][j], neighbours)
    })
  })

  return nextState
}

module.exports = {
  calculateNeighbours,
  nextState,
  nextCell,
}
