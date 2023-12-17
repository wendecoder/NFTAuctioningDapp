import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import type { NextPage } from "next";

type Auction = {
  id: number;
  nftTokenId: number;
  highestBidder: string | null;
  highestBid: number | null;
  startTime: string;
  endTime: string;
  startingPrice: number;
  status: string | null;
  nftImage: string | null; // Adjust the type based on the actual data type for nftImage
};

const Ongoing: NextPage = () => {
  const [auctionData, setAuctionData] = useState<[Auction]>();
  const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  useEffect(() => {
    const apiEndpoint = "/api/ongoing"; // Replace with your actual API endpoint
    // Make the API call using Axios
    axios
      .post(apiEndpoint)
      .then(response => {
        // Handle API response
        setAuctionData(response.data);
        // console.log(auctionData);
        console.log("API Response:", response.data);
      })
      .catch(error => {
        // Handle API error
        console.error("API Error:", error);
      });
  }, []);

  console.log("not API response:", auctionData);
  return (
    <>
      <p className="text-center text-4xl text-black mt-32">Ongoing Auctions Page</p>
      <p className="text-center mt-10 font-bold text-amber-400 text-2xl">Ongoing Auctions</p>
      <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        {auctionData && auctionData.length > 0 ? (
          auctionData?.map(auction => (
            <div key={auction.id} className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">{formatTime(auction.startTime)}</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">{formatTime(auction.endTime)}</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Top Bidder Address:{" "}
                  <span className="text-amber-400 font-semibold">{auction.highestBidder || "N/A"}</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Bid Amount: <span className="text-amber-400 font-semibold">{auction.highestBid || "N/A"} AuA</span>
                </p>
                <Link
                  href={`/biddingpage/${auction.nftTokenId}`}
                  passHref
                  className={`bg-amber-500 hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
                >
                  <span>Place Bid</span>{" "}
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-white text-xl ml-96">No Auction going on right now!!. Come back later</h1>
        )}
      </div>
    </>
  );
};

export default Ongoing;
