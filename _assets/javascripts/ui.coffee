#= require deck.js/extensions/status/deck.status

# Hide slide number on first and last slide.
$(document).bind 'deck.change', (event, from, to) ->
  status = $('.deck-status')
  if to + 1 in [1, $.deck('getSlides').length] then status.fadeOut() else status.fadeIn()
