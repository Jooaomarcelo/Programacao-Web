const btnReset = document.querySelector( '#btn-reset' );
const selectPontuacao = document.querySelector( 'select' );

let maxPontuacao = Number(selectPontuacao.value);
let ganhou = 0;

const Player1 = {
  btn: document.querySelector( '#btn-p1' ),
  score: 0,
  displayScore: document.querySelector( '#score-p1' )
}

const Player2 = {
  btn: document.querySelector( '#btn-p2' ),
  score: 0,
  displayScore: document.querySelector( '#score-p2' )
}

function gameover(jogador) {
  if (jogador.score === maxPontuacao) {
    return ganhou = 1;
  }
}

function atualizaPontuacao(jogador, adversario) {
  jogador.score++;
  
  if(!gameover(jogador)) {
    jogador.displayScore.innerText = jogador.score;
    return;
  } else {
    jogador.displayScore.innerText = jogador.score;
    jogador.displayScore.classList.add( 'p-win' );
    adversario.displayScore.classList.add( 'p-lose' );
    return;
  }
}

const resetar = () => {
  Player1.displayScore.classList.remove('p-win');
  Player2.displayScore.classList.remove('p-lose');
  
  Player1.displayScore.classList.remove('p-lose');
  Player2.displayScore.classList.remove('p-win');

  Player1.displayScore.innerText = 0;
  Player1.score = 0;

  Player2.displayScore.innerText = 0;
  Player2.score = 0;

  ganhou = 0;
}

selectPontuacao.addEventListener('change', (e) => {
  resetar();
  maxPontuacao = Number(e.target.value);
});

Player1.btn.addEventListener('click', () => {
  if(!ganhou) {
    atualizaPontuacao(Player1, Player2);
  }
});

Player2.btn.addEventListener('click', () => {
  if(!ganhou) {
    atualizaPontuacao(Player2, Player1);
  }
});

btnReset.addEventListener('click', resetar);