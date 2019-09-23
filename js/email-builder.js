function mainScript() {
  setTimeout(function() {

  // Shorthand for accessing iframe content
  const iFrameDom = $("iframe#iFrame").contents();

  //target iframe body and append with content from hidden div, then remove hidden div
  const moduleContent = iFrameDom.find('body');
  const content = $('.hiddenContent').html()
  moduleContent.append(content);
  $('.hiddenContent .mobileContent').remove()

  //set iframe body padding and margin to 0
  iFrameDom.find('body').css({
    margin: '0px',
    padding: '0px'
  })

  // Uppercases HEHA
  $('.componentModules > div > h3').each(function(){
    if ($(this).text().indexOf('Heha') >= 0 || $(this).text().indexOf('Heha') >= 0) {
      $(this).text($(this).text().replace('Heha', 'HEHA'))
    }
  })

  //Sets and runs function to disable copy btn
  function disableCopyBtn() {
  $('.copyCode').css({
    'pointer-events': "none",
    opacity: '0.5',
    cursor: 'pointer'
  })
  }

  disableCopyBtn()

  //Copies code
  $(".copyCode").click(function() {
    iFrameDom.find('.emailContent .mobileText').text($('.emailContent .desktopMsg').text());
    iFrameDom.find('.emptyContent, .emptyContentStyle').remove()
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

  //Position email content
  const theTop = parseInt($('.pageTitle').css("height").replace('px', ''))
  iFrameDom.find('.emailContent').css({
    top: theTop,
    width: '100%'
  });


  $('.toolbar > div > div > div').addClass('moduleContainer')
  $('.toolbar > div > div > .moduleContainer').children().addClass('module')

  const toolbarWidth = $('.toolbar').outerWidth()

  $('.changeModal').css('width', toolbarWidth)

  $('.contentArea, .copyBtn').css({
    width: 'calc(100% - ' + toolbarWidth + 'px)'
  })

  const copyBtnHeight = $('.copyBtn').outerHeight();

  //When clicking on a module
  $(".module").parent().click(function() {
    iFrameDom.find('.emptyContent, .emptyContentStyle').hide()
    $('.hiddenContent .emptyContentStyle').remove()
    $('.resizeControls').show()
    $('.copyCode').css({
      opacity: '1',
      "pointer-events": 'auto'
    })

    //Remove transparent overlay
    $('.tableOverlay').remove();

    //Copies module and inserts in to iFrame
    $(this).children('table').clone().appendTo(iFrameDom.find('.emailContent'));

    iFrameDom.find('.emailContent .module').css("background-color", "#FFFFFF")
    iFrameDom.find('.emailContent > .module').removeClass('module')

    //When clicking on element
    iFrameDom.find('h1, h2, h3, h4, p, a, li, img').unbind('click').bind('click', function(e) {
      e.stopPropagation();
      e.preventDefault();

      thisElement = $(this)

      $('.element').text(iFrameDom.find(thisElement).prop('tagName'))

      iFrameDom.find(thisElement).addClass(thisElement.prop('tagName'))

      $('.textStyle, .imageStyle, .link, .ctaStyle').hide()

      if ($('.changeModal').css('right') != '0') {
        $('.changeModal').css({
          'opacity': '1'
        })
        $('.changeModal').animate({
          'right': '0'
        }, 1000)
        $('.deleteModal').animate({
          'right': '-400px'
        }, 1000)
        $('.deleteModulesBtn').animate({
          'opacity': '1'
        }, 1000)
        $('.toolbar > *').animate({
          'opacity': '0'
        }, 1000)
      }
      $("textarea, .imageSize").val('')
      $('.fontSizeOutput').text('')


      if (iFrameDom.find(thisElement).hasClass('IMG')) {
        $('.link').show()
        $('.textStyle, .ctaStyle').hide()
        if (iFrameDom.find(thisElement).parent('a').length) {
          $('.link').show()
        }
        $('.imageStyle').show()
      } else if (iFrameDom.find(thisElement).hasClass('A')) {
        $('.textStyle').show()
        $('.link').show()
        $('.imageStyle, .ctaStyle').hide()
        if (iFrameDom.find(thisElement).children('img').length) {
          $('.imageStyle').show()
        }
        if (iFrameDom.find(thisElement).hasClass('btn')) {
          $('.ctaStyle').show()
        }
      } else {
        $('.textStyle').show()
        $('.link, .ctaStyle').hide()
        $('.imageStyle').hide()
      }




      if (iFrameDom.find(thisElement).hasClass('A')) {
        e.preventDefault();
        $("textarea.changeLink").on('keyup blur', function() {
          let newLinkHref = $(this).val().trim()
          iFrameDom.find(thisElement).attr('href', newLinkHref)
        });

        if (iFrameDom.find(thisElement).hasClass('btn')) {
          let ctaWidth = iFrameDom.find(thisElement).css('width')
          $('.ctaWidth').val(ctaWidth)
          $(".ctaWidth").on('keyup blur', function() {
            let newCtaWidth = $(this).val().trim()
            iFrameDom.find(thisElement).css('width', newCtaWidth)
          });
        }
      }

      if (iFrameDom.find(thisElement).hasClass('IMG')) {
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

      if (iFrameDom.find(thisElement).not('.IMG')) {

        let styleBold = $(iFrameDom).find(thisElement).css('font-weight')
        let styleItalic = $(iFrameDom).find(thisElement).css('font-style')
        let styleUnderlineSplit = $(iFrameDom).find(thisElement).css('text-decoration').split(' ')
        let styleUnderline = styleUnderlineSplit[0]

        if (styleBold === '400' || styleBold === '') {
          $('.styleBold').removeClass('active')
        } else {
          $('.styleBold').addClass('active')
        }
        if (styleItalic === 'normal' || styleItalic === '') {
          $('.styleItalic').removeClass('active')
        } else {
          $('.styleItalic').addClass('active')
        }
        if (styleUnderline === 'none') {
          $('.styleUnderline').removeClass('active')
        } else {
          $('.styleUnderline').addClass('active')
        }

        $("textarea.changeText").on('keyup blur', function() {
          let textContent = $(this).val().trim()
          iFrameDom.find(thisElement).html(textContent);
        });

        $(".style").unbind('click').bind('click', function() {
          let styleBold = $(iFrameDom).find(thisElement).css('font-weight')
          let styleItalic = $(iFrameDom).find(thisElement).css('font-style')
          let styleUnderlineSplit = $(iFrameDom).find(thisElement).css('text-decoration').split(' ')
          let styleUnderline = styleUnderlineSplit[0]

            if ($(this).hasClass('styleBold')) {
              if (styleBold === '400' || styleBold === '') {
                iFrameDom.find(thisElement).css('font-weight', 'bold')
                $(this).addClass('active')
              } else {
                iFrameDom.find(thisElement).css('font-weight', 'normal')
                $(this).removeClass('active')
              }
            } else if ($(this).hasClass('styleItalic')) {
              if (styleItalic === 'normal' || styleItalic === '') {
                iFrameDom.find(thisElement).css('font-style', 'italic')
                $(this).addClass('active')
              } else {
                iFrameDom.find(thisElement).css('font-style', 'normal')
                $(this).removeClass('active')
              }
            } else if ($(this).hasClass('styleUnderline')) {
              if (styleUnderline === 'none') {
                iFrameDom.find(thisElement).css('text-decoration', 'underline')
                $(this).addClass('active')
              } else {
                iFrameDom.find(thisElement).css('text-decoration', 'none')
                $(this).removeClass('active')
              }
            }
        });

      $(".size").unbind('click').bind('click', function() {

          let currentSize = parseInt(iFrameDom.find(thisElement).css("font-size").replace('px', ''))
          let sizePlus = currentSize + 1
          let sizeMinus = currentSize - 1

          if ($(this).hasClass('sizePlus')) {
            iFrameDom.find(thisElement).css("font-size", sizePlus + "px");
            $('.fontSizeOutput').text(':' + sizePlus + 'px')
          } else if ($(this).hasClass('sizeMinus')) {
            iFrameDom.find(thisElement).css("font-size", sizeMinus + "px");
            $('.fontSizeOutput').text(':' + sizeMinus + 'px')
          }
        });

        $(".ctaSizeBtn").unbind('click').bind('click', function() {

            let currentWidth = parseInt(iFrameDom.find(thisElement).css("width").replace('px', ''))
            let widthPlus = currentWidth + 5
            let widthMinus = currentWidth - 5

            if ($(this).hasClass('ctaSizePlus')) {
              iFrameDom.find(thisElement).css("width", widthPlus);
              $('.ctaWidth').val(widthPlus)
            } else if ($(this).hasClass('ctaSizeMinus')) {
              iFrameDom.find(thisElement).css("width", widthMinus);
              $('.ctaWidth').val(widthMinus)
            }
          });

        $(".height").unbind('click').bind('click', function() {

          if ($(this).hasClass('heightPlus')) {
              let currentHeight = parseFloat(iFrameDom.find(thisElement).css("line-height").replace('px', '')).toFixed(1)
              let currentFontSize = parseFloat(iFrameDom.find(thisElement).css("font-size").replace('px', ''))
              let heightEM = parseFloat((currentHeight / currentFontSize).toFixed(1))
              let heightPlusEM = (heightEM + 0.1).toFixed(1)
              iFrameDom.find(thisElement).css("line-height", heightPlusEM);
              $('.lineHeightOutput').text(':' + heightPlusEM)
          } else if ($(this).hasClass('heightMinus')) {
              let currentHeight = parseFloat(iFrameDom.find(thisElement).css("line-height").replace('px', '')).toFixed(1)
              let currentFontSize = parseFloat(iFrameDom.find(thisElement).css("font-size").replace('px', ''))
              let heightEM = parseFloat((currentHeight / currentFontSize).toFixed(1))
              let heightMinusEM = (heightEM - 0.1).toFixed(1)
              iFrameDom.find(thisElement).css("line-height", heightMinusEM);
              $('.lineHeightOutput').text(':' + heightMinusEM)
            }
        });
      }

    });
  });

  $(".toolbar > div > div > div").children().mouseenter(function() {
    const overlay = '<div class="tableOverlay"><i class="fas fa-plus"></i></div>'
    $(this).append(overlay);
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
      setTimeout(function() {
        $('.deleteModulesBtn').show()
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
      $('.deleteModulesBtn').hide()
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
    if ($('.toolbar > *').css('opacity') === '0') {
      $('.toolbar > *').animate({
        'opacity': '1'
      }, 1000)
      $('.options').not('.toolbar').animate({
        'right': '-400px'
      }, 1000)
      $('.deleteModulesBtn').animate({
        'opacity': '1'
      }, 1000)

    }
  })

  $('.deleteModulesBtn').click(function() {
    let chosenContent = iFrameDom.find('.emailContent').html()

    $('.chosenContent').html(chosenContent)
    $('.chosenContent > table').wrap('<div class="removeModules"></div>')
    $('.deleteModal').css('width', toolbarWidth)
    if ($('.deleteModal').css('right') != '0') {
      $('.deleteModulesBtn').animate({
        'opacity': '0'
      }, 1000)

      $('.changeModal').css({
        'z-index': '100'
      })
      $('.deleteModal').css({
        'z-index': '1000'
      })

      $('.deleteModal').css({
        'opacity': '1'
      })
      $('.deleteModal').animate({
        'right': '0'
      }, 1000)
      $('.changeModal').animate({
        'right': '-400px'
      }, 1000)
      $('.toolbar > *').animate({
        'opacity': '0'
      }, 1000)
    }

    $('.chosenContent a').removeAttr('href')
    $('.removeModules > table').click(function() {

      const overlay = '<div class="tableOverlay"><i class="fas fa-trash-alt"></i></div>'
      $(this).append(overlay);
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
      $('.tableOverlay > .fa-trash-alt').css({
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

      $('.tableOverlay').click(function() {
        let index = $(this).parent().parent().index()
        $(this).animate({
          opacity: '0'
        }, 500)
        iFrameDom.find('.emailContent').children('table').eq(index).remove()
        $('.removeModules').eq(index).remove()

        if (iFrameDom.find('.emailContent').children().length < 1) {

          disableCopyBtn()

          iFrameDom.find('.emptyContent, .emptyContentStyle').show()
          $('.toolbar > *').animate({
            'opacity': '1'
          }, 1000)
          $('.deleteModal').animate({
            'right': '-400px'
          }, 1000)
          $('.deleteModulesBtn').css({
            'opacity': '1'
          })

          $('.toolbar .tableOverlay').remove()



        }

      });

    });
  })
}, 2000);
}

mainScript()
