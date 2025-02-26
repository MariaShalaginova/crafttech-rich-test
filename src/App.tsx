import { useRef, useState } from "react";
import "./App.css";
import Canvas from "./components/canvas/Canvas";
import Control from "./components/control/Control";
import { Tool } from "./types/Types";

import Konva from "konva";
function App() {
  const [tool, setTool] = useState<Tool>("cursor");
  const stageRef = useRef<Konva.Stage | null>(null);

  //функция очистки канвы
  const handleClearCanvas = () => {
    if (stageRef.current) {
      const stage = stageRef.current;
      if (stage) {
        // Очищаем все слои внутри Stage
        stage
          .getChildren()
          .forEach((layer: Konva.Layer) => layer.destroyChildren());
        setTool("cursor");
      }
    }
  };

  const handleToolChange = (newTool: Tool) => {
    if (newTool === "clear") {
      handleClearCanvas(); // Вызываем функцию очистки
    } else {
      setTool(newTool);
    }
  };

  return (
    <>
      <Canvas tool={tool} stageRef={stageRef} />
      <Control tool={tool} setTool={handleToolChange} />
    </>
  );
}

export default App;
