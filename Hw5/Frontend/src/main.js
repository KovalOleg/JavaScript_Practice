/**
 * Created by chaika on 25.01.16.
 */
//var $clear = ("#clear");
var $cart = $("#cart");
var $All = ("#All");
var $Meat = ("#Meat");
var $Pineapples = ("#Pineapples");
var $Mushrooms = ("#Mushrooms");
var $Sea = ("#Sea");
var $Vegetarian = ("#Vegetarian");
var $choose = ("#choose");

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();

$(clear).on('click', function(){
    PizzaCart.clearCart();
});

$(Meat).on('click', function(){
    $(choose).parent().find('.myactive').removeClass('myactive');
    $(Meat).addClass('myactive');
    PizzaMenu.filterPizza('М’ясна піца');
});

$(All).on('click', function(){
    $(choose).parent().find('.myactive').removeClass('myactive');
    $(All).addClass('myactive');
     PizzaMenu.filterPizza('All');
});

$(Pineapples).on('click', function(){
    $(choose).parent().find('.myactive').removeClass('myactive');
    $(Pineapples).addClass('myactive');
     PizzaMenu.filterPizza('Піца з ананасами');
});

$(Mushrooms).on('click', function(){
    $(choose).parent().find('.myactive').removeClass('myactive');
    $(Mushrooms).addClass('myactive');
     PizzaMenu.filterPizza('Грибна піца');
});
$(Sea).on('click', function(){
    $(choose).parent().find('.myactive').removeClass('myactive');
    $(Sea).addClass('myactive');
    PizzaMenu.filterPizza('Морська піца');
});
$(Vegetarian).on('click', function(){
    $(choose).parent().find('.myactive').removeClass('myactive');
    $(Vegetarian).addClass('myactive');
    PizzaMenu.filterPizza('Вега піца');
});

});
