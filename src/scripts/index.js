// Импорт всех функций из файла imports.js
import * as allImports from './imports.js';

// Элементы формы заказа
const orderForm = document.querySelector('#make-order-form');
const recepientForm = document.querySelector('#recepient-data');
const submitButton = orderForm.querySelector('button[type="submit"]');
const totalPriceBlock = orderForm.querySelector('#price-total');
const immediatePaymentCheckbox = orderForm.querySelector('#immediate-payment');
const immediatePaymentDescription = orderForm.querySelector('.main__payment-term-description');

// Событие отправки формы заказа
orderForm.addEventListener('submit', (event) => allImports.handleOrderSubmit(event, recepientForm));

// Валидация полей формы получателя
recepientForm.querySelectorAll('input').forEach(input => {
    // Обработчик события потери фокуса
    input.onblur = () => {
        if (!input.value) return;
        // Валидация при вводе
        input.oninput = () => allImports.validateInput(input);
        allImports.validateInput(input);
    };
    // Обработчик ввода для поля телефона
    if (input.id === 'tel') {
        input.addEventListener('input', () => allImports.handleTelInputChange(input));
    }
});

// Позиционирование подсказок
const tooltips = document.querySelectorAll(".tooltip-trigger");
const positionTooltipThrottled = allImports.throttle(allImports.positionTooltip, 50);

document.addEventListener('DOMContentLoaded', () => {
    // Событие скролла и изменения размера окна
    document.addEventListener("scroll", () => tooltips.forEach(positionTooltipThrottled));
    window.addEventListener("resize", () => tooltips.forEach(positionTooltipThrottled));
});

// Обработка чекбокса немедленной оплаты
immediatePaymentCheckbox.addEventListener('change', () =>
    allImports.handleImmediatePaymentChange(immediatePaymentCheckbox, submitButton, totalPriceBlock, immediatePaymentDescription));

// Скрытие товаров
const hideButtons = document.querySelectorAll('.cart__controls-show');
hideButtons.forEach(button => {
    const productsBlock = button.closest('.cart__controls').nextElementSibling;
    button.addEventListener('click', () => hideProducts(button, productsBlock));
});

// Модальные окна
const modalTriggers = document.querySelectorAll('[data-modal]');
modalTriggers.forEach(modalTrigger => modalTrigger.onclick = allImports.showModal);

const modalCloseButtons = document.querySelectorAll('#modal-close');
modalCloseButtons.forEach(button => button.onclick = allImports.hideModal);

const dialogs = document.querySelectorAll('dialog');
dialogs.forEach(dialog => {
    const dialogWrapper = dialog.querySelector('.dialog__wrapper');
    dialogWrapper.addEventListener('click', (e) => e.stopPropagation());
    dialog.addEventListener('click', allImports.hideModal);
    dialog.addEventListener('close', allImports.unfixPageScroll);
});

const shippingDialog = document.querySelector('.delivery-dialog.dialog');
shippingDialog.addEventListener('close', allImports.resetShippingInput);

const paymentDialog = document.querySelector('.payment-dialog.dialog');
paymentDialog.addEventListener('close', allImports.resetPaymentInput);

const shippingDeleteButtons = document.querySelectorAll('.delivery__delete');
shippingDeleteButtons.forEach(button => button.addEventListener('click', allImports.deleteShippingItem));

// Переключение вкладок в модальном окне доставки
const tabs = document.querySelectorAll('input[name="tab"]');
tabs.forEach(tab => tab.onchange = allImports.handleTabChange);

// Выбор товара
const products = document.querySelectorAll('.cart__items .item');
products.forEach(product => {
    const productInput = product.querySelector('.input-checkbox');
    productInput.addEventListener('change', () => allImports.toggleProduct(product));
});

// Выбор всех товаров
const selectAllButton = document.querySelector('.cart #select-all');
selectAllButton.addEventListener('change', () => {
    const isChecked = selectAllButton.checked;

    if (isChecked) {
        products.forEach(product => {
            const productInput = product.querySelector('.input-checkbox');

            if (productInput.checked) return;

            productInput.checked = true;
            allImports.toggleProduct(product, true);
        });
    } else {
        products.forEach(product => {
            const productInput = product.querySelector('.input-checkbox');

            if (!productInput.checked) return;

            productInput.checked = false;
            allImports.toggleProduct(product, false);
        });
    }
});

// Изменение количества товара
const counters = document.querySelectorAll('.item__counter');
counters.forEach(counter => {
    const input = counter.querySelector('input.item__counter-input');
    const minusButton = counter.querySelector('.item__counter-minus');
    const plusButton = counter.querySelector('.item__counter-plus');

    input.oninput = allImports.handleCountInput;
    input.onchange = allImports.handleCountChange;
    minusButton.onclick = allImports.decreaseCount;
    plusButton.onclick = allImports.increaseCount;
});

// Добавление товаров в избранное
const favoriteButtons = document.querySelectorAll('.control-buttons__favorite');
favoriteButtons.forEach(button => button.addEventListener('click', allImports.toggleFavorite));

// Удаление товаров
const deleteButtons = document.querySelectorAll('.control-buttons__delete');
deleteButtons.forEach(button => button.addEventListener('click', allImports.deleteProduct));

// Изменение адреса доставки
const shippingForm = document.querySelector('.delivery-dialog__form');
shippingForm.addEventListener('submit', allImports.changeShippingAddressCallback);

// Изменение способа оплаты
const paymentForm = document.querySelector('.payment-dialog form');
paymentForm.addEventListener('submit', allImports.changePayment);

// Рассчитываем величину скидки для каждого товара
document.addEventListener('DOMContentLoaded', () => {
    const discountTooltips = document.querySelectorAll('.item__sum-discountless .tooltip');
    discountTooltips.forEach(allImports.createDiscountTooltip);
});

function hideProducts(button, elementToHide) {
    console.log('hide products');
    const label = button.closest('.cart__controls').querySelector('label');
    const countBlock = button.closest('.cart__controls').querySelector('.cart__controls-items-count');
    const countElement = document.querySelector('.items-count');
    const priceElement = document.querySelector('.items-price');

    elementToHide.classList.toggle('hidden');
    button.classList.toggle('hidden');
    if (label && countBlock) {
        label.classList.toggle('hidden');
        countBlock.classList.toggle('hidden');
    }

    if (elementToHide.classList.contains('hidden')) {
        elementToHide.classList.add('overflow-hidden');
        elementToHide.addEventListener('transitionend', resetOverflow);
    } else {
        elementToHide.removeEventListener('transitionend', resetOverflow);
    }

    updateProductInfo(countElement, priceElement);

    function resetOverflow(event) {
        if (event.propertyName !== 'grid-template-rows') return;

        if (!elementToHide.classList.contains('hidden')) {
            elementToHide.classList.remove('overflow-hidden');
        }
    }
}

function updateProductInfo(countElement, priceElement) {
    countElement.textContent = `${allImports.getTotalCount()} ${allImports.chooseWordForm(allImports.getTotalCount(), ['товар', 'товара', 'товаров'])} · `;
    priceElement.textContent = `${allImports.formatNumber(allImports.getFinalPrice(), ' ')} сом`;
}
