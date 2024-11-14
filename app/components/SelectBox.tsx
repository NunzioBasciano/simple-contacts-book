import React from "react";

interface ISelectBoxProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string;
  className?: string;
}

function SelectBox(props: ISelectBoxProps) {
  const { options, value, onChange, id, className } = props;
  return (
    <select value={value} onChange={onChange} id={id} className={className}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
