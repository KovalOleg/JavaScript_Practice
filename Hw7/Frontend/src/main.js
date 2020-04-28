/**
 * Created by chaika on 25.01.16.
 */
//var $clear = ("#clear");
//var clearStorage = $("#clSt");

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






var summ = $("#sum");


$(function () {
    var pointUser;
    var markerUser;
    var home_point;
    var map1;

    function mapInitialize() {
        //Тут починаємо працювати з картою
        var mapProp = {
            center: new google.maps.LatLng(50.464379, 30.519131)
            , zoom: 11
        };
        var html_element = document.getElementById("googleMap");
        var map = new google.maps.Map(html_element, mapProp);
        map1 = map; //Карта створена і показана
        var point = new google.maps.LatLng(50.464379, 30.519131);
        home_point = point;
        var marker = new google.maps.Marker({
            position: point, //map    - це змінна карти створена за допомогою new google.maps.Map(...)
            map: map
            , icon: "assets/images/map-icon.png"
        });
        google.maps.event.addListener(map, 'click', function (me) {
            var coordinates = me.latLng;
            geocodeLatLng(coordinates, function (err, adress) {
                if (!err) {
                    //Дізналися адресу
                    var adressField = document.getElementById("adress");
                    adressField.value = adress;
                    if (markerUser != null) markerUser.setMap(null);
                    pointUser = new google.maps.LatLng(me.latLng.lat(), me.latLng.lng());
                    markerUser = new google.maps.Marker({
                        position: pointUser, //map    - це змінна карти створена за допомогою new google.maps.Map(...)
                        map: map1
                        , icon: "assets/images/home-icon.png"
                    });
                    calculateRoute(pointUser, home_point, function (err, dur) {
                            $("#timeOrd").text(dur.duration.text);
                        })
                        //                    var time; time = calculateRoute(point,pointUser,callback);
                        //                    $("#ordTime").text(time);
                }
                else {
                    console.log("Немає адреси");
                    var adressField = document.getElementById("adress");
                    adress.value = '';
                }
            })
        });
    }
    $(document).on("input", function (ev) {
        if (!adress1.checkValidity() || adress1.value == "") {
            $("#adress").addClass("is-invalid");
            $("#adress").removeClass("is-valid");
            if (markerUser != null) markerUser.setMap(null);
        }
        else {
            $("#adOrder").text(adress1.value);
            $("#adress").addClass("is-valid");
            $("#adress").removeClass("is-invalid");
            //            geocodeAddress(, callback);
            geocodeAddress(adress1.value, function (err, coordinates) {
                    if (!err) {
                        //Дізналися координати
                        console.log(coordinates.lat());
                        if (markerUser != null) markerUser.setMap(null);
                        if (coordinates.lat() != undefined && coordinates.lat() != null) {
                            pointUser = new google.maps.LatLng(coordinates.lat(), coordinates.lng());
                            markerUser = new google.maps.Marker({
                                position: pointUser, //map    - це змінна карти створена за допомогою new google.maps.Map(...)
                                map: map1
                                , icon: "assets/images/home-icon.png"
                            });
                            calculateRoute(pointUser, home_point, function (err, dur) {
                                $("#timeOrd").text(dur.duration.text);
                            })
                        }
                        else {
                            console.log("Немає адреси");
                            var adressField = document.getElementById("adress");
                            adress.value = '';
                        }
                    }
                })
                //            pointUser = new google.maps.LatLng(coordinates.latLng.lat(), coordinates.latLng.lng());
                //            markerUser = new google.maps.Marker({
                //                position: point, //map    - це змінна карти створена за допомогою new google.maps.Map(...)
                //                map: map
                //                , icon: "assets/images/home-icon.png"
                //            });
        }
    });
    //    $("#payment").on('click',function(){
    //        if( $("#name").checkValidity() && $("#number").checkValidity() && $("#adress").checkValidity()){
    //
    //        }
    //    })
    function geocodeLatLng(latlng, callback) {
        //Модуль за роботу з адресою
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'location': latlng
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK && results[1]) {
                var adress = results[1].formatted_address;
                if (!adress1.checkValidity() || adress1.value == "") {
                    $("#adress").addClass("is-invalid");
                    $("#adress").removeClass("is-valid");
                }
                else {
                    counter++;
                    $("#adress").addClass("is-valid");
                    $("#adress").removeClass("is-invalid");
                }
                callback(null, adress);
            }
            else {
                callback(new Error("Can't find adress"));
            }
        });
    }
















    function calculateRoute(A_latlng, B_latlng, callback) {
        var directionService = new google.maps.DirectionsService();
        directionService.route({
            origin: A_latlng
            , destination: B_latlng
            , travelMode: google.maps.TravelMode["DRIVING"]
        }, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                var leg = response.routes[0].legs[0];
                callback(null, {
                    duration: leg.duration
                });
            }
            else {
                callback(new Error("Can'not find direction"));
            }
        });
    }
    //Коли сторінка завантажилась
    google.maps.event.addDomListener(window, 'load', mapInitialize);
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
    var adress1 = document.getElementById("adress");
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


























    function geocodeAddress(address, callback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK && results[0]) {
                var coordinates = results[0].geometry.location;
                callback(null, coordinates);
            }
            else {
                callback(new Error("Can not find the adress"));
            }
        });
    }








































function postRequest(url, data, callback) {
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
            callback(null, data);
        },
        fail: function () {
            callback(new Error("Ajax Failed"));
        }
    })
}






    $("#sendIn").on("click", function () {
        counter = 0;
        sendName(counter);
        sendNum(counter);


        var descr = "";

        var cart2 = PizzaCart.getPizzaInCart();

        if (adress1.checkValidity() == true && name.checkValidity() == true && number.checkValidity() == true) {
              var descr = "Замовлення піци: " + $("#name").val() + "\nАдреса доставки: " + $("#adress").val() + "\nТелефон: " + $("#number").val() + "Замовлення: \n"
              for(var i = 0; i<cart2.length; i++)
                  descr += " " + cart2[i].quantity + " " + cart2[i].pizza.title + "\n";
              var data = {
                  description: descr,
                  amount: 500
              }
              console.log(data);
              postRequest('/api/create-order/', data, function(req, res){
                  console.log(res.data);
                  console.log(res.signature);
                  LiqPayCheckoutCallback(res.data, res.signature);
              });
        }





    });



//res.se({
//                nameO: name.value
//                , numberO: number.value
//                , adressO: adress.value
//                , Korb: PizzaCart.getPizzaInCart()
//            });
//





window.LiqPayCheckoutCallback = function(data, signature){

                  LiqPayCheckout.init({
                      data:    data,
                      signature:    signature,
                      embedTo:    "#liqpay",
                      mode:    "popup"    //    embed    ||    popup
                    }).on("liqpay.callback",    function(data){
                      console.log(data.status);
                      console.log(data);
                  }).on("liqpay.ready",    function(data){
                      //    ready
                  }).on("liqpay.close",    function(data){
                      //    close
                  })
};
































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
