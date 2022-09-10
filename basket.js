'use strict';

const baskCountEl = document.querySelector('.cartIconWrap span');
const baskTotEl = document.querySelector('.basketTotal');
const baskTotValEl = document.querySelector('.basketTotalValue');
const baskEl = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  baskEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', ev => {
  if (ev.target.closest('.addToCart')) {
    const featuredItemEl = ev.target.closest('.featuredItem');
    const id = Number(featuredItemEl.dataset.id);
    const name = featuredItemEl.dataset.name;
    const price = Number(featuredItemEl.dataset.price);
    addToCart(id, name, price);
  }
});

/**
 * Функция добавляет товар в корзину.
 * @param {number} id - Id товара.
 * @param {string} name - Название товара.
 * @param {number} price - Цена товара.
 */
function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = { id: id, name: name, price: price, count: 0 };
  }
  basket[id].count++;
  baskCountEl.textContent = String(getTotalBasketCount());
  baskTotValEl.textContent = getTotalBasketPrice().toFixed(2);
  renderProductInBasket(id);
}

/**
 * Считает и возвращает количество товаров в корзине.
 * @return {number} - Количество товаров в корзине.
 */
function getTotalBasketCount() {
  return Object.values(basket).reduce((total, elem) => total + elem.count, 0);
}

/**
 * Считает и возвращает итоговую цену по всем добавленным товарам.
 * @return {number} - Итоговую цену по всем добавленным товарам.
 */
function getTotalBasketPrice() {
  return Object
    .values(basket).reduce((total, el) => total + el.price * el.count, 0);
}

/**
 * Добавляет в корзину информацию о товарах.
 * @param {number} productId - Id товара.
 */
function renderProductInBasket(productId) {
  const basketRowEl = baskEl
    .querySelector(`.basketRow[data-id="${productId}"]`);
  if (basketRowEl) {
    const prod = basket[productId];
    basketRowEl.querySelector('.productCount').textContent = prod.count;
    basketRowEl.querySelector('.productTotalRow')
      .textContent = (prod.price * prod.count).toFixed(2);
    return;
  }
  renderNewProductInBasket(productId);
}

/**
 * Функция отрисовывает новый товар в корзине.
 * @param {number} productId - Id товара.
 */
function renderNewProductInBasket(productId) {
  const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  baskTotEl.insertAdjacentHTML("beforebegin", productRow);
}
