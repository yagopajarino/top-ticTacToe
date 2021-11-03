const gameBoard = (() => {
    const display = () => {
        let body = document.querySelector("body")
        let oldTablero = document.querySelector(".tabContainer")
        let divTablero = document.createElement("div")
        divTablero.classList.toggle("tabContainer")
        if (oldTablero != null) {
            oldTablero.remove()
        }

        let d1 = document.createElement("div")
        let n1 = document.createElement("input")
        n1.id = "name1"
        n1.value = p1 == undefined ? "player one name" : p1.getName()

        let n2 = document.createElement("input")
        n2.id = "name2"
        n2.value = p2 == undefined ? "player two name" : p2.getName()

        d1.appendChild(n1)
        d1.appendChild(n2)
        divTablero.appendChild(d1)

        let table = document.createElement("table")
        let primes = [2,3,5]
        primes.forEach(p => {
            let row = document.createElement("tr")
            table.appendChild(row)
            for (let y = 1; y < 4; y++){
                let cell = document.createElement("td")
                cell.id = `${p**y}`
                row.appendChild(cell)
            }
        })

        let beginBtn = document.createElement("button")
        beginBtn.textContent = "Start Game"
        beginBtn.classList.toggle("beginBtn")

        divTablero.appendChild(table)
        divTablero.appendChild(beginBtn)
        body.appendChild(divTablero)
    };


    return {
        display
    };
})()

const Player = (name) => {
    let points = [[]];
    const getName = () => name;
    const getPoints = () => points;
    const addPoints = (x) => {
        if(points[0].length < 3){
            points[0].push(x)
        }
        else {
            console.log(points)
            let a = points[0]
            a.push(x)
            for(let y = 0; y < a.length; y++){
                let n = a.slice(0,y).concat(a.slice(y+1,a.length))
                points.push(n)
            }
            console.log(points)
        }
    }

    return {getName, getPoints, addPoints}
}

const gameController = (() => {
    const checkWinner = (player) => {
        let winners = [2*4*8,3*9*27,5*25*125,2*3*5,4*9*25,8*27*125,2*9*125,8*9*5]
        let points = player.getPoints()
        let f = false
        points.forEach(p => {
            winners.forEach(w => {
                let c = p.reduce((n,q) => n*q)
                if(c == w){
                    f = true
                }
            });
        });
        if (f){
            let wintext = `${player.getName()} wins!`
            displayResult(wintext)            
        }
        return false
    }

    const displayResult = (text) => {
        let tablero = document.querySelector(".tabContainer")
        let div = document.createElement("div")
        let p = document.createElement("div")
        p.textContent=`${text}`
        div.appendChild(p)
        tablero.appendChild(div)
        let tds = document.querySelectorAll("td")
        tds.forEach(td => {
            td.classList.toggle("finished")
        });
        let refreshBtn = document.createElement("button")
        refreshBtn.textContent = "Restart"
        tablero.appendChild(refreshBtn)
        refreshBtn.addEventListener("click", restart)
    }

    let moveCounts = 0
    const play = (e) => {
        if (e.target.classList.length == 0) {
            let points = e.target.id
            if (moveCounts % 2 === 0){
                e.target.textContent = "X"
                p1.addPoints(points)
                checkWinner(p1)
            }
            else {
                e.target.textContent = "O"
                p2.addPoints(points)
                checkWinner(p2)
            }
            moveCounts ++
            e.target.classList.toggle("selected")
            if(moveCounts == 9){
                displayResult("Game tied")
            }
        }
    }

    const startGame = () => {
        let name1 = document.querySelector("#name1")
        let name2 = document.querySelector("#name2")
        p1 = Player(name1.value)
        p2 = Player(name2.value)
        let b = document.querySelector(".beginBtn")
        b.hidden = true
        let tds = document.querySelectorAll("td")
        tds.forEach(td => {
        td.addEventListener("click", gameController.play.bind(this))
        moveCounts = 0
        });
    }

    return {checkWinner, play, startGame}
})()

let p1
let p2
restart()
function restart() {
    gameBoard.display()
    let b = document.querySelector(".beginBtn")
    b.addEventListener("click", gameController.startGame)
}


