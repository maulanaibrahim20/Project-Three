import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/app-check';

const firebaseConfig = {
  apiKey: 'AIzaSyBMeUUYPwXrHt3L9OX2H5D1nhkrJDNjd1M',
  authDomain: 'project-3-f59ac.firebaseapp.com',
  projectId: 'project-3-f59ac',
  storageBucket: 'project-3-f59ac.appspot.com',
  messagingSenderId: '832763385140',
  appId: '1:832763385140:web:db5b90f597f372002ec161',
  databaseURL:
    'https://project-3-f59ac-default-rtdb.asia-southeast1.firebasedatabase.app',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
