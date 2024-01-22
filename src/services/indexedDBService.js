import CollectionsStore from "../stores/CollectionsStore";

let db = null;

export function initDB() {
  const request = indexedDB.open("Nihongo");

  request.onerror = (event) => {
    console.error("IDB Error: ", event);
  };

  request.onsuccess = (event) => {
    db = request.result;
  };

  request.onupgradeneeded = (event) => {
    const db = request.result;

    // Create an objectStore for this database
    createObjectStore(db, "words");
    createObjectStore(db, "repeatWords");
    createWordsCollectionsStore(db);
  };
}

function createObjectStore(db, store) {
  const objectStore = db.createObjectStore(store, { keyPath: "id" });

  objectStore.createIndex("english", "english", { unique: false });
  objectStore.createIndex("romaji", "romaji", { unique: true });
}

function createWordsCollectionsStore(db) {
  db.createObjectStore("collections", {
    keyPath: "collectionName",
  });
}

function transactionObjectStore(store) {
  if (!db) return;

  const transaction = db.transaction([store], "readwrite");
  const objectStore = transaction.objectStore(store);

  return objectStore;
}

// get/set

export function setAllFromIDB(store, setFunc) {
  if (!db) return;

  const objectStore = transactionObjectStore(store);

  const request = objectStore.getAll();

  request.onerror = (event) => {
    console.error("IDB getAll error: ", event);
    setFunc([]);
  };

  request.onsuccess = () => {
    setFunc(request.result);
  };
}

export function setIDBWordCollections(setFunc) {
  if (!db) return;

  setAllFromIDB("collections", setFunc);
}

export function getIDBStoreNames() {
  return db ? db.objectStoreNames : [];
}

// add

export function addToIDB(data, store) {
  if (!db) return;

  const objectStore = transactionObjectStore(store);

  objectStore.add(data);
}

export function addCollectionToIDB(data, store) {
  data.forEach((el) => {
    addToIDB(el, store);
  });
}

export function createIDBCollection(collectionName) {
  if (!db) return;

  const objectStore = transactionObjectStore("collections");

  const newCollection = {
    collectionName,
    words: [],
  };

  objectStore.add(newCollection);

  CollectionsStore.update((stores) => {
    return [...stores, newCollection];
  });
}

export function addToCllection() {}

// del

export function deleteFromIDB(id, store) {
  if (!db) return;

  const objectStore = transactionObjectStore(store);

  objectStore.delete(id);
}

export function deleteIDBCollection(collectionName) {
  if (!db) return;

  const objectStore = transactionObjectStore("collections");

  objectStore.delete(collectionName);

  CollectionsStore.update((stores) =>
    stores.filter((el) => el.collectionName !== collectionName)
  );
}
