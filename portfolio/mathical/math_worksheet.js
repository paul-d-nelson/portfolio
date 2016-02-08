// File:   math_worksheet.js
// Author: Paul Nelson

// Get the Element ID by using $, for less typing.
var $ = function (id) {
    return document.getElementById(id);
}

//-----------------------------------------------------------------------
// VARIABLES
//-----------------------------------------------------------------------

var maxHealth = 100
var heroHealth = maxHealth;
var animate;

var currentEnemy = 0; // 0 is goblin, 1 is dragon; able to add more enemies later

// Whether the problem is addition or subtraction
var addOrSubtract = [];

// An array of all the first numbers of the problem
var numbersA = [];

// An array of all the second numbers of the problem
var numbersB = [];

// Problem correct answers; will be populated by random generation func.
var correctAnswers = [];

// How many questions to generate
var questionLength = 10;

// Problem given answers; input from user.
var givenAnswers = [];

// An array that stores whether the question was right or wrong
var gradedAnswers = [];

// The grade will be presented as grade / questionLength
var grade = 0;

// An index of the current question which will be used to loop through the questions
var currentQuestion = 0;

// The max and min values of the numbers that are used in the problems
var maxNumber = 50;
var minNumber = 1;


//-----------------------------------------------------------------------
// FUNCTIONS
//-----------------------------------------------------------------------

// Reveals the first question so the user can start the test
var StartTest = function () {
    EnemyEnter();

    $("math-question").style.display = 'block';
    $("start").style.display = 'none';
}

// Randomly generates all of the questions and assigns the variables to arrays
var CreateQuestions = function () {
    for (var i = 0; i < questionLength; i++) {
        numbersA.push(Math.floor(Math.random() * maxNumber) + minNumber);
        numbersB.push(Math.floor(Math.random() * maxNumber) + minNumber);
        if (Math.floor((Math.random() * 100) + 1) > 50) {
            // The problem is add, so put this into the array
            addOrSubtract.push('+');
            // Create the answer by adding the two random numbers
            correctAnswers.push(numbersA[i] + numbersB[i]);
        } else {
            // The problem is subtract, so put this into the array
            addOrSubtract.push('-');
            // Create the answer by subtracting the two random numbers
            correctAnswers.push(numbersA[i] - numbersB[i]); 
        }
    }
}

// Presents the questions to the user one at a time and allows them to enter an answer
var NextQuestion = function () {
    if (currentQuestion < questionLength) {
        givenAnswers.push(parseInt($('answer').value));

        // Grade the answer and push the bool to an array
        if (CheckAnswer(currentQuestion)) {
            grade++;
            EnemyDie();
        } else {
            heroHealth = Math.round(heroHealth - maxHealth / questionLength);
            $("health").innerHTML = heroHealth;
            EnemyAttack()
        }
        gradedAnswers.push(CheckAnswer(currentQuestion));

        if (currentQuestion < questionLength - 1) {
            // Go to the next question
            currentQuestion++;

            $("quest-num").innerHTML = currentQuestion + 1;

            // Populate the HTML with the question variables
            $("num-a").innerHTML = numbersA[currentQuestion];
            $("num-b").innerHTML = numbersB[currentQuestion];
            $("add-or-sub").innerHTML = addOrSubtract[currentQuestion];

            $('carry').value = '';
            $('answer').value = '';
            $('answer').focus();
        } else {
            // This code runs when the test is over

            if (grade > 0) {
                setTimeout(function () {
                    $("test").style.display = 'none';
                    $("winning-screen").style.display = 'block';
                }, 500);
            } else {
                setTimeout(function () {
                    $("test").style.display = 'none';
                    $("losing-screen").style.display = 'block';
                }, 500);
            }
            

            // Present the grade in a popup
            setTimeout(GiveGrade, 2000);
        }
    }
}

// CheckAnswer checks the given answer array to the correct answers and returns a bool
var CheckAnswer = function (question) {
    if (givenAnswers[question] === correctAnswers[question]) {
        return true;
    } else {
        return false;
    }
}

