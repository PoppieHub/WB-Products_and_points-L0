import { cartState } from "./model.js";

// Функция позиционирования подсказки
export function positionTooltip(tooltipTrigger) {
    // Получение элемента подсказки и её высоты
    const tooltip = tooltipTrigger.closest('.tooltip-wrapper').querySelector('.tooltip');
    const tooltipHeight = tooltip.getBoundingClientRect().height;

    // Получение координат элемента, вызвавшего подсказку, и высоты мобильного меню
    const tooltipTriggerRect = tooltipTrigger.getBoundingClientRect();
    const mobileMenuHeight = document.querySelector('.footer__menu-mobile').getBoundingClientRect().height;

    // Вычисление расстояния до нижней границы окна
    const distanceToBottom = (window.innerHeight - mobileMenuHeight) - (tooltipTriggerRect.top + tooltipTriggerRect.height);

    // Применение класса для отображения подсказки сверху, если она не помещается снизу
    tooltip.classList.toggle("tooltip-top", distanceToBottom < tooltipHeight);
}

// Функция создания подсказки со скидками
export function createDiscountTooltip(tooltip) {
    // Получение идентификатора товара из атрибута данных элемента подсказки
    const productID = tooltip.closest('.cart__item').dataset.id;

    // Поиск товара в состоянии корзины по идентификатору
    const product = cartState.products.find(product => product.id == productID);

    // Получение цены товара и скидок
    const productPrice = product.price.original;
    const discounts = product.discounts;

    // Создание блоков с информацией о скидках
    const discountBlocks = discounts.map(discount => {
        return (
            `
            <div class="text-13">
                <dt>${discount.name}</dt>
                <dd>−${Math.round(productPrice * discount.value)} сом</dd>
            </div>
            `
        );
    }).join('');

    // Вставка блоков с информацией о скидках внутрь подсказки
    tooltip.querySelector('dl').innerHTML = discountBlocks;
}