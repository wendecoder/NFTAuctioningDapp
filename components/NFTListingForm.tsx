import React, { ReactNode, useEffect, useState } from "react";
import * as tokenJson3 from "../pages/assets/AuANFT.json";
import * as tokenJson from "../pages/assets/AuAToken.json";
import * as tokenJson2 from "../pages/assets/NFTAuction.json";
import { parseEther } from "viem";
import { useContractRead, useContractWrite } from "wagmi";
import axios from 'axios';

interface NFTListingFormProps {
  setListedNFT: React.Dispatch<React.SetStateAction<string | null>>;
  onListNFT: (startingPrice: number, startTime: number, duration: number) => void;
}

const NFTListingForm: React.FC<NFTListingFormProps> = ({ setListedNFT, onListNFT }) => {
  const [startingPrice, setStartingPrice] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [displayTokenIdInfo, setDisplayTokenIdInfo] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState<number>(0);

  const OpenModal = (params: { modalId: string }) => {
    const modal = document.getElementById(params.modalId) as HTMLDialogElement;
    modal.showModal();
  };
  function MintNft() {
    const { write, data, isLoading, isSuccess } = useContractWrite({
      address: "0x221129552467E07ebB0F3c758b165927e657A7a1",
      abi: tokenJson2.abi,
      functionName: "mintNFT",
    });
    return (
      <>
        <div className="flex flex-col items-center justify-center bg w-250 h-200 bg-white rounded-lg p-10">
          <h2 className="text-bold text-xl">This transaction will mint you a dynamic emoji NFT!!</h2>
          <button className="btn btn-accent w-1/2 self-center" disabled={!write} onClick={() => write()}>
            Mint Dynamic NFT
          </button>
          {isLoading && <p className="font-bold self-center">Loading...</p>}
          {isSuccess && (
            <p className="font-bold rounded-lg bg-green-500 p-2">Transaction: {JSON.stringify(data?.hash)}</p>
          )}
          <div className="modal-action ">
            <form method="dialog">
              <button className="btn bg-red-500 hover:bg-red-700">Close</button>
            </form>
          </div>
        </div>
      </>
    );
  }
  function GetTokenIds() {
    
    const { data, isLoading, isSuccess } = useContractRead({
      address: "0x221129552467E07ebB0F3c758b165927e657A7a1",
      abi: tokenJson2.abi,
      functionName: "innerAddress",
      watch: true,
    });
    const tokenId: bigint = data as bigint;
    return (
      <>
        <div className="flex flex-col items-center justify-center bg w-250 h-200 bg-white rounded-lg p-10">
          <h2 className="text-bold text-xl">Your NFTs token IDs!!</h2>
          {isLoading && <p className="font-bold self-center">Loading...</p>}
          {isSuccess && <p className="font-bold rounded-lg bg-green-500 p-2 text-black">Transaction: {tokenId.toString()}</p>}
          <div className="modal-action ">
            <form method="dialog">
              <button
                className="btn bg-red-500 hover:bg-red-700"
                onClick={() => {
                  // Get the modal element by its ID
                  const modal = document.getElementById("my_modal_5");

                  // Add the "hidden" class to hide the modal
                  modal?.classList.add("hidden");
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
  function ApproveNFT() {
    const { write, data, isLoading, isSuccess } = useContractWrite({
      address: "0x0c784d1aE8FEb19a7a41EdAf51602029e2B8ce8e",
      abi: tokenJson3.abi,
      functionName: "approve",
    });
    
    return (
      <>
        <div className="flex flex-col items-center justify-center bg w-250 h-200 bg-white rounded-lg p-10">
          <h2 className="text-bold text-xl">
            This transaction will approve newly minted NFT to this platform in order for the NFT to be listed!!
          </h2>
          <label className="text-center font-bold">Token ID of NFT you're going to approve and list</label>
          <input className="mb-3 rounded-md p-3 bg-black text-white mt-4" placeholder="0" type="text" value={tokenId} onChange={e => setTokenId(Number(e.target.value))} />
          <button
            className="btn btn-accent w-1/2 self-center"
            disabled={!write}
            onClick={() =>
              write({
                args: ["0x221129552467E07ebB0F3c758b165927e657A7a1", tokenId],
              })
            }
          >
            Approve NFT
          </button>
          {isLoading && <p className="font-bold self-center">Loading...</p>}
          {isSuccess && (
            <p className="font-bold rounded-lg bg-green-500 p-2">Transaction: {JSON.stringify(data?.hash)}</p>
          )}
          <div className="modal-action ">
            <form method="dialog">
              <button className="btn bg-red-500 hover:bg-red-700">Close</button>
            </form>
          </div>
        </div>
      </>
    );
  }
  function ApproveContract() {
    const { write, data, isLoading, isSuccess } = useContractWrite({
      address: "0x4E76921DFcc8d3C0bE5bE26Be77c5c904DF26981",
      abi: tokenJson.abi,
      functionName: "approve",
    });
    return (
      <>
        <div className="flex flex-col items-center justify-center bg w-250 h-200 bg-white rounded-lg p-10">
          <h2 className="text-bold text-xl">This transaction will approve allowance of 5 AuA to this platform!!</h2>
          <button
            className="btn btn-accent w-1/2 self-center"
            disabled={!write}
            onClick={() =>
              write({
                args: ["0x221129552467E07ebB0F3c758b165927e657A7a1", parseEther("5")],
              })
            }
          >
            Approve
          </button>
          {isLoading && <p className="font-bold self-center">Loading...</p>}
          {isSuccess && (
            <p className="font-bold rounded-lg bg-green-500 p-2">Transaction: {JSON.stringify(data?.hash)}</p>
          )}
          <div className="modal-action ">
            <form method="dialog">
              <button className="btn bg-red-500 hover:bg-red-700">Close</button>
            </form>
          </div>
        </div>
      </>
    );
  }
  function ListNFT() {
    const { write, data, isLoading, isSuccess } = useContractWrite({
      address: "0x221129552467E07ebB0F3c758b165927e657A7a1",
      abi: tokenJson2.abi,
      functionName: "listNFTForAuction",
    });
    useEffect(() => {
      // Trigger the API call when isSuccess becomes true
      if (isSuccess) {
        const apiEndpoint = '/api/users'; // Replace with your actual API endpoint
        const apiData = {
          tokenId,
          startingPrice,
          startTime,
          duration,
          transactionHash: data?.hash, // Include the transaction hash in the API data
        };
  
        // Make the API call using Axios
        axios.post(apiEndpoint, apiData)
          .then(response => {
            // Handle API response
            console.log('API Response:', response.data);
          })
          .catch(error => {
            // Handle API error
            console.error('API Error:', error);
          });
      }
    }, [isSuccess, data?.hash]);
    return (
      <>
        <div className="flex flex-col items-center justify-center bg w-250 h-200 bg-white rounded-lg p-10">
          <h2 className="text-bold text-xl">This transaction will cost you 5 AuA!!</h2>
          <button
            className="btn btn-accent w-1/2 self-center"
            disabled={!write}
            onClick={() =>
              write({
                args: [tokenId, parseEther(String(startingPrice)), startTime, duration],
              })
            }
          >
            List
          </button>
          
          {isLoading && <p className="font-bold self-center">Loading...</p>}
          {isSuccess && (
            <p className="font-bold rounded-lg bg-green-500 p-2">Transaction: {JSON.stringify(data?.hash)}</p>
          )}
          <div className="modal-action ">
            <form method="dialog">
              <button className="btn bg-red-500 hover:bg-red-700">Close</button>
            </form>
          </div>
        </div>
      </>
    );
  }

  const handleListNFT = async () => {
    // Basic validation
    if (!startingPrice || !startTime || !duration) {
      alert("Please fill in all fields");
      return;
    }

    // Call the provided onListNFT callback
    try {
      await onListNFT(startingPrice, startTime, duration);
      // Update state or perform other actions as needed
      setListedNFT(`NFT listed successfully.`);
    } catch (error) {
      // Handle errors
      console.error("Error listing NFT:", error);
      alert("Error listing NFT. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <dialog id="my_modal_1" className="modal">
        <ApproveContract></ApproveContract>
      </dialog>
      <dialog id="my_modal_2" className="modal">
        {" "}
        <ListNFT></ListNFT>
      </dialog>
      <dialog id="my_modal_3" className="modal">
        {" "}
        <MintNft></MintNft>
      </dialog>
      <dialog id="my_modal_4" className="modal">
        {" "}
        <ApproveNFT></ApproveNFT>
      </dialog>
      <dialog id="my_modal_5" className="modal">
        {" "}
        {displayTokenIdInfo && <GetTokenIds></GetTokenIds>}
      </dialog>
      <h2 className="text-center text-2xl font-semibold text-amber-500 mt-10">List Your NFT for Auction</h2>
      <div className="mt-5 bg-slate-600 rounded-lg p-10 shadow-2xl shadow-black">
        <div className="form-group">
          <label className="text-white font-bold">
            Starting Price:
            <input
              className="ml-5 rounded-md p-2 mb-5 bg-black text-white"
              type="text"
              value={startingPrice}
              onChange={e => setStartingPrice(Number(e.target.value))}
            />
            AuA
          </label>
        </div>
        <div className="form-group">
          <label className="text-white font-bold">Start Time (seconds from now):</label>
          <input
            className="ml-5 rounded-md p-2 mb-5 bg-black text-white"
            type="text"
            value={startTime}
            onChange={e => setStartTime(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label className="text-white font-bold">Auction Duration (in seconds):</label>
          <input
            className="ml-5 rounded-md p-2 mb-5 bg-black text-white"
            type="text"
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col justify-center items center">
          <button
            className="bg-amber-500 rounded-md p-3 font-semibold hover:bg-slate-400 mb-5"
            onClick={() => {
              OpenModal({
                modalId: "my_modal_3",
              });
            }}
          >
            Mint NFT
          </button>
          <button
            className="bg-amber-500 rounded-md p-3 font-semibold hover:bg-slate-400 mb-5"
            onClick={() => {
              setDisplayTokenIdInfo(true);
              OpenModal({
                modalId: "my_modal_5",
              });
            }}
          >
            Your NFT Token IDs
          </button>
          <button
            className="bg-amber-500 rounded-md p-3 font-semibold hover:bg-slate-400 mb-5"
            onClick={() => {
              OpenModal({
                modalId: "my_modal_4",
              });
            }}
          >
            Approve NFT
          </button>
          <button
            className="bg-amber-500 rounded-md p-3 font-semibold hover:bg-slate-400 mb-5"
            onClick={() => {
              OpenModal({
                modalId: "my_modal_1",
              });
            }}
          >
            Approve
          </button>
          <button
            className="bg-amber-500 rounded-md p-3 font-semibold hover:bg-slate-400"
            onClick={() => {
              OpenModal({
                modalId: "my_modal_2",
              });
            }}
          >
            List NFT
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTListingForm;
