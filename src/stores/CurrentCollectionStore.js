import { writable } from "svelte/store";

const CurrentCollectionStore = writable({ collectionName: "", words: [] });

export default CurrentCollectionStore;
