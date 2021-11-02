const gameBoard = (() => {
    const create = () => [[2,4,8],[3,9,27],[5,25,125]];


    return {
        create
    };
})()

const Player = (name) => {
    let points = 1;
    const getName = () => name;
    const getPoints = () => points;
    const addPoints = (x) => points *= x;

    return {getName, getPoints, addPoints}
}

const gameController = (() => {
    const checkWinner = (player) => {
        let winners = [2*4*8,3*9*27,5*25*125,2*3*5,4*9*25,8*27*125,2*9*125,27*9*5]
        let f = winners.find( w => player.getPoints() % w == 0)
        if (f !== undefined){
            return true
        }
        return false
    }

    return {checkWinner}
})()