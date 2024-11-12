import { Dispatch, SetStateAction } from "react";
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

  /*   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValue(file ? file.name : ""); // Imposta il nome del file selezionato
  }; */

  return (
    <>
      {/* {inputType === "file" ? (
        <div className="flex flex-col justify-center items-center gap-3 my-6">
          <div className="flex flex-col items-center gap-2">
           
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />

            <button
              type="button"
              className="bg-[var(--blue)] text-white p-12 rounded-full"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <Image
                src={"/add-profile-image.png"}
                width={30}
                height={30}
                alt="Add profile image"
              />
            </button>
            {label && <Label label={label} />}

            {value && <span className="text-gray-700">{value}</span>}
          </div>
        </div>
      ) : ( */}
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
