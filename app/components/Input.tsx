interface IInputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

function Input(props: IInputProps) {
  const { type = "text", placeholder, value, onChange, name } = props;

  return (
    <input
      onChange={onChange}
      value={value}
      className="bg-[var(--darkBlue)] py-1 px-3 w-full border border-1 rounded-md text-white"
      type={type}
      placeholder={placeholder}
      name={name}
    />
  );
}

export default Input;
