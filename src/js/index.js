import 'bootstrap';

import '../scss/index.scss';

$('#alert').click(() => {
  $('#testContent').load('test.html');
});

$('#alert2').click(() => {
  $('#testContent2').load('test.html #template2');
});

$(document).ready(function() {
  console.log('document is ready...');
});

// Your jQuery code
