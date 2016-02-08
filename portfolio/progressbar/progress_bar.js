// File: progress_bar.js
// Created by: Paul Nelson
// Assignment: Project 9

// This function allows us to easily get the document id and assign it to a variable.
var $ = function (id) {
    return document.getElementById(id);
}

// A variable to store the current percentage of the progress-bar.
currentProgress = 0;

var progress_click = function () {
	//var progressbar = document.getElementById("progress-bar");
	var computedStyle = window.getComputedStyle( $("progress-bar"), null );

	// If the width is 450px, which is 100%, go down, else, go up.
	if ( computedStyle.width == "450px" ) {
		go_down();
	} else if ( computedStyle.width == "0px") {
		go_up();
	}
}

var go_up = function () {
	// Increase the progress-bar until it is at 100%.
	if ( currentProgress != 101 ) {
		// Set the progress-bar width to the currentProgress%.
		$("progress-bar").style.width = currentProgress.toString() + "%";
		// Change the color of the progress-bar, if necissary.
		progress_color();
		// Increase the progress.
		currentProgress += 1;
		// Call this function recursively after a delay of 40ms so that we can see the bar move.
		setTimeout( go_up, 40 );
	} else {
		// Once the progress-bar is at 100%, change the button to read "Go to 0%"
		$("changeprogress").value = "Go to 0%";
		// Reset the currentProgress to avoid some funny visual glitches.
		currentProgress = 100;
	}
}

var go_down = function () {
	// Same as the go_up function, but reduces currentProgress.
	if ( currentProgress != -1 ) {
		$("progress-bar").style.width = currentProgress.toString() + "%";
		progress_color();
		currentProgress -= 1;
		setTimeout( go_down, 40 );
	} else {
		$("changeprogress").value = "Go to 100%";
		currentProgress = 0;
	}
}

var progress_color = function () {
	// change the color of the progress bar depending on the percent
	// if progress is between 0% and 39%, set bar to red
	if ( currentProgress >= 0 && currentProgress <= 39 ) {
		$("progress-bar").style.backgroundColor = "red";
	// if progress is between 40% and 79%, set bar to yellow
	} else if ( currentProgress >= 40 && currentProgress <= 79 ) {
		$("progress-bar").style.backgroundColor = "yellow";
	// if progress is 80% and above, set bar to green
	} else if ( currentProgress >= 80 && currentProgress <= 100 ) {
		$("progress-bar").style.backgroundColor = "green";
	}
}

var domReady = function () {
	// The function that will run once the DOM is ready.
	$("changeprogress").onclick = progress_click;
}

// If the DOM is ready, call the function.
jsLib.dom.ready( domReady );