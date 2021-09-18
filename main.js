const addItems = document.querySelector('.add-items');
let itemsList = document.querySelector('.plates');
const inputItem = document.querySelector('input[name="item"]');
const buttons = document.querySelectorAll("button");
let items = [];

addItems.addEventListener("submit", (e) => {
    e.preventDefault();
    items.push({ text: inputItem.value, done: false });
    addElementsToLocalStorage(items);
    getElementsFromLocalStrorage();
    addItems.reset();
})

function addHtmlList(element, index) {
    let id = 'item' + index;
    let html = `<li>
                <input type="checkbox" id=${id} data-index=${index} ${element.done ? "checked" : ""}></input>
                <label for=${id}>${element.text}</label>
             </li>`;
    itemsList.innerHTML += html;
}

function addElementsToLocalStorage(items) {
    if (items == null) {
        localStorage.clear();
    } else {
        localStorage.setItem("items", JSON.stringify(items));
    }
}

function getElementsFromLocalStrorage() {
    let json = localStorage.getItem("items");
    if (!json) {
        itemsList.innerHTML = null;
        return;
    } else {
        let arr = JSON.parse(json);
        items = arr;
        itemsList.innerHTML = null;
        arr.forEach(addHtmlList);
    }
}

itemsList.addEventListener("click", checkingElement);

function checkingElement(item) {
    if (item.target.id) {
        items[item.target.dataset.index]["done"] = item.target.checked;
        addElementsToLocalStorage(items);
    }
}

buttons[0].addEventListener("click", () => {
    items.forEach(item => {
        item.done = false;
    })
    addElementsToLocalStorage(items);
    getElementsFromLocalStrorage();
})

buttons[1].addEventListener("click", () => {
    items.forEach(item => {
        item.done = true;
    })
    addElementsToLocalStorage(items);
    getElementsFromLocalStrorage();
})

buttons[2].addEventListener("click", () => {
    items = [];
    addElementsToLocalStorage();
    getElementsFromLocalStrorage();
})

getElementsFromLocalStrorage();