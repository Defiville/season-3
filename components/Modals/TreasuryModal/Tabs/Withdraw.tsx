import React, { useState, useEffect } from "react";
import { css } from "aphrodite";
import { Styles } from "../Styles";
import { BigNumber, Contract, ethers } from "ethers";
import { decimalToExact, exactToDecimal } from "../../../../helpers/conversion";
import { finalizeTransaction } from "../../../../state/transactions/actions";
import { useTransactionAdder } from "../../../../state/transactions/hooks";
import { useChainId } from "../../../../hooks/web3/web3Context";
import { UsableContract } from "../../../../hooks/contract/contractContext";
import {
  depositedBany,
  maxBanyToUnlock,
  withdrawBany,
} from "../../../../helpers/treasuryMethods";
import { useDispatch } from "react-redux";

type DepositProps = {
  checkContent: (name: string) => any;
  address: string;
  tokens: { [x: string]: UsableContract };
};

const Withdraw = ({ checkContent, address, tokens }: DepositProps) => {
  const styles = Styles();
  const [banyDeposited, setBanyDeposited] = useState(0);
  const [ibalance, setIbalance] = useState<string | number>(0);
  const [hexBalance, setHexBalance] = useState<BigNumber | null>();
  const [iHexBalance, setIHexBalance] = useState<BigNumber | null>();
  const [unlockableBany, setUnlockableBany] = useState<number | string>(0);
  const [buttonStatus, setButtonStatus] = useState({
    error: "",
    withdraw: false,
    disable: false,
  });

  const dispatch = useDispatch();
  const transactionAdder = useTransactionAdder();
  const chainId = useChainId();

  const getBany = depositedBany();
  const getunlockableBany = maxBanyToUnlock();
  const submitWithdrawBany = withdrawBany();

  const getDepositedBany = async () => {
    const balance = await getBany(tokens["treasuryTba"].contract, address);
    console.log(balance, 'Deposited BANY');
    let userBalance;
    if (tokens && tokens["bAnyToken"].decimal) {
      const userBalance = decimalToExact(balance, tokens["bAnyToken"].decimal);
      setBanyDeposited(userBalance);
    } else {
      userBalance = 0;
      setBanyDeposited(userBalance);
    }
  };

  const getMaxBanyToUnlock = async () => {
    const balance = await getunlockableBany(
      tokens["treasuryTba"].contract,
      address
    );
    setHexBalance(balance);
    setIHexBalance(balance);
    let userBalance;
    if (tokens && tokens["bAnyToken"].decimal) {
      const userBalance = decimalToExact(balance, tokens["bAnyToken"].decimal);
      setUnlockableBany(userBalance);
    } else {
      userBalance = 0;
      setUnlockableBany(userBalance);
    }
  };

  const handleWithdraw = () => {
    if (
      tokens["treasuryTba"] &&
      tokens["treasuryTba"].contract &&
      tokens["treasuryTba"].signer
    ) {
      const signedContract = tokens["treasuryTba"].contract.connect(
        tokens["treasuryTba"].signer
      );
      getWithdrawResponse(signedContract);
    }
  };

  const getWithdrawResponse = async (contract: Contract | null) => {
    if (ibalance && tokens["bAnyToken"] && tokens["bAnyToken"].decimal) {
      const actualAmount = hexBalance ? hexBalance : exactToDecimal(
        ibalance,
        tokens["bAnyToken"].decimal
      );
      console.log(actualAmount);
      try {
        const res = await submitWithdrawBany(
          contract,
          address,
          tokens["bAnyToken"].address,
          actualAmount
        );
        transactionAdder(res, {
          summary: "Withdraw Bany",
        });
        const { hash } = res;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        provider
          .waitForTransaction(hash)
          .then((receipt) => {
            dispatch(
              finalizeTransaction({
                chainId: chainId,
                hash: hash,
                receipt: {
                  blockHash: receipt.blockHash,
                  blockNumber: receipt.blockNumber,
                  contractAddress: receipt.contractAddress,
                  from: receipt.from,
                  status: receipt.status,
                  to: receipt.to,
                  transactionHash: receipt.transactionHash,
                  transactionIndex: receipt.transactionIndex,
                },
              })
            );
            // check Any Balance here
          })
          .catch((err) => {
            dispatch(
              finalizeTransaction({
                chainId,
                hash,
                receipt: "failed",
              })
            );
          });
      } catch (err) {
        console.log(err, "Deposit error");
      }
    }
  };

  useEffect(() => {
    getDepositedBany();
    getMaxBanyToUnlock();
  }, [address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHexBalance(null);
    const value = e.target.value;
    setIbalance(value);
    checkApproveAndDisable(value);
  };


  const checkApproveAndDisable = (value: number | string) => {
    if (value && !isNaN(Number(value)) && value > 0) {
      updateButton(value, true);
    } else {
      updateButton(value, false);
    }
  };

  const updateButton = (
    value: number | string,
    withdraw: boolean
  ) => {
    let disable = true;
    if (value > 0) {
      disable = false;
    }
    setButtonStatus({
      ...buttonStatus,
      disable: disable,
      withdraw: withdraw,
    });
  };


  const handleMaximum = () => {
    setHexBalance(iHexBalance);
    setIbalance(unlockableBany);
    checkApproveAndDisable(unlockableBany);
  };

  const ButtonDisplay = () => {
    if (
      !ibalance ||
      ibalance == 0 ||
      ibalance == "" ||
      isNaN(Number(ibalance))
    ) {
      return (
        <button className={css(styles.densed)} disabled>
          Enter Amount
        </button>
      );
    } else if (ibalance > unlockableBany) {
      return (
        <button className={css(styles.densed)} disabled>
          Insufficient Bany Balance
        </button>
      );
    } else {
      if (buttonStatus.withdraw) {
        return (
          <button className={css(styles.densed)} onClick={handleWithdraw}>
            Withdraw
          </button>
        );
      } else {
        return (
          <button className={css(styles.densed)} disabled>
            Error
          </button>
        );
      }
    }
  };

  return (
    <div className={checkContent("withdraw")}>
      <div className={css(styles.title)}>Deposited: {banyDeposited} BANY</div>
      <div className={css(styles.mintFullInnerWrap)}>
        <input
          type="text"
          className={css(styles.input)}
          placeholder="0.00"
          value={ibalance}
          onChange={handleChange}
        />
        <div className={css(styles.maxFullBtn)} onClick={handleMaximum}>
          Max
        </div>
      </div>
      <div className={css(styles.title)}>Withdraw Allowed Assets:</div>
      <div className={css(styles.subTitle)}>BANY: {unlockableBany} Bany</div>
      {/* <div className={css(styles.subTitle)}>Repay Amount: amount</div> */}
      <div className={css(styles.footer)}>
        {/* <button className={css(styles.outlined)}>Withdraw</button> */}
        <ButtonDisplay />
      </div>
    </div>
  );
};

export default Withdraw;
