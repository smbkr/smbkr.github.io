/**
 *   _____ __  __ ____  _  _______
 *  / ____|  \/  |  _ \| |/ /  __ \
 * | (___ | \  / | |_) | ' /| |__) |   __  ___   _ ____
 *  \___ \| |\/| |  _ <|  < |  _  /    \ \/ / | | |_  /
 *  ____) | |  | | |_) | . \| | \ \   _ >  <| |_| |/ /
 * |_____/|_|  |_|____/|_|\_\_|  \_\ (_)_/\_\\__, /___|
 *                                            __/ |
 *                                           |___/
 * smbkr.xyz
 */

/**
 * Shamelessly stolen from https://davidwalsh.name/javascript-debounce-function
 * 
 * @return function
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

/** 
 * Validates value of given element against the pattern set in the pattern
 * attribute.
 * 
 * @return bool
 */
function validatePattern(e) {
	var value = $(e).val();
	var pattern = new RegExp($(e).attr('pattern'));

	if (!pattern.test(value)) {
		return false;
	}

	return true;
}

/**
 * Reset the value of all inputs, remove any validation classes & messages, and
 * disables the send and clear buttons.
 * 
 * @return void
 */
function resetForm() {
	$('.fillable').each(function() {
		$(this).val('');
		$(this).removeClass('is-danger is-success');
		$(this).siblings('.help').addClass('is-invisible');
	})
	$('#send-button').addClass('is-disabled');
	$('#clear-button').addClass('is-disabled');
}

/**
 * Disables input elements and buttons on the form.
 * 
 * @return void
 */
function disableForm() {
	$('.fillable').each(function() {
		$(this).prop('disabled', true);
	})
	$('#buttons').children('button').each(function() {
		$(this).addClass('is-disabled');
	})
}

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

			// Enable the clear button if any input has been filled in
			var fieldsFilled = false;
			$('.fillable').each(function() {
				if ($(this).val().length) {
					fieldsFilled = true;
				}
			})
			if (fieldsFilled) {
				$('#clear-button').removeClass('is-disabled');
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

/**
 * Click handler for the 'clear' button
 */
$('#clear-button').click(function(e) {
	e.preventDefault();
	resetForm();
})

/**
 * Click handler for the notification close button
 */
$('.notification .delete').click(function(e) {
	e.preventDefault();
	$(this).parents('.notification').addClass('is-hidden');
})

/**
 * Submit handler for the form
 */
$('#send-button').click(function(e) {
	e.preventDefault();

	var url = $('#contact-form').attr('action');
	var subject = "smbkr.xyz - Contact submission"
	var email = $('#email').val();
	var name = $('#name').val();
	var message = $('#message').val();

	$.ajax({
		url: url,
		method: "POST",
		data: {
			_subject: subject,
			email: email,
			name: name,
			message: message
			},
		dataType: "json",
		beforeSend: function() {
			$('#send-button').addClass('is-loading');
		},
		success: function(data) {
			$('#send-button').removeClass('is-loading');
			disableForm();
			$('#response-container').addClass('is-success');
			$('#response-container').removeClass('is-hidden');
			$('#response-text').html("Thanks! Your message was sent.");
		},
		error: function(err) {
			$('#send-button').removeClass('is-loading');
			$('#response-container').addClass('is-danger');
			$('#response-container').removeClass('is-hidden');
			$('#response-text').html("Uh-oh! Something went wrong... Please try again later.");
		}
	});
});

(function bd(c) {
	$('#bd').html(c);

	if (c === 'b') {
		c = 'd';
	} else {
		c = 'b';
	}

	setTimeout(function() {
		bd(c);
	}, 1250);
})('d');
