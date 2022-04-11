import { Asset } from "expo-asset"
import * as FileSystem from "expo-file-system"
import * as SQLite from "expo-sqlite"

export async function openDatabase() {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/wejmiDatabase.db')).exists) {
        await FileSystem.downloadAsync(
            Asset.fromModule(require('../assets/wejmiDatabase.db')).uri,
            FileSystem.documentDirectory + 'SQLite/wejmiDatabase.db'
        );
    }
    return SQLite.openDatabase('wejmiDatabase.db');
}

// -------------- Objects --------------

export async function GetAllObject() {
    const db = await openDatabase();
    db.transaction((tx) => {
        tx.executeSql("SELECT * FROM object",[], (_, {insertID, rows}) => {
            console.log(rows);
            return rows
        });
    })

}

export async function AddObject(name, id_room, id_category, id_furniture, photo_uri) {
    const db = await openDatabase();
    db.transaction((tx) => {
        tx.executeSql("INSERT INTO object (name, id_room, id_category, id_furniture, id_state, photo_uri) VALUES (?, ?, ?, ?, 1, ?)", [name, id_room, id_category, id_furniture, photo_uri] );
    })

}

export async function ModifyObject(id, name, id_room, id_category, id_furniture, state, photo_uri) {
    const db = await openDatabase();
    db.transaction((tx) => {
        tx.executeSql("UPDATE object SET name = ?, id_room = ?, id_category = ?, id_furniture = ?, id_state = ?, photo_uri = ? WHERE id = ?", [name, id_room, id_category, id_furniture, state, photo_uri, id] );
    })

}

export async function DeleteObject(id) {
    const db = await openDatabase();
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM object WHERE id = ?;", [id] );
    })

}

// -------------- Categories --------------

export async function GetAllCategory (name) {
    const db = await openDatabase();
    db.transaction((tx) => {
        tx.executeSql("SELECT * FROM category",[], (_, {insertID, rows}) => {
            console.log(rows);
            return rows
        });
    })

}

export async function AddCategory(name) {
    const db = await openDatabase();
    db.transaction((tx) => {
        tx.executeSql("INSERT INTO category (name) VALUES (?)", [name] );
    })

}

export async function DeleteCategory(id) {
    const db = await openDatabase();
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM category WHERE id = ?;", [id] );
    })

}

// -------------- Rooms --------------

export async function GetAllRoom (name) {
    const db = await openDatabase();
    db.transaction((tx) => {
        tx.executeSql("SELECT * FROM room",[], (_, {insertID, rows}) => {
            console.log(rows);
            return rows
        });
    })

}

export async function AddRoom(name) {
    const db = await openDatabase();
    db.transaction((tx) => {
        tx.executeSql("INSERT INTO room (name) VALUES (?)", [name] );
    })

}

export async function DeleteRoom(id) {
    const db = await openDatabase();
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM room WHERE id = ?;", [id] );
    })

}

// -------------- Furniture --------------

export async function GetAllFurniture (name) {
    const db = await openDatabase();
    db.transaction((tx) => {
        tx.executeSql("SELECT * FROM furniture",[], (_, {insertID, rows}) => {
            console.log(rows);
            return rows
        });
    })

}

export async function AddFurniture(name) {
    const db = await openDatabase();
    db.transaction((tx) => {
        tx.executeSql("INSERT INTO furniture (name) VALUES (?)", [name] );
    })

}

export async function DeleteFurniture(id) {
    const db = await openDatabase();
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM furniture WHERE id = ?;", [id] );
    })

}