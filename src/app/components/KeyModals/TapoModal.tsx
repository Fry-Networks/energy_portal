import { useState } from "react";
import Modal from "react-modal";
import TuyaInput from "../Inputs/TapoInput";
import { SubmitTapoButton } from "../SubmitButtons/SubmitTapo";

interface IMessage {
  message: string;
  color: string;
}

interface TapoModalProps {
  isOpen: boolean;
  setOpen: Function;
}

export const TapoModal: React.FC<TapoModalProps> = ({
  isOpen,
  setOpen,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [deviceIp, setDeviceIp] = useState<string>("");
  const [message, updateMessage] = useState<IMessage>({
    message: "",
    color: "white",
  });
  const [disappear, setDisappear] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpen(false);
    setEmail("");
    setPassword("");
    setDeviceIp("");
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
          Please enter TP-Link Tapo credentials below:
        </h1>
        <TuyaInput
          token={email}
          setToken={setEmail}
          inputType="email"
          placeholder="Enter Email"
        />
        <TuyaInput
          token={password}
          setToken={setPassword}
          inputType="password"
          placeholder="Enter Password"
        />
        <TuyaInput
          token={deviceIp}
          setToken={setDeviceIp}
          inputType="text"
          placeholder="Enter Device IP"
        />

        <SubmitTapoButton
          email={email}
          password={password}
          deviceIp={deviceIp}
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
