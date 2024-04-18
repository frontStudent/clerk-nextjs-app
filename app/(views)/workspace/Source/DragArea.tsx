import DragBox from "./DragBox";
import { DragItem } from "../types";

const boxes = [
  { id: "1", content: "Rich Text" },
  { id: "2", content: "Not determined yet" },
];

const DragArea = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {boxes.map(({ id, content }: DragItem) => {
        return <DragBox key={id} id={id} content={content}></DragBox>;
      })}
    </div>
  );
};

export default DragArea;