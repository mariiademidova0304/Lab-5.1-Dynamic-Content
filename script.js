const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');

let totalPrice = 0;

//Event listener to add an item
addProductButton.addEventListener(`click`, () => {
    let newItem = document.createElement(`li`);
    //checking if name and price are valid inputs
    if (productNameInput.value === ``) {
        alert(`Please, put in the name of the product!`);
    } else if (productPriceInput.value === ``) {
        alert(`Please, put in price!`);
    } else {
        let productPrice = parseFloat(productPriceInput.value);
        if (productPrice <= 0) {
            alert(`Please, put in valid price!`);
        } else {
            let productName = productNameInput.value;
            let capitalizedName = productName.charAt(0).toUpperCase() + productName.slice(1);
            newItem.dataset.price = productPrice;
            newItem.dataset.quantity = 1;
            newItem.innerHTML = `<span>${capitalizedName}</span> <span>Price: $${productPrice}</span><input type="number" class="quantity" value="1"/> <button class="remove">Remove Item</button>`;
            cart.appendChild(newItem);
            updateTotalPrice(productPrice);
            clearInput();
        }
    }
})

//delegated event listener to add removing function
cart.addEventListener(`click`, (event) => {
    if (event.target.classList.contains(`remove`)) {
        removeItem(event);
    }
})

//event listener for quantity change and updating total cost
cart.addEventListener(`change`, (event) => {
    if (event.target.classList.contains(`quantity`)) {
        const newCount = parseFloat(event.target.value);
        const item = event.target.closest(`li`);
       const oldCount = parseFloat(item.dataset.quantity);
       const price = parseFloat(item.dataset.price);
       item.dataset.quantity = newCount;
       let differenceCount = newCount-oldCount;
        const differencePrice = price*differenceCount;
        updateTotalPrice(differencePrice);
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
    const price = parseFloat(item.dataset.price);
    updateTotalPrice(-price);
    item.remove();
}

function clearInput() {
    productNameInput.value = ``;
    productPriceInput.value = ``;
}

