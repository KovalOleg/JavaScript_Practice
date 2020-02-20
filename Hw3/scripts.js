$(document).ready(function () {
    var id = 4;
    $('.bl-minus').addClass("becomePink");
    $('body').on('click', '.bl-plus', function () {
        var textNum = $(this).parent().find('.bl-label').text();
        var Num = parseInt(textNum) + 1;
        var myId = '#a' + $(this).parent().parent().attr('id');
        $(myId).find('.small-num').text(Num);
        $(this).parent().find('.bl-label').text(Num);
        $(this).parent().find('.bl-minus').removeClass("becomePink");
    });
    $('body').on('click', '.bl-minus', function () {
        var textNum = $(this).parent().find('.bl-label').text();
        var Num = parseInt(textNum);
        if (Num != 1) Num = Num - 1;
        if (Num == 1) $(this).addClass("becomePink");
        $(this).parent().find('.bl-label').text(Num);
        var myId = '#a' + $(this).parent().parent().attr('id');
        $(myId).find('.small-num').text(Num);
    });
    $('body').on('click', '.bt-buy', function () {
        $(this).parent().parent().parent().find('.bl-product').toggleClass("bought");
        $(this).parent().parent().parent().find('.bl-minus').toggleClass("dissappear");
        $(this).parent().parent().parent().find('.bl-plus').toggleClass("dissappear");
        $(this).parent().parent().parent().find('.bt-del').toggleClass("destroy");
        $(this).toggleClass('bigger');
        if($(this).text()=='Куплено') $(this).text('Не куплено'); else $(this).text('Куплено');
        var myId = '#a' + $(this).parent().parent().parent().attr('id');
        if ($(myId).parent().attr('class') == "bl-title1") $('.bl-title2').append($(myId));
        else $('.bl-title1').append($(myId));
    });
    $('body').on('click', '.bt-del', function () {
        $(this).parent().parent().parent().remove();
        var myId = '#a' + $(this).parent().parent().parent().attr('id');
        $(myId).remove();
    });
    $('body').on('click', '.bl-product span', function () {
        if ($('input', this).length == 0) {
            var myId = $(this).parent().parent().attr('id');
            var name = $(this).text().trim();
            var parent = $(this);
            $(this).html('<input class="input-name">');
            $('input', this).css("width", "100%")
            $('input', this).val(name).focus().focusout(function () {
                var name = $(this).val();
                $('#a' + myId).find('.small-prod').text(name);
                parent.text(name);
            });
        }
    });
    $('.bt-add').on('click', function () {
        var box = $(this).parent().find('.add-field');
        var text = box.val();
        if (text != '') {
            var newRaw = ('<div class="bl-row" id="' + id + '">' + '<div class="bl-product" > <span>' + text + '</span> </div>' + '<div class="bl-count">' + '<button class="bl-minus becomePink" data-tooltip="Decrease counter">-</button> <span class="bl-label">1</span>' + '<button class="bl-plus" style="margin-left:5px;" data-tooltip="Increase counter">+</button>' + '</div>' + '<div class="bl-buttons" style="width: 100%; float:right;">' + '<div class="bl-right">' + '<button class="bt-buy" data-tooltip="Click to buy">Куплено</button>' + '<button class="bt-del" data-tooltip="Delete from list">×</button>' + '</div>' + '</div>' + '</div>');
            var newMini = '<div class="round"  id="a' + id + '"> <span class="small-prod">' + text + '</span><div class="number"><span class = "small-num" style="margin-left: 6px;">1</span></div>' + '</div>';
            id = id + 1;
            $('.bl-list').append(newRaw);
            $('.bl-title1').append(newMini);
            box.val('');
            $(this).blur();
        }
    });
    $('.add-field').keypress(function (e) {
        var box = $(this).parent().find('.add-field');
        var text = box.val();
        if (e.which == 13 && text != '') {
            if (text != '') {
                var newRaw = ('<div class="bl-row" id="' + id + '">' + '<div class="bl-product"> <span>' + text + '</span> </div>' + '<div class="bl-count">' + '<button class="bl-minus becomePink" data-tooltip="Decrease counter">-</button> <span class="bl-label">1</span>' + '<button class="bl-plus" style="margin-left:5px;" data-tooltip="Increase counter">+</button>' + '</div>' + '<div class="bl-buttons" style="width: 100%; float:right;">' + '<div class="bl-right">' + '<button class="bt-buy" data-tooltip="Click to buy">Куплено</button>' + '<button class="bt-del" data-tooltip="Delete from list">×</button>' + '</div>' + '</div>' + '</div>');
                var newMini = '<div class="round"  id="a' + id + '"> <span class="small-prod">' + text + '</span><div class="number"><span class = "small-num"  style="margin-left: 6px;">1</span></div>' + '</div>';
                id = id + 1;
                $(this).parent().parent().append(newRaw);
                $('.bl-bought .bl-title1').append(newMini);
                box.val('');
                $(this).blur();
            }
        }
    });
});
