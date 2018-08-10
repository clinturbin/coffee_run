var coffeeOrderForm = document.querySelector('[data-coffee-order="form"]');
var pendingOrders = document.querySelector(".pending-orders");
var coffeeOrders = [];
var serverURL = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders';

var getOrdersFromServer = function () {
    coffeeOrders = [];
    var cofeeOrdersPromise = fetch(serverURL);
    cofeeOrdersPromise.then(function(response) {
        var toJSONPromise = response.json();
        toJSONPromise.then(function(orders) {
            for (key in orders) {
                coffeeOrders.push(orders[key]);
            }
            updatePendingOrders();
        });
    });
};

var addOrderToServer = function (order) { //order here is an object of order information
    fetch(serverURL, {
        method: 'POST',
        headers: {"Content-Type": "application/json; charset=utf-8",},
        body: JSON.stringify(order),
    }).then(function (response) {
        getOrdersFromServer();
    });
};

var deleteOrderFromServer = function (order) {
    $.ajax(serverURL + "/" + order.emailAddress, {
        method: 'DELETE',
        success: function () {
            getOrdersFromServer();
        }
    });
};

var clearPendingOrdersDisplay = function () {
    var orders = document.querySelectorAll('.order');
    orders.forEach( function (element) {
        element.remove();
    });
};

var updatePendingOrders = function () {
    clearPendingOrdersDisplay();
    coffeeOrders.forEach(function (order) {
        pendingOrders.appendChild(pendingOrder(order));
    });
};

var pendingOrder = function (order) {
    var newOrder = document.createElement('div');
    newOrder.classList.add('order');
    newOrder.appendChild(orderSummary(order));
    newOrder.appendChild(orderCompleteContainer(order));
    return newOrder;
};

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
    orderDetails.textContent = `${order.size}    |   ${order.flavor}   |   ${order.strength}`;
    return orderDetails;
};

var orderSummaryEmail = function (order) {
    var orderEmail = document.createElement("div");
    orderEmail.classList.add("order-summary-email");
    orderEmail.textContent = order.emailAddress;
    return orderEmail;
};

var orderCompleteContainer = function (order) {
    var inputContainer = document.createElement("div");
    inputContainer.classList.add("order-complete");
    var completeButton = newCompleteButton(order);
    inputContainer.appendChild(completeButton);
    return inputContainer;
};

var newCompleteButton = function (order) {
    var completeButton = document.createElement("input");
    completeButton.classList.add("complete-btn");
    completeButton.setAttribute("type", "button");
    completeButton.setAttribute("value", "Complete");
    completeButton.addEventListener('click', function () {
        completeButtonClicked(this, order);
    });
    return completeButton;
};

var completeButtonClicked = function (button, order) {
    button.parentElement.parentElement.classList.add('completed');
    setTimeout(function () {
        deleteOrderFromServer(order);
    }, 2000);
};

getOrdersFromServer();

coffeeOrderForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var coffeeOrdered = document.querySelector("[name='coffee']").value;
    var orderEmail = document.querySelector("[name='emailAddress']").value;
    var flavorShot = document.querySelector("[name='flavor']").value;
    var caffeineRating = document.querySelector("[name='strength']").value;
    var coffeeSize = document.querySelector('[name="size"]:checked').value;
    var newOrder = {'coffee': coffeeOrdered,
                    'emailAddress': orderEmail,
                    'flavor': flavorShot,
                    'size': coffeeSize,
                    'strength': caffeineRating
                   };
    addOrderToServer(newOrder);
});