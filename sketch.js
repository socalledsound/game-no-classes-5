// constants to set the canvas size to the size of the window
const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight
// i changed these variable names
// and also changed them where we call the functions
// variables for mario
let marioX = canvasWidth/2
let marioY = canvasHeight/2
let marioWidth = canvasWidth/30
let marioHeight = canvasWidth/15
let marioSpeed = 20

const numCoins = 10
const coinWidth = canvasWidth/30
const coinHeight = canvasWidth/15
let coins

let score = 0
let started = false
let levelComplete = false

let startButton


// now lets load in some assets
let marioImg, coinImg, coinSound

// HEY! notice that to use sounds we have to add the p5.sound library to libs
// and then import it in our index.html

function preload(){
    marioImg = loadImage('./assets/mario.png')
    coinImg = loadImage('./assets/coin.png')
    coinSound = loadSound('./assets/coin.mp3')
}

function setup(){
    createCanvas(canvasWidth, canvasHeight)
    // all right let's make an array of coins
    // we'll store the variables in an object
    // notice that I moved it in here so we can add the image and sound successfully
    // we could give each coin a different sound and image!
     coins = Array.from({ length:  numCoins}, (el, i) => {
        return ({
            // we'll keep track of the index of this coin, you'll find out why
            idx: i,
            img: coinImg,
            snd: coinSound,
            x: coinWidth + random(0, canvasWidth - coinWidth),
            y: coinHeight + random(0, canvasHeight - coinHeight),
            w: coinWidth,
            h: coinHeight,
            collected: false,
        })
    })

    // we also have to initialize the start button here because that's also a p5 function
    // i also added some styling in the index.html
    startButton = createButton('start')
    startButton.mousePressed(startGame)
    startButton.position(canvasWidth/2 - canvasWidth/22, canvasHeight/2 + canvasWidth/22)
}

function draw(){
    background(30)

    // let's add a start screen
    if(!started){
       drawStartScreen()
    }else{
        drawGame()
    }



}

function keyPressed(){
    console.log(key)
    if(key === 'd'){
        marioX+=marioSpeed
    }
    if(key === 'a'){
        marioX-=marioSpeed
    }
    if(key === 'w'){
        marioY-=marioSpeed
    }
    if(key === 's'){
        marioY+=marioSpeed
    }
    
}

function startGame(){
    started = true
    startButton.hide()
}


// let's put the whole game in a function
function drawGame(){
    if(score > numCoins - 1){
        levelComplete = true
    }
    // let's also add a successful finish to this game
    if(!levelComplete){

    //let's also draw a scoreboard
    drawScoreboard(score)

    // now we have some functions (below) that draw our characters!
    // instead of a color let's pass in an image
    drawMario(marioImg, marioX, marioY, marioWidth, marioHeight)



    // let's draw any coins that haven't been collected
    coins.forEach(coin => {
        // notice how this might look better if we did actually turn mario data
        // into an object too, then we could just pass mario in
        checkCollected(marioX, marioY, marioWidth, marioHeight, coin)
        if(!coin.collected){
            drawCoin(coin)
        }
       
    })
    }else{
        drawLevelComplete()
        startButton.show()
    }

    

}

// new draw functions now, they use an image instead
// we could probably write just one but I like the way it looks in the draw loop better this way personally
// and later if we want to change the way we draw this we can
function drawMario(img, x, y, w, h){
    image(img, x, y, w, h)
}

// notice that I added the curly braces when bringing in the parameters
// this will pull those values off of the objects
function drawCoin({img, x, y, w, h}){
    image(img, x, y, w, h)
}


function drawStartScreen(){
    fill(255)
    textSize(30)
    text('ready?', canvasWidth/2 - canvasWidth/16, canvasHeight/2 - canvasHeight/10)
    text('push the button below', canvasWidth/2 - canvasWidth/6, canvasHeight/2 - canvasHeight/30)
    
}

function drawLevelComplete(){
    fill(255)
    textSize(30)
    text('levelComplete!', canvasWidth/2 - canvasWidth/10, canvasHeight/2 - canvasHeight/10)
    text('try again?', canvasWidth/2 - canvasWidth/12, canvasHeight/2 - canvasHeight/30)
    
}


function drawScoreboard(score){
    fill(255)
    textSize(30)
    text('score : ', 40, 40)
    text(score, 140, 42)
}



function checkCollected(marioX, marioY, marioWidth, marioHeight, coin){
    if(!coin.collected){
        const gotPaid = checkGoal(marioX, marioY, marioWidth, marioHeight, coin.x, coin.y, coin.w, coin.h)
        if(gotPaid){
            coin.collected = true
            score++
            coin.snd.play()
        }
    }
}

function checkGoal(x1,y1,w1, h1, x2, y2, w2, h2){
    if(x1 + w1 > x2 &&
        x1 < x2 + w2 && 
        y1 < y2 + h2 &&
        y1 + h1 > y2  ){
            return true
        } else {
            return false
        }
}



// maybe something like this would be helpful
// function makeMario(img, snd, x,  y,w, h){
//     return ({
 //             img: img,
   //           snd: snd,
//              x:x,
//              y:y,
//              w:w,
//              h:h
//              speed: 20
//          })
// }

//not using this any more


    // // every time through the draw loop let's check if mario made it to the coin
    // let atGoal = checkGoal(marioX, marioY, marioWidth, marioHeight, coinX, coinY, coinWidth, coinHeight)

    // if(atGoal){
    //  // now we need to add an extra step to this 
    // // because we will stay at the goal.
    // // let's keep track of whether the coin has been collected previously
    // // I'm going to use an array, I bet you can guess why?
    // // we'll find out in the next version of this
    //     if(!coinsCollected[0]){

    //         coinsCollected[0]  =true
    //         score++
    //         coinSound.play()
    //     }


    // }


// notice how again I used different parameter names rather than the specific ones in the main program
// that way we can use this function again in another project if we want to
// function checkGoal(x1,y1,w1, h1, x2, y2, w2, h2){
//     if(x1 + w1 > x2 &&
//         x1 < x2 + w2 && 
//         y1 < y2 + h2 &&
//         y1 + h1 > y2  ){
//             return true
//         } else {
//             return false
//         }
// }

