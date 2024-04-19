"use client";
import { createContext, useState } from "react";

import SortArea from "./SortArea";
import DragArea from "./Source/DragArea";
import Setting from './Setting/main'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { SelectedField } from "./types";
import { StoreCtx } from "./context";

const Workspace = () => {
  const [state, setState] = useState({
    selectField: {},
    selectType: 'resume'
  });

  const store = {
    state,
    onChangeState: (selectField: SelectedField) => {
      console.log("selectField", selectField);
      setState((preState) => ({
        ...preState,
        ...selectField,
      }));
    },
  };

  return (
    <div className="flex w-full h-[800px]">
      <StoreCtx.Provider value={store}>
        <DndProvider backend={HTML5Backend}>
          <div className="w-1/6 h-full">
            <DragArea />
          </div>
          <div className="flex-1 h-full bg-slate-100 min-w-[700px]">
            <div className="bg-white mx-auto p-8 h-full min-w-2xl max-w-2xl">
              <SortArea />
            </div>
          </div>
        </DndProvider>
        <div className="w-1/4 h-full">
          <Setting />
        </div>
      </StoreCtx.Provider>
    </div>
  );
};

export default Workspace;
