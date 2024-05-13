import { submitShellyKey } from "@/app/server/Shelly";
import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";

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
  updateMessage: (message: string) => void;
  disappearInput: (flag: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { activeAddress } = useWallet();

  const isValidAuthKey = /^[a-zA-Z0-9]{92}$/i.test(authKey);
  const isValidServerUrl = /^https:\/\/[a-zA-Z0-9-]+\.shelly\.cloud$/i.test(serverUrl);
  const isValidDeviceId = /^[0-9a-f]{12}$/i.test(deviceId);
  const isValidKeys =  isValidAuthKey && isValidServerUrl && isValidDeviceId;

  const handleShellyKeySubmit = async () => {
    setIsLoading(true);
    disappearInput(true);
    updateMessage("Submitting Key...");

    try {
      const response = await submitShellyKey(authKey, serverUrl, deviceId, activeAddress! );
        

      updateMessage(response.data.message);
    } catch (error) {
      console.error("Error submitting Shelly key:", error);
       

      updateMessage("Error submitting Shelly key.");
    } finally {
      setIsLoading(false);
      disappearInput(false);
    }
  };

  return (
    <button
      onClick={handleShellyKeySubmit}
      className={`py-4 px-6 text-base font-medium rounded-lg focus:outline-none ${
        isValidKeys ? "bg-[#00FFFF] cursor-pointer" : "bg-gray-400 cursor-not-allowed"
      }`}
      disabled={!isValidKeys}
    >
      {isLoading ? "Submitting..." : "Submit Shelly Key"}
    </button>
  );
}
