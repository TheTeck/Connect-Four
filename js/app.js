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
boardEl.addEventListener('pointerover', showActive)
boardEl.addEventListener('pointerout', hideActive)
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
        }
    } else {

    }
}

function showActive (e) {
    if (e.target.className === "emptyCell" || "player1Cell" || "player2Cell")
        e.target.parentNode.style.border = "1px solid gold"
    else 
        e.target.style.border = "1px solid gold"
    render()
}

function hideActive (e) {
    e.target.style.border = "none"
    render()
}

function dropChip () {

}

function checkForWin () {

}