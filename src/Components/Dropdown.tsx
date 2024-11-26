import React, { useId } from "react";

// Project:     Reactjs Practice
// Module:      View Module
// Component:   Dropdown Component
// Author:      Advyta
// Date:        22 Nov 2024
// Logic:
// This component renders a dropdown lets the user select values. Dropdown should be given a specific
// label, data object and onChange function. User can also disable the component and set certain value

// Usage: This component needs props: Lable of the dropdown as a string
// and dropdown data as an array of objects. onChange function tells the component what to do after the user selects an option
// and disabled and value props are not compulsory

export interface DropdownDataType {
  option: string;
  value: string;
}

interface DropdownProps {
  label: string;
  dropdownData: DropdownDataType[];
  onChangeFc: (value: string) => void;
  disabled?: boolean;
  value?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  dropdownData,
  onChangeFc,
  disabled = false,
  value = "",
}) => {
  const inputGroupSelect01 = useId();

  return (
    <div>
      {/* Dropdown component with label and options */}
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor={inputGroupSelect01}>
            {label}
          </label>
        </div>
        <select
          className="custom-select"
          id={inputGroupSelect01}
          onChange={(e) => onChangeFc && onChangeFc(e.target.value)}
          disabled={disabled}
          value={value}
        >
          <option defaultValue={""}>Choose...</option>
          {dropdownData.map((item, index) => (
            <option key={index} value={item.value}>
              {item.option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
