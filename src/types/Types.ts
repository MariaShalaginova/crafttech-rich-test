// import { Stage } from "react-konva";
import { RefObject } from "react";
import Konva from "konva";

export type Tool = string;
export interface ShapeProps {
  shapeType: string;
  x: number;
  y: number;
  type: string;
  width: number;
  height: number;
  tool?: string;
  html: string;
  id: string;
  text: string;
  fillColor: string; // Цвет фона
  strokeColor: string; // Цвет контура
  strokeWidth: number; // Толщина контура
  onUpdateShape?: (id: string, updates: Partial<ShapeState>) => void;
  shapeState?: ShapeState; // Состояние фигуры
  stageRef?: RefObject<Konva.Stage>;
}

export interface ShapeState {
  shapeType: string;
  fillColor?: string; // Цвет фона
  strokeColor?: string; // Цвет контура
  strokeWidth?: number; // Толщина контура
  x?: number;
  y?: number;
  width?: number; // Ширина фигуры
  height?: number; // Высота фигуры
  newShapeProps?: ShapeProps;
  // stageRef: RefObject<Konva.Stage>;
}

export interface CanvasProps {
  tool: Tool; // Текущий выбранный инструмент
  //   stageRef: React.RefObject<StageProps>;
  //   stageRef: Konva.Stage; // Ссылка на Stage (из react-konva)
  stageRef: RefObject<Konva.Stage>;
}

export interface ControlProps {
  tool: Tool; // Текущий выбранный инструмент
  setTool: (value: Tool) => void;
}

export interface HtmlTextProps {
  html: string;
  id: string;
}

export interface QuillEditorProps {
  initialValue?: string; // Начальное значение текста
  onSave: (htmlContent: string) => void; // Обработчик сохранения текста
}
