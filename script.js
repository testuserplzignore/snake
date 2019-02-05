const say = msg => console.log(msg);

const gameboard = document.querySelector('#gameboard');
const tail = [];
let xy = [];
let character;
let newTail;
let fruit;
let speed = 200;

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
    newTail = character;
    createFruit();
    growTail(5);
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

const loseCon = (element) => {
    if(!element){
        lose()
    }
    element.classList.forEach((ele) => {
        if(ele === 'tail'){
            lose() 
        }
        
    });
};

const lose = () => {
    alert('you lost');
    clearAllIntervals();
    document.body.removeEventListener('keyup', userMove);
    //gameboard.addEventListener('click', createGameboard);
}

const newPos = () => {
    debugger;
    loseCon(character);
    character.classList.add('tail');
    eatFruit()
    character.classList.remove('character');
    const newId = xy[0] + ',' +xy[1];
    newTail = character;
    character = document.getElementById(newId);
    say(character);
    character.classList.add('character');
};

const growTail = (length) => {
    for (let i = 0; i < length; i++) tail.push(newTail);
};

const moveTail = () => {
    newTail.classList.add('tail');
    tail.unshift(newTail);
    const oldTail = tail.pop();
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

const createFruit = () => {
    const x = Math.floor(Math.random() * 47);
    const y = Math.floor(Math.random() * 47);
    fruit = document.getElementById(x+','+y);
    fruit.classList.add('fruit');
};

const eatFruit = () => {
    say(character.id);
    say(fruit.id);
    if(character.id === fruit.id) {
        fruit.classList.remove('fruit');
        newTail = tail.pop()
        growTail(5);
        createFruit();
    }
};

const userMove = () => {
    event.preventDefault();
    character = document.querySelector('.character');
    xy = parseIdToNum(character.id);

    if (event.keyCode === 39 && xy[0] < 47) {
        clearAllIntervals();
        moveRight();
        rightVel = setInterval(moveRight, speed);
    } else if (event.keyCode === 37 && xy[0] > 0) {
        clearAllIntervals();
        moveLeft();
        leftVel = setInterval(moveLeft, speed);
    } else if (event.keyCode === 40 && xy[1] < 47) {
        clearAllIntervals();
        moveDown();
        downVel = setInterval(moveDown, speed);
    } else if (event.keyCode === 38 && xy[1] > 0) {
        clearAllIntervals();
        moveUp();
        upVel = setInterval(moveUp, speed);
    }
};

gameboard.addEventListener('click', createGameboard);