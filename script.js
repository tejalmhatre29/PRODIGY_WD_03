const cells=document.querySelectorAll('[data-cell]');
const board=document.getElementById('board');
const restart_button=document.getElementById('restart');

let isXturn=true;

const winning_combinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

startGame();
function startGame(){
    cells.forEach(cell=>{
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.innerText ='';
        cell.addEventListener('click',handleClick,{once:true});
    });

    isXturn=true;
    board.classList.remove('x','o');
    board.classList.add('x');
}

function handleClick(e)
{
    const cell=e.target;
    const currentClass=isXturn ? 'x' : 'o';
    placeMark(cell,currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    }else if(isDraw())
    {
        endGame(true);
    }else {
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
    cell.innerText=currentClass.toUpperCase();
}

function swapTurns(){
    isXturn=!isXturn;
}

function setBoardHoverClass(){
    board.classList.remove('x','o');
    board.classList.add(isXturn ? 'x' : 'o');
}

function checkWin(currentClass){
    return winning_combinations.some(combination =>{
        return combination.every(index =>{
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw(){
    return [...cells].every(cell=>{
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function endGame(draw){
    setTimeout(()=>{
        if(draw){
            alert("Its a draw");
        } else{
            alert(`${isXturn ? "X" : "O"} wins the game`);
        }
    },100);
}

restart_button.addEventListener('click',startGame);