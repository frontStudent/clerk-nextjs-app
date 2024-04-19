import DragBox from "./DragBox";
import { DragItem } from "../types";

const boxes = [
  { id: "1", content: "Rich Text", type: "editor" },
  { id: "2", content: "Not determined yet", type: "unknown" },
];

const DragArea = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {boxes.map(({ id, content, type }: DragItem) => {
        return <DragBox key={id} id={id} content={content} type={type}></DragBox>;
      })}
    </div>
  );
};

export default DragArea;
