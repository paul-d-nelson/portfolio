// Author: Paul Nelson
// Description: A game that allows interaction with a pet dog.

// Get the Element ID by using $, for less typing.
var $ = function (id) {
    return document.getElementById(id);
}

//------------------------------------------------------------------------
//  VARIABLES
//------------------------------------------------------------------------

// Create a variable to hold the timeout functions.
var timer;
// How long for each animation to last.
var animTime = 4000;

//------------------------------------------------------------------------
// OBJECTS
//------------------------------------------------------------------------

// Create a variable to hold the dog object.
var dog = function( ) {
	
}

// Use prototype to add functions to the dog object.
dog.prototype.pet = function() {
	// Change the image to the new behavior's image.
	$("main_image").src = "img/dog_pet.png";
	// Clear any timers that may be running, so they don't interrupt this one.
	clearTimeout(timer);
	// Create a new timer, which will change the image back to the default in 5 seconds.
	timer = setTimeout(function () {
		$("main_image").src = "img/dog_default.png";
	}, animTime);
}

dog.prototype.walk = function() {
	$("main_image").src = "img/dog_walking.png";
	clearTimeout(timer);
	timer = setTimeout(function () {
		$("main_image").src = "img/dog_default.png";
	}, animTime);
}

dog.prototype.give_bone = function() {
	$("main_image").src = "img/dog_bury_bone.png";
	clearTimeout(timer);
	timer = setTimeout(function () {
		$("main_image").src = "img/dog_default.png";
	}, animTime);
}

dog.prototype.throw_ball = function() {
	// Make the dog disappear for a little while, then reappear with the ball.
	$("main_image").style.visibility = "hidden";
	$("main_image").src = "img/dog_ball.png";
	clearTimeout(timer);
	timer = setTimeout(function () {
		$("main_image").style.visibility = "visible";
	}, 1500);
	timer = setTimeout(function () {
		$("main_image").src = "img/dog_default.png";
	}, animTime);
}

dog.prototype.roll_over = function() {
	$("main_image").src = "img/dog_roll_over.png";
	clearTimeout(timer);
	timer = setTimeout(function () {
		$("main_image").src = "img/dog_default.png";
	}, animTime);
}

// Create a new object named Spot based on the dog object.
var Spot = new dog();

//------------------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------------------

// Change the description text for each of the behavior options.
var default_text = function () {
	$("description").innerHTML = "Click on an image to play with Spot.";
}

var throw_ball_text = function () {
	$("description").innerHTML = "Play catch with Spot.";
}

var give_bone_text = function () {
	$("description").innerHTML = "Give Spot a bone.";
}

var walk_text = function () {
	$("description").innerHTML = "Walk Spot.";
}

var pet_text = function () {
	$("description").innerHTML = "Pet Spot.";
}

var roll_over_text = function () {
	$("description").innerHTML = "Make Spot roll over.";
}

window.onload = function () {

}