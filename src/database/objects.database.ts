import {getDatabase, ref, set, push, get, child} from "firebase/database";
import {NewObject} from "../context/contenxt.interface";

export async function addObject (newObject: NewObject | {}) {
    const db = getDatabase();
    const objectListRef = ref(db, 'objects');
    const newObjectRef = push(objectListRef);
    await set(newObjectRef, newObject);
}

export async function getObjects () {
    const dbRef = ref(getDatabase());

    return get(child(dbRef, `objects`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}
