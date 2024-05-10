import { useState } from "react";
import Modal from "react-modal";
import ShellyInput from "../Inputs/ShellyInput";
import { SubmitSwitchKeyButton } from "../SubmitButtons/SubmitSwitchbot";

interface TapoModalProps {
  isOpen: boolean;
  setOpen: Function;
}

export const SwitchbotModal: React.FC<TapoModalProps> = ({
  isOpen,
  setOpen,
}) => {
  const [token, setToken] = useState<string>("");
  const [command, setCommand] = useState<string>("");
  const [deviceIp, setDeviceIp] = useState<string>("");
  const [message, updateMessage] = useState<string>("");
  const [disappear, setDisappear] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpen(false);
    setToken("");
    setDeviceIp("");
    setCommand("");
    updateMessage("");
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
          Please enter SwitchBot credentials below:
        </h1>
        <ShellyInput
          token={deviceIp}
          setToken={setDeviceIp}
          inputType="id"
          placeholder="Enter Device Id"
        />
        <ShellyInput
          token={token}
          setToken={setToken}
          inputType="server"
          placeholder="Enter Token"
        />
        <ShellyInput
          token={command}
          setToken={setCommand}
          inputType="server"
          placeholder="Enter Command"
        />

        <SubmitSwitchKeyButton
          // valid={true}
          updateMessage={updateMessage}
          token={token}
          deviceId={deviceIp}
          command={command}
          // updateMessage={updateMessage}
          disappearInput={setDisappear}
        />

        <p className={'text-white text-center text-[17px] mt-10 font-bold'}>
          {message}
        </p>
      </div>
    </Modal>
  );
}
