import { useEffect, useState } from "react";
import Modal from "react-modal";
import EcowittInput from "../Inputs/EcowittInput";
import { SubmitEcowittButton } from "../SubmitButtons/SubmitEcowitt";

interface IMessage {
  message: string;
  color: string;
}

interface IEcowittModalProps {
  isOpen: boolean;
  setOpen: Function;
}

export const EcowittModal: React.FC<IEcowittModalProps> = ({
  isOpen,
  setOpen,
}) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [appKey, setAppKey] = useState<string>("");
  const [message, updateMessage] = useState<IMessage>({
    message: "",
    color: "white",
  });
  const [disappear, setDisappear] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleCloseModal = () => {
    setOpen(false);
    setApiKey("");
    setAppKey("");
    updateMessage({ message: "", color: "white" });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className="bg-[#0CA7E5] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-4 w-auto sm:w-[600px] rounded-[10px]"
      overlayClassName="fixed inset-0 bg-black/60"
    >
      <div className="flex justify-end">
        <button
          className="text-[20px] rounded-[50%] border-white"
          onClick={handleCloseModal}
        >
          X
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[25px] mb-4">
          Please enter your Ecowitt Credentails below:
        </h1>
        <EcowittInput
          token={apiKey}
          setToken={setApiKey}
          disappear={disappear}
          inputType="text"
          placeholder="Enter API Key"
          type="api"
        />
        <EcowittInput
          token={appKey}
          setToken={setAppKey}
          disappear={disappear}
          inputType="text"
          placeholder="Enter App Key"
          type="app"
        />

        <SubmitEcowittButton
          appKey={appKey}
          // valid={validApiKey}
          apiKey={apiKey}
          updateMessage={updateMessage}
          disappearInput={setDisappear}
        />

        <p className={`text-${message.color} text-center text-[17px] mt-10 font-bold`}>
          {message.message}
        </p>
      </div>
    </Modal>
  );
}