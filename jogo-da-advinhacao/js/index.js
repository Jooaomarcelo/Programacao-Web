// Buscar referência para os elementos

// Inputs
const inputInicio = document.querySelector( '#inicio' );
const inputFim = document.querySelector( '#fim' );
const inputPensado = document.querySelector( '#pensar' );

// Botões
const btnPensar = document.querySelector( '#btn-pensar' );
const btnAdivinhar = document.querySelector( '#btn-adivinhar' );

// Saída
const saida = document.querySelector( '#saida' );

let inicio = null;
let fim = null;
let numRandom = null;
let numPensado = null;

// Chances
const tentativaParagrafo = document.querySelector( '#chances' );
let chances = 3;

btnPensar.addEventListener('click', () => {
  // Recebendo os valores d einicio e fim
  inicio = Number(inputInicio.value);
  fim = Number(inputFim.value);
  
  // Verificação
  if(!Number.isInteger(inicio) || inicio <= 0 || !Number.isInteger(fim) || fim < inicio) {
    saida.textContent = `Digite um número inteiro positivo nos campos 'Início' e 'Fim'.`
    return;
  } else {
    // Gerar número aleatório
    numRandom = Math.trunc(Math.random() * (fim - inicio + 1)) + inicio;
    saida.textContent = `Gerei um número entra ${inicio} e ${fim}. Tente adivinhar.`;
    return;
  }
});

btnAdivinhar.addEventListener('click', () => {
  numPensado = Number(inputPensado.value);

  if(chances > 1) {
    if(!Number.isInteger(numPensado) || numPensado < inicio || numPensado > fim) {
      saida.textContent = `Digite um número inteiro positivo entre ${inicio} e ${fim}.`
    }

    if(numPensado === numRandom) {
      saida.textContent = `Parabéns! Você sabe mesmo ler mentes.`;
      reset();
      return;
    } else if (numPensado > numRandom) {
      saida.textContent = `Pense em um número menor!`;
      tentativaParagrafo.textContent = `Número de tentativas: ${--chances}`;
    } else {
      saida.textContent = `Pense em um número maior!`;
      tentativaParagrafo.textContent = `Número de tentativas: ${--chances}`;
    }

  } else {  
    alert(`Você perdeu! O número era ${numRandom}.`);
    reset();
  }
});

function reset() {
  inicio = null;
  fim = null;
  numRandom = null;
  numPensado = null;
  chances = 3;

  inputInicio.value = '';
  inputFim.value = '';
  inputPensado.value = '';

  saida.textContent = '';
  tentativaParagrafo.textContent = '';
};