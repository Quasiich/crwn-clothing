import { takeLatest, put, all, call } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";
import { signInSuccess, SignInFailed, registerSuccess, registerFailed, signOutSuccess, signOutFailed} from "./user.action";
import { 
    getCurrentUser, 
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    loginAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        console.log(userSnapshot);
        console.log(userSnapshot.data());
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch(error){
        yield put(SignInFailed(error))
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch(error) {
        yield put(SignInFailed(error))
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield call(loginAuthUserWithEmailAndPassword, email, password)
        yield call(getSnapshotFromUserAuth, user);
    } catch(error) {
        yield put(SignInFailed(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser)
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield put(SignInFailed(error))
    }
}

export function* register({payload: {email, password, displayName}}) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password)
        yield put(registerSuccess(user, { displayName }))
    } catch (error) {
        yield put(registerFailed(error))
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch(error) {
        yield put(signOutFailed(error))
    }
}   

export function* signInAfterRegister({payload: {user, additionalDetails}}) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails)
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onRegisterStart() {
    yield takeLatest(USER_ACTION_TYPES.REGISTER_START, register)
}

export function* onRegisterSuccess() {
    yield takeLatest(USER_ACTION_TYPES.REGISTER_SUCCESS, signInAfterRegister)
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession),   
        call(onGoogleSignInStart), 
        call(onEmailSignInStart),
        call(onRegisterStart),
        call(onRegisterSuccess),
        call(onSignOutStart),
    ]);
}