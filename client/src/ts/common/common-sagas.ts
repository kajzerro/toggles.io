import { effects, delay } from 'redux-saga';
import * as commonActions from './common-actions';

const { all, takeEvery, fork, call, put } = effects;

export interface Dependencies {
  delayDuration: number;
}

export function* addTransientError(deps: Dependencies, { uuid, message }: commonActions.AddTransientError) {
  yield delay(deps.delayDuration);
  yield put(commonActions.removeTransientError({ uuid }));
}

export function* watchAddTransientError(deps: Dependencies) {
  yield takeEvery(commonActions.CommonActionType.ADD_TRANSIENT_ERROR as any, addTransientError, deps);
}

export default function* commonSaga(dependencies: Dependencies) {
  yield all([
    fork(watchAddTransientError, dependencies)
  ]);
}
