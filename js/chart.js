var history_price = [];
var dates = [];

var now = new Date();
var yesterday = new Date(now.setDate(now.getDate() - 1));
let yyyy = yesterday.getFullYear();
let mm = yesterday.getMonth() + 1;
let dd = yesterday.getDate();

if (dd < 10){dd = '0' + dd};
if (mm < 10){mm = '0' + mm};

search_date = yyyy + '-' + mm + '-' + dd + ' ' + '09:00:00';

function get_chart() {
    $.ajax({
        url: `https://api.upbit.com/v1/candles/days?market=${symbol}&to=${search_date}&count=30`,
        type: 'GET',
        datatype: 'json',
        success: function(data) {
            var json = JSON.parse(JSON.stringify(data));
    
            for (let i = 0; i < json.length; i++) {
                history_price.unshift(json[i]['trade_price']);
    
                var date = json[i]['candle_date_time_kst'].split('T')[0]
                dates.unshift(date);
            }
        }
    })

    const data = {
        labels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        datasets: [{
            label: 'symbol',
            backgroundColor: 'rgb(100, 103, 234, 0.2)',
            borderColor: 'rgb(100, 103, 234)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            fill: true,
        }]
        };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                filler: {
                    propagate: true
                },
                legend: {
                    position: 'bottom',
                }
            },
            pointBackgroundColor: '#fff',
            interaction: {
                intersect: false,
                mode: 'index',
            }
        }
    };
    
    const myChart = new Chart(
        document.getElementById('chart'),
        config
    );
    
    setInterval(function() {
        data.datasets[0].data = history_price;
        data.labels = dates;
        data.datasets[0].label = symbol;
    
        myChart.update();
    }, 1000)
}