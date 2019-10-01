import 'bootstrap';
import Mustache from 'mustache';
import 'summernote';
import 'trumbowyg';

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
  $('#news-container-sm').load('html_parts.html #news-content');
  $('#warns-container-sm').load('html_parts.html #warns-content');
  $('#as-about-container').load('html_parts.html #as-about-content');
  $('#as-standard-container').load('html_parts.html #as-standard-content');

  getAsDogs();
  getNews();

  // $('#summernote').summernote();
  $('#summernote').summernote({
    height: 250, // set editor height
    minHeight: null, // set minimum height of editor
    maxHeight: null, // set maximum height of editor
    focus: true, // set focus to editable area after initializing summernote
  });

  $('#trumbowygDemo').trumbowyg();
});

$('#btn2').on('click', function() {
  alert($('#summernote').summernote('code'));
});

function showAndHideDependingOnResolution() {
  if (screen.width > 600) {
    console.log('show DESKTOP type of dog cards....');
    $('.dogCardDesktop').show();
    $('.dogCardMobile').hide();
  } else {
    console.log('show MOBILE type of dog cards....');
    $('.dogCardMobile').show();
    $('.dogCardDesktop').hide();
  }
}

$(window).resize(function() {
  showAndHideDependingOnResolution();
});

function getAsDogs() {
  $.getJSON('../public/data/as_chovni_psi.json', function(data) {
    console.log(screen.width);
    let template = $('#dogDetail').html();
    if (template !== undefined) {
      // var html = 'from js';
      var html = Mustache.to_html(template, data);
      $('#dogList').html(html);
    }
    showAndHideDependingOnResolution();
  });
}

function getNews() {
  $.getJSON('../public/data/news.json', function(data) {
    var template = $('#newsListTemplate').html();
    // var html = 'from js';
    if (template !== undefined) {
      var html = Mustache.to_html(template, data);
      $('#newsList').html(html);
    }
  });
}

$('article').each(function() {
  $(this)
    .find('p:not(:first)')
    .hide();
});
$('.more').on('click', function() {
  $(this)
    .hide()
    .closest('article')
    .find('p')
    .show();
});

$('#as-about-container').carousel();
// $('#as-standard-container').load('html_parts.html #as-standard-content');

// $('#btn2').on('click', function() {
//   alert('btn click...');
// var data = {name: 'Jonathan'};
// var template = 'Hello {{ name }}';

// var text = Mustache.render(template, data);

// $('#mypanel').html(text);
// });

function scrollToClass(clazz) {
  // alert(clazz);
  var aTag = $('.' + clazz);
  // var aTag = $('#' + aid);
  $('.content').animate({ scrollTop: aTag.offset().top }, 'slow');
}

function scrollToContainer() {
  scrollToClass('container');
}

$('body').on('click', '.scrollTop', function() {
  scrollToContainer();
});

$('#btnAAA').on('click', function() {
  var data = { name: 'Jonathan (data 2)' };
  var template = 'Hello {{ name }}';

  var text = Mustache.render(template, data);

  $('#mypanel').html(text);
});
