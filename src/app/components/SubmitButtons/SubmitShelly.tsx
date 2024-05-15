import { submitShellyKey } from "@/app/server/Shelly";
import { useWallet } from "@txnlab/use-wallet";

export function SubmitShellyKeyButton({
  authKey,
  serverUrl,
  deviceId,
  updateMessage,
  disappearInput,
}: {
  valid?: boolean;
  authKey: string;
  serverUrl: string;
  deviceId: string;
  updateMessage: ({
    message,
    color,
  }: {
    message: string;
    color: string;
  }) => void;
  disappearInput: Function;
}) {
  const { activeAddress } = useWallet();

  const isValidAuthKey = /^[a-zA-Z0-9]{92}$/i.test(authKey);
  const isValidServerUrl = /^https:\/\/[a-zA-Z0-9-]+\.shelly\.cloud$/i.test(serverUrl);
  const isValidDeviceId = /^[a-zA-Z0-9]{12}$/i.test(deviceId);
  const isValidKeys =  isValidAuthKey && isValidServerUrl && isValidDeviceId;

  const handleShellyKeySubmit = async (
    updateMessage: Function,
    disappearInput: Function,
    activeAddress: string
  ) => {
    disappearInput(true);
    updateMessage({ message: "Submitting Key...", color: "white" });

    try {
      const response = await submitShellyKey(authKey, serverUrl, deviceId, activeAddress );
      updateMessage(response?.data);
    } catch (error) {
      console.error("Error submitting Shelly key:", error);
      updateMessage({
        message: "Error submitting API key dami.",
        color: "red",
      });
    } finally {
      disappearInput(false);
    }
  };

  return (
    <button
      // onClick={handleShellyKeySubmit}
      onClick={() =>
        handleShellyKeySubmit( updateMessage,disappearInput,activeAddress!)
      }
      className={`py-4 px-6 text-base font-medium rounded-lg focus:outline-none ${
        isValidKeys ? "bg-[#00FFFF] cursor-pointer" : "bg-gray-400 cursor-not-allowed"
      }`}
      disabled={!isValidKeys}
    >
      Submit
    </button>
  );
}
