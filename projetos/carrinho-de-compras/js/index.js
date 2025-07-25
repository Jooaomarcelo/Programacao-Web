const carrinhoForm = document.querySelector('.carrinho-form');
const carrinhoInput = document.querySelector('input');
const ul = document.querySelector('ul');

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
};

const createRow = () => {
  const li = createElement('li');

  const span = createElement(
    'span',
    ``,
    `&bull; ${carrinhoInput.value}. Qtd: <span>1</span>`
  );

  const btnAdd = createElement('button', '+');
  const btnSub = createElement('button', '-');

  btnAdd.classList.add('btn-add');
  btnSub.classList.add('btn-sub');

  btnAdd.addEventListener('click', () => {
    [qtd] = span.children;
    qtd.innerText++;
  });

  btnSub.addEventListener('click', () => {
    [qtd] = span.children;

    if (Number(qtd.innerText) == 1) {
      li.remove();
    }

    qtd.innerText--;
  });

  li.appendChild(span);
  li.appendChild(btnAdd);
  li.appendChild(btnSub);

  ul.appendChild(li);
};

carrinhoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (carrinhoInput.value === '') {
    alert('Insira um produto!!!');
    return;
  }
  createRow();
  carrinhoInput.value = '';
});
