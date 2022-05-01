import React from "react";
import Memo from "./Memo";
import { observer } from "mobx-react";
import { useStickyMemo } from "../store/memo";

const MemoContainer = () => {
  const { memo } = useStickyMemo();
  return memo.map((v) => <Memo key={v} id={v} />);
};

export default observer(MemoContainer);
