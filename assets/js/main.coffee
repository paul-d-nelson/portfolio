smartquotes = require('smartquotes')
$           = require('jquery')

# smartquotes()

# FIXME: Move the following code into one scroll event
$(window).scroll ->
  # If the user has scrolled down the page, add a class to the header
  if $(window).scrollTop() > 0
    $('.main-header').addClass 'scrolled'
  else
    $('.main-header').removeClass 'scrolled'

# Highlight on Scroll
#
# Creates a list of the document sections, and then calculates whether the
# section is inside the current view. If so, adds an 'active' class to the
# element which we can use in our styles.

# Create an array of the document section hrefs
sections = ['#work', '#about', '#contact']

# On scroll
$(window).scroll ->
  windowPos       = $(window).scrollTop()
  windowHeight    = $(window).height()
  documentHeight  = $(document).height()

  for section in sections
    divPos    = $(section).offset().top
    divHeight = $(section).height()

    # If we are looking at the section
    if windowPos >= divPos and windowPos < (divPos + divHeight)
      $("a[href='#{section}']").addClass 'active'
    else
      $("a[href='#{section}']").removeClass 'active'

  # If we are at the bottom of the window
  if windowPos + windowHeight == documentHeight
    if not $('nav li:last-child a').hasClass 'active'
      navActiveCurrent = $('.active').attr 'href'
      $("a[href='#{navActiveCurrent}']").removeClass 'active'
      $('nav li:last-child a').addClass 'active'

# AJAX Form
#
# Uses jQuery to parse the form data and then send it to a PHP mailer file
# using AJAX.

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
    url: $(form).attr 'action'
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
      $(formMessages).text 'Oops! An error occured and your message could not
        be sent.'
    return
  return