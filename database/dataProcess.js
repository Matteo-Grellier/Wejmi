import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

export async function openDatabase() {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
  }
  if (
    !(
      await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + "SQLite/wejmiDatabase.db"
      )
    ).exists
  ) {
    await FileSystem.downloadAsync(
      Asset.fromModule(require("../assets/wejmiDatabase.db")).uri,
      FileSystem.documentDirectory + "SQLite/wejmiDatabase.db"
    );
  }
  return SQLite.openDatabase("wejmiDatabase.db");
}

// -------------- Objects --------------

export async function GetAllObject(setData) {
  const db = await openDatabase();
  const selectRequest =
    "SELECT object.*, furniture.name as furniture_name, room.name as room_name, state.name as state_name, category.name as category_name FROM object JOIN furniture ON object.id_furniture = furniture.id JOIN room ON object.id_room = room.id JOIN state ON object.id_state = state.id JOIN category ON object.id_category = category.id ORDER BY object.name";
  db.transaction((tx) => {
    tx.executeSql(selectRequest, [], (_, { insertID, rows }) => {
      setData(rows._array);
    });
  });
}

export async function GetObject(id, setData) {
  const db = await openDatabase();
  const selectRequestWithID =
    "SELECT object.*, furniture.name as furniture_name, room.name as room_name, state.name as state_name, category.name as category_name FROM object JOIN furniture ON object.id_furniture = furniture.id JOIN room ON object.id_room = room.id JOIN state ON object.id_state = state.id JOIN category ON object.id_category = category.id WHERE object.id = ?";
  db.transaction((tx) => {
    tx.executeSql(selectRequestWithID, [id], (_, { insertID, rows }) => {
      setData(rows._array);
    });
  });
}

export async function AddObject(
  name,
  id_room,
  id_category,
  id_furniture,
  photo_uri
) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO object (name, id_room, id_category, id_furniture, id_state, photo_uri) VALUES (?, ?, ?, ?, 1, ?)",
      [name, id_room, id_category, id_furniture, photo_uri]
    );
  });
}

export async function ModifyObject(
  id,
  name,
  id_room,
  id_category,
  id_furniture,
  state,
  photo_uri
) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE object SET name = ?, id_room = ?, id_category = ?, id_furniture = ?, id_state = ?, photo_uri = ? WHERE id = ?",
      [name, id_room, id_category, id_furniture, state, photo_uri, id]
    );
  });
}

export async function DeleteObject(id) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM object WHERE id = ?;", [id]);
  });
}

// -------------- Categories --------------

export async function GetAllCategory(setData) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM category", [], (_, { insertID, rows }) => {
      setData(rows._array);
    });
  });
}

export async function GetCategory(id, setData) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM category WHERE id = ?",
      [id],
      (_, { insertID, rows }) => {
        setData(rows._array);
      }
    );
  });
}

export async function AddCategory(name) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql("INSERT INTO category (name) VALUES (?)", [name]);
  });
}

export async function DeleteCategory(id) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM category WHERE id = ?;", [id]);
  });
}

// -------------- Rooms --------------

export async function GetAllRoom(setData) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM room", [], (_, { insertID, rows }) => {
      setData(rows._array);
    });
  });
}

export async function GetRoom(id, setData) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM room WHERE id = ?",
      [id],
      (_, { insertID, rows }) => {
        setData(rows._array);
      }
    );
  });
}

export async function AddRoom(name) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql("INSERT INTO room (name) VALUES (?)", [name]);
  });
}

export async function DeleteRoom(id) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM room WHERE id = ?;", [id]);
  });
}

// -------------- Furniture --------------

export async function GetAllFurniture(setData) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM furniture", [], (_, { insertID, rows }) => {
      setData(rows._array);
    });
  });
}

export async function GetFurniture(id, setData) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM furniture WHERE id = ?",
      [id],
      (_, { insertID, rows }) => {
        setData(rows._array);
      }
    );
  });
}

export async function AddFurniture(name) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql("INSERT INTO furniture (name) VALUES (?)", [name]);
  });
}

export async function DeleteFurniture(id) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM furniture WHERE id = ?;", [id]);
  });
}

// -------------- State --------------

export async function GetAllState(setData) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM state", [], (_, { insertID, rows }) => {
      setData(rows._array);
    });
  });
}

export async function GetState(id, setData) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM state WHERE id = ?",
      [id],
      (_, { insertID, rows }) => {
        setData(rows._array);
      }
    );
  });
}

export async function AddState(name) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql("INSERT INTO state (name) VALUES (?)", [name]);
  });
}

export async function DeleteState(id) {
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM state WHERE id = ?;", [id]);
  });
}
