$(".copyShare").click(function() {

  var url = "https://email-builder-15348.firebaseio.com/"

  var firebaseRef = firebase.database().ref()

  var userCreatedDynamicHtml = $('#iFrame').contents().find('body').html()

  var userCreatedHash = hex_md5(userCreatedDynamicHtml)

  var refPush = firebaseRef.push({
    [userCreatedHash]: userCreatedDynamicHtml
  });

  var postID = refPush.key;

  event.preventDefault();

  let contentToCopy = window.location.origin + window.location.pathname + '?share=' + userCreatedHash + '&key=' + postID
  let $temp = $("<textarea>");

  $("body").append($temp);
  $temp.val(contentToCopy).select();
  document.execCommand("copy");
  $temp.remove();

  $('.shareCopied').show().delay(1000).fadeOut(2000).css("display", "inline-block");

})
