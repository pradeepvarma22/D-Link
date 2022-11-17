import { ethers } from "ethers";

import { WALLET_OPTIONS } from "../../utility/reducers/wallet"

export default function HomePage({ walletState, walletDispatch }) {



    async function connect() {

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            const allWalletAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            walletDispatch({ type: WALLET_OPTIONS.SET_WALLET_ADDRESS, payload: ethers.utils.getAddress(allWalletAccounts[0]) })
            walletDispatch({ type: WALLET_OPTIONS.PROVIDER, payload: provider })
            walletDispatch({ type: WALLET_OPTIONS.IS_WALLET_CONNECTED, payload: true })

        }
    }

    return (
        <div>
            <div>
                <button onClick={connect}>
                    Connect To Wallet
                </button>
            </div>
        </div>
    )
}
