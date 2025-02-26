import { forwardRef } from "react";
import { HtmlTextProps } from "../../types/Types";
import styles from "./HtmlText.module.scss";

const HtmlText = forwardRef<HTMLDivElement, HtmlTextProps>(
  ({ html, id }, ref) => {
    return (
      <div
        id={`htmltext_${id}`}
        dangerouslySetInnerHTML={{ __html: html }}
        className={styles.text}
        ref={ref}
      ></div>
    );
  }
);

export default HtmlText;
