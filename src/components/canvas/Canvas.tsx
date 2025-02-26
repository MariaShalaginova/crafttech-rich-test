import { useState } from "react";
import Shape from "../shape/Shape";
import { CanvasProps, ShapeProps, ShapeState } from "../../types/Types";
import { Layer, Stage } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

const Canvas = ({ tool, stageRef }: CanvasProps) => {
  const [figures, setFigures] = useState<ShapeProps[]>([]);

  const handleOnClick = (e: KonvaEventObject<MouseEvent>) => {
    if (tool === "cursor") return;
    const target = e.target;
    const stage = target.getStage();
    if (!stage) return;

    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition();
    if (!point) return;

    const newFigure: ShapeProps = {
      id: Date.now().toString(36),
      width: 100,
      height: 100,
      type: "rect",
      x: point.x - stageOffset.x,
      y: point.y - stageOffset.y,
      html: "",
      text: "",
      // shapeState: {
      shapeType: "rect", // Тип фигуры
      fillColor: "white", // Цвет фона
      strokeColor: "blue", // Цвет контура
      strokeWidth: 2, // Толщина контура
      // },
      // onUpdateShape: function (id: string, updates: Partial<ShapeState>): void {
      //   throw new Error("Function not implemented.");
      // },
    };

    setFigures((prev) => [...prev, newFigure]);
  };

  // Обработчик обновления свойств фигуры
  const handleUpdateShape = (id: string, updates: Partial<ShapeState>) => {
    setFigures((prev) =>
      prev.map((figure) => {
        if (figure.id === id) {
          return {
            ...figure,

            ...updates, // Обновляем только те свойства, которые переданы
          };
        }
        return figure;
      })
    );
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === "cursor"}
      onClick={handleOnClick}
      ref={stageRef}
    >
      <Layer>
        {figures.map((figure) => {
          return (
            <Shape
              key={figure.id}
              {...figure}
              stageRef={stageRef}
              tool={tool}
              onUpdateShape={handleUpdateShape}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
