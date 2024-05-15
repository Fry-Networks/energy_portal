import { useState } from "react";
import Modal from "react-modal";
import ShellyInput from "../Inputs/ShellyInput";
import { SubmitShellyKeyButton } from "../SubmitButtons/SubmitShelly";

interface IMessage {
  message: string;
  color: string;
}
interface TapoModalProps {
  isOpen: boolean;
  setOpen: Function;
}

export const ShellyModal: React.FC<TapoModalProps> = ({
  isOpen,
  setOpen,
}) => {
  const [authkey, setAuthKey] = useState<string>("");
  const [serverUrl, setServerUrl] = useState<string>("");
  const [deviceIp, setDeviceIp] = useState<string>("");
  const [message, updateMessage] = useState<IMessage>({
    message: "",
    color: "white",
  });  const [disappear, setDisappear] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpen(false);
    setAuthKey("");
    setServerUrl("");
    setDeviceIp("");
    updateMessage({ message: "", color: "white" });
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className="bg-[#0CA7E5] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-4 w-auto sm:w-[600px] rounded-[10px]"
      overlayClassName="fixed inset-0 bg-black/20"
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
          Please enter Shelly credentials below:
        </h1>
        <ShellyInput
          token={authkey}
          setToken={setAuthKey}
          disappear={disappear}
          inputType="authkey"
          type="authkey"
          placeholder="Enter Auth Key"
        />
        <ShellyInput
          token={deviceIp}
          setToken={setDeviceIp}
          disappear={disappear}
          inputType="id"
          type="id"
          placeholder="Enter Device Id"
        />
        <ShellyInput
          token={serverUrl}
          setToken={setServerUrl}
          disappear={disappear}
          inputType="server"
          type="server"
          placeholder="Enter Server Url"
        />

        <SubmitShellyKeyButton
          // valid={true}
          authKey={authkey}
          serverUrl={serverUrl}
          deviceId={deviceIp}
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
