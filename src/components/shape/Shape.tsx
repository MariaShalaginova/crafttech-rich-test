import html2canvas from "html2canvas";
import Konva from "konva";
import { useRef, useState } from "react";
import { Circle, Group, Rect } from "react-konva";
import { Html } from "react-konva-utils";
// import HtmlText from "../htmlText/HtmlText";
import TextEditor from "../textfield/TextEditField";
import { ShapeProps } from "../../types/Types";
import styles from "./Shape.module.scss";
import {
  getRandomColor,
  getRandomStrokeWidth,
} from "../../utils/getRandomValues";

const Shape = (props: ShapeProps) => {
  const { onUpdateShape, ...rest } = props;
  const [isEditing, setIsEditing] = useState(false);

  const shapeState = {
    ...rest,
  };

  const groupRef = useRef<Konva.Group>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const [text, setText] = useState(rest.text || "");

  const handleClick = () => {
    if (shapeState.tool === "shape") {
      return;
    } else {
      setIsEditing((prev) => !prev);
      if (imageRef.current) {
        if (isEditing) {
          imageRef.current.show();
        } else {
          imageRef.current.hide();
        }
      } else return;
    }
  };

  const renderTextAsImage = async (htmlContent: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.position = "absolute";
    tempDiv.style.top = "-9999px";
    document.body.appendChild(tempDiv);

    const canvas = await html2canvas(tempDiv, {
      backgroundColor: "rgba(0,0,0,0)",
    });
    document.body.removeChild(tempDiv);

    const newImage = new Konva.Image({
      x: 0,
      y: shapeState.height / 2,
      scaleX: 1 / window.devicePixelRatio,
      scaleY: 1 / window.devicePixelRatio,
      image: canvas,
    });

    if (groupRef.current) {
      imageRef.current = newImage;
      groupRef.current.add(newImage);

      groupRef.current?.draw(); // Перерисовываем слой
    }
  };

  const handleSave = (htmlContent: string) => {
    console.log("Сохраненный текст:", htmlContent);
    setText(htmlContent);
    renderTextAsImage(htmlContent);
    setIsEditing(false);
  };

  //закрытие редактора
  const handleCloseEditor = () => {
    setIsEditing(false);
  };

  // Обработчик изменения свойств фигуры
  const handleChangeShapeProperties = () => {
    console.log("Изменение свойств фигуры");
    const currentImage = imageRef.current;

    // Удаляем старую фигуру
    if (groupRef.current) {
      groupRef.current.destroyChildren();
      console.log("удаляю фигуру");
      handleCloseEditor();
    }

    const newShapeProps = {
      ...shapeState,
      shapeType: shapeState.shapeType === "rect" ? "circle" : "rect",
      fillColor: getRandomColor(),
      strokeColor: getRandomColor(),
      strokeWidth: getRandomStrokeWidth(),
    };

    if (groupRef.current) {
      if (currentImage) {
        groupRef.current.add(currentImage);
      }
      groupRef.current.getLayer()?.batchDraw();
    }

    if (onUpdateShape) {
      onUpdateShape(shapeState.id, newShapeProps);
    }
  };

  return (
    <>
      <Group
        x={shapeState.x}
        y={shapeState.y}
        onClick={handleClick}
        ref={groupRef}
        draggable
      >
        {shapeState.shapeType === "rect" ? (
          <Rect
            width={shapeState.width}
            height={shapeState.height}
            fill={shapeState.fillColor}
            stroke={shapeState.strokeColor}
            strokeWidth={shapeState.strokeWidth}
          />
        ) : (
          <Circle
            x={shapeState.width / 2}
            y={shapeState.height / 2}
            radius={Math.min(shapeState.width, shapeState.height) / 2}
            fill={shapeState.fillColor}
            stroke={shapeState.strokeColor}
            strokeWidth={shapeState.strokeWidth}
          />
        )}

        {isEditing && (
          <Html>
            <TextEditor
              initialValue={text}
              onSave={handleSave}
              onClose={handleCloseEditor}
            />
            {/* <textarea value={value} onChange={handleInput} /> */}
            <button
              onClick={handleChangeShapeProperties}
              className={styles.button}
            >
              Изменить свойства фигуры
            </button>
          </Html>
        )}
      </Group>
    </>
  );
};

export default Shape;
