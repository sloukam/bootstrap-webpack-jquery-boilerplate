import 'bootstrap';
//import 'mustache';

import '../scss/index.scss';

$('#alert').click(() => {
  $('#testContent').load('test.html');
});

$('#alert2').click(() => {
  $('#testContent2').load('test.html #template2');
});

$(document).ready(function () {
  console.log('document is ready...');
});

// Your jQuery code

$(document).ready(function () {
  $('#menu').load('html_parts.html #mainNav');
  $('#news-container-sm').load('html_parts.html #news-content');
  $('#warns-container-sm').load('html_parts.html #warns-content');
  $('#as-about-container').load('html_parts.html #as-about-content');
  $('#as-standard-container').load('html_parts.html #as-standard-content');

  $('#img-carousel-container').load('html_parts.html #img-carousel');
});

$('article').each(function () {
  $(this).find('p:not(:first)').hide()
});
$('.more').on('click', function () {
  $(this).hide().closest('article').find('p').show();
});

$('#as-about-container').carousel();
$('#as-standard-container').load('html_parts.html #as-standard-content');

//
// $.getJSON('../public/data/as_chovni_psi.json', function(data) {
//   var template = $('#dogDetail').html();
//   // var html = 'from js';
//   var html = Mustache.to_html(template, data);
//   $('#dogList').html(html);
// });

$('#btn').on('click', function () {
  var data = {name: 'Jonathan'};
  var template = 'Hello {{ name }}';

  // var text = Mustache.render(template, data);

  $('#mypanel').html(text);
});
