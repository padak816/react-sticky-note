import React, { createContext, useContext } from "react";
import { makeAutoObservable } from "mobx";

class Memo {
  memo = [1];
  nextId = 2;
  constructor() {
    makeAutoObservable(this);
  }

  createMemo = () => {
    this.memo = this.memo.concat(this.nextId);
    ++this.nextId;
  };

  deleteMemo = (key) => {
    this.memo = this.memo.filter((v) => v !== key);
  };
}

const MemoContext = createContext();

export const MemoProvider = (props) => {
  const store = new Memo();
  return <MemoContext.Provider value={store} {...props} />;
};

/** @returns {Memo} */
export function useStickyMemo() {
  return useContext(MemoContext);
}
