// Import the tools we need from firebase-admin
import { initializeApp, cert } from "firebase-admin/app"; //we use to connect to our firebase project
import { getFirestore } from "firebase-admin/firestore"; // we use to connect to our Firestore

// Import credentials from a secret file
import { credentials } from "./credentials.js";

// Connect to our Firebase project
initializeApp({
  credential: cert(credentials)
});

// Connect to Firestore DB
const db = getFirestore();

// Add a product (new document) to our products collection
const candy2 = {
  name: "Twix",
  unitPrice:2.99,
  size: "12 oz",
  color: "gold",
  inventory: 288,
  productNumber: 2,
}

// How to add a document to Firestore:

// db.collection('products').add(candy2) 
// // Returns a promise, not a document.  A promise is a special kind of object in javaScript that returns "in progress" (by default), "resolved" (ran properly), or "rejected" (error occurred).
// // While we are waiting for the promise...
//   .then((doc) => {
//     console.log("added doc:" + doc.id)
//      // "resolves" = .then, I can be sure inside .then() that the first process was completed successfully
//     })
//     .catch(err => console.log(err)) // "rejected" = .catch

// db.collection('products').doc('Rpl3M7wbAbGIG1b06eDI').delete() to delete a document, not used often.

// How to update a document in Firestore: 
db.collection('products').doc('Rpl3M7wbAbGIG1b06eDI').update({
  inventory: 555,
  customerFavorite: true
})

//How to read a document from Firestore:

db.collection('products').doc('Rpl3M7wbAbGIG1b06eDI').get()
.then(doc => {
  console.log(doc.data());

})
.catch(err => console.log(err)) // .catch(console.log) does the same thing


// How to get a whole collection:

db.collection('products').get()
  .then(collection => {
    const productList = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    console.table(productList);
  })
  .catch(console.log);

  // db.collection('products').get()
  // .then(collection => {
  //   const productList = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  //   console.table(productList);
  // })
  // .catch(console.log);