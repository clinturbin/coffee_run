var coffeeOrderForm = document.querySelector('[data-coffee-order="form"]');
var pendingOrders = document.querySelector(".pending-orders");

var ordersAsString = localStorage.getItem('coffee-orders');
var ordersAsObject = JSON.parse(ordersAsString);
var coffeeOrders = [];


var loadOrdersFromStorage = function () {
    if (ordersAsObject !== null) {
        ordersAsObject.forEach( function (element) {
            coffeeOrders.push(element);    
        });
    };
};
loadOrdersFromStorage();

var addOrdersToLocalStorage = function () {
    ordersAsString = JSON.stringify(coffeeOrders);
    localStorage.setItem('coffee-orders', ordersAsString);
};

var clearOrderElements = function () {
    var orders = document.querySelectorAll('.order');
    orders.forEach( function (element) {
        element.remove();
    })
};



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
    addOrdersToLocalStorage();
    updatePendingOrders();
    
});

var updatePendingOrders = function () {
    clearOrderElements();
    coffeeOrders.forEach(function (element, index) {
        pendingOrders.appendChild(pendingOrder(element, index));
    })
    addOrdersToLocalStorage();
};

var pendingOrder = function (element, index) {
    var newOrder = document.createElement('div');
    newOrder.classList.add('order');
    newOrder.appendChild(orderSummary(element));
    newOrder.appendChild(orderComplete(index));
    return newOrder;
};

var orderSummary = function (element) {
    var coffeeOrdered = orderSummaryCoffee(element.coffee);
    var orderDetails = orderSummaryDetails(element.size, element.flavor, element.caffeine);
    var orderEmail = orderSummaryEmail(element.email);
    var orderSummary = document.createElement('div');
    orderSummary.classList.add('order-summary');
    orderSummary.appendChild(coffeeOrdered);
    orderSummary.appendChild(orderDetails);
    orderSummary.appendChild(orderEmail);
    return orderSummary;
}

var orderSummaryCoffee = function (coffeeType) {
    var coffeeOrdered = document.createElement('div');
    coffeeOrdered.classList.add("order-summary-coffee");
    coffeeOrdered.textContent = coffeeType;
    return coffeeOrdered;
};

var orderSummaryDetails = function (size, flavor, caffeine) {
    var orderDetails = document.createElement("div");
    orderDetails.classList.add("order-summary-details");
    orderDetails.textContent = `${size}    --   ${flavor}   --   ${caffeine}`;
    return orderDetails;
};

var orderSummaryEmail = function (email) {
    var orderEmail = document.createElement("div");
    orderEmail.classList.add("order-summary-email");
    orderEmail.textContent = email;
    return orderEmail;
};

var orderComplete = function (index) {
    var inputContainer = document.createElement("div");
    inputContainer.classList.add("order-complete");
    var completeButton = makeCompleteButton(index);
    inputContainer.appendChild(completeButton);
    return inputContainer;
};

var makeCompleteButton = function (index) {
    var completeBtn = document.createElement("input");
    completeBtn.classList.add("complete-btn");
    completeBtn.setAttribute("type", "button");
    completeBtn.setAttribute("value", "complete");
    completeBtn.addEventListener('click', function () {
        coffeeOrders.splice(index, 1);
        updatePendingOrders();
    });
    return completeBtn;
};

updatePendingOrders();