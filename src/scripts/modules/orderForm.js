import { formatNumber } from "../utils/formatNumber.js";
import { validateForm, validateInput } from "../utils/validation.js";

// Функция обработки отправки формы заказа
export function handleOrderSubmit(event, formToValidate) {
    // Проверка наличия формы для валидации
    if (!formToValidate) {
        return;
    }

    // Выполнение валидации формы
    const { isValid, invalidInputs } = validateForm(formToValidate);

    // Если форма не валидна, предотвращаем её отправку и добавляем анимацию
    if (!isValid) {
        event.preventDefault();

        invalidInputs.forEach(input => {
            if (!input.classList.contains('shake')) {
                input.classList.add('shake');
            }
            setTimeout(() => {
                input.classList.remove('shake');
            }, 350);
        });
    }

    // Если нужно, чтобы после отправки формы пустые поля валидировались в момент ввода, а не после события blur:
    const inputs = formToValidate.querySelectorAll('input');
    inputs.forEach(input => (input.oninput = () => validateInput(input)));
}

// Функция обработки изменения чекбокса немедленной оплаты
export function handleImmediatePaymentChange(checkbox, submitButton, priceBlock, elementToHide) {
    // Поиск метки в ближайшем родительском элементе
    const label = elementToHide.closest('.main__payment-term').querySelector('label');

    // Если чекбокс отмечен, изменяем текст кнопки и скрываем элемент
    if (checkbox.checked) {
        submitButton.textContent = `Оплатить ${formatNumber(priceBlock.textContent)} сом`;
        elementToHide.style.display = 'none';
        label.style.marginBottom = 0;
    } else {
        // Если чекбокс не отмечен, восстанавливаем исходные значения
        submitButton.textContent = 'Заказать';
        elementToHide.style.display = 'block';
        label.style.marginBottom = '';
    }
}