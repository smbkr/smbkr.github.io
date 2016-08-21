var Smbkr = {
	me: 'stuart',
	domain: 'smbkr.xyz'
};

Smbkr.send = function() {

	return true;
};



document.addEventListener("DOMContentLoaded", function() {
	document.getElementById('send-button').addEventListener('click', function(e) {
		e.preventDefault();
		// some code to send mail goes here
	});
});
