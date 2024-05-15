import { submitEcowittKey } from "@/app/server/Ecowitt";
import { useWallet } from "@txnlab/use-wallet";

export function SubmitEcowittButton({
  valid,
  apiKey,
  appKey,
  updateMessage,
  disappearInput,
}: {
  valid?: boolean;
  apiKey: string;
  appKey: string;
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

  const isValidApiKey = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(apiKey);
  const isValidAppKey = /^[0-9a-f]{32}$/i.test(appKey);
  const isValidKeys = isValidApiKey && isValidAppKey;

  const handleEcowittSubmit = async (
    updateMessage: Function,
    disappearInput: Function,
    activeAddress: string
  ) => {
    disappearInput(true);
    updateMessage({ message: "Submitting Key...", color: "white" });

    try {
      const response = await submitEcowittKey(apiKey,appKey, activeAddress);
      updateMessage(response?.data);
    } catch (error) {
      console.error("Error submitting Ecowitt key:", error);
      updateMessage({
        message: "Error submitting API key.",
        color: "red",
      });
    } finally {
      disappearInput(false);
    }
  };

  return (
    <button
      onClick={() =>
        handleEcowittSubmit( updateMessage,disappearInput,activeAddress!)
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
