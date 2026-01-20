let cart = {};
let total = 0;
let itemCount = 0;

/* ---------------- CART FUNCTIONS ---------------- */

function addToCart(item, price) {
    if (!cart[item]) {
        cart[item] = { count: 0, price: price };
    }
    cart[item].count++;
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = "";
    total = 0;
    itemCount = 0;

    for (let item in cart) {
        let itemTotal = cart[item].count * cart[item].price;
        total += itemTotal;
        itemCount += cart[item].count;

        document.getElementById(item + "-count").innerText = cart[item].count;

        cartItems.innerHTML += `
        <div class="cart-item">
            ${item} (x${cart[item].count})
            <span>₹${itemTotal}</span>
        </div>`;
    }

    document.getElementById("itemCount").innerText = itemCount;
    document.getElementById("total").innerText = total;
    document.getElementById("placeOrderBtn").style.display =
        itemCount > 0 ? "block" : "none";
}

/* ---------------- PAGE TOGGLE ---------------- */
function placeOrder() {
    alert("Order placed successfully! Total Amount: ₹" + total);
    cart = {};
    renderCart();
}

function openFeedback() {
    storePage.style.display = "none";
    feedbackPage.style.display = "block";
}

function backToStore() {
    feedbackPage.style.display = "none";
    storePage.style.display = "block";
}

/* ---------------- FEEDBACK ---------------- */

function submitFeedback() {

    if (!fname.value || !no.value || !email.value || !rating.value || !message.value) {
        feedbackError.innerText = "All fields are required";
        return;
    }

    let mobilePattern = /^[6-9]\d{9}$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!mobilePattern.test(no.value)) {
        feedbackError.innerText = "Invalid mobile number";
        return;
    }

    if (!emailPattern.test(email.value)) {
        feedbackError.innerText = "Invalid email address";
        return;
    }

    let text =
        "Name: " + fname.value + "\n" +
        "Mobile: " + no.value + "\n" +
        "Email: " + email.value + "\n" +
        "Rating: " + rating.value + "\n" +
        "Message: " + message.value + "\n" +
        "---------------------------\n";

    // Create text file
    let blob = new Blob([text], { type: "text/plain" });

    // Create download link
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "feedback.txt";
    a.click();

    alert("Feedback saved in text file successfully!");
    backToStore();
}