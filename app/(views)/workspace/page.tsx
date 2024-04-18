'use client'
import SortArea from "./SortArea";
import DragArea from './Dnd/DragArea'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const Workspace = () => {
  return (
    <div className="flex w-full h-[800px]">
      <DndProvider backend={HTML5Backend}>
        <div className="w-1/5 h-full">
          <DragArea />
        </div>
        <div className="flex-1 h-full bg-slate-100 min-w-[700px]">
          <div className="bg-white mx-auto p-8 h-full min-w-2xl max-w-2xl">
            <SortArea />
          </div>
        </div>
      </DndProvider>

      <div className="w-1/5 h-full">11</div>
    </div>
  );
};

export default Workspace;
