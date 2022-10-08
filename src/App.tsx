import { useCallback, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import WalletListModal from "./components/WalletListModal";
import {injected, walletconnect, walletlink } from "./utils/connectors";
import {formatAccount, getErrorMessage, svgLoader } from "./utils/helpers";
import { useMediaQuery } from "@mui/material";

export default function App() {
  const matches: boolean = useMediaQuery("(max-width: 480px)");
  const context = useWeb3React();

  const [walletError, setWalletError] = useState<string>("");
  const [connectedAccounts, setConnectedAccounts] = useState(() => new Set<string>());
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  //  Wallet conncection Handlers
  const handleMetamaskConnect = async () => {
    try {
      await context.activate(injected, undefined, true);
       //@ts-ignore
      localStorage.setItem("isWalletConnected", true);
      setConnectedAccounts((prev) => new Set<string>(...prev).add("Metamask"));
    } catch (error) {
      setWalletError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleWalletConnect = useCallback(async () => {
    try {
      await context.activate(walletconnect, undefined, true);
       //@ts-ignore
      localStorage.setItem("isWalletConnected", true);
      setConnectedAccounts((prev) => new Set<string>(...prev).add("WalletConnect"));
    } catch (error: any) {
      setWalletError(getErrorMessage(error.message));
    } finally {
      setLoading(false);
    }
  }, [context]);

  const handleCoinBaseWallet = async () => {
    try {
      await context.activate(walletlink, undefined, true);
       //@ts-ignore
      localStorage.setItem("isWalletConnected", true);
      setConnectedAccounts((prev) => new Set(...prev).add("Coinbase"));
    } catch (error) {
      setWalletError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const dataSrcPc = [
    {
      name: "Metamask",
      imgSrc: "https://app.uniswap.org/static/media/metamask.02e3ec27.png",
      onClick: handleMetamaskConnect,
    },
    {
      name: "Coinbase",
      imgSrc:
        "https://app.uniswap.org/static/media/coinbaseWalletIcon.a3a7d7fd.svg",
      onClick: handleCoinBaseWallet,
    },
    {
      name: "WalletConnect",
      imgSrc:
        "https://app.uniswap.org/static/media/walletConnectIcon.304e3277.svg",
      onClick: handleWalletConnect,
    },
  ];

  const dataSrcMobile = [
    {
      name: "Coinbase",
      imgSrc:
        "https://app.uniswap.org/static/media/coinbaseWalletIcon.a3a7d7fd.svg",
      onClick: handleCoinBaseWallet,
    },
    {
      name: "WalletConnect",
      imgSrc:
        "https://app.uniswap.org/static/media/walletConnectIcon.304e3277.svg",
      onClick: handleWalletConnect,
    }
  ];

  // Modal Handlers
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setWalletError("");
    setLoading(false);
  }

  return (
    <div className="l-container">
      <div className="cta-button-container">
      <h1>Mulch Connect Wallet Demo</h1>
          <button
            className={context.active ? "cta-button selected" : "cta-button"}
            onClick={openModal}
          >
            {context.active ? formatAccount(context.account) : "Connect Wallet"}
          </button>
      </div>

      <WalletListModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalTitle={
          context.active ? (
              "Account"
            ) : (
              "Select Wallet"
            )
        }
      >
        {/* Wallet loading */}
        {loading && (
          <button className="card" disabled>
            <div>{svgLoader}</div>
            <h3>Initializing ...</h3>
          </button>
        )}

        {/* Wallet Connect Error */}
        {walletError && (
          <button className="card" disabled>
            <h3 style={{ color: "#FF5704" }}>{walletError}</h3>
          </button>
        )}

        {/* Wallet connected  */}
        {context.active && (
          <section className="connect-container">
            <div className="connect-container--header">
              <p>Connected with {[...connectedAccounts][0]}</p>
            </div>
            <div className="connect-container--body">
              <h1>{context.account && formatAccount(context.account)}</h1>
            </div>
          </section>
        )}

        {/* Wallet Not Connected  */}
        {(!context.active && !loading && !walletError) && (
         matches ?
          dataSrcMobile.map((data) => (
            <div key={data.name}>
              <button className="card" onClick={() => {
                  data.onClick();
                  if (!context.active && !context.error) {
                    setLoading(true);
                  }
                }}
              >
                <div className="align-center">
                  <h3>{data.name}</h3>
                </div>
                <img src={data.imgSrc} width="24px" height="24px" alt={data.name} />
              </button>
            </div>
          ))
          :dataSrcPc.map((data) => (
            <div key={data.name}>
              <button className="card" onClick={() => {
                  data.onClick();
                  if (!context.active && !context.error) {
                    setLoading(true);
                  }
                }}
              >
                <div className="align-center">
                  <h3>{data.name}</h3>
                </div>
                <img src={data.imgSrc} width="24px" height="24px" alt={data.name} />
              </button>
            </div>
          )))
        }
      </WalletListModal>
    </div>
  );
}
