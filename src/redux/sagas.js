import { takeEvery, put, call } from 'redux-saga/effects'
import { REQUEST_POSTS, FETCH_POST } from './types';
import { showLoader, hideLoader, showAlert } from './actions';

export function* sagaWatcher() { // generator func
    yield takeEvery(REQUEST_POSTS, sagaWorker);
}

function* sagaWorker() {
    try {
        yield put(showLoader());
        const payload = yield call(fetchPosts);
        yield put({ type: FETCH_POST, payload })
        yield put(hideLoader());
    } catch (err) {
        yield put(showAlert(`Something went wrong...`));
        yield put(hideLoader());
    }

}

async function fetchPosts() {
    const url = 'https://jsonplaceholder.typicode.com/posts?_limit=5';
    const response = await fetch(url);
    return await response.json();
}