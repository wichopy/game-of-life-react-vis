import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
// const Cell = require('./components/Cell')
const algorithm = require('./algorithm')

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
      length: 50,
      width: 40,
    }
    this.randomNumber = this.randomNumber.bind(this)
    this.generateGrid = this.generateGrid.bind(this)
    this.runAlgorithm = this.runAlgorithm.bind(this)
  }

  runAlgorithm() {
    const nextGrid = algorithm.nextState(this.state.grid)
    this.setState({ grid: nextGrid })
  }

  componentDidMount() {
    this.generateGrid()
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
          <Grid grid={this.state.grid} />
          <div className="footer">
            <button onClick={this.runAlgorithm}>Next Step</button>
            <button onClick={this.generateGrid}>Regenerate</button>
          </div>
        </StyledDiv>
      </Wrapper>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById("root"))
