const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
var SomGameover = document.getElementById('t_gameover');
var SomFalhou = document.getElementById('t_falhou');
var SomPulou = document.getElementById('t_pula');
var SomGame = document.getElementById('t_music');
let isJumping = false;
let position = 0;
var pontos = 0;
var fimdejogo = false;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }    
    }
}
function jump() {
    
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            let downInterval =setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }    
            }, 20);
        } else {
            SomPulou.play();
            position += 20;
            dino.style.bottom = position + 'px';
        }    
    }, 20);
}


function playGame() {
    alert("Bem vindo ao Jogo do Dinossauro. Clique em OK e bora se divertir")
    
    createCactus();
    SomGame.addEventListener("ended", function(){ SomGame.currentTime = 0; SomGame.play(); }, false);
    SomGame.play();
    
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);
    let leftInterval = setInterval(() => {
        
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            SomPulou.pause();
            
            clearInterval(leftInterval);
            SomFalhou.play();
            cactus.remove();
            gameOver();
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
    setTimeout(createCactus,randomTime);
}
function gameOver() {

    SomGame.pause();
    alert('Eita, voce falhou num joguinho fácil desse? \n Imagine se fosse um mais difícil! \n Mas não desista! Tente outra vez.');
    window.clearTimeout(createCactus)
    SomGameover.play();
    reinicia_jogo();
}

function reinicia_jogo() {
    SomGameover.pause();
    window.location.reload();
}

playGame();

document.addEventListener('keyup', handleKeyUp);