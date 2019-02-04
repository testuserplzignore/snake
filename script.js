const say = msg => console.log(msg);

const gameboard = document.querySelector('#gameboard');
const tail = [];
let xy = [];
let character;
let newTail;

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
    character = createCharacter();
    growTail(10);
    document.body.addEventListener('keyup', userMove);
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

const newPos = () => {
    //say(character);
    character.classList.remove('character');
    //say('xy in new pos: ' + xy);
    const newId = xy[0] + ',' +xy[1];
    newTail = character;
    character = document.getElementById(newId);
    loseCon(character.classList)
    character.classList.add('character');
};

const growTail = (length) => {
    for (let i = 0; i < length; i++) tail.push(newTail);
};

const moveTail = () => {
    //say(newTail);
    newTail.classList.add('tail');
    tail.unshift(newTail);
    const oldTail = tail.pop();
    //say(oldTail);
    oldTail.classList.remove('tail');
};

const moveDown = () => {
    xy[1]++;
    newPos();
    moveTail();
};

const moveUp = () => {
    xy[1]--;
    newPos();
    moveTail();
};

const moveLeft = () => {
    xy[0]--
    newPos();
    moveTail();
};

const moveRight = () => {
    xy[0]++;
    newPos();
    moveTail();
};

const clearAllIntervals = () => {
    clearInterval(rightVel);
    clearInterval(leftVel);
    clearInterval(downVel);
    clearInterval(upVel);
}; 
let rightVel;
let leftVel;
let downVel;
let upVel;

const loseCon = (elementClassList) => {
    elementClassList.forEach((element) => {
        const charXY = parseIdToNum(character.id);
        say(charXY);
        if(element === 'tail'){
            alert('you lost')
        }
        if(charXY[0]>47 || charXY[0]<0){
            alert('you lost')
        }
        if(charXY[1]>47 || charXY[1]<0){
            alert('you lost')
        }
    })
}

const userMove = () => {
    //debugger;
    character = document.querySelector('.character');
    xy = parseIdToNum(character.id);

    if (event.key === 'ArrowRight' && xy[0] < 47) {
        clearAllIntervals();
        rightVel = setInterval(moveRight, 500);
    }

    if (event.key === 'ArrowLeft' && xy[0] > 0) {
        clearAllIntervals();
        leftVel = setInterval(moveLeft, 500);
    }

    if (event.key === 'ArrowDown' && xy[1] < 47) {
        clearAllIntervals();
        downVel = setInterval(moveDown, 500);
    }

    if (event.key === 'ArrowUp' && xy[1] > 0) {
        clearAllIntervals();
        upVel = setInterval(moveUp, 500);
    }
};

gameboard.addEventListener('click', createGameboard);