var GiveGrade = function () {
    // Create a variable to store the table data of the user's grade
    var gradeHTML = '';
    for (i = 0; i < questionLength; i++) {
        gradeHTML += '<tr><th>' + (i + 1) + '</th><th>' + correctAnswers[i] + '</th><th>' + givenAnswers[i] + '</th><th>' + gradedAnswers[i] + '</th></tr>';
    }

    // Create a variable to store the popup window contents
    var w = 600;
    var h = 600;
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    var generator = window.open('', 'name', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Populate the popup window
    generator.document.write('<html><head><title>Grade</title>');
    generator.document.write('<link rel="stylesheet" type="text/css" href="math_worksheet.css">');
    generator.document.write('</head><body><section>');
    generator.document.write('<h1>Results</h1>')
    generator.document.write('<p>Grade: ' + grade + '/' + questionLength + '</p>'); // TODO: put the grades here
    generator.document.write('<table>');
    generator.document.write('<tr><th>Question</th><th>Correct Answer</th><th>Given Answer</th><th>Grade</th></tr>');
    generator.document.write(gradeHTML);
    generator.document.write('</table>');
    generator.document.write('</section></body></html>');
    generator.document.close();
}

// GAME FUNCTIONS
// EnemyEnter:  Animates an enemy entering the screen and stopping in front of the hero
// EnemyDie:    Called whenever the correct answer is given; enemy fades out over time
// EnemyAttack: Called whenever an incorrect answer is given; change hero image
//              to red for one frame and animate enemy forward slightly, then back
var EnemyEnter = function () {
    // Last question is the Dragon Boss.
    if (currentQuestion === questionLength - 1) {
        currentEnemy = 1;
    }

    switch (currentEnemy) {
        case 0:
            $("enemy").src = "img/goblin_walk.gif";
            break;
        case 1:
            $("enemy").src = "img/dragon_idle.gif";
            break;
    }

    // Starts at right of screen, invisible, then slowly animates left and visible
    if ($("enemy").style.left !== '300px') {
        $("enemy").style.left = parseInt($("enemy").style.left) - 10 + 'px';
        animate = setTimeout(EnemyEnter, 20);
    } else {
        clearTimeout(animate);
        switch (currentEnemy) {
            case 0:
                $("enemy").src = "img/goblin_idle.gif";
                break;
            case 1:
                $("enemy").src = "img/dragon_idle.gif";
                break;
        }
    }
}

var EnemyDie = function () {
    switch (currentEnemy) {
        case 0:
            $("enemy").src = "img/goblin_hurt.gif";
            break;
        case 1:
            $("enemy").src = "img/dragon_hurt.gif";
            break;
    }
    if ($("enemy").style.bottom !== '-150px') {
        $("enemy").style.bottom = parseInt($("enemy").style.bottom) - 10 + 'px';
        animate = setTimeout(EnemyDie, 20);
    } else {
        clearTimeout(animate);
        $("enemy").style.left = '1000px'
        $("enemy").style.bottom = '0px'
        switch (currentEnemy) {
            case 0:
                $("enemy").src = "img/goblin_idle.gif";
                break;
            case 1:
                $("enemy").src = "img/dragon_idle.gif";
                break;
        }
        EnemyEnter();
    }
}

var EnemyAttack = function () {
    // Change enemy src to attack
    // Change hero src to hurt
    // change back after 20ms
    if (currentEnemy === 0) {
        $("enemy").src = "img/goblin_attack.gif";
    }
    setTimeout(function(){$("hero").src = "img/hero_hurt.gif"}, 400);
    setTimeout(function(){$("hero").src = "img/hero_idle.gif"}, 440);
    setTimeout(function(){
        switch (currentEnemy) {
            case 0:
                $("enemy").src = "img/goblin_idle.gif";
                break;
            case 1:
                $("enemy").src = "img/dragon_idle.gif";
                break;
        }
    }, 1000);
}

// On the window load, set the onclick event
window.onload = function () {
    $("winning-screen").style.display = 'none';
    $("losing-screen").style.display = 'none';
    $("math-question").style.display = 'none';
    $("health").innerHTML = heroHealth;
    $("enemy").src = "img/goblin_walk.gif"
    $("enemy").style.left = '1000px'
    $("enemy").style.bottom = '0px'

    // Generate new questions whenever the page is loaded
    CreateQuestions();

    $("start-button").onclick = StartTest;

    $("quest-num").innerHTML = 1;
    $("quest-total").innerHTML = questionLength;

    // Populate the first question
    $("num-a").innerHTML = numbersA[currentQuestion];
    $("num-b").innerHTML = numbersB[currentQuestion];
    $("add-or-sub").innerHTML = addOrSubtract[currentQuestion];

    $("submit").onclick = NextQuestion;

    // DEBUG: Print all the questions and answers
    // $("debug").innerHTML = '<p>' + numbersA.valueOf() + '</p><p>' + addOrSubtract.valueOf() + '</p><p>' + numbersB.valueOf() + '</p><p>' + correctAnswers.valueOf() + '</p>';
}