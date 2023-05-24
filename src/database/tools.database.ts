import {getDatabase, ref, set, push} from "firebase/database";
import {NewTool} from "../context/contenxt.interface";

export async function addTool (newTool: NewTool | {}) {
    const db = getDatabase();
    const toolListRef = ref(db, 'tools');
    const newToolRef = push(toolListRef);
    await set(newToolRef, newTool);
}
