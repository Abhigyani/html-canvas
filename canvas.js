var canvas = document.querySelector('canvas')

/**
 * Sets the width and height of the canvas in HTML.
 */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/**
 * To access the context object of the canvas.
 */
var ctx = canvas.getContext('2d');
console.log(ctx);

/**
 * Method to draw a solid filled rectangle on a canvas.
 * @argument
 *  -   x: X co-ordinate in pixels, offset to the top left corner of the canvas.
 *  -   y: Y co-ordinate in pixels, offset to the top left corner of the canvas.
 *  -   width: Width of the rectangle in pixels.
 *  -   height: Height of the rectangle in pixels.
 */
ctx.fillRect(100, 100 ,100, 100);
ctx.fillRect(300, 100, 100, 100);

// To set the color for the filled rectangle.
ctx.fillStyle = "yellow"
ctx.fillRect(100, 300, 300, 100);

/**
 * Method to draw a rectangle on the canvas.
 * @argument
 *  -   x: X co-ordinate in pixels, offset to the top left of the canvas.
 *  -   y: Y co-ordinate in pixels, offset to the top left of the canvas.
 *  -   width: Width of the rectangle in pixels.
 *  -   height: Height of the rectangle in pixels.
 */
ctx.rect(500, 100, 100, 100);

/**
 * Method to actually stoke the lines defined in the above function to draw a rectangle.
 * With calling the stroke, nothing will print on the canvas.
 */
ctx.stroke();

/**
 * Method to draw a line.
 */
ctx.beginPath();

/**
 * Method to set the pointer to a particular point on the canvas.
 * @argument
 *  -   x: X co-ordinate in pixels, offset to the top left corner of the canvas.
 *  -   y: Y co-ordinnate in pixels, offset to the top left corner of the canvas.
 */
ctx.moveTo(700,100);

/**
 * Method to draw a line to.
 * @argument
 *  -   x: X co-ordinate in pixels
 *  -   y: Y co-ordinate in pixels, offset to the top left corner of the canvas.
 * 
 * The initial point is set in the .moveTo method and there onwards lineTo is drawn.
 */
ctx.lineTo(900,200);
// To change the color for the stroked line.
ctx.strokeStyle = "yellow";
ctx.stroke();

/**
 * Method to create an Arc / Circle.
 * @argument
 *  -   x: X co-ordinate in pixels, offset to the top left corner of the canvas.
 *  -   y: Y co-ordinate in pixels, offset to the top left corner of the canvas.
 *  -   radius: Radius of the circle in pixels
 *  -   startAngle: Angle to start, in radian
 *  -   endAngle: Angle to end, in radian
 *  -   antiClockwise: (OPTIONAL) Direction of the arc.
 * 
 * NOTE: (x,y) point to the centre point of the circle.
 */
ctx.beginPath();
ctx.arc(1100, 130, 30, 0, Math.PI * 2, false);
ctx.stroke();

// Creating circles of random dimension at random position on the screen every 2 second.
// setInterval(function () {
//     ctx.clearRect(0, 0, innerWidth, innerHeight);
//     for (var i = 0; i <300; i++) {
//         var x = Math.random() * window.innerWidth;
//         var y = Math.random() * window.innerHeight;
//         var radius = Math.random() * 50;
//         // var color = '#'+Math.floor(Math.random()*16777215).toString(16);
//         var color = '#a5adb0';
//         ctx.beginPath();
//         ctx.arc(x, y, 1, 0, Math.PI * 2, false);
//         ctx.fillStyle = color;
//         ctx.fill();
//     }
// }, 800);

ctx.clearRect(0,0,innerWidth, innerHeight);

/**
 * To create a circle that would move around the screen.
 */
function Cricle(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    this.update = function() {
        this.draw()
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}

var circleObj = [];
var circleCount = 80;
var max_circle_speed = 5;
var min_radius = 5;
var max_radius = 30;

for (var i=0; i<circleCount; i++) {
    var x = Math.random() * innerWidth;
    var y = Math.random() * innerHeight;
    var radius = (Math.random()) * (max_radius - min_radius) + min_radius;
    var color = '#'+Math.floor(Math.random()*16777215).toString(16);
    var dx = (Math.random() - 0.5) * ((Math.random() - 0.5) * max_circle_speed);
    var dy = (Math.random() - 0.5) * ((Math.random() - 0.5) * max_circle_speed);

    circleObj.push(new Cricle(x, y, radius, dx, dy, color));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for (var i=0; i<circleObj.length; i++) {
        circleObj[i].update();
    }
}

animate();




