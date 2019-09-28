function getFromShareLink() {

  if (window.location.href.indexOf("share") > -1) {

    let sessionVal = new URL(window.location).searchParams.get("share")

    let sessionKey = new URL(window.location).searchParams.get("key")

    firebase.database().ref().child(sessionKey).on('value', function(snapshot) {

      var sessionContent = snapshot.val();

      var objectValue = Object.values(sessionContent)

      $('#iFrame').contents().find('body').html(objectValue)

    });

  }

}
