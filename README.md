# snake
## snake implemented using HTML, CSS and JS

## Live preview

http://tacky-thrill.surge.sh/

### MVP

* Snake moves with const velocity 
* snake turns in direction of key press 
* snake tail gets longer when it eats a target 
* game is lost when snake collides with wall or self 

### DESIRED IMPLEMENTATION

* game title
* ~~game instructions~~
* score goes up as snake eats targets 
* score is displayed on page 
* ~~"New High Score!" message when new high score for browser session is achieved~~
* level increases as snake gets longer 
* higher levels give more points for each target 
* snake speed increases with level 
* level is displayed on page

### Additional Resources
[thanks to Paradox Interactive and the Knights of Pen and Paper 2 team for the background images](https://store.steampowered.com/app/310060/Knights_of_Pen_and_Paper_2/)

shoutout to all the people who answer questions on stackOverflow

### Code Snippet

```const moveDown = () => {
    xy[1]++;
    newPos();
    moveTail();
    downVel = setTimeout(moveDown, speed);
};```

originally the snake moved via a setInterval. However setIntervals do not allow for the interval to be dynamically changed, the interval needs to be cleared and a new one set. By having my move functions recursively set a timeout on themseleves I approximate a setInterval that can have the interval dynamically changed

### Issues

issue: setInterval sucks


resolution: don't use setInterval