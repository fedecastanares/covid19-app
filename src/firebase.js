import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDcI7ypni6_JpdzF0N_SRWo4FbDmOCPd2g",
    authDomain: "juntos-podemos-e2988.firebaseapp.com",
    databaseURL: "https://juntos-podemos-e2988.firebaseio.com",
    projectId: "juntos-podemos-e2988",
    storageBucket: "juntos-podemos-e2988.appspot.com",
    messagingSenderId: "750608377406",
    appId: "1:750608377406:web:c40699d69e0eb48cc0136f",
    measurementId: "G-BVWRDGWKMK"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.analytics();

  export default firebase;