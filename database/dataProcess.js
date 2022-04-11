import { Asset } from "expo-asset"
import * as FileSystem from "expo-file-system"
import * as SQLite from "expo-sqlite"

export default async function openDatabase() {
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