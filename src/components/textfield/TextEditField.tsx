import Quill, { QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import { QuillEditorProps } from "../../types/Types";
import styles from "./TextEditField.module.scss";

const TextEditor = ({
  initialValue,
  onSave,
  onClose,
}: QuillEditorProps & { onClose: () => void }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  const options: QuillOptions = {
    debug: "info",
    modules: {
      //   toolbar: true,
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ font: [] }],
        [{ color: [] }, { background: [] }],
        // [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        // ["link", "image", "video"],
        ["clean"],
      ],
    },
    placeholder: "Введите что-нибудь",
    theme: "snow",
  };

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        modules: options.modules,
        placeholder: options.placeholder,
        theme: options.theme,
      });
    }

    if (initialValue !== undefined && quillRef.current) {
      quillRef.current.root.innerHTML = initialValue;
    }

    // Очистка при размонтировании
    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  //закрытие редактора на ескейп без сохранения текта
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Обработчик сохранения текста
  const handleSave = () => {
    if (quillRef.current) {
      const htmlContent = quillRef.current.root.innerHTML;
      onSave(htmlContent);
    }
  };

  return (
    <div className={styles.textEditor}>
      <div ref={editorRef} className={styles.textEditor__area}></div>

      <button onClick={handleSave} className={styles.textEditor__button}>
        Сохранить
      </button>
      <button onClick={onClose} className={styles.textEditor__button}>
        Закрыть
      </button>
    </div>
  );
};

export default TextEditor;
