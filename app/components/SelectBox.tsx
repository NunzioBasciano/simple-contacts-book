import React from "react";

interface ISelectBoxProps {
  options: { value: string; label: string }[]; // Lista di opzioni
  value: string; // Valore selezionato
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Funzione di gestione del cambiamento
  id: string; // ID per il `select`
  className?: string; // Classe opzionale per lo stile
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
