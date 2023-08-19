// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDT8b8uawKPEoWy77BFStmlFVI1aMrRPsc",
	authDomain: "awesomeprojectserhiipopov.firebaseapp.com",
	databaseURL: "https://awesomeprojectserhiipopov.firebaseio.com",
	projectId: "awesomeprojectserhiipopov",
	storageBucket: "awesomeprojectserhiipopov.appspot.com",
	messagingSenderId: "sender-id",
	appId: "app-id",
	measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
