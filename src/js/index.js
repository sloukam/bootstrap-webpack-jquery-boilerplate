import 'bootstrap';
import Handlebars from 'handlebars';
// import 'summernote';
import 'trumbowyg';
import 'lodash';

import '../scss/index.scss';
import './bootnavbar';

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
  $('#menu').load('html_parts.html #mainNav', function() {
    // this line will make menu 'active'
    $('#main_navbar').bootnavbar();
  });
  $('#footer-container').load('html_parts.html #footer-content');
  $('#news-container-sm').load('html_parts.html #news-content');
  // $('#warns-container-sm').load('html_parts.html #warns-content');
  // $('#as-about-container').load('html_parts.html #as-about-content');
  $('#as-standard-container').load('html_parts.html #as-standard-content');

  $('#mskao-about-container').load('html_parts.html #mskao-about-content');

  var breed = GetURLParameter('rasa');
  var sex = GetURLParameter('sex');
  if (breed !== undefined) {
    console.log('breed = ' + breed);
    console.log('sex = ' + sex);
    getDogs(breed, sex);
    getCoverSheets(breed);
  }
  getNews();

  var articleId = GetURLParameter('articleId');
  if (articleId) {
    getSingleArticle(articleId);
  }

  // fetch all articles
  getArticles();

  // fetch all inzerce
  getInzerce();

  // $('#summernote').summernote();
  // $('#summernote').summernote({
  //   height: 250, // set editor height
  //   minHeight: null, // set minimum height of editor
  //   maxHeight: null, // set maximum height of editor
  //   focus: true, // set focus to editable area after initializing summernote
  // });

  $('#trumbowygDemo').trumbowyg();

  $('.articleContainer').each(function() {
    // $('.articleContainer').each(function(index, value) {
    let fullText = $(this)
      .children('.fullText')
      .html();
    // var moreLink = ' <a class="expandContent">... více</a><div class="fullText hidden">' + fullText + '</div>';
    $(this)
      .children('.shownText')
      .html(getShortenedText(fullText)); // number of characters
  });

  $('.expandContent').on('click', function() {
    let parentDiv = $(this).parents('.articleContainer');
    let divToExpand = parentDiv.children('.shownText:first-child');
    let fullTextDiv = parentDiv.children('.fullText');
    // console.log('full text: ' + fullTextDiv.html());

    divToExpand.html(fullTextDiv.html());

    parentDiv.children('.shortenContent').removeClass('hidden');
    parentDiv.children('.expandContent').addClass('hidden');
  });

  $('.shortenContent').on('click', function() {
    let parentDiv = $(this).parents('.articleContainer');
    let divToShorten = parentDiv.children('.shownText:first-child');
    let fullTextDiv = parentDiv.children('.fullText');
    // console.log('full text: ' + fullTextDiv.html());

    divToShorten.html(getShortenedText(fullTextDiv.html()));

    parentDiv.children('.shortenContent').addClass('hidden');
    parentDiv.children('.expandContent').removeClass('hidden');
  });
  popupImages();
});

function popupImages() {
  $('.pop').on('click', function() {
    console.log('click...');
    $('.imagepreview').attr(
      'src',
      $(this)
        .find('img')
        .attr('src')
    );
    $('#image-modal').modal('show');
  });
}

function getShortenedText(text, length) {
  if (length === undefined) length = 230;
  return text.substring(0, length) + '.....';
}

$('#copyToClippboardBtn').on('click', function() {
  copyToClipboard('results__display');
});

// tohle je onClick pro rozbaleni detailu psa
function addOnClickEvents() {
  const clickLinkElement = $('.dogCardDetailClick');
  clickLinkElement.on('click', function(event) {
    const id = $(event.target).attr('id');

    let dogDetailDiv = $('#dogDetail_' + id);

    const visible = dogDetailDiv.is(':visible');

    dogDetailDiv.toggle(250);

    if (visible) {
      $(this).html('více informací...');
    } else {
      $(this).html('méně informací...');
    }
  });
  clickLinkElement.hover(
    function() {
      $(this).css('color', '#3d2b1f');
    },
    function() {
      $(this).css('color', '#8B4513');
    }
  );
}

