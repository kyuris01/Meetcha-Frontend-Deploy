import React, { useRef } from "react";
import styles from "./TextInputComponent.module.scss";

interface Props {
  dataSetter:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<string[]>>;
}

const TextInputComponent = ({ dataSetter }: Props) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className={styles.inputComponent}>
      <textarea
        ref={textRef}
        onBlur={() => {
          (dataSetter as React.Dispatch<React.SetStateAction<string>>)(textRef.current.value);
        }}
        className={styles.inputComponent__inputArea}
      />
    </div>
  );
};

export default TextInputComponent;
