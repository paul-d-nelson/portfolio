smartquotes = require('smartquotes')
$           = require('jquery')

$(document).ready ->

  # This website is smarter than Word.
  smartquotes()

  # WOW! Much animate.
  new WOW().init()

  # Toggle the mobile menu
  $('#menu-toggle').click ->
    $('#menu, main').toggleClass 'menu-visible'

  # Smooth scroll to the section clicked on in the header nav
  $('#nav a[href^="#"]:not(a[href="#"])').click ->
    if (location.pathname.replace(/^\//,'') is @pathname.replace(/^\//,'')) or location.hostname is @hostname

      target = $(@hash)
      target = if target.length then target else $("[name=#{@hash.slice(1)}]")
      headerHeight = $('.main-header').height()
      if target.length
        $('html,body').animate {scrollTop: target.offset().top - headerHeight}, 1000
        return false
    return

  # Highlight on Scroll
  #
  # Creates a list of the document sections, and then calculates whether the
  # section is inside the current view. If so, adds an 'active' class to the
  # element which we can use in our styles.

  # Create an array of the document section hrefs
  # sections = ['#work', '#about', '#contact']
  sections = []
  menuLinks = document.getElementsByClassName 'nav-link'
  for link in menuLinks
    sections.push link.getAttribute "href"

  # On scroll
  $(window).scroll ->
    windowPos       = $(window).scrollTop()
    windowHeight    = $(window).height()
    documentHeight  = $(document).height()
    headerHeight    = $('.main-header').height() + 5

    for section in sections
      divPos    = $(section).offset().top
      divHeight = $(section).height()

      # Triggers if we are looking at the section.
      # This should account for the height of the header, since it will hide the
      # top x-many pixels from view when opaque.
      if windowPos >= (divPos - headerHeight) and windowPos < (divPos - headerHeight + divHeight)
        $("a[href='#{section}']").addClass 'active'
      else
        $("a[href='#{section}']").removeClass 'active'

    # If we are at the bottom of the window
    if windowPos + windowHeight == documentHeight
      if not $('nav li:last-child a').hasClass 'active'
        navActiveCurrent = $('.active').attr 'href'
        $("a[href='#{navActiveCurrent}']").removeClass 'active'
        $('nav li:last-child a').addClass 'active'

    # If the user has scrolled down the page, add a class to the header
    if $(window).scrollTop() > $('.fold').offset().top + $('.fold').height() - headerHeight
      $('.main-header').addClass 'scrolled'
    else
      $('.main-header').removeClass 'scrolled'


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
    ).fail(data) ->
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
