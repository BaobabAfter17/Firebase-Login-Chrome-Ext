initializeFirebase();
initializeFirebaseUI();

function initializeFirebase() {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB-vcFWAw5KpdM1qCqQDCkb1GekcPrAUoc",
    authDomain: "myaligatorproject-2ec58.firebaseapp.com",
    databaseURL: "https://myaligatorproject-2ec58.firebaseio.com",
    projectId: "myaligatorproject-2ec58",
    storageBucket: "myaligatorproject-2ec58.appspot.com",
    messagingSenderId: "604193705847",
    appId: "1:604193705847:web:8ffe063555339998065b72",
    measurementId: "G-QDN1TBKEX0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

function initializeFirebaseUI() {
  // https://medium.com/@an_object_is_a/firebase-login-system-for-google-chrome-extensions-27906f973b66
  // use pre-built firebase auth UI
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            chrome.runtime.sendMessage({ message: 'sign_in' }, function (response) {
                if (response.message === 'success') {
                    window.location.replace('display.html');
                }
            });
        return false;
      },

    },
    signInFlow: 'popup',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    // tosUrl: 'some url',
    // Privacy policy url/callback.
    // privacyPolicyUrl: function () {
    //   window.location.assign('some page');
    // }
  };

  // Initialize the FirebaseUI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
}