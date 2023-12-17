import { useState } from "react";
import NFTListingForm from "../components/NFTListingForm";
import { NextPage } from "next";

const NFTListingPage: NextPage = () => {
  const [listedNFT, setListedNFT] = useState<string | null>(null);

  // Callback function to handle NFT listing
  const onListNFT = async (startingPrice: number, startTime: number, duration: number) => {
    try {
      // Replace the following with your logic to interact with the Ethereum smart contract
      console.log("Starting Price:", startingPrice);
      console.log("Start Time:", startTime);
      console.log("Duration:", duration);

      // Set the state or perform other actions based on the result
      setListedNFT(`NFT listed successfully. Check the console for details.`);
    } catch (error) {
      console.error("Error listing NFT:", error);
      alert("Error listing NFT. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1 className="text-4xl text-center font-bold mt-32">NFT Listing Page</h1>
      {/* Pass the setListedNFT callback directly to the NFTListingForm */}
      <NFTListingForm setListedNFT={setListedNFT} onListNFT={onListNFT} />
      {listedNFT && <p>{listedNFT}</p>}
    </div>
  );
};

export default NFTListingPage;
