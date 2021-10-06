// constants to set the canvas size to the size of the window
const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight
// variables for the ball
let ballX = canvasWidth/2
let ballY = canvasHeight/2
let ballSize = canvasWidth/30
let ballColor = [220, 0, 220]
let ballSpeed = 10
// variables for the goal
let goalSize = canvasWidth/20
let goalX = canvasWidth - canvasWidth/10
let goalY = canvasHeight/2 - goalSize
let goalColor = [220,220,0]


function setup(){
    createCanvas(canvasWidth, canvasHeight)

}

function draw(){
    background(30)
    // now we have some functions (below) that draw our characters!
    drawGoal(goalX, goalY, goalSize, goalColor)
    drawCharacter(ballX, ballY, ballSize, ballColor)


    // can you make a function that checks if the ball has reached its target????


}

function keyPressed(){
    console.log(key)
    if(key === 'd'){
        ballX+=ballSpeed
    }
    // now make it go other directions when other keys are pressed
}

// notice how we define the parameters and then use them in the function
// so the names are different than they are when we call the function in our draw loop
// we can call the parameters anything we want but we have to use the right parameter
// names in our function body
function drawGoal(x, y, size, col){
    fill(col)
    rect(x,y, size, size * 2)
}

function drawCharacter(x, y, size, col){
    fill(col)
    ellipse(x, y, size)
}



// function makeCharacter(x,y,size,color){
//     return{
//         x:x,
//         y:y,
//         size:size,
//         color: color
//     }
// }