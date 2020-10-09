
async function fileLoadScript() {
        return new Promise((resolve, reject) => {
          try {

      	var filesHtml = Object.assign({}, files)

        for (let x = 0; x < Object.keys(files).length; x++) {

      	for (let i = 0; i < Object.values(files)[x].length; i++) {

      		$(function () {

      			console.log(filesHtml)
      			let moduleType = Object.keys(files)[x]
      			let moduleName = Object.values(files)[x][i]
      			let moduleNameReplaceExt = moduleName.replace('.html', '')
      			let moduleNameReplaceUnderscore = moduleNameReplaceExt.replace(/_/g, ' ')
      			let moduleNameAddSpacing = moduleNameReplaceUnderscore.replace(/([A-Z])/g, ' $1')
      			let moduleNameCapitalise = moduleNameAddSpacing.replace(/^./, function(str){ return str.toUpperCase(); })
      			let moduleDisplayName = moduleNameCapitalise

      					$.get(path + moduleType + '/' + moduleName, function (data) {

      						Object.values(filesHtml)[x][i] = '<div><h3>' + moduleNameCapitalise + '</h3> <div>' + data + '</div></div>';
      					$('.' + moduleType).append('<div><h3>' + moduleNameCapitalise + '</h3> <div>' + data + '</div></div>');
      					console.log(filesHtml)
      				});

      			let layoutModulesChildren = $('.layoutModules').children('div').eq(i)
      			});
      		}

      }

      resolve();
      	 } catch (e) {
      		 reject(e);
      	 }
       })
      }
async function documentLoad() {
        return new Promise((resolve, reject) => {
          try {
      setTimeout(function() {
        //target iframe body and append with content from hidden div, then remove hidden div
        const moduleContent = $('#iFrame').contents().find('body');
        const content = $('.hiddenContent').html()
        moduleContent.append(content);
        $('.hiddenContent .mobileContent').remove()

        //set iframe body padding and margin to 0
        $('#iFrame').contents().find('body').css({
         margin: '0px',
         padding: '0px'
        })

        // Uppercases HEHA
        $('.componentModules > div > h3').each(function() {
         if ($(this).text().indexOf('Heha') >= 0 || $(this).text().indexOf('Heha') >= 0) {
          $(this).text($(this).text().replace('Heha', 'HEHA'))
         }
        })


        const theTop = parseInt($('.pageTitle').css("height").replace('px', ''))
        $('#iFrame').contents().find('.emailContent').css({
         top: theTop,
         width: '100%'
        });


        $('.toolbar > div > div > div').addClass('moduleContainer')
        $('.toolbar > div > div > .moduleContainer').children().addClass('module')

        const toolbarWidth = $('.toolbar').outerWidth()

        editorActions()
        mouseActions()

      },1000);


      resolve();


            } catch (e) {
              reject(e);
            }
          })


        }
async function disableCopyBtn() {
return new Promise((resolve, reject) => {
 try {
     $('.exportBtns').css({
  'pointer-events': "none",
  opacity: '0.5',
  cursor: 'pointer'
 })
 resolve();
     } catch (e) {
       reject(e);
     }
   })
 }
async function getFromShareLink() {
   return new Promise((resolve, reject) => {
     try {
         if (window.location.href.indexOf("share") > -1) {

     let sessionVal = new URL(window.location).searchParams.get("share")

     let sessionKey = new URL(window.location).searchParams.get("key")

     firebase.database().ref().child(sessionKey).on('value', function(snapshot) {

       var sessionContent = snapshot.val();

       var objectValue = Object.values(sessionContent)

       $('#iFrame').contents().find('body').html(objectValue)

     });

   }
   resolve();
       } catch (e) {
         reject(e);
       }
     })
   }
