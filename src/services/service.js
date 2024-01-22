import CollectionsStore from "../stores/CollectionsStore";
import RepeatWordsStore from "../stores/RepeatWordsStore";
import WordsStore from "../stores/WordsStore";
import {
  addCollectionToIDB,
  setAllFromIDB,
  initDB,
  setIDBWordCollections,
} from "./indexedDBService";
import { getAllWords } from "./supabaseService";

export async function initData() {
  initDB();
  const data = await getAllWords();

  if (data) {
    WordsStore.set(data);
    addCollectionToIDB(data, "words");
  } else {
    setAllFromIDB("words", WordsStore.set);
  }

  setAllFromIDB("repeatWords", RepeatWordsStore.set);
  setIDBWordCollections(CollectionsStore.set);
}
