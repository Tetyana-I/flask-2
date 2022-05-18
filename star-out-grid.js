// A MxN grid is passed into a function.

// The function returns a grid with all cells in a column or row originally containing a star turned into stars.
//  Values which have been transformed into stars do not affect their rows and columns. 

// For example, for an input:
// [ ['A', 'B', 'C'], ['D', '*', 'E'], ['F', 'G', 'H'] ]
// it returns: 
// [ ['A', '*', 'C'], ['*', '*', '*'], ['F', '*', 'H'] ]

function starOutGrid(grid) {
    let xSet = new Set();
    let ySet = new Set();
    
    for (let y=0; y < grid.length; y++) {
        let x=0;
        while (x < grid[0].length) {
            if (grid[y][x] === '*') {
                xSet.add(x);
                ySet.add(y);
                break;
            }  else {
                x++;
            }  
        }
    }

    for (let y=0; y < grid.length; y++) {
        for (let x=0; x <  grid[0].length; x++) {
            if (xSet.has(x) || ySet.has(y)) {
                grid[y][x] = '*';
            }
        }

    }
    return grid;
}
