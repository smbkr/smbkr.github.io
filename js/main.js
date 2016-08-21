/**
 * Hey it's me
 */
var smbkr = {
	me: 'stuart',
	domain: 'smbkr.xyz'
};

/**
 * Shamelessly stolen from https://davidwalsh.name/javascript-debounce-function
 */
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function validatePattern(e) {
	var value = $(e).val();
	var pattern = new RegExp($(e).attr('pattern'));

	if (!pattern.test(value)) {
		return false;
	}

	return true;
}

$(document).ready(function() {
	/**
	 * Event listener for each user-fillable form element. Validates inputs,
	 * adds success/failure classes to the input & displays a help message if
	 * necessary, enables the clear button & send button (if all fields valid)
	 */
	$('.fillable').each(function() {
		$(this).keyup(debounce(
			function() {
				// Validate each input against its pattern (defined in the markup)
				if (validatePattern($(this))) {
					$(this).removeClass('is-danger');
					$(this).addClass('is-success');
					$(this).siblings('.help').addClass('is-invisible');
				} else {
					$(this).removeClass('is-success');
					$(this).addClass('is-danger');
					$(this).siblings('.help').removeClass('is-invisible');
				}

				// Enable the clear button if input is not empty
				if ($(this).val().length) {
					$('#clear-button').removeClass('is-disabled');
				} else {
					$('#clear-button').addClass('is-disabled');
				}

				// Check all fields are valid, if so enable the send button
				var allFieldsValid = true;
				$('.fillable').each(function() {
					if (!$(this).hasClass('is-success')) {
						allFieldsValid = false;
					}
				});
				if (allFieldsValid) {
					$('#send-button').removeClass('is-disabled');
				} else {
					$('#send-button').addClass('is-disabled');
				}
			},
			300))
	})

	$('#send-button').click(function(e) {
		e.preventDefault();
		$(this).addClass('is-loading');
	})

	/**
	 * Click handler for the 'clear' button - reset the value of all inputs,
	 * removes any validation classes & messages, and disables the send button
	 * and itself.
	 */
	$('#clear-button').click(function(e) {
		e.preventDefault();
		$('.fillable').each(function() {
			$(this).val('');
			$(this).removeClass('is-danger is-success');
			$(this).siblings('.help').addClass('is-invisible');
		})
		$('#send-button').addClass('is-disabled');
		$(this).addClass('is-disabled');
	})
})