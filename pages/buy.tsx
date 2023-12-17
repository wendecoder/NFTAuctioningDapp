import { useEffect, useState } from "react";
import * as tokenJson from "./assets/AuAToken.json";
import { NextPage } from "next";
import { Float } from "type-fest";
import { parseEther } from "viem";
import { useAccount, useBalance, useContractRead, useContractWrite } from "wagmi";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

const Exchange: NextPage = () => {
  const [payAmount, setPayAmount] = useState<number>(0.2);
  const [receiveAmount, setReceiveAmount] = useState<number>(0.2);
  const [swapDirection, setSwapDirection] = useState<"auaToEth" | "ethToAua">("auaToEth");
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  const [error, setError] = useState<string | null>(null);
  const OpenModal = (params: { modalId: string }) => {
    const modal = document.getElementById(params.modalId) as HTMLDialogElement;
    modal.showModal();
  };

  function AuAToEthSwap() {
    const { write, data, isLoading, isSuccess } = useContractWrite({
      address: "0x4E76921DFcc8d3C0bE5bE26Be77c5c904DF26981",
      abi: tokenJson.abi,
      functionName: "convertAuAToEth",
    });
    return (
      <>
        <div className="flex flex-col items-center justify-center bg w-250 h-200 bg-white rounded-lg p-10">
          <h2 className="text-bold text-xl">
            Converting ${payAmount} AuA into ${receiveAmount} ETH`
          </h2>
          <button
            className="btn btn-accent w-1/2 self-center"
            disabled={!write}
            onClick={() =>
              write({
                args: [parseEther(String(payAmount))],
              })
            }
          >
            Swap
          </button>
          {isLoading && <p className="font-bold self-center">Loading...</p>}
          {isSuccess && (
            <p className="font-bold rounded-lg bg-green-500 p-2">Transaction: {JSON.stringify(data?.hash)}</p>
          )}
          {isError && <p className="font-bold">{isError}</p>}
          <div className="modal-action ">
            <form method="dialog">
              <button className="btn bg-red-500 hover:bg-red-700">Close</button>
            </form>
          </div>
        </div>
      </>
    );
  }

  function EthToAuASwap() {
    const { write, data, isLoading, isSuccess } = useContractWrite({
      address: "0x4E76921DFcc8d3C0bE5bE26Be77c5c904DF26981",
      abi: tokenJson.abi,
      functionName: "convertEthToAuA",
    });
    return (
      <>
        <div className="flex flex-col items-center justify-center w-250 h-200 bg-white rounded-lg p-10">
          <h2 className="text-bold text-xl text-black">
            Converting ${payAmount} ETH into ${receiveAmount} AuA`
          </h2>
          <button
            className="btn btn-accent w-1/2 self-center"
            disabled={!write}
            onClick={() =>
              write({
                value: parseEther(String(payAmount)),
              })
            }
          >
            Swap
          </button>
          {isLoading && <p className="font-bold self-center">Loading...</p>}
          {isSuccess && (
            <p className="font-bold rounded-lg bg-green-500 p-2">Transaction: {JSON.stringify(data?.hash)}</p>
          )}
          {isError && <p className="font-bold">{isError}</p>}
          <div className="modal-action ">
            <form method="dialog">
              <button className="btn bg-red-500 hover:bg-red-700">Close</button>
            </form>
          </div>
        </div>
      </>
    );
  }

  const handleSwapClick = () => {
    setSwapDirection(prevDirection => (prevDirection === "auaToEth" ? "ethToAua" : "auaToEth"));
    // Swap logic here, update payAmount and receiveAmount accordingly
    if (swapDirection === "auaToEth") {
      // Implement your logic to swap AuA to ETH
      // For example: setReceiveAmount(updatedReceiveAmount);
    } else {
      // Implement your logic to swap ETH to AuA
      // For example: setPayAmount(updatedPayAmount);
    }
  };

  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <AuAToEthSwap></AuAToEthSwap>
      </dialog>
      <dialog id="my_modal_2" className="modal">
        <EthToAuASwap></EthToAuASwap>
      </dialog>
      <div className="flex flex-col items-center justify-center bg-slate-600 mt-20 min-h-1/2">
        <h2 className="text-center text-2xl font-semibold text-black mt-10">Exchange between AuA and ETH seamlessly</h2>
        <div className="bg-amber-500 rounded-lg p-10 shadow-2xl shadow-black mt-10 w-1/2 h-3/5 mb-20">
          <p className="text-left justify-left items-left font-bold bg-white rounded-lg p-2 w-14">Swap</p>
          <div className="w-full bg-amber-700 rounded-md p-4 font-semibold">
            <div className="flex justify-evenly">
              <div className="flex-item flex-wrap">
                <p className="font-semibold text-white">You pay</p>
                <input
                  className="p-3 bg-white w-28 rounded-lg"
                  type="text"
                  value={payAmount}
                  onChange={e => {
                    setPayAmount(prevAmount => {
                      const newAmount = Number(e.target.value);
                      setReceiveAmount(swapDirection === "auaToEth" ? newAmount / 11111 : newAmount * 11111);
                      return newAmount;
                    });
                  }}
                />
              </div>

              <div className="flex-item">
                <p className="text-2xl font-bold text-white">
                  {swapDirection === "auaToEth" ? (
                    <img
                      src="/erc20logo.jpeg"
                      alt="image logo"
                      width={60}
                      height={60}
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <img src="/ethlogo.png" alt="image logo" width={60} height={60} style={{ borderRadius: "50%" }} />
                  )}
                  {swapDirection === "auaToEth" ? "AuA" : "ETH"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center -mt-3" onClick={handleSwapClick} style={{ cursor: "pointer" }}>
            <div className="flex bg-black rounded-full w-12 p-3">
              <ArrowUpIcon className="h-5 w-5 text-white" />
              <ArrowDownIcon className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="w-full bg-amber-700 rounded-md p-4 font-semibold -mt-3">
            <div className="flex justify-evenly">
              <div className="flex-item flex-wrap">
                <p className="font-semibold text-white">You receive</p>
                <input
                  className="p-3 bg-white w-28 rounded-lg"
                  type="text"
                  value={receiveAmount}
                  onChange={e => {
                    setReceiveAmount(prevAmount => {
                      const newAmount = Number(e.target.value);
                      setPayAmount(swapDirection === "auaToEth" ? newAmount * 11111 : newAmount / 11111);
                      return newAmount;
                    });
                  }}
                />
              </div>

              <div className="flex-item">
                <p className="text-2xl font-bold text-white">
                  {swapDirection === "auaToEth" ? (
                    <img src="/ethlogo.png" alt="image logo" width={60} height={60} style={{ borderRadius: "50%" }} />
                  ) : (
                    <img
                      src="/erc20logo.jpeg"
                      alt="image logo"
                      width={60}
                      height={60}
                      style={{ borderRadius: "50%" }}
                    />
                  )}
                  {swapDirection === "auaToEth" ? "ETH" : "AuA"}
                </p>
              </div>
            </div>
          </div>

          <button
            className="bg-amber-400 text-black rounded-md text-center w-full p-4 mt-4 font-bold hover:bg-slate-900 hover:text-white duration-700"
            onClick={() => {
              swapDirection === "auaToEth"
                ? OpenModal({
                    modalId: "my_modal_1",
                  })
                : OpenModal({
                    modalId: "my_modal_2",
                  });
            }}
          >
            {address && <p>Swap</p>}
            {isConnecting && <p>Connecting</p>}
            {isDisconnected && <p>Connect wallet to make a swap</p>}
          </button>
        </div>
      </div>
    </>
  );
};
export default Exchange;