function getDogs(breed, sex) {
  $.getJSON('../public/data/' + breed + '_breeding_dog.json', function(dog) {
    // console.log('male in');
    // console.log(male);
    $.getJSON('../public/data/' + breed + '_breeding_bitch.json', function(
      bitch
    ) {
      // console.log('female in');
      // console.log(female);
      // console.log('male in female ');
      // console.log(male);

      console.log('screen.width = ' + screen.width);
      console.log('sex = ' + sex);

      let dogsData;
      if (sex === 'dog') {
        dogsData = dog;
      } else if (sex === 'bitch') {
        dogsData = bitch;
      } else {
        dogsData = { dogs: dog.dogs.concat(bitch.dogs) };
      }

      let data = { dogs: dogsData.dogs };

      console.log('data');
      console.log(data);

      let template = $('#dogDetailDesktop').html();
      if (template !== undefined) {
        console.log('template is specified...');
        var compiledTemplate = Handlebars.compile(template);
        $('#dogList').html(compiledTemplate(data));
      } else {
        console.log('there is something totally wrong 1');
      }
      $('.pop').on('click', function() {
        console.log('click...');
        $('.imagepreview').attr(
          'src',
          $(this)
            .find('img')
            .attr('src')
        );
        $('#image-modal').modal('show');
      });

      $('.pedigree').on('click', function() {
        let clp = $(this).attr('clp');
        console.log('pedigree click clp - ' + clp);

        $('#pedigree-modal-' + clp).modal('show');
      });

      addOnClickEvents();
    });
  });

  // $.getJSON('../public/data/' + breed + '_breeding_dog.json', function(data) {});
}

function getCoverSheets(breed) {
  $.getJSON('../public/data/' + breed + '_cover_sheet.json', function(data) {
    console.log('data pro kryci listy');
    console.log(data);

    let template = $('#coverSheetsId').html();
    if (template !== undefined) {
      console.log('template is specified...');
      var compiledTemplate = Handlebars.compile(template);
      $('#coverSheetList').html(compiledTemplate(data));
    } else {
      console.log('there is something totally wrong 2');
    }
  });
}
function getInzerce() {
  $.getJSON('../public/data/inzerce.json', function(data) {
    var template = $('#inzerceTemplate').html();
    if (template !== undefined) {
      var compiledTemplate = Handlebars.compile(template);
      $('#inzerceContainer').html(compiledTemplate(data));
    }
  });
}


function getArticles() {
  $.getJSON('../public/data/articles.json', function(data) {
    var template = $('#articleTemplate').html();
    if (template !== undefined) {
      var compiledTemplate = Handlebars.compile(template);
      $('#articleContainer').html(compiledTemplate(data));
    }
  });
}

function getSingleArticle(articleId) {
  // console.log("getSingleArticle( articleId = " + articleId);
  $.getJSON('../public/data/articles.json', function(data) {
    // console.log("all articles - articleId: " + articleId);
    // console.log(data);
    // console.log("data.length: " + data.length);
    // console.log("data.length: " + data.size);
    let article;
    for (let i = 0; i < data.articles.length; i++) {
      let item = data.articles[i];
      // console.log("item");
      // console.log(item);
      if (item.articleId == articleId) {
        article = item;
        i = data.articles.length;
      }
    }
    // console.log("found articleid: " + articleId);
    // console.log("found article: ");
    // console.log(article);

    var template = $('#singleArticleTemplate').html();
    if (template !== undefined) {
      var compiledTemplate = Handlebars.compile(template);
      $('#singleArticleContainer').html(compiledTemplate(article));
    }
  });
}

