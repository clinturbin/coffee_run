var coffeeOrderForm = document.querySelector('[data-coffee-order="form"]');
var pendingOrders = document.querySelector(".pending-orders");
var coffeeOrders = [];

var addOrdersToLocalStorage = function () {
    var ordersAsString = JSON.stringify(coffeeOrders);
    localStorage.setItem('coffee-orders', ordersAsString);
};

var getOrdersFromLocalStorage = function () {
    var ordersAsString = localStorage.getItem('coffee-orders');
    var ordersAsObjects = JSON.parse(ordersAsString);
    if (ordersAsObjects !== null) {
        ordersAsObjects.forEach(function (order) {
            coffeeOrders.push(order);    
        });
    };
};

var clearPendingOrdersDisplay = function () {
    var orders = document.querySelectorAll('.order');
    orders.forEach( function (element) {
        element.remove();
    });
};

var updatePendingOrders = function () {
    clearPendingOrdersDisplay();
    coffeeOrders.forEach(function (element, index) {
        pendingOrders.appendChild(pendingOrder(element, index));
    });
    addOrdersToLocalStorage();
};

//---------------------  Conatiner for Each Pending Order --------------------------------
var pendingOrder = function (order, index) {
    var newOrder = document.createElement('div');
    newOrder.classList.add('order');
    newOrder.appendChild(orderSummary(order));
    newOrder.appendChild(orderCompleteContainer(index));
    return newOrder;
};

//------------ Order Summary Section includes information from input form ----------------
var orderSummary = function (order) {
    var orderSummary = document.createElement('div');
    orderSummary.classList.add('order-summary');
    orderSummary.appendChild(orderSummaryCoffee(order));
    orderSummary.appendChild(orderSummaryDetails(order));
    orderSummary.appendChild(orderSummaryEmail(order));
    return orderSummary;
}

var orderSummaryCoffee = function (order) {
    var coffeeOrdered = document.createElement('div');
    coffeeOrdered.classList.add("order-summary-coffee");
    coffeeOrdered.textContent = order.coffee;
    return coffeeOrdered;
};

var orderSummaryDetails = function (order) {
    var orderDetails = document.createElement("div");
    orderDetails.classList.add("order-summary-details");
    orderDetails.textContent = `${order.size}    |   ${order.flavor}   |   ${order.caffeine}`;
    return orderDetails;
};

var orderSummaryEmail = function (order) {
    var orderEmail = document.createElement("div");
    orderEmail.classList.add("order-summary-email");
    orderEmail.textContent = order.email;
    return orderEmail;
};

//---------------------------------------------------------------------------
var orderCompleteContainer = function (index) {
    var inputContainer = document.createElement("div");
    inputContainer.classList.add("order-complete");
    var completeButton = newCompleteButton(index);
    inputContainer.appendChild(completeButton);
    return inputContainer;
};

var newCompleteButton = function (index) {
    var completeButton = document.createElement("input");
    completeButton.classList.add("complete-btn");
    completeButton.setAttribute("type", "button");
    completeButton.setAttribute("value", "Complete");
    completeButton.addEventListener('click', function () {
        coffeeOrders.splice(index, 1);
        updatePendingOrders();
    });
    return completeButton;
};

// -------------------------------------------------------------------------------------

getOrdersFromLocalStorage();
updatePendingOrders();

coffeeOrderForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var coffeeOrdered = document.querySelector("[name='coffee']").value;
    var orderEmail = document.querySelector("[name='emailAddress']").value;
    var flavorShot = document.querySelector("[name='flavor']").value;
    var caffeineRating = document.querySelector("[name='strength']").value;
    var coffeeSize = document.querySelector('[name="size"]:checked').value;
    var newOrder = {'coffee'  : coffeeOrdered,
                    'email'   : orderEmail,
                    'flavor'  : flavorShot,
                    'size'    : coffeeSize,
                    'caffeine': caffeineRating
                   };
    coffeeOrders.push(newOrder);
    updatePendingOrders();
});