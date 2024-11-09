import { Dispatch, SetStateAction } from "react";
import Label from "./Label";
import Image from "next/image";
import Input from "./Input";

interface IInputBox {
  label: string;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  inputType?: "text" | "email" | "tel" | "textarea" | "file";
  inputName?: string;
}

function InputBox(props: IInputBox) {
  const { label, placeholder, setValue, value, inputType, inputName } = props;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValue(file ? file.name : ""); // Imposta il nome del file selezionato
  };

  return (
    <>
      {inputType === "file" ? (
        <div className="flex flex-col justify-center items-center gap-3 my-6">
          <div className="flex flex-col items-center gap-2">
            {/* Input file nascosto */}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
            {/* Pulsante stilizzato per scegliere file */}
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
            <Label label={label} />
            {/* Mostra il nome del file selezionato */}
            {value && <span className="text-gray-700">{value}</span>}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center my-3">
          <Input
            name={inputName}
            type={inputType}
            placeholder={placeholder}
            value={value}
            setValue={setValue}
          />
        </div>
      )}
    </>
  );
}

export default InputBox;