function mouseActions() {
$(".module").parent().click(function(e) {

  var pWidth = $(this).innerWidth();
 var pOffset = $(this).offset();
 var x = e.pageX - pOffset.left;


  if(pWidth/2 > x)
{$('#iFrame').contents().find('.emptyContent, .emptyContentStyle').hide()
$('.hiddenContent .emptyContentStyle').remove()
$('.resizeControls').show()
$('.exportBtns').css({
opacity: '1',
"pointer-events": 'auto'
})

//Remove transparent overlay
$('.tableOverlay, .copyModule').remove();

//Copies module and inserts in to iFrame
$(this).children('table').clone().appendTo($('#iFrame').contents().find('.emailContent'));

$('#iFrame').contents().find('.emailContent .module').css("background-color", "#FFFFFF")
$('#iFrame').contents().find('.emailContent > .module').removeClass('module')}
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

$('.deleteModulesBtn').click(function() {
 let chosenContent = $('#iFrame').contents().find('.emailContent').html()

 $('.chosenContent').html(chosenContent)
 $('.chosenContent > table').wrap('<div class="removeModules"></div>')

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
   $('#iFrame').contents().find('.emailContent').children('table').eq(index).remove()
   $('.removeModules').eq(index).remove()

   if ($('#iFrame').contents().find('.emailContent').children().length < 1) {

    disableCopyBtn()

    $('#iFrame').contents().find('.emptyContent, .emptyContentStyle').show()



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

$('#iFrame').contents().find('.emailContent .mobileText').text($('.emailContent .desktopMsg').text());
let openingCode = $('.openingCode').text().trim()
let bodyCode = $('#iFrame').contents().find('.emailContent').html().trim()
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
$(".copyCode").click(function() {
 $('#iFrame').contents().find('.emailContent .mobileText').text($('.emailContent .desktopMsg').text());
 $('#iFrame').contents().find('.emptyContent, .emptyContentStyle').remove()
 let openingCode = $('.openingCode').text().trim()
 let bodyCode = $('#iFrame').contents().find('.emailContent').html().trim()
 let closingCode = $('.closingCode').text().trim()
 let contentToCopy = openingCode + bodyCode + closingCode
 let $temp = $("<textarea>");

 $("body").append($temp);
 $temp.val(contentToCopy).select();
 document.execCommand("copy");
 $temp.remove();
 $('.codeCopied').show().delay(1000).fadeOut(2000).css("display", "inline-block");
})
$(".copyShare").click(function() {

  let url = "https://email-builder-15348.firebaseio.com/"

  let firebaseRef = firebase.database().ref()

  let userCreatedDynamicHtml = $('#iFrame').contents().find('body').html()

  let userCreatedHash = hex_md5(userCreatedDynamicHtml)

  let refPush = firebaseRef.push({
    [userCreatedHash]: userCreatedDynamicHtml
  });

  let postID = refPush.key;

  event.preventDefault();

  let contentToCopy = window.location.origin + window.location.pathname + '?share=' + userCreatedHash + '&key=' + postID
  let $temp = $("<textarea>");

  $("body").append($temp);
  $temp.val(contentToCopy).select();
  document.execCommand("copy");
  $temp.remove();

  $('.shareCopied').show().delay(1000).fadeOut(2000).css("display", "inline-block");

})
}
function editorActions() {
  if (window.location.href.indexOf("share") > -1) {
      $('.resizeControls').show()
      $('.exportBtns').css({
        opacity: '1',
        "pointer-events": 'auto'
      })
    }    //When clicking on element
     $('#iFrame').contents().find('h1, h2, h3, h4, p, a, li, img').unbind('click').bind('click', function(e) {
      e.stopPropagation();
      e.preventDefault();

      thisElement = $(this)

      $('.element').text($('#iFrame').contents().find(thisElement).prop('tagName'))

      $('#iFrame').contents().find(thisElement).addClass(thisElement.prop('tagName'))

      $('.textStyle, .imageStyle, .link, .ctaStyle').hide()


      $('#editContent').modal('toggle');
      $("textarea, .imageSize").val('')
      $('.fontSizeOutput').text('')

$('.removeElement').click(function(){
  $('#iFrame').contents().find(thisElement).remove()
})
      if ($('#iFrame').contents().find(thisElement).hasClass('IMG')) {
       $('.link').show()
       $('.textStyle, .ctaStyle').hide()
       if ($('#iFrame').contents().find(thisElement).parent('a').length) {
        $('.link').show()
       }
       $('.imageStyle').show()
      } else if ($('#iFrame').contents().find(thisElement).hasClass('A')) {
       $('.textStyle').show()
       $('.link').show()
       $('.imageStyle, .ctaStyle').hide()
       if ($('#iFrame').contents().find(thisElement).children('img').length) {
        $('.imageStyle').show()
       }
       if ($('#iFrame').contents().find(thisElement).hasClass('btn')) {
        $('.ctaStyle').show()
       }
      } else {
       $('.textStyle').show()
       $('.link, .ctaStyle').hide()
       $('.imageStyle').hide()
      }




      if ($('#iFrame').contents().find(thisElement).hasClass('A')) {
       e.preventDefault();
       $("textarea.changeLink").on('keyup blur', function() {
        let newLinkHref = $(this).val().trim()
        $('#iFrame').contents().find(thisElement).attr('href', newLinkHref)
       });

       if ($('#iFrame').contents().find(thisElement).hasClass('btn')) {
        let ctaWidth = $('#iFrame').contents().find(thisElement).css('width')
        $('.ctaWidth').val(ctaWidth)
        $(".ctaWidth").on('keyup blur', function() {
         let newCtaWidth = $(this).val().trim()
         $('#iFrame').contents().find(thisElement).css('width', newCtaWidth)
        });
       }
      }

      if ($('#iFrame').contents().find(thisElement).hasClass('IMG')) {
       let imgWidth = $('#iFrame').contents().find(thisElement).attr('width')
       let imgHeight = $('#iFrame').contents().find(thisElement).attr('height')
       $('.imageHeight').val(imgHeight)
       $('.imageWidth').val(imgWidth)

       $("input.imageUrl").on('keyup blur', function() {
        let newImageSrc = $(this).val().trim()
        $('#iFrame').contents().find(thisElement).attr('src', newImageSrc)
       });
       $("textarea.changeLink").on('keyup blur', function() {
        let newLinkHref = $(this).val().trim()
        $('#iFrame').contents().find(thisElement).parent('a').attr('href', newLinkHref)
       });
       $("input.imageSize").on('keyup blur', function() {
        if ($(this).hasClass('imageHeight')) {
         let newHeight = $(this).val().trim()
         $('#iFrame').contents().find(thisElement).attr('height', newHeight)
        } else if ($(this).hasClass('imageWidth')) {
         let newWidth = $(this).val().trim()
         $('#iFrame').contents().find(thisElement).attr('width', newWidth)
        }
       });
      }

      if ($('#iFrame').contents().find(thisElement).not('.IMG')) {

       let styleBold = $($('#iFrame').contents()).find(thisElement).css('font-weight')
       let styleItalic = $($('#iFrame').contents()).find(thisElement).css('font-style')
       let styleUnderlineSplit = $($('#iFrame').contents()).find(thisElement).css('text-decoration').split(' ')
       let styleUnderline = styleUnderlineSplit[0]
       let thisContent = $('#iFrame').contents().find(thisElement).html().replace(/  +/g, ' ').replace(/\s+/g,' ').replace(/\t/g, ' ').replace(/<br\s*\/?>/ig, "\r\n").trim();

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
        $('#iFrame').contents().find(thisElement).html(textContent);
       });


       $(".style").unbind('click').bind('click', function() {
        let styleBold = $($('#iFrame').contents()).find(thisElement).css('font-weight')
        let styleItalic = $($('#iFrame').contents()).find(thisElement).css('font-style')
        let styleUnderlineSplit = $($('#iFrame').contents()).find(thisElement).css('text-decoration').split(' ')
        let styleUnderline = styleUnderlineSplit[0]

        if ($(this).hasClass('styleBold')) {
         if (styleBold === '400' || styleBold === '') {
          $('#iFrame').contents().find(thisElement).css('font-weight', 'bold')
          $(this).addClass('active')
         } else {
          $('#iFrame').contents().find(thisElement).css('font-weight', 'normal')
          $(this).removeClass('active')
         }
        } else if ($(this).hasClass('styleItalic')) {
         if (styleItalic === 'normal' || styleItalic === '') {
          $('#iFrame').contents().find(thisElement).css('font-style', 'italic')
          $(this).addClass('active')
         } else {
          $('#iFrame').contents().find(thisElement).css('font-style', 'normal')
          $(this).removeClass('active')
         }
        } else if ($(this).hasClass('styleUnderline')) {
         if (styleUnderline === 'none') {
          $('#iFrame').contents().find(thisElement).css('text-decoration', 'underline')
          $(this).addClass('active')
         } else {
          $('#iFrame').contents().find(thisElement).css('text-decoration', 'none')
          $(this).removeClass('active')
         }
        }
       });

       $(".size").unbind('click').bind('click', function() {

        let currentSize = parseInt($('#iFrame').contents().find(thisElement).css("font-size").replace('px', ''))
        let sizePlus = currentSize + 1
        let sizeMinus = currentSize - 1

        if ($(this).hasClass('sizePlus')) {
         $('#iFrame').contents().find(thisElement).css("font-size", sizePlus + "px");
         $('.fontSizeOutput').text(':' + sizePlus + 'px')
        } else if ($(this).hasClass('sizeMinus')) {
         $('#iFrame').contents().find(thisElement).css("font-size", sizeMinus + "px");
         $('.fontSizeOutput').text(':' + sizeMinus + 'px')
        }
       });

       $(".ctaSizeBtn").unbind('click').bind('click', function() {

        let currentWidth = parseInt($('#iFrame').contents().find(thisElement).css("width").replace('px', ''))
        let widthPlus = currentWidth + 5
        let widthMinus = currentWidth - 5

        if ($(this).hasClass('ctaSizePlus')) {
         $('#iFrame').contents().find(thisElement).css("width", widthPlus);
         $('.ctaWidth').val(widthPlus)
        } else if ($(this).hasClass('ctaSizeMinus')) {
         $('#iFrame').contents().find(thisElement).css("width", widthMinus);
         $('.ctaWidth').val(widthMinus)
        }
       });

       $(".height").unbind('click').bind('click', function() {

        if ($(this).hasClass('heightPlus')) {
         let currentHeight = parseFloat($('#iFrame').contents().find(thisElement).css("line-height").replace('px', '')).toFixed(1)
         let currentFontSize = parseFloat($('#iFrame').contents().find(thisElement).css("font-size").replace('px', ''))
         let heightEM = parseFloat((currentHeight / currentFontSize).toFixed(1))
         let heightPlusEM = (heightEM + 0.1).toFixed(1)
         $('#iFrame').contents().find(thisElement).css("line-height", heightPlusEM);
         $('.lineHeightOutput').text(':' + heightPlusEM)
        } else if ($(this).hasClass('heightMinus')) {
         let currentHeight = parseFloat($('#iFrame').contents().find(thisElement).css("line-height").replace('px', '')).toFixed(1)
         let currentFontSize = parseFloat($('#iFrame').contents().find(thisElement).css("font-size").replace('px', ''))
         let heightEM = parseFloat((currentHeight / currentFontSize).toFixed(1))
         let heightMinusEM = (heightEM - 0.1).toFixed(1)
         $('#iFrame').contents().find(thisElement).css("line-height", heightMinusEM);
         $('.lineHeightOutput').text(':' + heightMinusEM)
        }
       });
      }

     });

     /* $( "#addModules" ).mouseleave(function() {
  $( this ).parent().animate({opacity: 0.05}, 200);
}).mouseenter(function() {
  $( this ).parent().animate({opacity: 1}, 200);
});*/

$( "#editContent" ).mouseleave(function() {
$( this ).parent().animate({opacity: 0.5}, 200);
}).mouseenter(function() {
$( this ).parent().animate({opacity: 1}, 200);
});

  }




async function mainScript() {
  await fileLoadScript();
  await documentLoad();
  await disableCopyBtn();
  await getFromShareLink();
}


mainScript()
