import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
// const Cell = require('./components/Cell')

const StyledDiv = styled.div`
  .grid {
    display: flex;
    flex-direction: column;
  }
  .grid-rows {
    display: flex;
    flex-direction: row;
  }

`
const Cell = styled.div`
    border: 1px solid grey;
    width: 50px;
    height: 50px;
    background-color: ${props => props.alive && 'black'};
`
const grid = [
  [0,0,1,1,0],
  [0,0,1,1,0],
  [1,0,1,1,0],
  [1,0,1,1,0],
  [1,0,1,1,0],
]

const Grid = ({ grid }) => (
  <div className="grid">
    {grid.map(row => (
      <div className="grid-rows">
        {row.map(col => {
          return <Cell alive={col} />
        })}
      </div>
    ))}
  </div>
)

const Index = () => (
  <StyledDiv>
    <Grid grid={grid} />
  </StyledDiv>
)

ReactDOM.render(<Index />, document.getElementById("root"))
