const say = msg => console.log(msg);

const gameboard = document.querySelector('#gameboard');
const tail = [];

const createGameboard = () => {
    for(let y=0; y<48; y++) {
        row = document.createElement('div');
        row.classList.add('row');

        for(let x=0; x<48; x++){
            tile = document.createElement('div');
            tile.classList.add('tile');
            tile.id = x + ',' + y;

            row.appendChild(tile);
        }

        gameboard.appendChild(row);
    }
    gameboard.removeEventListener('click', createGameboard);
    let character = createCharacter();
    growTail(null, 3);
    document.body.addEventListener('keydown', userMove);
};

const createCharacter = () => {
    const character = document.getElementById('24,24');
    character.classList.add('character');
    return character;
};

const parseIdToNum = (idString) => {
    xy = idString.split(',');
    xy[0] = Number(xy[0]);
    xy[1] = Number(xy[1]);
    return(xy);
};

const newPos = (character) => {
    character.classList.remove('character')
    newId = xy[0] + ',' +xy[1];
    const newTail = character;
    character = document.getElementById(newId);
    character.classList.add('character');
    return newTail;
};

const growTail = (newTail, length) => {
    for (let i = 0; i < length; i++) tail.push(newTail);
};

const moveTail = (newTail) => {
    //say(newTail);
    newTail.classList.add('tail');
    tail.unshift(newTail);
    oldTail = document.getElementById(tail.pop().id);
    say(oldTail);
    oldTail.classList.remove('tail');
}

const manageSnake = (character) => {
    newTail = newPos(character);
    moveTail(newTail);
};


//dead end
//const checkMove = (character, keyPress, axis, xyMax) =>{
//    if (event.key === keyPress && xy[axis] < xyMax) {
//        xy[0]++;
//        newPos(character);
//        say(xy);
//    }
//}

const userMove = () => {
    let character = document.querySelector('.character');
    let xy = parseIdToNum(character.id);
    if (event.key === 'ArrowRight' && xy[0] < 47) {
        setInterval(()=>{
            xy[0]++;
        manageSnake(character);
        }, 500);
        
        //say(xy);
    }

    if (event.key === 'ArrowLeft' && xy[0] > 0) {
        xy[0]--;
        newTail = newPos(character);
        moveTail(newTail);
        //say(xy);
    }
    if (event.key === 'ArrowDown' && xy[1] < 47) {
        xy[1]++;
        newTail = newPos(character);
        moveTail(newTail);
        //say(xy);
    }
    if (event.key === 'ArrowUp' && xy[1] > 0) {
        xy[1]--;
        newTail = newPos(character);
        moveTail(newTail);
        //say(xy);
    }
};

gameboard.addEventListener('click', createGameboard);