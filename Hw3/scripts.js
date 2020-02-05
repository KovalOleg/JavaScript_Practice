let num = 1;
let el = "ed" + num;
function addDiv() {
    var d = document.createElement('div');
    d.id = el;
    num = num + 1;
    el = "ed"+num;
    document.body.appendChild(d);
}

//$(document).ready(function () {
//    $(".bt-buy").click(function () {
//        $(".bl-right").find(".bl-del").hide();
//    });
//});
