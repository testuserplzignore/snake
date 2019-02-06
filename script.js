const say = msg => console.log(msg);

let gameboard = document.querySelector('.gameboard');
const scoreboard = document.querySelector('.score');
const levelboard = document.querySelector('.level');
let tail = [];
let xy = [];
let character;
let newTail;
let fruit;
let dir;
let checkLevel = false;

let level = 1;
let speed = 200;
let score = 0;
let count = 0;

let rightVel;
let leftVel;
let downVel;
let upVel;

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
    newTail = character = createCharacter();
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

const loseChar = (element) => {
    element.classList.forEach((ele) => {
        if(ele === 'tail'){
            lose() 
        }
    });
};

const loseWall = () => {
    if (!character) {
        lose();
    };
}

const lose = () => {
    alert('you lost');
    clearAllTimeouts();
    document.body.removeEventListener('keydown', userMove);
    gameboard.remove();
    gameboard = document.createElement('div');
    gameboard.classList.add('gameboard');
    tail = [];
    speed = 200;
    score = 0;
    count = 0;
    scoreboard.innerText = '00000';
    level = 1;
    levelboard.innerText = level;
    
    const game = document.querySelector('.game');
    game.appendChild(gameboard);
    gameboard.addEventListener('click', createGameboard);
}

const newPos = () => {
    loseChar(character);
    character.classList.add('tail');
    eatFruit()
    character.classList.remove('character');
    const newId = xy[0] + ',' +xy[1];
    newTail = character;
    character = document.getElementById(newId);
    loseWall()
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
    downVel = setTimeout(moveDown, speed);
};

const moveUp = () => {
    xy[1]--;
    newPos();
    moveTail();
    upVel = setTimeout(moveUp, speed);    
};

const moveLeft = () => {
    xy[0]--;
    newPos();
    moveTail();
    leftVel = setTimeout(moveLeft, speed);
};

const moveRight = () => {
    xy[0]++;
    newPos();
    moveTail();
    rightVel = setTimeout(moveRight, speed);
};

const clearAllTimeouts = () => {
    clearTimeout(rightVel);
    clearTimeout(leftVel);
    clearTimeout(downVel);
    clearTimeout(upVel);
};

const createFruit = () => {
    const x = Math.floor(Math.random() * 47);
    const y = Math.floor(Math.random() * 47);
    fruit = document.getElementById(x+','+y);
    fruit.classList.add('fruit');
};

const updateScore = () => {
    score += (10 * level);
    const str = "" + score;
    const pad = "00000"
    const ans = pad.substring(0, pad.length - str.length) + str
    scoreboard.innerText = ans;
};

const updateLevel = () => {
    if (count % 2 === 0 && checkLevel === true) {
        say("shouldn't be output " + count)
        checkLevel = false;
        level++;
        levelboard.innerText = level;
        speed -= (level * 2);
        clearAllTimeouts();
    };
};

const eatFruit = () => {
    if(character.id === fruit.id) {
        count++;
        fruit.classList.remove('fruit');
        newTail = tail.pop();
        growTail(5);
        createFruit();
        updateScore();
        checkLevel = true;
        updateLevel();
    };
};

const userMove = () => {
    character = document.querySelector('.character');
    xy = parseIdToNum(character.id);
    event.preventDefault();

    if (event.keyCode === 39 && xy[0] <= 47) {
        clearAllTimeouts();
        loseWall()
        moveRight();
        dir = 'right';

    } else if (event.keyCode === 37 && xy[0] >= 0) {
        clearAllTimeouts();
        loseWall()
        moveLeft();
        dir = 'left';

    } else if (event.keyCode === 40 && xy[1] <= 47) {
        clearAllTimeouts();
        loseWall();
        moveDown();
        dir = 'down';

    } else if (event.keyCode === 38 && xy[1] >= 0) {
        clearAllTimeouts();
        loseWall();
        moveUp();
        dir = 'up';
    }
};

gameboard.addEventListener('click', createGameboard);