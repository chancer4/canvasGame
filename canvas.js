var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;
var dx = -2;
var dy = -5;
var ballRadius = 10;
var fillColor = "#FF0000";
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleSpeed= 7;
var rightPressed = false;
var leftPressed = false;
var interval = 10;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickRowCount2 = 5;
var brickColumnCount2 = 8;
var brickWidth2 = 50;
var brickHeight2 = 10;
var brickPadding2 = 5;
var brickOffsetTop2 = 30;
var brickOffsetLeft2 = 30;
var score = 0;
var lives = 3;


var bricks = [];
for(c=0;c<brickColumnCount;c++){
	bricks[c] = [];
	for(r=0;r<brickRowCount;r++){
		bricks[c][r] = {x:0,y:0,status:1};
	}
}
var bricks2 = [];
for(cTwo=0;cTwo<brickColumnCount2;cTwo++){
	bricks2[cTwo] = [];
	for(rTwo=0;rTwo<brickRowCount2;rTwo++){
		bricks2[cTwo][rTwo] = {x:0,y:0,status:1};
	}
}
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove",mouseMoveHandler,false);

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = fillColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawBricks2() {
    for(cTwo=0; cTwo<brickColumnCount2; cTwo++) {
        for(rTwo=0; rTwo<brickRowCount2; rTwo++) {
            if(bricks2[cTwo][rTwo].status == 1) {
                var brickX2 = (cTwo*(brickWidth2+brickPadding2))+brickOffsetLeft2;
                var brickY2 = (rTwo*(brickHeight2+brickPadding2))+brickOffsetTop2;
                bricks2[cTwo][rTwo].x = brickX2;
                bricks2[cTwo][rTwo].y = brickY2;
                ctx.beginPath();
                ctx.rect(brickX2, brickY2, brickWidth2, brickHeight2);
                ctx.fillStyle = getRandomColor();
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
        	var b = bricks[c][r];
        	if(b.status == 1) {
        		if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
        			dy = -dy;
        			b.status = 0;
        			score++;
        			fillColor = getRandomColor();

        			if(score == brickRowCount*brickColumnCount){
        				ctx.clearRect(0,0,canvas.width,canvas.height);
						setInterval(drawTwo, interval);

        				console.log(score)
        				drawTwo();
        			}
        		}
        	}
        }
    }
}
function collisionDetection2() {
    for(cTwo=0; cTwo<brickColumnCount2; cTwo++) {
        for(rTwo=0; rTwo<brickRowCount2; rTwo++) {
        	var bTwo = bricks2[cTwo][rTwo];
        	if(bTwo.status == 1) {
        		if(x > bTwo.x && x < bTwo.x+brickWidth2 && y > bTwo.y && y < bTwo.y+brickHeight2) {
        			dy = -dy;
        			bTwo.status = 0;
        			score++;
        			fillColor = fillColor;

        			if(score == brickRowCount2*brickColumnCount2){
        				ctx.clearRect(0,0,canvas.width,canvas.height);
						setInterval(drawTwo, interval);

        				console.log(score)
        				drawTwo();
        			}
        		}
        	}
        }
    }
}

function drawScore(){
	ctx.font = "16px Arial";
	ctx.fillStyle = fillColor;
	ctx.fillText("Score: "+score,8,20);
}

function keyDownHandler(e){
	if(e.keyCode == 39){
		rightPressed = true;
	}else if (e.keyCode == 37){
		leftPressed = true;
	}
}
function keyUpHandler(e){
	if(e.keyCode == 39){
		rightPressed = false;
	}else if (e.keyCode == 37){
		leftPressed = false;
	}
}
function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function drawBall(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0, Math.PI*2);
	ctx.fillStyle = fillColor;
	ctx.fill();
	ctx.closePath();
}
function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath;
}

function drawLives(){
	ctx.font = "16px Arial";
	ctx.fillStyle = fillColor;
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
		fillColor = getRandomColor();
		// console.log(getRandomColor());
	}
	if(y + dy < ballRadius) {
		dy = -dy;

	}else if (y + dy > canvas.height-ballRadius){
		if(x > paddleX && x < (paddleX+(paddleWidth/2))){
			dx = dx - .5;
			dy = dy + .05;
			dy = -dy;
		}
		else if(x>((paddleX+paddleWidth)/2) && x<paddleX+paddleWidth){
			dx = dx + .5;
			dy = dy + .05;
			console.log(dx);
			console.log(dy);
			dy = -dy;
		}
		else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
	}
	console.log(paddleSpeed);
	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += paddleSpeed;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= paddleSpeed;
	}
	x+=dx;
	y+=dy;
}
function drawTwo() {
	drawBricks2();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection2();
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
		fillColor = getRandomColor();
		// console.log(getRandomColor());
	}
	if(y + dy < ballRadius) {
		dy = -dy;

	}else if (y + dy > canvas.height-ballRadius){
		if(x > paddleX && x < (paddleX+(paddleWidth/2))){
			dx = dx - .7;
			dy = dy + .075;
			dy = -dy;
		}
		else if(x>((paddleX+paddleWidth)/2) && x<paddleX+paddleWidth){
			dx = dx + .7;
			dy = dy + .075;
			console.log(dx);
			console.log(dy);
			dy = -dy;
		}
		else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
	}
	console.log(paddleSpeed);
	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += paddleSpeed;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= paddleSpeed;
	}
	x+=dx;
	y+=dy;
}
setInterval(draw, interval);







