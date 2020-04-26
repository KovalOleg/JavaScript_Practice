/**
 * Created by chaika on 25.01.16.
 */
//var $clear = ("#clear");
//var clearStorage = $("#clSt");
Orders = [];

var $cart = $("#cart");
var $All = ("#All");
var $Meat = ("#Meat");
var $Pineapples = ("#Pineapples");
var $Mushrooms = ("#Mushrooms");
var $Sea = ("#Sea");
var $Vegetarian = ("#Vegetarian");
var $choose = ("#choose");
var $ord = ("#ord");
var $clear = ("#clear");
$(function () {
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');
    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
    //$(clearStorage).on('click', function(){
    //    Storage.clear();
    //});
    var name = document.getElementById("name");
    var number = document.getElementById("number");
    var adress = document.getElementById("adress");
 var counter = 0;






    function sendName() {
        if (!name.checkValidity() || name.value == "") {
            $("#name").addClass("is-invalid");
            $("#name").removeClass("is-valid");
        }
        else {
            counter++;
            $("#name").addClass("is-valid");
            $("#name").removeClass("is-invalid");
        }
    }

    function sendNum() {
        if (!number.checkValidity() || number.value == "") {
            $("#number").addClass("is-invalid");
            $("#number").removeClass("is-valid");
        }
        else {
            counter++;
            $("#number").addClass("is-valid");
            $("#number").removeClass("is-invalid");
        }

    }

    function sendAdress() {
        if (!adress.checkValidity() || adress.value == "") {
            $("#adress").addClass("is-invalid");
            $("#adress").removeClass("is-valid");
        }
        else {
            counter++;
            $("#adress").addClass("is-valid");
            $("#adress").removeClass("is-invalid");
        }
    }



    $("#sendIn").on("click", function () {
        counter = 0;
        sendName(counter);
        sendNum(counter);
        sendAdress(counter);
        if(counter==3){
            Orders.push({
                nameO: name.value,
                numberO: number.value,
                adressO: adress.value,
                Korb: PizzaCart.getPizzaInCart()
            })
        }
    });
    $(clear).on('click', function () {
        PizzaCart.clearCart();
    });
    $(Meat).on('click', function () {
        $(choose).parent().find('.myactive').removeClass('myactive');
        $(Meat).addClass('myactive');
        PizzaMenu.filterPizza('М’ясна піца');
    });
    $(All).on('click', function () {
        $(choose).parent().find('.myactive').removeClass('myactive');
        $(All).addClass('myactive');
        PizzaMenu.filterPizza('All');
    });
    $(Pineapples).on('click', function () {
        $(choose).parent().find('.myactive').removeClass('myactive');
        $(Pineapples).addClass('myactive');
        PizzaMenu.filterPizza('Піца з ананасами');
    });
    $(Mushrooms).on('click', function () {
        $(choose).parent().find('.myactive').removeClass('myactive');
        $(Mushrooms).addClass('myactive');
        PizzaMenu.filterPizza('Грибна піца');
    });
    $(Sea).on('click', function () {
        $(choose).parent().find('.myactive').removeClass('myactive');
        $(Sea).addClass('myactive');
        PizzaMenu.filterPizza('Морська піца');
    });
    $(Vegetarian).on('click', function () {
        $(choose).parent().find('.myactive').removeClass('myactive');
        $(Vegetarian).addClass('myactive');
        PizzaMenu.filterPizza('Вега піца');
    });
});
