// modules
export {
    changePayment,
    changeShippingAddressCallback,
    decreaseCount,
    deleteProduct,
    getFinalPrice,
    getTotalCount,
    handleCountChange,
    handleCountInput,
    increaseCount,
    toggleFavorite,
    toggleProduct
} from './modules/cart.js';

export {
    deleteShippingItem,
    hideModal,
    resetPaymentInput,
    resetShippingInput,
    showModal,
    unfixPageScroll,
    handleTabChange
} from './modules/modal.js';

export {
    handleOrderSubmit,
    handleImmediatePaymentChange
} from './modules/orderForm.js';

export {
    createDiscountTooltip,
    positionTooltip
} from './modules/tooltip.js';

// utils
export { chooseWordForm } from './utils/chooseWordForm.js';
export { formatNumber } from './utils/formatNumber.js';
export { throttle } from './utils/throttle.js';
export { handleTelInputChange, validateInput } from './utils/validation.js';