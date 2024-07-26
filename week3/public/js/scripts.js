const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}
// $(document).ready(function () {
//     // $('.materialboxed').materialbox();
//     $('#clickMeButton').click(() => {
//         // clickMe();
//     })
// });

$("#clickMeButton").click(function(){
    $.ajax({url: '/addTwoNumber?n1=868&n2=8909', success: function(result){
        alert("The sum is "+result.data);   
        //   $("#div1").html(result);
    }});
  });
  
