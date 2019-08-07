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

$(document).ready(function() {
  $('#menu').load('html_parts.html #mainNav');
});

$.getJSON('../public/data/as_chovni_psi.json', function(data) {
  var template = $('#dogDetail').html();
  // var html = 'from js';
  var html = Mustache.to_html(template, data);
  $('#dogList').html(html);
});
