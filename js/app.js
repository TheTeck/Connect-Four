// State Variables
let board
let isGameOver
let player
let activeColumn
let winningFour

// Cached HTML Elements
const boardEl = document.getElementById('board')
const crownEl = document.getElementById('crown')
const msgEl = document.getElementById('msg')

// Event Listeners
boardEl.addEventListener('click', dropChip)
boardEl.addEventListener('mouseover', setActive)
boardEl.addEventListener('mouseleave', removeActive)
crownEl.addEventListener('click', dropChip)

init()

/////////////////////////////////////////////////////
//////////   Variable Initialization   /////////////
///////////////////////////////////////////////////
function init () {

    // Build 2D array representing the spaced of the board
    board = []

    for (let y = 0; y < 7; y++) {
        let row = []
        for (let x = 0; x < 6; x++) {
            row.push('emptyCell')
        }
        board.push(row)
    }

    // Set the player 1 is first
    player = 1

    // Game is not over at first
    isGameOver = false

    activeColumn = null

    render()
}

/////////////////////////////////////////////////////
//////////     Render DOM Elements     /////////////
///////////////////////////////////////////////////
function render () {
    
    // it is an active game
    if (!isGameOver) {
        // Board on screen not made yet
        if (!boardEl.hasChildNodes()) {
            board.forEach((c, x_index) => {
                const col = document.createElement('div')
                col.setAttribute('id', `${x_index}`)
                col.classList.add('column')

                // Give crown child divs
                const crown = document.createElement('div')
                crown.setAttribute('id', `crown_${x_index}`)
                crown.classList.add('column_crown')
                crown.style.visibility = 'hidden'
                crownEl.appendChild(crown)

                board[0].forEach((r, y_index) => {
                    const row = document.createElement('div')
                    row.setAttribute('id', `${x_index},${y_index}`)
                    row.classList.add('emptyCell')
                    col.appendChild(row)
                })

                boardEl.appendChild(col)
            })
        } else {
            board.forEach((c, x_index) => {
                board[x_index].forEach((r, y_index) => {
                    document.getElementById(`${x_index},${y_index}`).className = r
                })
            })

            const childArray = Array.from(crownEl.childNodes)
            childArray.forEach(node => {
                node.style.visibility = 'hidden'
            })

            if (activeColumn !== null) {
                const activeCrown = document.getElementById(`crown_${activeColumn}`)
                activeCrown.style.visibility = 'visible'
            }
        }
    } else {

    }
}

/////////////////////////////////////////////////////////////////////////
//////////     Define which column mouse is hoving over    /////////////
///////////////////////////////////////////////////////////////////////
function setActive (e) {
    if (e.target.className === "emptyCell" || "player1Cell" || "player2Cell")
        activeColumn = +e.target.id.split(',')[0]
    else 
        activeColumn = +e.target.id
    render()
}

///////////////////////////////////////////////////////////////
//////////     Removes the activeColumn value    /////////////
/////////////////////////////////////////////////////////////
function removeActive () {
    activeColumn = null
    render()
}

//////////////////////////////////////////////////////////////////////////////////
//////////     Drops chips to lowest position and switched player   /////////////
////////////////////////////////////////////////////////////////////////////////
function dropChip () {
    if (board[activeColumn][board[0].length-1] === 'emptyCell') {
        const lowestIndex = board[activeColumn].findIndex(element => {
            return element === 'emptyCell'
        })
        board[activeColumn][lowestIndex] = `player${player}Cell`
        player = player === 1 ? 2 : 1
        render()
    }
}

function checkForWin () {

}