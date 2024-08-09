
const getData = () => {

    $.get('/api/calcData', (response) => {
        if (response.statusCode == 200) {
            
            addTableRows(response.data);
            console.log(response.data);
        }
    })
}


const addTableRows = (items) => {
    // const tableBody = $("#results-table-body");
    // $("#results-table-body").empty();  

    // const tabledata = $('#table-data');

    let rowlist = '';

    items.forEach(item => {

        let row = `
        <tr>
            <td>${item.number1}</td>
            <td>${item.number2}</td>
            <td>${item.result}</td>
            <td>${item.type}</td>
        </tr>`;
        rowlist+=row;
    });

    const tableData = `<table>
        <thead>
            <tr>
                <th>Number 1</th>
                <th>Number 2</th>
                <th>Result</th>
                <th>Operation</th>
            </tr>
        </thead>
        <tbody>
            ${rowlist}
        </tbody>
    </table>`
    console.log(tableData);
    $("#table-data").html(tableData);
}



$("#clickMeButton").click(function(event) {
    var firstNum = $("#firstNum").val();
    var secondNum = $("#secondNum").val();
    
    $.get('/addTwoNumber', { n1: firstNum, n2: secondNum }, function(result) {
        $("#resultDiv").html("<p>The sum is " + result.data + "</p>");
        getData();
    });
});

$("#clickMeButton1").click(function(event) {    
    var firstNum = $("#firstNum").val();
    var secondNum = $("#secondNum").val();
    
    $.get('/subTwoNumber', { n1: firstNum, n2: secondNum }, function(result) {
        $("#resultDiv").html("<p>The difference is " + result.data + "</p>");
        getData();
    });
});

$("#clickMeButton2").click(function(event) {    
    var firstNum = $("#firstNum").val();
    var secondNum = $("#secondNum").val();
    
    $.get('/mulTwoNumber', { n1: firstNum, n2: secondNum }, function(result) {
        $("#resultDiv").html("<p>The multiplication is " + result.data + "</p>");
        getData();
    });
});

$(document).ready(function() {
    $('.modal').modal();
    $('#welcomeModal').modal('open');

    getData();
});

