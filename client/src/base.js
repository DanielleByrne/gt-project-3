import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCM69cYPLTYBaBNu6-zXDgoXJbTCYUQCZQ",
    authDomain: "gt-project-3.firebaseapp.com",
    databaseURL: "https://gt-project-3.firebaseio.com",
    projectId: "gt-project-3",
    storageBucket: "gt-project-3.appspot.com",
    messagingSenderId: "818147392092",
    appId: "1:818147392092:web:6dee05918921525ce84499",
    measurementId: "G-X3NR20RKK0",
};
const fbApp = firebase.initializeApp(config)

export default fbApp