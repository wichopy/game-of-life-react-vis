var algorithm = require('./algorithm')

describe('Algorithm', function() {
  test('Any live cell with fewer than two live neighbors dies, as if by under population.', function () {
    expect(algorithm.nextCell(1, 1)).toEqual(0)
  })
  test('Any live cell with two or three live neighbors lives on to the next generation.', function() {
    expect(algorithm.nextCell(1, 2)).toEqual(1)
    expect(algorithm.nextCell(1, 3)).toEqual(1)
  })
  test('Any live cell with more than three live neighbors dies, as if by overpopulation.', function() {
    expect(algorithm.nextCell(1, 4)).toEqual(0)
  })
  test('Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.', function() {
    expect(algorithm.nextCell(0, 3)).toEqual(1)
  })

  describe('Neighbour calculations', function() {
    const grid = [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 1, 0],
    ]
    test('Ideal neighbour calculation', function() {
      expect(algorithm.calculateNeighbours(1,1,grid)).toEqual(4)
    })

    test('Top right corner', function() {
      expect(algorithm.calculateNeighbours(0,0,grid)).toEqual(2)
    })

    test('Top left corner', function() {
      expect(algorithm.calculateNeighbours(0,3,grid)).toEqual(1)
    })

    test('Top edge', function() {
      expect(algorithm.calculateNeighbours(0,1,grid)).toEqual(3)
    })

    test('Left edge', function() {
      expect(algorithm.calculateNeighbours(1,0,grid)).toEqual(2)
    })

    test('Bottom left corner', function() {
      expect(algorithm.calculateNeighbours(2,0,grid)).toEqual(3)
    })

    test('Bottom edge', function() {
      expect(algorithm.calculateNeighbours(2,1,grid)).toEqual(4)
    })

    test('Bottom right corner', function() {
      expect(algorithm.calculateNeighbours(2,3,grid)).toEqual(2)
    })

    test('Right edge', function() {
      expect(algorithm.calculateNeighbours(1,3,grid)).toEqual(2)
    })
  })
})
