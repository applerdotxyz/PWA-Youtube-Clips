import * as firebase from 'firebase/firebase-browser';
import { firebaseConfig } from '../../config';
const NO_APPS_SIZE = 0;
/* eslint-disable */
let userX;
/* eslint-enable */

class FirebaseApi {

  static initAuth() {
    if (firebase.apps.length > NO_APPS_SIZE) {
      return new Promise((resolve) => {
        resolve(userX);
      });
    }

    return new Promise((resolve, reject) => {
      firebase.initializeApp(firebaseConfig);
      const unsub = firebase.auth().onAuthStateChanged(
          (user) => {
            unsub();
            userX = user;
            resolve(user);
          },
          (error) => reject(error)
        );
    });
  }

  static init() {
    if (firebase.apps.length === NO_APPS_SIZE) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  static createUserWithEmailAndPassword(user) {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  }

  static signInWithEmailAndPassword(user) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  }

  static authSignOut() {
    return firebase.auth().signOut();
  }

  static push(path, value) {
    return new Promise((resolve, reject) => {
      firebase.
        database().
        ref(path).
        push(value, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
    });
  }

  static getValue(path) {
    return firebase.
      database().
      ref(`${path}`).
      once('value');
  }

  static getChild(path) {
    return firebase.
      database().
      ref(`${path}`).
      once('child_added');
  }

  static getDb(path) {
    if (firebase.apps.length === NO_APPS_SIZE) {
      // console.log('initialized');
      firebase.initializeApp(firebaseConfig);
    }

    return firebase.
      database().
      ref(`${path}`);
  }

  static databaseSet(path, value) {
    return firebase.
      database().
      ref(path).
      set(value);
  }
}

export default FirebaseApi;
