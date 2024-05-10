"use client";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { DaffiWalletConnect } from "@daffiwallet/connect";
import { PeraWalletConnect } from "@perawallet/connect";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import {
  PROVIDER_ID,
  WalletProvider,
  reconnectProviders,
  useInitializeProviders,
  useWallet,
} from "@txnlab/use-wallet";
import { WalletConnectModalSign } from "@walletconnect/modal-sign-html";
import { useEffect, useState } from "react";
import Connect from "./components/Connect";
import { EcowittModal } from "./components/KeyModals/EcowittModal";
import { ShellyModal } from "./components/KeyModals/ShellyModal";
import { TapoModal } from "./components/KeyModals/TapoModal";
import OpenButton from "./components/OpenButton";

export default function Wallet() {
  const walletProviders = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
      { id: PROVIDER_ID.MYALGO, clientStatic: MyAlgoConnect },
      {
        id: PROVIDER_ID.WALLETCONNECT,
        clientStatic: WalletConnectModalSign,
        clientOptions: {
          projectId: "74761852c2f607c540bb116a1bc9f011",
          metadata: {
            name: "Fry Foundation",
            description: "Authenticate yourself",
            url: "https://weather.fryfoundation.com",
            icons: ["https://walletconnect.com/walletconnect-logo.png"],
          },
        },
      },
    ],
  });
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isEcowittModalOpen, setIsEcowittModalOpen] = useState(false);
  const [isWeatherXMModalOpen, setIsWeatherXMModalOpen] = useState(false);
  const [isShellyModalOpen, setIsShellyModalOpen] = useState(false);
  const { activeAddress } = useWallet();
  const showModal = () => {
    setModalIsOpen(true);
  };
  const showEcowittModal = () => {
    setIsEcowittModalOpen(true);
  };
  const showWeatherXMModal = () => {
    setIsWeatherXMModalOpen(true);
  };
  const showShellyModal = () => {
    setIsShellyModalOpen(true);
  };
  useEffect(() => {
    if (walletProviders !== null) {
      console.log(walletProviders)
      reconnectProviders(walletProviders);
    }
  }, []);
  if (!activeAddress) {
    return (
      <div className="flex justify-center items-center text-center text-white w-[90vw] bg-[#201c1c] m-auto p-5">
        <WalletProvider value={walletProviders}>
          <div className="flex flex-col p-5 bg-[#84808a] rounded-[10px] w-[90vw] shadow-md">
            <Connect />
          </div>
        </WalletProvider>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center text-center text-white w-[90vw] bg-[#201c1c] m-auto p-5">
      <WalletProvider value={walletProviders}>
        <div className="flex flex-col p-5 bg-[#84808a] rounded-[10px] w-[100vw] shadow-md">
          <Connect />
          <div className="flex justify-center items-center gap-4 ">
          <OpenButton
              showModal={showModal}
              text="Tplink Tapo"
              logo="/tapo.png"
            />
            <TapoModal isOpen={isModalOpen} setOpen={setModalIsOpen} />
            <OpenButton
              showModal={showEcowittModal}
              text="Eciwitt API"
              logo="/ecowitt.png"
            />
            <EcowittModal
              isOpen={isEcowittModalOpen}
              setOpen={setIsEcowittModalOpen}
            />
          {/* <OpenButton
            showModal={showWeatherXMModal}
            text="Switchbot"
            logo="/switchbot.webp"
          />
          <SwitchbotModal
            isOpen={isWeatherXMModalOpen}
            setOpen={setIsWeatherXMModalOpen}
          /> */}
          <OpenButton
            showModal={showShellyModal}
            text="Shelly"
            logo="/shelly.png"
          />
          <ShellyModal
            isOpen={isShellyModalOpen}
            setOpen={setIsShellyModalOpen}
          />
          </div>
        </div>
      </WalletProvider>
    </div>
  );
}