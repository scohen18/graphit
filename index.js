var unirest = require('unirest');
var prompt = require('commander');
var colors = require('colors');
var express = require('express');

var app = express();
app.set('views', '.');
app.set("view engine", "pug");
app.use(express.static('public'));
app.get("/",function(req,res){
    res.render("index");
});
app.get("/chart",function(req,res){
    var inputTicker = req.query.inputTicker;
    chart(inputTicker, function(response) {
        res.json(response.raw_body);
    })

});
app.get("/name",function(req,res){
    var inputName = req.query.inputName;
    name(inputName, function(response) {
        res.json(response.body[0].Symbol);
    })

});

app.listen(8000);

var currentSymbol;



prompt.command('stock <ticker>').description('get information from <ticker>').action(function (ticker, command) {
    stock(ticker);
});

prompt.command('name <name>').description('get ticker name from <name>').action(function (sName, command) {
    name(sName);
});

prompt.command('chart <ticker>').description('generate chart data from <ticker>').action(function (ticker, command) {
    chart(ticker);
});

prompt.parse(process.argv);
if (!process.argv.slice(2).length) {
    prompt.outputHelp();
}

function printData(ticker)
{
    for(var i = 0; i < Object.keys(ticker).length; i ++)
        {
            console.log(Object.keys(ticker)[i] + ": ".red + ticker[Object.keys(ticker)[i]]);
        }
}
function stock(inTicker)
{
    var output;

    unirest.post('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + inTicker).headers({
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
    }).send({
        "parameter": 23
        , "foo": "bar"
    }).end(function (response) {
        output = response.raw_body;
        printData(output);
    });

    return output;
}
function name(inName, cb)
{

    unirest.post('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=' + inName).headers({
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
    }).send({
        "parameter": 23
        , "foo": "bar"
    }).end(function (response) {
        cb(response);
    });
}
function chart(inTicker, cb)
{

    var input = {
        Normalized: false,
        NumberOfDays: 365,
        DataInterval: 0,
        DataPeriod: "Day",
        Elements: [{Symbol: inTicker, Type: "price", Params: ["c"]}]
    }

    unirest.get('http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=' + JSON.stringify(input)).headers({
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
    }).end(function (response) {
        cb(response);
    });

}
