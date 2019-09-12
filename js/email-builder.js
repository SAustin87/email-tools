
setTimeout(function() {

	const componentModules = document.querySelector('.componentModules');
	const divsC = [...componentModules.children];
	divsC.sort((a, b) => a.id - b.id);
	divsC.forEach(div => componentModules.appendChild(div));

	const layoutModules = document.querySelector('.layoutModules');
	const divsL = [...layoutModules.children];
	divsL.sort((a, b) => a.id - b.id);
	divsL.forEach(div => layoutModules.appendChild(div));


const iFrameDom = $("iframe#iFrame").contents();

const context = $('iframe#iFrame')[0].contentWindow.document;
const moduleContent = $('body', context);
const content = $('.hiddenContent').html()
moduleContent.html(content);

$('.hiddenContent .mobileContent').remove()

iFrameDom.find('body').css({margin : '0px' , padding: '0px'})


$('.copyCode').css({
	'pointer-events': "none",
	opacity: '0.5',
	cursor: 'pointer'
})

$( ".copyCode" ).click(function() {
	iFrameDom.find('.emailContent .mobileText').text($('.emailContent .desktopMsg').text());
	iFrameDom.find('.emailContent *').removeAttr('contenteditable')

	const $temp = $("<textarea>");
	const openingCode = $('.openingCode').text().trim()
	const bodyCode = iFrameDom.find('.emailContent').html().trim()
	const closingCode = $('.closingCode').text().trim(

	)
	$("body").append($temp);
	$temp.val(openingCode + bodyCode + closingCode).select();
	document.execCommand("copy");
	$temp.remove();
$('.codeCopied').show().delay(1000).fadeOut(2000).css("display","inline-block");
})

const theTop = parseInt($('.pageTitle').css("height").replace('px', ''))
const fromTheTop = theTop
iFrameDom.find('.emailContent').css( {
	top: fromTheTop,
	width: '100%'
 });


$('.toolbar > div > div > div').addClass('moduleContainer').css({border: "1px dashed #FDDC06", padding: '5px'})
$('.toolbar > div > div > .moduleContainer').children().addClass('module')

$('.module').css("max-width", "600px")
const toolbarWidth = $('.toolbar').outerWidth()

$('.contentArea, .copyBtn').css({ width: 'calc(100% - ' + toolbarWidth + 'px)' })

const copyBtnHeight = $('.copyBtn').outerHeight();


$( ".module" ).parent().click(function() {
	  iFrameDom.find('.emptyContent, .emptyContentStyle').remove()
		$('.hiddenContent .emptyContentStyle').remove()

		$('.resizeControls').show()

	$('.copyCode').css({
		opacity: '1',
		"pointer-events": 'auto'
	})

	$('.tableOverlay').remove();
  $(this).children('table').clone().appendTo(iFrameDom.find('.emailContent'));
	iFrameDom.find('.emailContent .module').css("background-color" , "#FFFFFF")
  iFrameDom.find('.emailContent > .module').removeClass('module')
	iFrameDom.find('.emailContent *').not('.mobileMsg > h2, tr, table, td, div, tbody, span, img').attr('contenteditable','true')
	iFrameDom.find('img').parent('a').removeAttr('contenteditable')

});

$( ".toolbar > div > div > div" ).children().mouseenter(function() {
  const overlay = '<div class="tableOverlay"><i class="fas fa-plus"></i></div>'
	$(this).after(overlay);

	 const bottomWidth = $(this).css('width');
	 const bottomHeight = $(this).css('height');
	 const rowPos = $(this).position();
	 bottomTop = rowPos.top;
	 bottomLeft = rowPos.left;
	$('.tableOverlay').css({
		 position: 'absolute',
		 top: '0',
		 left: '0',
		 width: '100%',
		 height: '100%',
		 background: '#FFFFFF',
		 opacity: '0.75'

});

$('.tableOverlay > .fa-plus').css({
	 position: 'absolute',
	 top: '50%',
	 left: '50%',
	 transform: 'translate(-50%,-50%)',
	 'font-size': '30px',
	 color: '#000000',

});

$('.tableOverlay').mouseleave(function() {

$(this).remove()

});
})

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
}, 1000);
