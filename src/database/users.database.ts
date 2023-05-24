import {getDatabase, ref, set} from "firebase/database";

export async function initUser (id: number, username: string, name: string) {
    const db = getDatabase();

    await set(ref(db, 'users/' + id), {
        username,
        name
    });
}
