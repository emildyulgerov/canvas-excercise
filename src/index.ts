const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const LIGHT_COLOR = 'rgb(255, 206, 158)';
const DARK_COLOR = 'rgb(209, 139, 71)';
let snowflakes: sf[] = [];
let frameCounter = 0;
const countOfSnowflakes = 50;
let alive = false;


const blackKing = new Image();
blackKing.src = './assets/bk.png';
const whiteKing = new Image();
whiteKing.src = './assets/wk.png';

function applyImage() {
    ctx.drawImage(blackKing, 300, 100, 50, 50);
    //ctx.drawImage(whiteKing, 300, 450, 50, 50)
    blackKing.onload = applyImage;
    whiteKing.onload = applyImage;
}

render();

type sf = {
    x: number,
    y: number
}

function spawnSnowflake(): sf{
    let snowflake: sf = {
        x: Math.random() * canvas.width,
        y: 0
    }
    return snowflake;
}

canvas.addEventListener('click', e => {
    if (e.offsetX >= 620 && e.offsetX <= 785) {
        if (e.offsetY >= 255 && e.offsetY <= 295) {
           if (alive){
                alive = false;
           } else {
                alive = true;
           }
        }
    }
})

function render() {
    clear();
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    frameCounter++;
    snowflakes = snowflakes.filter(s => s.y <= canvas.height)
    if (frameCounter % 5 == 0){
        if (alive){
            snowflakes.push(spawnSnowflake());
        }
    }

    grid();
    frame();
    smiley();
    checker();
    labels();
    button('Let it Snow');
    applyImage();

        for (let el of snowflakes){
            el.y += 3;
            ctx.beginPath();
            ctx.fillStyle = 'white'
            ctx.arc(el.x, el.y, 5, 0, Math.PI*2);
            ctx.fill();
        }
    





    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    }
    function grid() {
        for (let y = 20; y < canvas.height; y += 20) {
            ctx.save();
            ctx.strokeStyle = `rgba(0, 0, 0, ${y % 100 == 0 ? '0.5' : '0.2'})`;

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
            ctx.closePath();

            ctx.restore();
        }
        for (let x = 20; x < canvas.width; x += 20) {
            ctx.save();
            ctx.strokeStyle = `rgba(0, 0, 0, ${x % 100 == 0 ? '0.5' : '0.2'})`;

            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
            ctx.closePath();

            ctx.restore();
        }
    }
    function frame() {
        ctx.beginPath();
        ctx.lineWidth = 50
        ctx.strokeStyle = `${DARK_COLOR}`
        ctx.strokeRect(75, 75, 450, 450)
        ctx.closePath();


        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = 'black'
        ctx.strokeRect(100, 100, 400, 400);
        ctx.closePath();
    }
    function smiley() {
        ctx.beginPath();
        ctx.fillStyle = 'black'
        ctx.lineWidth = 3;
        ctx.arc(670, 70, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(730, 70, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(700, 100, 60, 0, Math.PI);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(700, 100, 80, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
    }
    function rect(file: number, rank: number, color: 'light' | 'dark') {
        const x = file * 50 + 100;
        const y = rank * 50 + 100;
        let actualColor: string;
        if (color === 'light') {
            actualColor = LIGHT_COLOR
        } else {
            actualColor = DARK_COLOR;
        }
        ctx.beginPath();
        ctx.fillStyle = actualColor
        ctx.fillRect(x, y, 50, 50)
        ctx.closePath();
    }
    function checker() {
        let x = 1;
        for (let i = 0.01; i <= 8; i++) {
            for (let j = 0.01; j <= 8; j++) {
                rect(i, j, `${x % 2 === 0 ? 'dark' : 'light'}`);
                x++;
            }
            x++;
        }
    }
    function labels() {
        ctx.font = '24px Arial'
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `${LIGHT_COLOR}`;
        ctx.fillText('a', 120, 80);
        let x = 120;
        let y = 80;

        for (let i = 0; i <= 7; i++) {
            ctx.fillText(letters[i], x, y);
            x += 50;
        }

        x = 120;
        for (let i = 0; i <= 7; i++) {
            y = 520;
            ctx.fillText(letters[i], x, y);
            x += 50;
        }
        x = 80;
        y = 125;
        for (let i = 8; i >= 1; i--) {
            ctx.fillText(`${i}`, x, y);
            y += 50;
        }

        x = 520;
        y = 125;
        for (let i = 8; i >= 1; i--) {
            ctx.fillText(`${i}`, x, y);
            y += 50;
        }

    }
    function button(label: string) {
        ctx.beginPath();
        ctx.fillStyle = DARK_COLOR
        ctx.fillRect(640, 255, 125, 45);
        ctx.arc(640, 277, 22, 0, Math.PI * 2);
        ctx.arc(760, 277, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = LIGHT_COLOR;
        ctx.fillText(label, 700, 277, 120);
    }




  
    requestAnimationFrame(render);

}






