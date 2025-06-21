const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const grid = 20;
const tileCount = canvas.width / grid;
let pontuacao = 0;

let cobra = [{ x: 10, y: 10 }];
let direcao = { x: 1, y: 0 };
let maca = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
};

let maiorPontuacao = localStorage.getItem('maiorPontuacao') || 0;

function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(maca.x * grid, maca.y * grid, grid, grid);

    ctx.fillStyle = 'lime';
    cobra.forEach(parte => {
        ctx.fillRect(parte.x * grid, parte.y * grid, grid - 2, grid - 2);
    });
}

function mover() {
    const cabeca = {
        x: cobra[0].x + direcao.x,
        y: cobra[0].y + direcao.y,
    };

    if (
        cabeca.x < 0 || cabeca.x >= tileCount ||
        cabeca.y < 0 || cabeca.y >= tileCount
    ) {
        reiniciar();
        return;
    }

    for (let i = 0; i < cobra.length; i++) {
        if (cobra[i].x === cabeca.x && cobra[i].y === cabeca.y) {
            reiniciar();
            return;
        }
    }

    cobra.unshift(cabeca);

    if (cabeca.x === maca.x && cabeca.y === maca.y) {
        pontuacao++;
        document.getElementById('pontuacao').innerText = 'Pontuação: ' + pontuacao;
        maca = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
        };
    } else {
        cobra.pop();
    }

    if (pontuacao > maiorPontuacao) {
        maiorPontuacao = pontuacao;
        localStorage.setItem('maiorPontuacao', maiorPontuacao);
        document.getElementById('maiorPontuacao').innerText = 'Maior Pontuação: ' + maiorPontuacao;
    }
}

function loop() {
    if (!jogoPausado) {
        mover();
        desenhar();
    }
}


function reiniciar() {
    alert('Game Over! Pontuação: ' + pontuacao);
    if (pontuacao > maiorPontuacao) {
        maiorPontuacao = pontuacao;
        localStorage.setItem('maiorPontuacao', maiorPontuacao);
    }
    cobra = [{ x: 10, y: 10 }];
    direcao = { x: 1, y: 0 };
    pontuacao = 0;
    document.getElementById('pontuacao').innerText = 'Pontuação: 0';
    document.getElementById('maiorPontuacao').innerText = 'Maior Pontuação: ' + maiorPontuacao;
}

document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
  jogoPausado = !jogoPausado;
  document.getElementById('pausado').style.display = jogoPausado ? 'block' : 'none';
  return;
}


  if ((e.key === 'ArrowUp' || e.key === 'w') && direcao.y !== 1) direcao = { x: 0, y: -1 };
  if ((e.key === 'ArrowDown' || e.key === 's') && direcao.y !== -1) direcao = { x: 0, y: 1 };
  if ((e.key === 'ArrowLeft' || e.key === 'a') && direcao.x !== 1) direcao = { x: -1, y: 0 };
  if ((e.key === 'ArrowRight' || e.key === 'd') && direcao.x !== -1) direcao = { x: 1, y: 0 };
});


let jogoPausado = false;

setInterval(loop, 100);

document.getElementById('limparPontuacao').addEventListener('click', () => {
    localStorage.removeItem('maiorPontuacao');
    maiorPontuacao = 0;
    document.getElementById('maiorPontuacao').innerText = 'Maior Pontuação: 0';
});

document.getElementById('maiorPontuacao').innerText = 'Maior Pontuação: ' + maiorPontuacao;