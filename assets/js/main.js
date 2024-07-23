// Capturar evento de submit do formulário
const form = document.querySelector('#formulario');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const inputPeso = e.target.querySelector('#peso');
  const inputAltura = e.target.querySelector('#altura');

  // Validação de peso e altura
  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);

  if (!peso && !altura) {
    setResultado('Peso e Altura inválidos', false);
    return;
  } else{
    if (!peso) {
      setResultado('Peso inválido', false);
      return;
    }
  
    if (!altura) {
      setResultado('Altura inválida', false);
      return;
    }
  }

  // Recebe resultado da Formúla do IMC em uma variavel
  const imc = getImc(peso, altura);
  // Recebe resultado da Avaliação do nível do IMC em uma variavel
  const nivelImc = getNivelImc(imc);

  // variavel que exibirá o resultado final na tela
  const msg = `Seu IMC é ${imc} (${nivelImc}).`;

  // utiliza as const anteriores como parâmetro da função
  setResultado(msg, true, imc);
});

// Avaliação do nível do IMC
function getNivelImc (imc) {
  const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso',
    'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

  if (imc >= 39.9) return nivel[5];
  if (imc >= 34.9) return nivel[4];
  if (imc >= 29.9) return nivel[3];
  if (imc >= 24.9) return nivel[2];
  if (imc >= 18.5) return nivel[1];
  if (imc < 18.5) return nivel[0];
}

// Formúla do IMC
function getImc (peso, altura) {
  const imc = peso / ((altura/100) * (altura/100));
  return imc.toFixed(2);
}

// Criação de parágrafos
function criaP () {
  const p = document.createElement('p');
  return p;
}

// Função que cria tag e exibe resultado final colorido
function setResultado (msg, isValid, imc) {
  const resultado = document.querySelector('#resultado');
  resultado.innerHTML = '';

  const p = criaP();

  // Colore a tag p
  if (isValid) {
    if (imc >= 29.9 || imc < 18.5){
      p.classList.add('bad');
    } else if (imc >= 24.9){
      p.classList.add('warning');
    } else {
      p.classList.add('paragrafo-resultado');
    }
  } else {
    p.classList.add('invalid');
  }

  p.innerHTML = msg;
  resultado.appendChild(p);
}
