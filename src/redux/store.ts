import { TEditor } from "../types.ts";
import { createStore, Store } from "redux";
import { rootReducer } from "./rootReducer.ts";

export const store: Store<TEditor> = createStore(rootReducer);
