import DragBox from "./DragBox.js";
const boxes = [
  { id: "1", title: "Rich Text" },
  { id: "2", title: "Not determined yet" },
];

const DragArea = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {boxes.map(({ id, title }) => {
        return <DragBox key={id} id={id} title={title}></DragBox>;
      })}
    </div>
  );
};

export default DragArea;