function getNews() {
  $.getJSON('../public/data/news.json', function(data) {
    var template = $('#newsListTemplate').html();
    // var html = 'from js';
    if (template !== undefined) {
      var compiledTemplate = Handlebars.compile(template);
      $('#newsList').html(compiledTemplate(data));
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

  var compiledTemplate = Handlebars.compile(template);
  $('#mypanel').html(compiledTemplate(data));
});

/**
 * Checks that an element has a non-empty `name` and `value` property.
 * @param  {Element} element  the element to check
 * @return {Bool}             true if the element is an input, false if not
 */
const isValidElement = element => {
  return element.name && element.value;
};

/**
 * Checks if an element's value can be saved (e.g. not an unselected checkbox).
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the value should be added, false if not
 */
const isValidValue = element => {
  return !['checkbox', 'radio'].includes(element.type) || element.checked;
};

/**
 * Checks if an input is a checkbox, because checkboxes allow multiple values.
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the element is a checkbox, false if not
 */
const isCheckbox = element => element.type === 'checkbox';

/**
 * Checks if an input is a `select` with the `multiple` attribute.
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the element is a multiselect, false if not
 */
const isMultiSelect = element => element.options && element.multiple;

/**
 * Retrieves the selected options from a multi-select as an array.
 * @param  {HTMLOptionsCollection} options  the options for the select
 * @return {Array}                          an array of selected option values
 */
const getSelectValues = options =>
  [].reduce.call(
    options,
    (values, option) => {
      return option.selected ? values.concat(option.value) : values;
    },
    []
  );

/**
 * A more verbose implementation of `formToJSON()` to explain how it works.
 *
 * NOTE: This function is unused, and is only here for the purpose of explaining how
 * reducing form elements works.
 *
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object}                               form data as an object literal
 */
// const formToJSON_deconstructed = elements => {
//   // This is the function that is called on each element of the array.
//   const reducerFunction = (data, element) => {
//     // Add the current field to the object.
//     data[element.name] = element.value;
//
//     // For the demo only: show each step in the reducer's progress.
//     console.log(JSON.stringify(data));
//
//     return data;
//   };
//
//   // This is used as the initial value of `data` in `reducerFunction()`.
//   const reducerInitialValue = {};
//
//   // To help visualize what happens, log the inital value, which we know is `{}`.
//   console.log('Initial `data` value:', JSON.stringify(reducerInitialValue));
//
//   // Now we reduce by `call`-ing `Array.prototype.reduce()` on `elements`.
//   const formData = [].reduce.call(
//     elements,
//     reducerFunction,
//     reducerInitialValue
//   );
//
//   // The result is then returned for use elsewhere.
//   return formData;
// };

/**
 * Retrieves input data from a form and returns it as a JSON object.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object}                               form data as an object literal
 */
const formToJSON = elements =>
  [].reduce.call(
    elements,
    (data, element) => {
      // Make sure the element has the required properties and should be added.
      if (isValidElement(element) && isValidValue(element)) {
        let value;
        /*
         * Some fields allow for more than one value, so we need to check if this
         * is one of those fields and, if so, store the values as an array.
         */
        if (isCheckbox(element)) {
          // value = (data[element.name] || []).concat(element.value);
          console.log('checkbox value = ' + element.value);
          value = element.checked;
        } else if (isMultiSelect(element)) {
          value = getSelectValues(element);
        } else {
          value = element.value;
        }
        _.set(data, element.name, value);
      }

      return data;
    },
    {}
  );

/**
 * A handler function to prevent default submission and run our custom script.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
const handleFormSubmit = event => {
  // Stop the form from submitting since we’re handling that with AJAX.
  event.preventDefault();

  // Call our function to get the form data.
  const data = formToJSON(form.elements);

  // Demo only: print the form data onscreen as a formatted JSON object.
  const dataContainer = document.getElementsByClassName('results__display')[0];

  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
  dataContainer.textContent = JSON.stringify(data, null, '  ');

  // ...this is where we’d actually do something with the form data...
};

const handleArticleFormSubmit = event => {
  // Stop the form from submitting since we’re handling that with AJAX.
  event.preventDefault();

  // Call our function to get the form data.
  const data = formToJSON(article_form.elements);

  console.log('article_form.elements:');
  console.log(article_form.elements);

  console.log('form data: ');
  console.log(data);

  // Demo only: print the form data onscreen as a formatted JSON object.
  const dataContainer = document.getElementsByClassName('results__display')[0];

  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
  dataContainer.textContent = JSON.stringify(data, null, '  ');

  // ...this is where we’d actually do something with the form data...
};

/*
 * This is where things actually get started. We find the form element using
 * its class name, then attach the `handleFormSubmit()` function to the
 * `submit` event.
 */
const form = document.getElementsByClassName('add-breeding-dog-form')[0];
if (form !== undefined) {
  form.addEventListener('submit', handleFormSubmit);
}

const article_form = document.getElementsByClassName('add-article-form')[0];
if (article_form !== undefined) {
  article_form.addEventListener('submit', handleArticleFormSubmit);
}

function copyToClipboard(elementId) {
  /* Get the text field */
  var copyText = $('.' + elementId);
  // var copyText = $('.' + elementId).text();

  // /* Select the text field */
  copyText.select();
  // copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  //
  // /* Copy the text inside the text field */
  document.execCommand('copy');

  // /* Alert the copied text */
  // alert("Copied the text: " + copyText);
}

function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1];
    }
  }
}
