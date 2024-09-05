const socket = io();


socket.on('randomCalculation', (data) => {
    console.log("Random Calculation Data:", data);
    
    alert(`Random calculation from the database: ${data.number1} ${data.type} ${data.number2} = ${data.result}`);
});

const getData = () => {
    $.get('/api/calcData', (response) => {
        if (response.statusCode == 200) {
            addTableRows(response.data);
            console.log(response.data);
        }
    });
}

const addTableRows = (items) => {
    let rowlist = '';

    items.forEach(item => {
        let row = `
        <tr>
            <td>${item.number1}</td>
            <td>${item.number2}</td>
            <td>${item.result}</td>
            <td>${item.type}</td>
        </tr>`;
        rowlist += row;
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
    </table>`;

    $("#table-data").html(tableData);
}

// addition event listner
$("#clickMeButton").click(function(event) {
    var firstNum = $("#firstNum").val();
    var secondNum = $("#secondNum").val();
    
    $.get('/api/addTwoNumber', { n1: firstNum, n2: secondNum }, function(result) {
        
        getData();
    });
});

// substraction event listner
$("#clickMeButton1").click(function(event) {    
    var firstNum = $("#firstNum").val();
    var secondNum = $("#secondNum").val();
    
    $.get('/api/subTwoNumber', { n1: firstNum, n2: secondNum }, function(result) {
        
        getData();
    });
});

//multiplication event listner
$("#clickMeButton2").click(function(event) {    
    var firstNum = $("#firstNum").val();
    var secondNum = $("#secondNum").val();
    
    $.get('/api/mulTwoNumber', { n1: firstNum, n2: secondNum }, function(result) {
        
        getData();
    });
});


$(document).ready(function() {
    getData();
});
