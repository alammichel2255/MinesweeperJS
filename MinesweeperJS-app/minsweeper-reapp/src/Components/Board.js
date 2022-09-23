import React, { useEffect, useState } from "react";
import createBoard from '../Utility/CreateBoard';
import { Cell } from "./Cell";

const Board = () => {
    const [grid, setGrid] = useState([]);


    //Mount
    useEffect(() => {
        function freshBoard() {
            const newBoard = createBoard(10, 10, 20);
            setGrid(newBoard.board);
        }
        //Function is called
        freshBoard();
    }, []);

    //Right Click Flags the cell
    const updateFlag = (e, x, y) => {
        // prevent the menu on right click
        e.preventDefault();
        //Copy of state
        let newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[x][y].flagged = true;
        setGrid(newGrid);
    }

    //Reveal cell
    const revealCell = (x, y) => {
        let newGrid = JSON.parse(JSON.stringify(grid));
        if (newGrid[x][y].value === 'X') {
            alert("Mine Found!")
        } else {
            newGrid[x][y].revealed = true;
            setGrid(newGrid);
        }
    }

    return grid.map((singleRow, index1) => {
        return (
            <div style={{ display: "flex" }} key={index1}>
                {singleRow.map((singleBlock, index2) => {
                    return <Cell
                        revealCell={revealCell}
                        details={singleBlock}
                        updateFlag={updateFlag}
                        key={index2} />
                })}
            </div>
        )
    })
}

export default Board;

