
import "./wallet_list_modal.css";
import { closeButtonSVg } from "../utils/helpers";
import { useWeb3React } from "@web3-react/core";
import Modal from "react-modal";
import { ReactNode } from "react";

type Props = {
  modalIsOpen: boolean;
  closeModal: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  modalTitle: string;
  children: ReactNode;
}

const WalletListModal = ({modalIsOpen, closeModal, modalTitle, children}: Props) => {
  const { deactivate } = useWeb3React();
  const handleWalletDisconnect = async () => {
    try {
      deactivate();
      //@ts-ignore
      localStorage.setItem("isWalletConnected", false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Wallet Modal"
        overlayClassName="modal-overlay"
        className="modal"
        ariaHideApp={false}
      >
        <div className="modal_content">
          <div id="modal__content_header">
            {typeof modalTitle === "string" ? (
              <h4>{modalTitle}</h4>
            ) : (
              modalTitle
            )}

            {localStorage.getItem("isWalletConnected") === "true" && (
              <button className="btn" onClick={handleWalletDisconnect}>
                Disconnect
              </button>
            )}
            <button
              title="Close"
              className="clearBtn close_modal"
              onClick={closeModal}
            >
              {closeButtonSVg}
            </button>
          </div>
          <div id="modal__content_body">{children}</div> 
        </div>
      </Modal>
    </div>
  );
};

export default WalletListModal;
