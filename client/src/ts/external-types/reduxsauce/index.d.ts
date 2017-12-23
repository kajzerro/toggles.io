declare module 'reduxsauce' {
  import { Reducer, ReducersMapObject } from 'redux';

  export function createReducer<S>(initialState: S, handlers: ReducersMapObject): Reducer<S>;
}
