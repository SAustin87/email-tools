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
  iFrameDom.find('body').css({
    margin: '0px',
    padding: '0px'
  })
  $('.copyCode').css({
    'pointer-events': "none",
    opacity: '0.5',
    cursor: 'pointer'
  })
  $(".copyCode").click(function() {
    iFrameDom.find('.emailContent .mobileText').text($('.emailContent .desktopMsg').text());
    iFrameDom.find('.emailContent *').removeAttr('contenteditable')
    const $temp = $("<textarea>");
    const openingCode = $('.openingCode').text().trim()
    const bodyCode = iFrameDom.find('.emailContent').html().trim()
    const closingCode = $('.closingCode').text().trim()
    $("body").append($temp);
    $temp.val(openingCode + bodyCode + closingCode).select();
    document.execCommand("copy");
    $temp.remove();
    $('.codeCopied').show().delay(1000).fadeOut(2000).css("display", "inline-block");
  })
  const theTop = parseInt($('.pageTitle').css("height").replace('px', ''))
  const fromTheTop = theTop
  iFrameDom.find('.emailContent').css({
    top: fromTheTop,
    width: '100%'
  });
  $('.toolbar > div > div > div').addClass('moduleContainer').css({
    border: "1px dashed #FDDC06",
    padding: '5px'
  })
  $('.toolbar > div > div > .moduleContainer').children().addClass('module')
  $('.module').css("max-width", "600px")
  const toolbarWidth = $('.toolbar').outerWidth()
  $('.changeModal').css('width', toolbarWidth)
  $('textarea').css({
    'width': '88%',
    'margin': '0 auto'
  })
  $('.contentArea, .copyBtn').css({
    width: 'calc(100% - ' + toolbarWidth + 'px)'
  })
  const copyBtnHeight = $('.copyBtn').outerHeight();
  $(".module").parent().click(function() {
    iFrameDom.find('.emptyContent, .emptyContentStyle').remove()
    $('.hiddenContent .emptyContentStyle').remove()
    $('.resizeControls').show()
    $('.copyCode').css({
      opacity: '1',
      "pointer-events": 'auto'
    })
    $('.tableOverlay').remove();
    let textNotALink = $('h1, h2, h3, h4, p').not(':has(a)')
    let aLink = $('a')
    $(this).children('table').clone().appendTo(iFrameDom.find('.emailContent'));
    iFrameDom.find('.emailContent .module').css("background-color", "#FFFFFF")
    iFrameDom.find('.emailContent > .module').removeClass('module')
    iFrameDom.find('h1, h2, h3, h4, p, a, li, img').unbind('click').bind('click', function(e) {
			e.stopPropagation();
			e.preventDefault();

      thisElement = $(this)
			thisElement2 = this

			console.log(thisElement.prop('tagName'))
      $('.element').text($(thisElement).prop('tagName'))

			$(thisElement).addClass(thisElement.prop('tagName'))
      console.log(thisElement)

			$('.textStyle, .imageStyle, .link').hide()

			if ($('.changeModal').css('right') != '0') {
				$('.changeModal').animate({
					'right': '0'
				}, 1000)
				$('.options').not('.changeModal').animate({
					opacity: '0'
				}, 1000)
			}
			$("textarea, .imageSize").val('')
			$('.fontSizeOutput').text('')


if ($(thisElement).hasClass('IMG')) {
	$('.link').show()
	$('.textStyle').hide()
	if ($(thisElement).parent('a').length) {
		$('.link').show()
	}
	$('.imageStyle').show()
} else if ($(thisElement).hasClass('A')) {
	$('.textStyle').show()
	$('.link').show()
	$('.imageStyle').hide()
	if ($(thisElement).children('img').length) {
		$('.imageStyle').show()
	}
} else {
	$('.textStyle').show()
	$('.link').hide()
	$('.imageStyle').hide()
}




      if (iFrameDom.find(thisElement).is('a')) {
        e.preventDefault();
				$("textarea.changeLink").on('keyup blur', function() {
					let newLinkHref = $(this).val().trim()
          iFrameDom.find(thisElement).attr('href', newLinkHref)
        });
      }
			else if (iFrameDom.find(thisElement).find('a').length) {
        e.preventDefault();
				let linkHref = iFrameDom.find(thisElement).find('a').attr('href')
				$('textarea.changeLink').val(linkHref)
				$("textarea.changeLink").on('keyup blur', function() {
					let newLinkHref = $(this).val().trim()
          iFrameDom.find(thisElement).find('a').attr('href', newLinkHref)
        });
      }

			if (iFrameDom.find(thisElement).is('img')) {
				let imgWidth = iFrameDom.find(thisElement).attr('width')
				let imgHeight = iFrameDom.find(thisElement).attr('height')
				$('.imageHeight').val(imgHeight)
				$('.imageWidth').val(imgWidth)

				$("input.imageUrl").on('keyup blur', function() {
					let newImageSrc = $(this).val().trim()
					iFrameDom.find(thisElement).attr('src', newImageSrc)
				});
				$("textarea.changeLink").on('keyup blur', function() {
					let newLinkHref = $(this).val().trim()
          iFrameDom.find(thisElement).parent('a').attr('href', newLinkHref)
        });
				$("input.imageSize").on('keyup blur', function() {
					if ($(this).hasClass('imageHeight')) {
						let newHeight = $(this).val().trim()
						iFrameDom.find(thisElement).attr('height', newHeight)
					} else if ($(this).hasClass('imageWidth')) {
						let newWidth = $(this).val().trim()
						iFrameDom.find(thisElement).attr('width', newWidth)
					}
				});
			}

        if (iFrameDom.find(thisElement).find('a').length) {
          if ($(iFrameDom).find(thisElement).find('a').css('font-weight') === '400' || $(iFrameDom).find(thisElement).css('font-weight') === '') {
            $('.styleBold').removeClass('active')
          } else {
            $('.styleBold').addClass('active')
          }
          if ($(iFrameDom).find(thisElement).find('a').css('font-style') === 'normal' || $(iFrameDom).find(thisElement).css('font-style') === '') {
            $('.styleItalic').removeClass('active')
          } else {
            $('.styleItalic').addClass('active')
          }
          let textDecoration = $(iFrameDom).find(thisElement).find('a').css('text-decoration').split(' ')
          let textDecorationSplit = textDecoration[0]
          if (textDecorationSplit === 'none') {
            $('.styleUnderline').removeClass('active')
          } else {
            $('.styleUnderline').addClass('active')
          }
        }
				else {
          if ($(iFrameDom).find(thisElement).css('font-weight') === '400' || $(iFrameDom).find(thisElement).css('font-weight') === '') {
            $('.styleBold').removeClass('active')
          } else {
            $('.styleBold').addClass('active')
          }
          if ($(iFrameDom).find(thisElement).css('font-style') === 'normal' || $(iFrameDom).find(thisElement).css('font-style') === '') {
            $('.styleItalic').removeClass('active')
          } else {
            $('.styleItalic').addClass('active')
          }
          let textDecoration = $(iFrameDom).find(thisElement).css('text-decoration').split(' ')
          let textDecorationSplit = textDecoration[0]
          if (textDecorationSplit === 'none') {
            $('.styleUnderline').removeClass('active')
          } else {
            $('.styleUnderline').addClass('active')
          }
        }
        $("textarea.changeText").on('keyup blur', function() {
          console.log(thisElement)
          if (iFrameDom.find(thisElement).find('a').length) {
            console.log('has a')
            iFrameDom.find(thisElement).find('a').html($(this).val().trim());
          } else {
            console.log('has no a')
            iFrameDom.find(thisElement).html($(this).val().trim());
          }
        });
        let styleBold = $(iFrameDom).find(thisElement).css('font-weight')
        let styleItalic = $(iFrameDom).find(thisElement).css('font-style')
        let styleUnderline = $(iFrameDom).find(thisElement).css('text-decoration')

				$(".style").unbind('click').bind('click', function() {

							if (iFrameDom.find(thisElement).find('a').length) {

  if ($(this).hasClass('styleBold')) {
    if ($(iFrameDom).find(thisElement).find('a').css('font-weight') === '400' || $(iFrameDom).find(thisElement).css('font-weight') === '') {
      console.log('bolding an a tag')
      iFrameDom.find(thisElement).find('a').css('font-weight', 'bold')
      $(this).addClass('active')
    } else {
      iFrameDom.find(thisElement).find('a').css('font-weight', 'normal')
      $(this).removeClass('active')
    }
  } else if ($(this).hasClass('styleItalic')) {
    if ($(iFrameDom).find(thisElement).find('a').css('font-style') === 'normal' || $(iFrameDom).find(thisElement).find('a').css('font-style') === '') {

      console.log('Add italics to a')
      iFrameDom.find(thisElement).find('a').css('font-style', 'italic')
      $(this).addClass('active')

    } else {
      console.log('Remove italics from a')
      iFrameDom.find(thisElement).find('a').css('font-style', 'normal')
      $(this).removeClass('active')
    }



  } else if ($(this).hasClass('styleUnderline')) {
    let textDecoration = $(iFrameDom).find(thisElement).find('a').css('text-decoration').split(' ')
    let textDecorationSplit = textDecoration[0]

    if (textDecorationSplit === 'none') {


      console.log('bolding an a tag')

      iFrameDom.find(thisElement).find('a').css('text-decoration', 'underline')
      $(this).addClass('active')

    } else {

      iFrameDom.find(thisElement).find('a').css('text-decoration', 'none')
      $(this).removeClass('active')
    }
  }
} else {

if ($(this).hasClass('styleBold')) {
if ($(iFrameDom).find(thisElement).css('font-weight') === '400' || $(iFrameDom).find(thisElement).css('font-weight') === '') {
iFrameDom.find(thisElement).css('font-weight', 'bold')
$(this).addClass('active')
} else {
iFrameDom.find(thisElement).css('font-weight', 'normal')
$(this).removeClass('active')
}
} else if ($(this).hasClass('styleItalic')) {
if ($(iFrameDom).find(thisElement).css('font-style') === 'normal' || $(iFrameDom).find(thisElement).find('a').css('font-style') === '') {
iFrameDom.find(thisElement).css('font-style', 'italic')
$(this).addClass('active')
} else {
iFrameDom.find(thisElement).css('font-style', 'normal')
$(this).removeClass('active')
}
} else if ($(this).hasClass('styleUnderline')) {
let textDecoration = $(iFrameDom).find(thisElement).css('text-decoration').split(' ')
let textDecorationSplit = textDecoration[0]

if (textDecorationSplit === 'none') {

iFrameDom.find(thisElement).css('text-decoration', 'underline')
$(this).addClass('active')

} else {

iFrameDom.find(thisElement).css('text-decoration', 'none')
$(this).removeClass('active')
}
}
}


				});

				$(".size").unbind('click').bind('click', function() {

					if (iFrameDom.find(thisElement).find('a').length) {
						let currentSize = parseInt(iFrameDom.find(thisElement).find('a').css("font-size").replace('px', ''))
					  let sizePlus = currentSize + 1
						let sizeMinus = currentSize - 1
						if ($(this).hasClass('sizePlus')) {
					  iFrameDom.find(thisElement).find('a').css("font-size", sizePlus + "px");
					  $('.fontSizeOutput').text(':' + sizePlus + 'px') }
						else if ($(this).hasClass('sizeMinus')) {
						iFrameDom.find(thisElement).find('a').css("font-size", sizeMinus + "px");
						 $('.fontSizeOutput').text(':' + sizeMinus + 'px') }
					} else {
				  let currentSize = parseInt(iFrameDom.find(thisElement).css("font-size").replace('px', ''))
				  let sizePlus = currentSize + 1
					let sizeMinus = currentSize - 1
					if ($(this).hasClass('sizePlus')) {
				  iFrameDom.find(thisElement).css("font-size", sizePlus + "px");
				  $('.fontSizeOutput').text(':' + sizePlus + 'px') }
					else if ($(this).hasClass('sizeMinus')) {
					iFrameDom.find(thisElement).css("font-size", sizeMinus + "px");
					 $('.fontSizeOutput').text(':' + sizeMinus + 'px') }
				 }

				});

				$(".height").unbind('click').bind('click', function() {

					if (iFrameDom.find(thisElement).find('a').length) {

					if ($(this).hasClass('heightPlus')) {
						let currentHeight = parseFloat(iFrameDom.find(thisElement).find('a').css("line-height").replace('px', '')).toFixed(1)
						let currentFontSize = parseFloat(iFrameDom.find(thisElement).find('a').css("font-size").replace('px', ''))
						let heightEM = parseFloat((currentHeight / currentFontSize).toFixed(1))
						let heightPlusEM = (heightEM + 0.1).toFixed(1)
				  iFrameDom.find(thisElement).find('a').css("line-height", heightPlusEM);
				  $('.lineHeightOutput').text(':' + heightPlusEM)
				}
					else if ($(this).hasClass('heightMinus')) {
						let currentHeight = parseFloat(iFrameDom.find(thisElement).find('a').css("line-height").replace('px', '')).toFixed(1)
						let currentFontSize = parseFloat(iFrameDom.find(thisElement).find('a').css("font-size").replace('px', ''))
						let heightEM = parseFloat((currentHeight / currentFontSize).toFixed(1))
						let heightMinusEM = (heightEM - 0.1).toFixed(1)
						iFrameDom.find(thisElement).find('a').css("line-height", heightMinusEM);
						$('.lineHeightOutput').text(':' + heightMinusEM)
					}
				} else {

							if ($(this).hasClass('heightPlus')) {
								let currentHeight = parseFloat(iFrameDom.find(thisElement).css("line-height").replace('px', '')).toFixed(1)
								let currentFontSize = parseFloat(iFrameDom.find(thisElement).css("font-size").replace('px', ''))
								let heightEM = parseFloat((currentHeight / currentFontSize).toFixed(1))
								let heightPlusEM = (heightEM + 0.1).toFixed(1)
						  iFrameDom.find(thisElement).css("line-height", heightPlusEM);
						  $('.lineHeightOutput').text(':' + heightPlusEM)
				}
							else if ($(this).hasClass('heightMinus')) {
								let currentHeight = parseFloat(iFrameDom.find(thisElement).css("line-height").replace('px', '')).toFixed(1)
								let currentFontSize = parseFloat(iFrameDom.find(thisElement).css("font-size").replace('px', ''))
								let heightEM = parseFloat((currentHeight / currentFontSize).toFixed(1))
								let heightMinusEM = (heightEM - 0.1).toFixed(1)
								iFrameDom.find(thisElement).css("line-height", heightMinusEM);
								$('.lineHeightOutput').text(':' + heightMinusEM)

						}
						}


				});

    });
  });
  $(".toolbar > div > div > div").children().mouseenter(function() {
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
      $('.emailBody').animate({
        "width": "600px"
      }, 1000)
      $('.count').text('600')
      $('.count').each(function() {
        $(this).prop('Counter', 320).animate({
          Counter: $(this).text()
        }, {
          duration: 1000,
          easing: 'swing',
          step: function(now) {
            $(this).text(Math.ceil(now));
          }
        });
      });
    }
  });
  /* Resize to mobile */
  $('.fa-mobile-alt').click(function() {
    if ($('.emailBody').css('width') === '600px') {
      $('.emailBody').animate({
        "width": "320px"
      }, 1000)
      $('.count').text('320')
      $('.count').each(function() {
        $(this).prop('Counter', 600).animate({
          Counter: $(this).text()
        }, {
          duration: 1000,
          easing: 'swing',
          step: function(now) {
            $(this).text(Math.ceil(now));
          }
        });
      });
    }
  });
  $('.closeEditor').click(function() {
    $('.changeModal').animate({
      'right': '-400px'
    }, 1000)
    $('.toolbar').animate({
      opacity: '1'
    }, 1000)
  })
}, 1000);
