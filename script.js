const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');

let totalPrice = 0;

//Event listener to add an item
addProductButton.addEventListener(`click`, () => {
    let newItem = document.createElement(`li`);
    let productName = productNameInput.value;
    let capitalizedName = productName.charAt(0).toUpperCase() + productName.slice(1);
    let productPrice = parseFloat(productPriceInput.value);
    clearInput();
    newItem.innerHTML = `<span>${capitalizedName}</span> <span>Price: $${productPrice}</span><input type="number" class="quantity" value="1"/> <button class="remove">Remove Item</button>`;
    cart.appendChild(newItem);
    updateTotalPrice(productPrice);
})

//delegated event listener to add removing function
cart.addEventListener(`click`, (event) => {
    if (event.target.classList.contains(`remove`)) {
        removeItem(event);
    }
})


// Function to update the total price
function updateTotalPrice(amount) {
    totalPrice += amount;
    totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Function to remove an item
function removeItem(event) {
    const item = event.target.closest('li');
    //   const price = parseFloat(item.dataset.price);
    //   updateTotalPrice(-price);
    item.remove();
}

function clearInput() {
    productNameInput.value = ``;
    productPriceInput.value = ``;
}