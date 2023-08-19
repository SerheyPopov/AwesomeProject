import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
	signOut,
} from "firebase/auth";

import { auth } from "../Firebase/config";
import { authSlice } from "./authReduser";

const { updateUserProfile, authStateChange, authSingOut, setSelectedAvatar } = authSlice.actions;

export const registerDB =
	({ email, password, login, userFoto }) =>
	async (dispatch, getState) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			await updateProfile(user, { displayName: login, photoURL: userFoto });
			const { displayName, uid } = user;
			const userUpdateProfile = {
				login: displayName,
				userId: uid,
				email,
			};
			if (userFoto) {
				dispatch(setSelectedAvatar(userFoto));
			}
			dispatch(updateUserProfile(userUpdateProfile));
		} catch (error) {
			throw error;
		}
	};

export const loginDB =
	({ email, password }) =>
	async (dispatch, getState) => {
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			throw error;
		}
	};

export const authStateChangeUser = () => async (dispatch, getState) => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			const userUpdateProfile = {
				login: user.displayName,
				userId: user.uid,
				email: user.email,
			};
			dispatch(authStateChange({ stateChange: true }));
			dispatch(updateUserProfile(userUpdateProfile));
			dispatch(setSelectedAvatar(user.photoURL));
		}
	});
};

export const authSingOutUser = () => async (dispatch, getState) => {
	await signOut(auth);
	dispatch(authSingOut());
};

export const setSelectedAvatarUser = (selectedAvatar) => async (dispatch, getState) => {
	try {
		dispatch(setSelectedAvatar(selectedAvatar));
		const user = auth.currentUser;
		await updateProfile(user, { photoURL: selectedAvatar });
	} catch (error) {
		throw error;
	}
};
