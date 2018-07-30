var coffeeOrdered = document.querySelector("[name='coffee']");
var orderEmail = document.querySelector("[name='emailAddress']");
var flavorShot = document.querySelector("[name='flavor']");
var caffeineRating = document.querySelector("[name='strength']");
var pendingOrders = document.querySelector(".pending-orders");



var coffeeOrderForm = document.querySelector('[data-coffee-order="form"]');
coffeeOrderForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var coffeeSize = document.querySelector('[name="size"]:checked')
    var newOrder = document.createElement("div");
    newOrder.classList.add('order');

    var orderSummary = document.createElement("div");
    orderSummary.classList.add("order-summary");
    
    var orderSummaryCoffee = document.createElement("div");
    orderSummaryCoffee.classList.add("order-summary-coffee");
    orderSummaryCoffee.textContent = `${coffeeOrdered.value}`;
    orderSummary.appendChild(orderSummaryCoffee);

    var orderSummaryDetails = document.createElement("div");
    orderSummaryDetails.classList.add("order-summary-details");
    orderSummaryDetails.textContent = `${coffeeSize.value}    --   ${flavorShot.value}   --   ${caffeineRating.value}`;
    orderSummary.appendChild(orderSummaryDetails);

    var orderSummaryEmail = document.createElement("div");
    orderSummaryEmail.classList.add("order-summary-email");
    orderSummaryEmail.textContent = `${orderEmail.value}`;
    orderSummary.appendChild(orderSummaryEmail);

    var orderComplete = document.createElement("div");
    orderComplete.classList.add("order-complete");
    var completeCheckBox = document.createElement('input');
    completeCheckBox.classList.add("complete-check");
    completeCheckBox.setAttribute("type", "checkbox");
    var completeBtn = document.createElement("input");
    completeBtn.classList.add("complete-btn");
    completeBtn.setAttribute("type", "button");
    completeBtn.setAttribute("value", "complete");
    orderComplete.appendChild(completeCheckBox);
    orderComplete.appendChild(completeBtn);

    newOrder.appendChild(orderSummary);
    newOrder.appendChild(orderComplete);
    pendingOrders.appendChild(newOrder);
});