// Функция форматирования числа с разделением
export function formatNumber(number, spaceCharacter = ' ') {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, spaceCharacter);
}