document.addEventListener("DOMContentLoaded", () => {
    const paymentMethod = document.getElementById("payment-method");
    const receiptText = document.getElementById("receipt-text");
    
    function generateReceipt() {
        const selectedPlan = document.querySelector("input[name='plan']:checked").nextElementSibling.innerText;
        const selectedMethod = paymentMethod.value;
        receiptText.innerHTML = `Payment for <strong>${selectedPlan}</strong> via <strong>${selectedMethod}</strong> is being processed.`;
    }
    
    document.querySelector("button").addEventListener("click", generateReceipt);
});