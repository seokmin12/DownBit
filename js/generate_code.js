function generate_code() {
    var string = 'let socket = new WebSocket("wss://api.upbit.com/websocket/v1");<br><br>socket.onopen = function(event) {<blockquote>data = [{"ticket":"test"}, {"type":"ticker", "codes":["KRW-BTC"]}];</blockquote><blockquote>socket.send(JSON.stringify(data));</blockquote><blockquote>socket.onmessage = (event) => {<br><blockquote>var output = document.getElementById("output");<br><br>if (event.data instanceof Blob) {<blockquote>reader = new FileReader();<br><br>reader.onload = () => {<blockquote>var price = JSON.parse(reader.result)["trade_price"];<br>price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");<br>var change = JSON.parse(reader.result)["change"];<br><br>if (change == ""RISE"") {<blockquote>output.innerHTML = price;</blockquote>} else {<blockquote>output.innerHTML = price;</blockquote>}</blockquote>};<br><br>reader.readAsText(event.data);</blockquote>}</blockquote>}</blockquote>}';
    var code_spot = document.getElementById('code');
    var new_string = '';
    for(let i = 0; i < string.length; i++) {
        // console.log(string.charAt(i));
        setTimeout(function() {
            new_string += string.charAt(i)
            code_spot.innerHTML = new_string;
        }, 50 * i);
    }
}