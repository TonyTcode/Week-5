let coffeeURL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/"


let ordersArea = document.getElementById("orders")
let displayOrders = document.getElementById("displayOrders")
let addCoffee = document.getElementById("add-coffee")
let addEmail = document.getElementById("add-email")
let orderSubmit = document.getElementById("addOrder")
let search = document.getElementById("searchOrders") 
let remove = document.getElementById("remove")
let findEmail = document.getElementById("find-email") 

async function fetchOrders(ordersInformation) { 
    let order = await fetch(coffeeURL)
    let json = await order.json()
    ordersInformation(json)
}

function deleteOrder(email) {
    fetch(coffeeURL + email, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(fetchOrders(getOrders))
}

remove.addEventListener('click', () => {
    let email = findEmail.value
    findEmail.value = ''
    return deleteOrder(email)
})

function findOrder(email) {
    return fetch(coffeeURL + email, {
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (response) {
        return response.json()
    }).then(function (myJson) {
        return myJson
    })
}

search.addEventListener('click', () => {
    let email = findEmail.value
    findEmail.value = ''
    console.log(findOrder(email))
    return findOrder(email)
})

function addOrder(email, coffee) {
    fetch(coffeeURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailAddress: email,
            coffee: coffee
        })
    }).then(fetchOrders(getOrders))
}

orderSubmit.addEventListener('click', () => {
    let coffee = addCoffee.value
    addCoffee.value = ''
    let email = addEmail.value
    addEmail.value = ''
    return addOrder(email, coffee)
})

function getOrders(ordersInformation){
    let emails = Object.keys(ordersInformation)
    let orderItems = emails.map(email => {
        let order = ordersInformation[email]
        return `<div class="orderItem">
                    <div class="removeButton"></div>
                    <span class="email">Email: ${order.emailAddress}</span>
                    <span class="coffee">Coffee: ${order.coffee}</span>
                    <span class="id">id: ${order._id}</span>
                </div>`
    })
    ordersArea.innerHTML = orderItems.join('')
}

displayOrders.addEventListener('click', function() { 
    fetchOrders(getOrders)
})
