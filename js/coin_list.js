$(document).ready(function() {
    symbol = "KRW-BTC";
    get_price();
    get_chart();

    var coin_list = document.getElementById('coin_list');
    $.ajax({
        url: 'https://api.upbit.com/v1/market/all?isDetails=false',
        datatype: 'json',
        type: 'GET',
        crossDomain: true,
        success: function(data) {
            var jsons = JSON.parse(JSON.stringify(data));
            for (let i = 0; i < jsons.length; i++) {
                var market = jsons[i]['market'];
                var korean_name = jsons[i]['korean_name'];
                coin_list.innerHTML += `<li id="${market}" class="coin"><strong>${korean_name}</strong><span style="font-size: 12px;">${market}</span></li>`
            }

            $('#KRW-BTC').addClass('active');
        }
    })

    setTimeout(function() {
        $('.coin').click(function() {
            $('.coin.active').removeClass('active');
            $(this).addClass('active');
            history_price.length = 0;
            dates.length = 0;
            symbol = $(this).attr('id');
            socket.close();
            get_price();
            get_chart();
        });
    }, 500)
})