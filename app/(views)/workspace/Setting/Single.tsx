import React, { useContext } from "react";
import { StoreCtx } from "../context";
const Single = () => {
    const { state, onChangeState } = useContext(StoreCtx);
    return <div>{JSON.stringify(state.selectField)}</div>;
}

export default Single;