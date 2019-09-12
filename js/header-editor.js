
$(document).ready(function() {

  $.get( "contentSections/layoutModules/01%20brandTagHeader.html", function( data ) {
  $( ".emailContent" ).html( data );
  console.log( "Load was performed." );
  console.log(data)
});

setTimeout(function() {
/* copy code */

$(".copyCode").click(function() {
  var $temp = $("<textarea>");
	$("body").append($temp);
  $temp.val($("iframe#iFrame").contents().find('.emailContent').html().trim()).select();
  document.execCommand("copy");
  $temp.remove();
  $('.codeCopied').show().delay(1000).fadeOut(2000).css("display", "inline-block");
})

/* copy settings */

$(".copySettings").click(function() {
  var headlineText = $('textarea.headline').val()
  var headlineSize = $('h1').css("font-size")
  var subtitleText = $('textarea.subMsg').val()
  var subtitleSize = $('h2').css("font-size")
  var brandLogo = $('.changeImage').val()
  var ctaText = $('.changeCTAText').val()
  var ctaSize = $('.ctabtn').css("font-size")
  var ctaWidth = $('.ctabtn').css("width")
  $('.headlineTextSpan').html(headlineText);
  $('.headlineSizeSpan').html(headlineSize);
  $('.subtitleTextSpan').html(subtitleText);
  $('.subtitleSizeSpan').html(subtitleSize);
  $('.brandLogoUrl').html(brandLogo);
  $('.ctaTextSpan').html(ctaText);
  $('.ctaSizeSpan').html(ctaSize);
  $('.ctaWidthSpan').html(ctaWidth);
  var $temp = $("<textarea>");
  $("body").append($temp);
  $temp.val($(".settings").text()).select();
  document.execCommand("copy");
  $temp.remove();
  $('.settingsCopied').show().delay(1000).fadeOut(2000).css("display", "inline-block");
})

/* Copies the header content from hidden div to resizable iFrame */

var context = $('iframe#iFrame')[0].contentWindow.document;
var $body = $('body', context);
var content = $('.hiddenContent').html()
$body.html(content);


/* Change brand image */

var iFrameDom = $("iframe#iFrame").contents();

$(".changeImage").keyup(function() {
  iFrameDom.find(".brandImg").attr("src", $(this).val().trim());
});

$("changeImage").blur(function() {
  $(".brandImg").attr("src", $(this).val().trim());
  iFrameDom.find(".brandImg").attr("src", $(this).val().trim());
});


/* Change headline text */

$("textarea.headline").keyup(function() {
  $("h1").text($(this).val().trim());
  iFrameDom.find("h1").html($(this).val().trim());
});

$("textarea.headline").blur(function() {
  $("h1").text($(this).val().trim());
  iFrameDom.find("h1").html($(this).val().trim());
});

/* Change CTA text */

$(".changeCTAText").keyup(function() {
  $(".ctabtn").text($(this).val().trim());
  iFrameDom.find(".ctabtn").text($(this).val().trim());
});

$(".changeCTAText").blur(function() {
  $(".ctabtn").text($(this).val().trim());
  iFrameDom.find(".ctabtn").text($(this).val().trim());
});

/* Change subtitle message */

$("textarea.subMsg").keyup(function() {
  $("h2").text($(this).val().trim());
  iFrameDom.find("h2").text($(this).val().trim());
});

$("textarea.subMsg").blur(function() {
  $("h2").text($(this).val().trim());
  iFrameDom.find("h2").text($(this).val().trim());
});

/* Style headline bold */

$(".headlineStyleBold").click(function() {

	if ($(this).hasClass("active")) {
		$(this).removeClass("active")
		$('h1').css("font-weight", "normal");
	  iFrameDom.find('h1').css("font-weight", "normal");
	} else {
		$(this).addClass("active")
		$('h1').css("font-weight", "bold");
	  iFrameDom.find('h1').css("font-weight", "bold");
	}

});

/* Desktop specific */

/* Change headline font size */

$(".headlineFontPlus").click(function() {
  var currentSize = parseInt($('h1').css("font-size").replace('px', ''))
  var newSize = currentSize + 1
  $('h1').css("font-size", newSize + "px");
  iFrameDom.find('h1').css("font-size", newSize + "px");
  $('.currentHeadlineSize').text(':' + newSize + 'px')
});

$(".headlineFontMinus").click(function() {
  var currentSize = parseInt($('h1').css("font-size").replace('px', ''))
  var newSize = currentSize - 1
  $('h1').css("font-size", newSize + "px");
  iFrameDom.find('h1').css("font-size", newSize + "px");
  $('.currentHeadlineSize').text(':' + newSize + 'px')
});

/* Change headline line-height */

$(".headlineHeightMinus").click(function() {
  var currentSize = parseInt($('h1').css("line-height").replace('px', ''))
	var currentFontSize = parseInt($('h1').css("font-size").replace('px', ''))
	var newSize = currentSize - 1
	var newSizeEM = (newSize / currentFontSize).toFixed(1)
  $('h1').css("line-height", newSize + 'px');
  iFrameDom.find('h1').css("line-height", newSize + 'px');
  $('.currentHeadlineHeight').text(':' + newSizeEM )
	console.log({currentSize, currentFontSize, newSize, newSizeEM})
});

$(".headlineHeightPlus").click(function() {
  var currentSize = parseInt($('h1').css("line-height").replace('px', ''))
	var currentFontSize = parseInt($('h1').css("font-size").replace('px', ''))
	var newSize = currentSize + 1
	var newSizeEM = (newSize / currentFontSize).toFixed(1)
  $('h1').css("line-height", newSize + 'px');
  iFrameDom.find('h1').css("line-height", newSize + 'px');
  $('.currentHeadlineHeight').text(':' + newSizeEM )
	console.log({currentSize, currentFontSize, newSize, newSizeEM})
});

/* Change subtitle font size */

$(".subMsgFontPlus").click(function() {
  var currentSize = parseInt($('h2').css("font-size").replace('px', ''))
  var newSize = currentSize + 1
  $('h2').css("font-size", newSize + "px");
  iFrameDom.find('h2').css("font-size", newSize + "px");
  $('.currentSubtextSize').text(':' + newSize + 'px')
});

$(".subMsgFontMinus").click(function() {
  var currentSize = parseInt($('h2').css("font-size").replace('px', ''))
  var newSize = currentSize - 1
  $('h2').css("font-size", newSize + "px");
  iFrameDom.find('h2').css("font-size", newSize + "px");
  $('.currentSubtextSize').text(':' + newSize + 'px')
});

/* Change CTA width */

$(".ctaSizePlus").click(function() {
  var currentSize = parseInt($('.ctabtn').css("width").replace('px', ''))
  var newSize = currentSize + 2
  $('.ctabtn').css("width", newSize + "px");
  iFrameDom.find('.ctabtn').css("width", newSize + "px");
  $('.currentCTAWidth').text(':' + newSize + 'px')
});

$(".ctaSizeMinus").click(function() {
  var currentSize = parseInt($('.ctabtn').css("width").replace('px', ''))
  var newSize = currentSize - 2
  $('.ctabtn').css("width", newSize + "px");
  iFrameDom.find('.ctabtn').css("width", newSize + "px");
  $('.currentCTAWidth').text(':' + newSize + 'px')
});


/* Change CTA font size */

$(".ctaFontPlus").click(function() {
  var currentSize = parseInt($('.ctabtn').css("font-size").replace('px', ''))
  var newSize = currentSize + 1
  $('.ctabtn').css("font-size", newSize + "px");
  iFrameDom.find('.ctabtn').css("font-size", newSize + "px");
  $('.currentCTASize').text(':' + newSize + 'px')
});

$(".ctaFontMinus").click(function() {
  var currentSize = parseInt($('.ctabtn').css("font-size").replace('px', ''))
  var newSize = currentSize - 1
  $('.ctabtn').css("font-size", newSize + "px");
  iFrameDom.find('.ctabtn').css("font-size", newSize + "px");
  $('.currentCTASize').text(':' + newSize + 'px')
});

/* Brand image top padding */

$(".topPaddingPlus").click(function() {
  var currentPadding = parseInt($('.brandImg').parent().parent().css("padding-top").replace('px', ''))
  var newSize = currentPadding + 1
  $('.brandImg').parent().parent().css("padding-top", newSize + "px");
  iFrameDom.find('.brandImg').parent().parent().css("padding-top", newSize + "px");
  $('.currentTopPadding').text(':' + newSize + 'px')
});

$(".topPaddingMinus").click(function() {
  var currentPadding = parseInt($('.brandImg').parent().parent().css("padding-top").replace('px', ''))
  var newSize = currentPadding - 1
  $('.brandImg').parent().parent().css("padding-top", newSize + "px");
  iFrameDom.find('.brandImg').parent().parent().css("padding-top", newSize + "px");
  $('.currentTopPadding').text(':' + newSize + 'px')
});

/* Brand image right padding */

$(".rightPaddingPlus").click(function() {
  var currentPadding = parseInt($('.brandImg').parent().parent().css("padding-right").replace('px', ''))
	var currentWidth = parseInt($('.brandImg').parent().parent().attr("width").replace('px', ''))

  var newSize = currentPadding + 2
	var newWidth = currentWidth + 2

  $('.brandImg').parent().parent().css("padding-right", newSize + "px");
  iFrameDom.find('.brandImg').parent().parent().css("padding-right", newSize + "px");

	$('.brandImg').parent().parent().attr("width", newWidth);
  iFrameDom.find('.brandImg').parent().parent().attr("width", newWidth);

  $('.currentRightPadding').text(':' + newSize + 'px')
});

$(".rightPaddingMinus").click(function() {
  var currentPadding = parseInt($('.brandImg').parent().parent().css("padding-right").replace('px', ''))
	var currentWidth = parseInt($('.brandImg').parent().parent().attr("width").replace('px', ''))

  var newSize = currentPadding - 2
	var newWidth = currentWidth - 2

  $('.brandImg').parent().parent().css("padding-right", newSize + "px");
  iFrameDom.find('.brandImg').parent().parent().css("padding-right", newSize + "px");

	$('.brandImg').parent().parent().attr("width", newWidth);
  iFrameDom.find('.brandImg').parent().parent().attr("width", newWidth);

  $('.currentRightPadding').text(':' + newSize + 'px')
});


/* Brand image left padding */


$(".leftPaddingPlus").click(function() {
  var currentPadding = parseInt($('.brandImg').parent().parent().css("padding-left").replace('px', ''))
	var currentWidth = parseInt($('.brandImg').parent().parent().attr("width").replace('px', ''))

  var newSize = currentPadding + 2
	var newWidth = currentWidth + 2

  $('.brandImg').parent().parent().css("padding-left", newSize + "px");
  iFrameDom.find('.brandImg').parent().parent().css("padding-left", newSize + "px");

	$('.brandImg').parent().parent().attr("width", newWidth);
  iFrameDom.find('.brandImg').parent().parent().attr("width", newWidth);

  $('.currentLeftPadding').text(':' + newSize + 'px')
});

$(".leftPaddingMinus").click(function() {
  var currentPadding = parseInt($('.brandImg').parent().parent().css("padding-left").replace('px', ''))
	var currentWidth = parseInt($('.brandImg').parent().parent().attr("width").replace('px', ''))

  var newSize = currentPadding - 2
	var newWidth = currentWidth - 2

  $('.brandImg').parent().parent().css("padding-left", newSize + "px");
  iFrameDom.find('.brandImg').parent().parent().css("padding-left", newSize + "px");

	$('.brandImg').parent().parent().attr("width", newWidth);
  iFrameDom.find('.brandImg').parent().parent().attr("width", newWidth);

  $('.currentLeftPadding').text(':' + newSize + 'px')
});


/* Resize to desktop */

$('.fa-desktop').click(function() {

	if ($('.emailBody').css('width') === '320px') {

$('.emailBody').animate({"width": "600px"}, 1000)
$('.count').text('600')
$('.count').each(function () {
    $(this).prop('Counter',320).animate({
        Counter: $(this).text()
    }, {
        duration: 1000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});
}
});


/* Resize to mobile */

$('.fa-mobile-alt').click(function() {

if ($('.emailBody').css('width') === '600px') {

$('.emailBody').animate({"width": "320px"}, 1000)
$('.count').text('320')
$('.count').each(function () {
    $(this).prop('Counter',600).animate({
        Counter: $(this).text()
    }, {
        duration: 1000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});
}
});

iFrameDom.find('a').removeAttr("href");


}, 1000);

});
