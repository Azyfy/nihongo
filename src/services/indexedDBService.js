// const request = window.indexedDB.open("MyTestDatabase", 3);
let db = null;

export function initDB() {
  const request = indexedDB.open("Nihongo");

  request.onerror = (event) => {
    console.error("IDB Error: ", event);
  };

  request.onsuccess = (event) => {
    db = request.result;
    // db.onclose = () => {

    // }
  };

  request.onupgradeneeded = (event) => {
    const db = request.result;

    // Create an objectStore for this database
    createObjectStore("words");
  };
}

function createObjectStore(store) {
  if (!db) return;

  const objectStore = db.createObjectStore(store, { keyPath: "id" });

  objectStore.createIndex("english", "english", { unique: false });
  objectStore.createIndex("romaji", "romaji", { unique: true });
}

function transactionObjectStore(store) {
  if (!db) return;

  const transaction = db.transaction([store], "readwrite");
  const objectStore = transaction.objectStore(store);

  return objectStore;
}

// get

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

// del

export function deleteFromIDB(id, store) {
  if (!db) return;

  const objectStore = transactionObjectStore(store);

  objectStore.delete(id);
}
