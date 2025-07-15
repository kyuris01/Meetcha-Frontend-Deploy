import React, { useState } from "react";
import Picker from "react-mobile-picker";
import styles from "./TimeInputComponent.module.scss";

const selections = {
  meridiem: ["오전", "오후"],
  hour: new Array(12).fill(0).map((_, i) => i + 1),
  minute: new Array(60).fill(0).map((_, i) => String(i).padStart(2, "0")),
};

const TimeInputComponent = () => {
  const [pickerValue, setPickerValue] = useState({
    meridiem: "오전",
    hour: "12",
    minute: "00",
  });
  return (
    <div>
      <Picker value={pickerValue} onChange={setPickerValue} wheelMode="natural">
        {Object.keys(selections).map((name) => (
          <Picker.Column key={name} name={name}>
            {selections[name].map((option) => (
              <Picker.Item key={option} value={option}>
                {option}
              </Picker.Item>
            ))}
          </Picker.Column>
        ))}
      </Picker>
    </div>
  );
};

export default TimeInputComponent;
