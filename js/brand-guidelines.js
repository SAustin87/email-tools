setTimeout(function() {

  const componentModules = document.querySelector('.componentModules');
  const divsC = [...componentModules.children];
  divsC.sort((a, b) => a.id - b.id);
  divsC.forEach(div => componentModules.appendChild(div));

  const layoutModules = document.querySelector('.layoutModules');
  const divsL = [...layoutModules.children];
  divsL.sort((a, b) => a.id - b.id);
  divsL.forEach(div => layoutModules.appendChild(div));



  (function() {
    let css = document.createElement('link');
    css.href = 'https://use.fontawesome.com/releases/v5.1.0/css/all.css';
    css.rel = 'stylesheet';
    css.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(css);
  })();

  $('.modules > div > div').each(function() {
    let highlightContent = $(this).html().trim()
    $(this).css({
      border: '1px solid rgba(0, 0, 0, 0.15)',
      'background-color': 'white',
      margin: '20px auto',
      width: '602px'
    })
    $(this).addClass('moduleContainer')
    $('<div>').insertAfter(this).addClass("code")
    $(this).next('div').append('<pre class="prettyprint">')
    $(this).next('div').find('pre').append('<code class="prettyprint">')
    $(this).next('div').find('code').text(highlightContent).html()
  });
  $('pre').css({
    padding: '15px',
    margin: '20px auto',
    width: '100%',
    "border-radius": '4px'
  })

  let copyCode = $('<div class="copyCode">').html('Copy code <i class="far fa-copy"></i>')
  let codeCopied = $('<div class="codeCopied">').html('Code copied <i class="far fa-check-circle"></i>')
  $('<div>').insertAfter('.code').addClass('copyBtn')
  $('.copyBtn').css({
    width: '602px',
    height: '60px',
    margin: '0px auto'
  })
  $('.copyBtn').append(copyCode, codeCopied)
  $(".copyCode").click(function() {
    let $temp = $("<textarea>");
    let text = $(this).parent().prev('.code').find('code').text().trim()
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
    $(this).next('.codeCopied').show().delay(1000).fadeOut(2000).css("display", "inline-block");
  })
  let viewCode = $('<div class="viewCode codeHidden">').html('Show code <i class="far fa-eye"></i>')
  $('.copyBtn').append(viewCode)
  $('.code').hide()
  $(".viewCode").click(function() {
    if ($(this).is(':contains("Show")')) {
      $(this).parent().prev('.code').show()
      $(this).html('Hide code <i class="far fa-eye-slash"></i>')
    } else {
      $(this).parent().prev('.code').hide()
      $(this).html('Show code <i class="far fa-eye"></i>')
    }
  });
  $(".colourSwatch").each(function() {
    let bgColour = $(this).text()
    $(this).css("background-color", bgColour)
    if ($(this).is(":contains('#542E91')") || $(this).is(":contains('#232323')")) {
      $(this).css("color", "#FFFFFF")
    }
  });
  $(function() {
    let container = $('.slideshow');
    let height = $(container).css('width')
    $(container).css('height', height)
    let slide = ["https://dmy0b9oeprz0f.cloudfront.net/holidayextras.co.uk/brand-guidelines/logo-tags/png/globe.png", "https://dmy0b9oeprz0f.cloudfront.net/holidayextras.co.uk/brand-guidelines/logo-tags/png/parasol-2.png", "https://dmy0b9oeprz0f.cloudfront.net/holidayextras.co.uk/brand-guidelines/logo-tags/png/suitcase.png", "https://dmy0b9oeprz0f.cloudfront.net/holidayextras.co.uk/brand-guidelines/logo-tags/png/vw-beetle.png", "https://dmy0b9oeprz0f.cloudfront.net/holidayextras.co.uk/brand-guidelines/logo-tags/png/robot-2.png", "https://dmy0b9oeprz0f.cloudfront.net/holidayextras.co.uk/brand-guidelines/logo-tags/png/door-tag.png", "https://dmy0b9oeprz0f.cloudfront.net/holidayextras.co.uk/brand-guidelines/logo-tags/png/camper-van.png"];
    let count = 0;
    setInterval(function() {
      $(container).html("<img src='" + slide[count] + "' alt='Slide " + (count + 1) + "'>");
      count++;
      if (count == slide.length) {
        count = 0;
      }
    }, 1000);
  });
  let offsetTop = $('#accessibility').offset().top
  let roundedOffset = Math.floor(offsetTop)
  $('#accessibility').offset(top, offsetTop)
  $(window).scroll(function() {
    let y = $(this).scrollTop();
    let z = y + 1
    $('.nav ul li a').each(function(event) {
      if (z >= $($(this).attr('href')).offset().top) {
        $('.nav ul li a').not(this).removeClass('active');
        $(this).addClass('active');
      }
    });
  });

  PR.prettyPrint()

  $('.toTheTop').hide()
  $(window).scroll(function() {
    let headerHeight = $('.title').outerHeight() + $('.intro').outerHeight()
    if ($(window).scrollTop() > headerHeight) {
      $('.toTheTop').fadeIn(1000);
    } else {
      $('.toTheTop').fadeOut(1000);

    }
  });

$('.modules').each(function() {
  $(this).children().first().next().children().first().hide().next().css('padding-top','10px')
});

}, 1000);
