let currentCart = [];

function start() {
    startStorage();
    startEvents();
}

function startStorage() {
    const cartStorage = localStorage.getItem('cart')

    if (cartStorage) {
        currentCart = JSON.parse(cartStorage);

        createTemplate();

        $('.hasOrder').removeClass("hidden");
        $('.empty').addClass('hidden');
    } else {
        $('.hasOrder').addClass("hidden");
        $('.empty').removeClass('hidden');
    }
}

function startEvents() {
    const modal = $('.modalContainerCart');
    const cart = $('#link-cart');
    const addCart = $('.add-cart');

    cart.click(() => {
        modal.removeClass('hidden');
    });

    $('.close-item').click(() => {
        modal.addClass('hidden');
    });

    addCart.click(addItemToCart);
}

var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

function createTemplate() {
    $('.orders').empty();

    const { template, total } = currentCart.reduce(function (accumulator, cart) {
        accumulator.template += `<div class="order">
            <div class="orderContainer">
                <h2>${cart.quantity}x ${cart.title}</h2>
                <h2>${cart.price}</h2>
            </div>
            <button class="remove-cart" id="food-${cart.id}">Remover</button>
        </div>`;

        const price = parseFloat(cart.price.replace("R$ ", "").replace(',', "."));

        accumulator.total += parseInt(cart.quantity) * price;
        return accumulator;
    }, {
        template: "",
        total: 0
    });

    $("#priceTotal").text(formatter.format(total));

    $('.orders').append(template);

    $('.remove-cart').click(removeCartItem);

    $('.element').empty();
    $('.element').append(currentCart.length);
    $('.element').removeClass('hidden');
}

function removeCartItem() {
    const id = $(this).attr('id').replace("food-", "");

    const removeIndex = currentCart.findIndex(cart => cart.id == id);

    if (currentCart !== -1) {
        currentCart.splice(removeIndex, 1);
    }

    if (currentCart.length == 0) {
        localStorage.removeItem("cart");
        startStorage();
    } else {
        createTemplate();
        localStorage.setItem("cart", JSON.stringify(currentCart))
    }


}

function addItemToCart() {

    const title = $(this).parent().find(".title h1").text();
    const price = $(this).parent().find(".price p").text();
    const id = $(this).attr('id').replace("food-", "");

    const currentCardHasItems = currentCart.length > 0;
    const currentCardIndex = currentCart.findIndex(cart => cart.title == title);

    if (currentCardIndex !== -1 && currentCardHasItems) {
        currentCart[currentCardIndex].quantity++;

        createTemplate();

    } else {
        currentCart.push({
            id: id,
            title: title,
            price: price,
            quantity: 1
        });

        createTemplate();

        $('.hasOrder').removeClass("hidden");
        $('.empty').addClass('hidden');

    }

    localStorage.setItem("cart", JSON.stringify(currentCart))

}

start();