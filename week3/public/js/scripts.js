$(document).ready(function() {
    $('.modal').modal();
    $('#welcomeModal').modal('open');
});

$("#clickMeButton").click(function(event) {
    var firstNum = $("#firstNum").val();
    var secondNum = $("#secondNum").val();
    
    $.get('/addTwoNumber', { n1: firstNum, n2: secondNum }, function(result) {
        $("#resultDiv").html("<p>The sum is " + result.data + "</p>");
    });
});

$("#clickMeButton1").click(function(event) {    
    var firstNum = $("#firstNum").val();
    var secondNum = $("#secondNum").val();
    
    $.get('/subTwoNumber', { n1: firstNum, n2: secondNum }, function(result) {
        $("#resultDiv").html("<p>The difference is " + result.data + "</p>");
    });
});

$("#clickMeButton2").click(function(event) {    
    var firstNum = $("#firstNum").val();
    var secondNum = $("#secondNum").val();
    
    $.get('/mulTwoNumber', { n1: firstNum, n2: secondNum }, function(result) {
        $("#resultDiv").html("<p>The multiplication is " + result.data + "</p>");
    });
});
