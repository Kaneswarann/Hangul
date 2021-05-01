function checkout(e) {
    e.preventDefault();
    const cartStorage = localStorage.getItem('cart')

    if (cartStorage) {
        currentCart = JSON.parse(cartStorage);

        const address = $("#address").val();
        const number = $("#number").val();

        const currentDate = new Date();

        currentDate.setMinutes(currentDate.getMinutes() + 40);

        const modalText = `<h1>Pedido feito com sucesso!</h1>
    <p>Sua entrega será feita no endereço: ${address}, ${number} e o prazo máximo de entrega será às: ${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}</p>`;

        $('.modalContainerPayment .modal').prepend(modalText);
        $('.paymentEmpty').addClass('hidden');
        $('.modalContainerPayment .modal .successButtons').removeClass('hidden');
        $('.modalContainerPayment').removeClass("hidden");

        localStorage.removeItem("cart");

    } else {
        $('.modalContainerPayment').removeClass("hidden");
        $('.paymentEmpty').removeClass('hidden');
        $('.modalContainerPayment .modal .successButtons').addClass('hidden');
    }

}

function startEvents() {
    const modal = $('.modalContainerPayment');
    $('form').submit(checkout);

    $('.close-item').click(() => {
        modal.addClass('hidden');
    });
}

function start() {
    startEvents();
}

start();