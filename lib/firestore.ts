import admin from "firebase-admin";
import { KnowledgeResource } from "types";
import { DocumentSnapshot, FirestoreError } from "@firebase/firestore-types";
const testing = require("@firebase/testing");

let firestore: any;

if (process.env.NODE_ENV !== "development") {
  try {
    admin.initializeApp({
      // credential: admin.credential.cert({
      //   projectId: process.env.FIREBASE_PROJECT_ID,
      //   privateKey: process.env.FIREBASE_PRIVATE_KEY,
      //   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // }),
      credential: admin.credential.applicationDefault(),
      databaseURL: "https://noobpedia-3939f.firebaseio.com",
    });
  } catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
      // eslint-disable-next-line no-console
      console.error("Firebase admin initialization error", error.stack);
    }
  }
  firestore = admin.firestore();
} else {
  firestore = testing
    .initializeTestApp({ projectId: "test-project" })
    .firestore();
}

export default firestore;

export async function getOrInitResourceLikes(
  resource: KnowledgeResource
): Promise<number> {
  let likeCount = 0;
  await firestore
    .collection("resources")
    .doc(resource.name)
    .get()
    .then((doc: DocumentSnapshot) => {
      if (doc.exists) {
        likeCount = doc.data().likes;
      } else {
        doc.ref.set({
          name: resource.name,
          likes: 0,
        });
      }
    })
    .catch((error: FirestoreError) => {
      return 0;
    });
  return likeCount;
}
