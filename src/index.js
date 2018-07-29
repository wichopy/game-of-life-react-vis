import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
const algorithm = require('./algorithm')

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const StyledDiv = styled.div`
  width: fit-content;
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px;
  .grid {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }
  .grid-rows {
    display: flex;
    flex-direction: row;
  }

  .footer {
    display: flex;
    justify-content: space-between;
  }

`
const Cell = styled.div`
    border: 1px solid grey;
    width: 10px;
    height: 10px;
    background-color: ${props => props.alive && 'black'};
`

const Grid = ({ grid }) => (
  <div className="grid">
    {grid.map((row, i) => (
      <div key={'row' + i} className="grid-rows">
        {row.map((col, j) => {
          return <Cell key={'col'+j} alive={col} />
        })}
      </div>
    ))}
  </div>
)

class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      grid: [],
      // TODO: Allow user to adjust the length and width.
      length: 100,
      width: 60,
      iterationNumber: 0,
      play: false,
    }
    this.randomNumber = this.randomNumber.bind(this)
    this.generateGrid = this.generateGrid.bind(this)
    this.runAlgorithm = this.runAlgorithm.bind(this)
    this.isEqual = this.isEqual.bind(this)
    this.playAlgorithm = this.playAlgorithm.bind(this)
    this.stopAlgorithm = this.stopAlgorithm.bind(this)
  }

  playAlgorithm() {
    this.setState({
      play: true
    })
    this.runAlgorithm()
  }

  stopAlgorithm() {
    this.setState({
      play: false
    })
  }

  runAlgorithm() {
    // TODO: Outsource algorithm calculation to service worker.
    const nextGrid = algorithm.nextState(this.state.grid)
    this.setState({
      grid: nextGrid,
      iterationNumber: this.state.iterationNumber + 1,
    })
  }

  componentDidMount() {
    this.generateGrid()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.play) {
      // TODO: Find a better way to "play" the algorithm.
      setTimeout(() => this.isEqual(prevState.grid, this.state.grid), 0.1)
    }
  }

  isEqual (prev, next) {
    // TODO: Outsource these for loops to a service worker.
    let runAgain = false
    for (let i = 0; i < prev.length; i++) {
      if (runAgain) {
        break;
      }
      for (let j = 0; j < prev[i].length; j++) {
        if (prev[i][j] !== next[i][j]) {
          runAgain = true
        }
        if (runAgain) {
          break;
        }
      }
    }

    if (runAgain) {
      this.runAlgorithm()
    }
  }

  randomNumber() {
    return Math.floor(Math.random() * Math.floor(2));
  }

  generateGrid () {
    let grid = new Array(length)
    for (let i = 0; i < this.state.length; i++) { //rows
      grid[i] = new Array(this.state.width)
      for (let j = 0; j < this.state.width; j++) { // cols
        grid[i][j] = this.randomNumber()
      }
    }

    this.setState({ grid })
  }

  render () {
    return (
      <Wrapper>
        <StyledDiv>
          <h1>Game of Life</h1>
          <h4>Length: {this.state.length} Width: {this.state.width}</h4>
          <h3>Iteration: {this.state.iterationNumber} </h3>
          <Grid grid={this.state.grid} />
          <div className="footer">
            <span>
              <button disabled={this.state.play} onClick={this.playAlgorithm}>Start algorithm</button>
              <button onClick={this.stopAlgorithm}>Stop algorithm</button>
            </span>
            <button onClick={this.generateGrid}>Regenerate</button>
          </div>
        </StyledDiv>
      </Wrapper>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById("root"))
