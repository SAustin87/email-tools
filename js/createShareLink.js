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
