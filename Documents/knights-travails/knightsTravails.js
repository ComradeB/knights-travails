const chessboard = new Array(8).fill(null).map((el, index) => {
    return el = new Array(8)
      .fill(null)
      .map((subElement, subIndex) => {
      return subElement = [index + 1, subIndex + 1]
    })
  })
  
  class Knight {
      constructor(position) {
          this.position = position
      }
      
      setPosition(newPosition) {
          if (this.isOnChessboard(newPosition) === false) {
              return console.log("Invalid position! Arrays of length 2 with integer values between 1-8 only!")  
          }
          console.log(`New position: [${newPosition}]`)
          return this.position = newPosition
      }
          
      availableMoves() {
          const x = this.position[0]
          const y = this.position[1]
          const moves = []
          const possibleMoves = [
              [x + 2, y + 1],
              [x - 2, y + 1],
              [x - 2, y - 1],
              [x + 2, y - 1],
              [x - 1, y + 2],
              [x + 1, y + 2],
              [x + 1, y - 2],
              [x - 1, y - 2],
          ]
          
          for (let move of possibleMoves) {
              if (move[0] <= 8 && move[1] <= 8 && move[0] >= 1 && move[1] >= 1) {
                  moves.push(move)
              } else continue
          }
          // console.log(`Available moves:`)
          // console.log(moves)
          return moves
      }
      
      // checkMoveValidity(move) {
      //     for (let possibleMove of this.availableMoves()) {
      //         const [moveX, moveY] = move
      //         const [possibleMoveX, possibleMoveY] = possibleMove
      //         if (possibleMoveX === moveX && possibleMoveY === moveY) {
      //             console.log("Yay, valid move!")
      //             return true
      //         }
      //     }
      //         console.log("Nooooo, invalid move!!!")
      //         return false
      // }
      
      // moveTo(move) {
      //     if (!this.checkMoveValidity(move)) return 
      //     return this.setPosition(move)
      // }
      
      isOnChessboard(position) {
          chessboard.some(rowNumber => rowNumber.some(position => position.every((coord, index) => coord === position[index]))) ? true : false
      }
      
      shortestPath(endPosition, shortestPathArray = []) {
          if (this.isOnChessboard(endPosition) === false) {
              return console.log(`${endPosition} is not a valid position!`)
          }
          if (endPosition.every((coord, index) => coord === this.position[index])) return console.log(`...and we're finally there! The path was ${shortestPathArray}, total moves: ${shortestPathArray.length}`) 
          
          const manhattanDistances = []
          for (let i=0; i < this.availableMoves().length; i++) {
              manhattanDistances.push({
                  move: this.availableMoves()[i],
                  distance: Math.abs(this.availableMoves()[i][0] - endPosition[0]) + Math.abs(this.availableMoves()[i][1] - endPosition[1])
              })
          }
  
          manhattanDistances.sort((a, b) => a.distance - b.distance)
          shortestPathArray.push(
              shortestPathArray.some(move => move.every((coord, index) => coord === manhattanDistances[0].move[index])) === false ? (manhattanDistances[0].move, this.setPosition(manhattanDistances[0].move)) : (manhattanDistances[1].move, this.setPosition(manhattanDistances[1].move))
          )
          this.shortestPath(endPosition, shortestPathArray)
      }
  }
  
  const KnightOne = new Knight([1,1])
  KnightOne.shortestPath([8,8])