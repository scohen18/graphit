var ctx = document.getElementById("chart");
var tickerIn = document.getElementById("tickerIn");
var nameIn = document.getElementById("nameIn");
var inputMaster;
function makeChart(dataIn, titleIn)
{
    var myChart = new Chart(ctx, {
        type: 'line',
        data: dataIn,
        label: titleIn
        });
}


function update()
{
    console.log("update press");
    
    if(document.getElementById("selectTicker").checked)
    {
            inputMaster = tickerIn.value;
    }
    else if(document.getElementById("selectName").checked)
    {
            inputMaster = nameIn.value;
    }
    else
    {
        console.log("none selected");
    }
    
    console.log(inputMaster);
    
    loadDoc(inputMaster, function(response) {
        console.log(response);
        console.log(response.Elements[0])
        var chartData = response.Elements[0].DataSeries.close.values;
        var chartLabels = response.Dates;
        
        var data = {
            labels:chartLabels,
            datasets: [
                {
                    label: inputMaster,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: chartData,
                    spanGaps: false,
                }
            ]
        };
    
    makeChart(data,"name");
    });
}
function loadDoc(inputTicker, cb) {

    $.get("/chart?inputTicker="+inputTicker, function(data) {
        console.log(JSON.parse(data));
        cb(JSON.parse(data));
    })
    
}
