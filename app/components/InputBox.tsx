import Input from "./Input";

interface IInputBox {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  inputType?: "text" | "email" | "tel" | "textarea" | "file";
  inputName?: string;
}

function InputBox(props: IInputBox) {
  const { placeholder, onChange, value, inputType, inputName } = props;

  return (
    <>
      <Input
        name={inputName}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default InputBox;
