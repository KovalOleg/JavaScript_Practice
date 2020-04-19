/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');
//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");
var count = $('#counter');
var $type_pizza = $('#type_pizza');

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");
    var counter = list.length;
    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({
            pizza: pizza
        });
        var $node = $(html_code);
        $node.find(".buy-big").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });
        $pizza_list.append($node);
    }
    list.forEach(showOnePizza);
    count.text(counter);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    var all = 'All';
    Pizza_List.forEach(function (pizza) {
        if (pizza.type.includes(filter)) pizza_shown.push(pizza);
        else
        if (all.includes(filter)) pizza_shown.push(pizza);
    });
    //Показати відфільтровані піци
    if (all.includes(filter)) $type_pizza.text('Усі піци');
    else $type_pizza.text(filter);
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}
exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;
