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
  $('.componentModules > div > h3').each(function() {
   if ($(this).text().indexOf('Heha') >= 0 || $(this).text().indexOf('Heha') >= 0) {
    $(this).text($(this).text().replace('Heha', 'HEHA'))
   }
  })

  //Sets and runs function to disable copy btn
  function disableCopyBtn() {
   $('.exportBtns').css({
    'pointer-events': "none",
    opacity: '0.5',
    cursor: 'pointer'
   })
  }



  disableCopyBtn()









  function editorActions() {
    if (window.location.href.indexOf("share") > -1) {
      $('.resizeControls').show()
      $('.exportBtns').css({
        opacity: '1',
        "pointer-events": 'auto'
      })
    }    //When clicking on element
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

$('.removeElement').click(function(){
  iFrameDom.find(thisElement).remove()
})
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
       let thisContent = iFrameDom.find(thisElement).html().replace(/  +/g, ' ').replace(/\s+/g,' ').replace(/\t/g, ' ').replace(/<br\s*\/?>/ig, "\r\n").trim();

       $('textarea.changeText').val(thisContent)

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
        let textContent = $(this).val().trim().replace(/\r\n|\r|\n/g, "<br />")
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
   }




   getFromShareLink()

   if (window.location.href.indexOf("share") > -1) {

  setTimeout(function() { editorActions() },1500) }








  //Copies code
  $(".copyCode").click(function() {
   iFrameDom.find('.emailContent .mobileText').text($('.emailContent .desktopMsg').text());
   iFrameDom.find('.emptyContent, .emptyContentStyle').remove()
   let openingCode = $('.openingCode').text().trim()
   let bodyCode = iFrameDom.find('.emailContent').html().trim()
   let closingCode = $('.closingCode').text().trim()
   let contentToCopy = openingCode + bodyCode + closingCode
   let $temp = $("<textarea>");

   $("body").append($temp);
   $temp.val(contentToCopy).select();
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
  $(".module").parent().click(function(e) {

    var pWidth = $(this).innerWidth();
   var pOffset = $(this).offset();
   var x = e.pageX - pOffset.left;


    if(pWidth/2 > x)
{iFrameDom.find('.emptyContent, .emptyContentStyle').hide()
$('.hiddenContent .emptyContentStyle').remove()
$('.resizeControls').show()
$('.exportBtns').css({
 opacity: '1',
 "pointer-events": 'auto'
})

//Remove transparent overlay
$('.tableOverlay, .copyModule').remove();

//Copies module and inserts in to iFrame
$(this).children('table').clone().appendTo(iFrameDom.find('.emailContent'));

iFrameDom.find('.emailContent .module').css("background-color", "#FFFFFF")
iFrameDom.find('.emailContent > .module').removeClass('module')}
    else
        {
        $('.tableOverlay, .copyModule').remove();
        let clone = $(this).children('table').clone()
        let tempDiv = $('<div class="tempDiv"></div>')
        $('body').append(tempDiv)
        $(tempDiv).html(clone)
        $(tempDiv).children('table').removeClass('module')
        let moduleToCopy  = $('.tempDiv').html()
        console.log($('.tempDiv').html())
         let $temp = $("<textarea>");

         $("body").append($temp);
         $temp.val(moduleToCopy).select();
         document.execCommand("copy");
         $temp.remove()
         $(tempDiv).remove()

       }
editorActions()
 });

 $(".toolbar > div > div > div").children().mouseenter(function() {
  const overlay = '<div class="tableOverlay"><div class="left"><i class="fas fa-plus"></i></div><div class="right"><i class="far fa-copy"></i></div></div>'
  if(!$(this).find('.tableOverlay').length) { $(this).append(overlay);}
  const bottomWidth = $(this).css('width');
  const bottomHeight = $(this).css('height');
  const rowPos = $(this).position();
  bottomTop = rowPos.top;
  bottomLeft = rowPos.left;

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

    const overlay = '<div class="tableOverlay2"><i class="fas fa-trash-alt"></i></div>'
    $(this).append(overlay);
    const bottomWidth = $(this).css('width');
    const bottomHeight = $(this).css('height');
    const rowPos = $(this).position();
    bottomTop = rowPos.top;
    bottomLeft = rowPos.left;
    $('.tableOverlay2').mouseleave(function() {
     $(this).remove()
    });

    $('.tableOverlay2').click(function() {
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
$('.downloadFile').click(function(){
$('.fileName').fadeIn(500)
$('.fileName').addClass('scale')

})


$('.downloadBtn').click(function() {

iFrameDom.find('.emailContent .mobileText').text($('.emailContent .desktopMsg').text());
let openingCode = $('.openingCode').text().trim()
let bodyCode = iFrameDom.find('.emailContent').html().trim()
let closingCode = $('.closingCode').text().trim()
let contentToCopy = openingCode + bodyCode + closingCode
console.log(contentToCopy)

let downloadName = $('.fileNameText').val()

var a = document.body.appendChild(
       document.createElement("a")
   );
   var blob = new Blob([contentToCopy], {type: "text/html"});
   var url = URL.createObjectURL(blob);
a.href = url
a.download = downloadName + ".html";
a.click();
$('.fileName').removeClass('scale')
$('.fileDownloaded').show().delay(1000).fadeOut(2000).css("display", "inline-block");

})
$('.fileNameText').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('.downloadBtn').click();//Trigger search button click event
        }
    })
$('.fa-question').click(function(){
$('.helpBtn').removeClass('helpBtnSmall').addClass('helpBtnFull')
$('.fa-question').fadeOut()
$('.helpContent').removeClass('helpContentInactive').addClass('helpContentActive')
$('.helpBG').fadeIn(300)

})


$('.fa-times').click(function(){
  $('.helpContent').removeClass('helpContentActive').addClass('helpContentInactive')

setTimeout(function(){
  $('.helpBtn').removeClass('helpBtnFull').addClass('helpBtnSmall')
  $('.helpBG').fadeOut(300)

  setTimeout(function(){$('.fa-question').fadeIn()},400)
},400)
})

 }, 2000);
}

mainScript()
