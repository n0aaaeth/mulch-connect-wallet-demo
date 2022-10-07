import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const infuraId = "2925db8b5b8741319f71e895227602bd";

const RPC_URLS = {
  1: `https://mainnet.infura.io/v3/${infuraId}`,
  5: `https://goerli.infura.io/v3/${infuraId}`
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 5]
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URLS[1],
    5: RPC_URLS[5]
  },
  qrcode: true,
  infuraId: infuraId,
});

//coinbase
export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[5],
  appName: "demo-app",
  supportedChainIds: [1, 5],
});