var ctx = document.getElementById("chart");
var chartSection = document.getElementById("chartSection");
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
function clearGraph()
{
    var newChart = document.createElement("Canvas");
    newChart.setAttribute("id","chart");
    newChart.setAttribute("width","400");
    newChart.setAttribute("height","400");
    ctx.remove();
    chartSection.removeChild(chartSection.childNodes[0]);
    chartSection.appendChild(newChart);
}
function update()
{
    if(document.getElementById("selectTicker").checked)
    {
            inputMaster = tickerIn.value;
    }
    else if(document.getElementById("selectName").checked)
    {

            getName(nameIn.value, function(response){
              inputMaster = response;
              console.log(inputMaster);
            });
    }
    else
    {
        console.log("none selected");
    }

    loadDoc(inputMaster, function(response) {
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
        cb(JSON.parse(data));
    })

}
function getName(inName, cb) {
  $.get("/name?inputName="+inName, function(data) {
      cb(data);
  })
}
