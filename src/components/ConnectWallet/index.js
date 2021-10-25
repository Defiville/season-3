import "./style.css";
import ErrMessage from "../ErrorMessage";

export default function ConnectWallet({handleConnectWallet, handleDisconnectWallet, selectedAccount, netErr}) {
  return (
    <>
    <div className="btnWrapper">
      {selectedAccount ? 
        (<button onClick={handleDisconnectWallet}>{`${selectedAccount.slice(0, 5)}...${selectedAccount.slice(-3)}`}</button>) :
        (<button onClick={handleConnectWallet}>Connect</button>)
      }
    </div>
    {netErr && (<ErrMessage message="Please connect to Polygon network!" />)}
    </>
  );
}