smartquotes	= require('smartquotes')
$						= require('jquery')

# smartquotes()

# AJAX Form

# Get the form.
form = $('#form-contact')

# Get the messages div.
formMessages = $('#form-messages')

# Set up an event listener for the contact form.
$(form).submit (event) ->
	# Stop the browser from submitting the form.
	event.preventDefault()

	# Serialize the form data.
	formData = $(form).serialize()

	$.ajax(
		type: 'POST'
		url: $(form).attr('action')
		data: formData
	).done((response) ->
		# Make sure that the formMessages div has the 'success' class.
		$(formMessages).removeClass 'error'
		$(formMessages).addClass 'success'

		# Set the message text.
		$(formMessages).text response

		# Clear the form.
		$('#name').val ''
		$('#email').val ''
		$('#message').val ''
		return
	).fail (data) ->
		# Make sure that the formMessages div has the 'error' class.
		$(formMessages).removeClass 'success'
		$(formMessages).addClass 'error'

		# Set the message text.
		if data.responseText != ''
			$(formMessages).text data.responseText
		else
			$(formMessages).text 'Oops! An error occured and your message could not be sent.'
		return
	return