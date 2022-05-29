var symbol = "";
var now_price = document.getElementById('now_price');
var rate = document.getElementById('rate');
var code_spot = document.getElementById('code');
let socket;

function get_price() {
    socket = new WebSocket("wss://api.upbit.com/websocket/v1");

    socket.onopen = function(event) {
        data = [{"ticket":"test"}, {"type":"ticker", "codes":[symbol]}];
        socket.send(JSON.stringify(data));
        
        socket.onmessage = (event) => {
            if (event.data instanceof Blob) {
                reader = new FileReader();
    
                reader.onload = () => {
                    if (JSON.parse(reader.result) != null) {
                        var json = JSON.parse(reader.result);
                        var price = json["trade_price"];
                        var comma_price = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    
                        var change = json['change'];
    
                        var signed_change_rate = json['signed_change_rate'];
                        signed_change_rate = (signed_change_rate * 100).toFixed(2);
    
                        var code = json['code'];

                        var unit = code.split('-')[0];
                        now_price.innerHTML = `<strong>${comma_price}<span class="unit">${unit}</span></strong>`;
                        code_spot.innerHTML = `<strong id="ticker">${code}</strong>`;

                        if (change == "RISE") {
                            rate.innerHTML = `<strong class="signed_rate" style="color: #4ba56c; background-color: #d0f4da;">+${signed_change_rate}%</strong>`;
                            document.getElementById('scr').innerHTML = `<span>+${signed_change_rate}%</span>`;
                        }
                        else if (change == "FALL") {
                            rate.innerHTML = `<strong class="signed_rate" style="color: #da7fae; background-color: #feeaf5;">${signed_change_rate}%</strong>`;
                            document.getElementById('scr').innerText = signed_change_rate + '%';
                        }

                        document.getElementById('coin_name').innerHTML = `<h3>${$('.active').find('strong').text()}</h3>`;

                        document.getElementById('cd').innerHTML = `<span>${code}</span>`;
                        document.getElementById('tp').innerHTML = `<span>${comma_price} ${unit}</span>`;
                        document.getElementById('pcp').innerHTML = `<span>${json['prev_closing_price'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} ${unit}</span>`;
                        document.getElementById('scp').innerHTML = `<span>${json['signed_change_price'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} ${unit}</span>`;
                        document.getElementById('atv24h').innerHTML = `<span>${json['acc_trade_volume_24h'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span>`;
                        document.getElementById('op').innerHTML = `<span>${json['opening_price'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} ${unit}</span>`;
                        document.getElementById('hp').innerHTML = `<span>${json['high_price'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} ${unit}</span>`;
                        document.getElementById('lp').innerHTML = `<span>${json['low_price'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} ${unit}</span>`;

    
                        const today = new Date();
                        const yyyy = today.getFullYear();
                        let mm = today.getMonth() + 1;
                        let dd = today.getDate();
    
                        if (dd < 10){dd = '0' + dd};
                        if (mm < 10){mm = '0' + mm};
    
                        now_date = yyyy + '-' + mm + '-' + dd;
    
                        history_price.push(price);
                        dates.push(now_date);
                    }
                    
                };
                reader.readAsText(event.data);
            } else {
                console.log(event.data);
            }
            history_price.length = 30;
            dates.length = 30;
        }
    }
    
    socket.onerror = function(error) {
        alert(`[error] ${error.message}`);
    };
}
