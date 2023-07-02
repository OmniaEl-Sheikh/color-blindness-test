
function newQuestion(params) {
    var temp = {
        question:  params[0],
        choices: params[1],
        correctAnswer: params[2]
    };
    return temp;
}

var allQuestions = [
    ["<p><b>Question 1: What is the number in the picture?</b><br/><img src='./assets/img/1.png'><p/>", ["1", "7", "6", "I don't know"], 1],
    ["<p><b>Question 2: What is the number in the picture?</b><br/><img src='./assets/img/2.png'><p/>", ["26", "2", "6", "I don't know"], 0],
    ["<p><b>Question 3: What is the number in the picture?</b><br/><img src='./assets/img/3.png'><p/>", ["1", "17", "15", "I don't know"], 2],
    ["<p><b>Question 4: What is the number in the picture?</b><br/><img src='./assets/img/4.png'><p/>", ["7", "3", "73", "I don't know"], 2],
    ["<p><b>Question 5: What is the number in the picture?</b><br/><img src='./assets/img/5.png'><p/>", ["12", "13", "2", "I don't know"], 0],
    ["<p><b>Question 6: What is the number in the picture?</b><br/><img src='./assets/img/6.png'><p/>", ["3", "8", "13", "I don't know"], 1],
    ["<p><b>Question 7: What is the number in the picture?</b><br/><img src='./assets/img/7.png'><p/>", ["16", "11", "1", "I don't know"], 0],
    ["<p><b>Question 8: What is the number in the picture?</b><br/><img src='./assets/img/8.png'><p/>", ["7", "70", "29", "I don't know"], 2],
   ].map(newQuestion);

var total = 0, number = 0, totalQuestions = allQuestions.length, answers = [];

$(document).ready(function() {

    function newQuestionAnswers() {
        $("#content").fadeOut(500, function() {
            $("#answers").empty();
            if (number < totalQuestions)
                $("#questCount").text("Question: " + (number + 1) + " of 8");
            var query = allQuestions[number];
            $("#question").html(query.question);


            for(var i = 0; i < query.choices.length; i++)
                $("#answers").append("<input type='radio' name='answers' id='radio" + i + "' value='answer" + i
                    + "'><label for='test" + i + "'>" + query.choices[i] + "</label><br>");
            if(answers.length > number)
                $("#radio" + answers[number]).prop("checked", true);
            if (number > 0)
                $("#back").prop("disabled", false);
        });
        $("#content").fadeIn(500);
    }

    function checkAnswer() {

        for(var i = 0; i < $("input").length; i++) {
            if ($("#radio" + i).is(":checked")) {
                answers[number] = i;
                break;
            }
            else if ( i === $("input").length -1 && !$("#radio" +i).is(":checked")) {
                $("#next").after("<p id='warning'>Please select an answer and then click next</p>");
                return false;
            }
        }

        var query = allQuestions[number];
        if($("#radio" + query.correctAnswer).is(":checked"))
            updateScore(10);
        number += 1;
        return true;
    }

    function finalScore() {
        $("#score").text("Final Score: " + total + "/" + totalQuestions * 10).show(1000);
        $("#question, #answers, #questCount, #next, #back").hide(10);
         
        if (total > 70){
         $("#result").show(1000);
         $("#startagain").show();}
        if (total < 80){
         $("#resultbad").show(1000);
         $("#startagain").show();}
         
        
         
        
    }

    function updateScore(change) {
        total += change;
        $("#score").text("Score: " + total);
    }

    $("#back").hide();
    $("#next").hide();
    $("#startagain").hide();
    $("#score").hide();
    $("#bar10").hide();
    $("#result").hide();
    $("#resultbad").hide();
    
    
    $("#start").on('click', function() {
        $("#start").hide();
        $('#h4Start').hide(1000);
         $("#next").show(1000);
        $("#bar").width('5%');
        newQuestionAnswers();
        updateScore(0);
    });

      $("#startagain").on('click', function() {
        
       location.reload();
     
    
         
    });
    
    $("#next").on('click', function() {
        $("#back").show(100);
        $("#warning").remove();
        if(checkAnswer()) {
            if (number < totalQuestions)
                newQuestionAnswers();
            else
                finalScore();
            
            
        }
        
       
        
        if (number > 0)
            $("#back").prop("disabled", false);
            $("#bar").width('12.5%');
        if (number > 1)
        $("#bar").width('25%');
        if (number > 2)
        $("#bar").width('37.5%');
        if (number > 3)
        $("#bar").width('50%');
        if (number > 4)
        $("#bar").width('62.5%');
        if (number > 5)
        $("#bar").width('75%');
        if (number > 6)
        $("#bar").width('87.5%');
        if (number > 7)
        $("#bar").width('100%');
        
        
        
   
    });
    
    
    
        

    $("#back").on('click', function() {
        if ( number === totalQuestions) {
            $("#score").hide();
            $("#question, #answers, #questCount, #next, #score").show(2500);
        }
        
        if (number > 0)
        $("#bar").width('5%');
        if (number > 1)
        $("#bar").width('12.5%');
        if (number > 2)
        $("#bar").width('25%');
        if (number > 3)
        $("#bar").width('37.5%');
        if (number > 4)
        $("#bar").width('50%');
        if (number > 5)
        $("#bar").width('62.5%');
        if (number > 6)
        $("#bar").width('75%');
        if (number > 7)
        $("#bar").width('87.5%');
        
        
        number -= 1;
        $("#back").prop("disabled", true);
        if (allQuestions[number].correctAnswer === answers[number])
            updateScore(-10);
        newQuestionAnswers();
        
          
    });
});