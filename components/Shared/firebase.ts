import * as firebase from "firebase/app";
import * as firebaseAnalytics from "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

// initialize firebase app
const firebaseConfig = {
  apiKey: process.env.DEVELOPMENT_ENV_FIREBASE_API_KEY,
  authDomain: process.env.DEVELOPMENT_ENV_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.DEVELOPMENT_ENV_FIREBASE_PROJECT_ID,
  storageBucket: process.env.DEVELOPMENT_ENV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.DEVELOPMENT_ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.DEVELOPMENT_ENV_FIREBASE_APP_ID,
  measurementId: process.env.DEVELOPMENT_ENV_FIREBASE_MEASUREMENT_ID,
};

export default function initFirebase() {
  console.log("--- Firebase init ---");
  if (!firebase?.getApps().length) {
    const app = firebase.initializeApp(firebaseConfig);

    if (typeof window !== "undefined" && "measurementId" in firebaseConfig) {
      firebaseAnalytics.getAnalytics(app);
    }
    console.log("--- Firebase was successfully init ---");
  }
}

export { firebase };
