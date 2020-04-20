/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var quantity = 0;
var summ = 0;
var sum = $("#sum");
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];


//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");
var $sum = $("#sum");
var $zamov = $("#zamov");

function addToCart(pizza, size, price) {
    //Додавання однієї піци в кошик покупок
    quantity+=1;
    var simmilar = false;
    var index = 0;
    for(var i = 0; i<Cart.length;i++){
        if(Cart[i].pizza==pizza && Cart[i].size == size) {simmilar = true; index = i; break;}
    }
    //Приклад реалізації, можна робити будь-яким іншим способом
    if(!simmilar){
        Cart.push({
        pizza: pizza,
        size: size,
        price: price,
        quantity: 1
    })
    } else {

        Cart[index].quantity += 1;
    }
    var el1 = $(sum).text();
    $(sum).text('');
    var el = parseInt(el1);
    var el2;
    el2=parseInt(price);
    el = el+el2;
    $(sum).text(el);
    updateCart();
    $(zamov).text(quantity);
}

function clearCart() {
    //Видалити піцу з кошика
    Cart = [];
    $(zamov).text('0');
    $(sum).text('0');
    summ = 0;
    quantity = 0;
    //Після видалення оновити відображення
    updateCart();
}


function removeFromCart(cart_item) {
    //Видалити піцу з кошика
//    alert(Cart[0].pizza.title);
    Cart = Cart.filter(function(item) {
//        alert(item.pizza.title+'\n'+cart_item.pizza.title+'\n'+item.size+'\n'+cart_item.size+'\n'+
//              (item.pizza.title == cart_item.pizza.title && item.size == cart_item.size));
        return !(item.pizza.title == cart_item.pizza.title && item.size == cart_item.size);
    });
//    alert('AAAAA1');
//    alert('AAAAA2');
//    alert(Cart.length);
    //Після видалення оновити відображення
    updateCart();

}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    if(localStorage.getItem("Cart") == null)
        $cart.html("");
    else{

        Cart = JSON.parse(localStorage.getItem("Cart"));
        $(sum).text(localStorage.getItem('summ'));
        summ = parseInt(localStorage.getItem('summ'));
        $(zamov).text(localStorage.getItem('quantity'));
        quantity = parseInt(localStorage.getItem('quantity'));
        updateCart();
    }
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміст кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            quantity+=1;
            cart_item.quantity += 1;
            var el1 = $(sum).text();
            $(sum).text('');
            var el = parseInt(el1);
            var el2 = parseInt(cart_item.price);
            el = el+el2;
            $(sum).text(el);
            //Оновлюємо відображення
            $(zamov).text(quantity);
            updateCart();
        });
        $node.find(".minus").click(function(){
            //Збільшуємо кількість замовлених піц
            quantity-=1;
            var el1 = $(sum).text();
            $(sum).text('');
            var el = parseInt(el1);
            var el2 = parseInt(cart_item.price);
            el = el-el2;
            $(sum).text(el);
            if(cart_item.quantity!=1) cart_item.quantity -= 1;
            else removeFromCart(cart_item);
            $(zamov).text(quantity);
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".cross").click(function(){
            //Збільшуємо кількість замовлених піц
            quantity -= cart_item.quantity;
            var el1 = $(sum).text();
            $(sum).text('');
            var el = parseInt(el1);
            var el2 = parseInt(cart_item.price);
            el = el-el2*cart_item.quantity;
            $(sum).text(el);
//            alert('AAAAAAAA');
            removeFromCart(cart_item);
            //Оновлюємо відображення
            $(zamov).text(quantity);
            updateCart();
        });
        $cart.append($node);
    }
    summ = parseInt($(sum).text());
    Cart.forEach(showOnePizzaInCart);
    localStorage.setItem('Cart', JSON.stringify(Cart));
    localStorage.setItem('quantity', quantity);
    localStorage.setItem('summ',summ);
}

exports.clearCart = clearCart;

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;
