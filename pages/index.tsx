import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount, useBalance, useContractRead, useContractWrite, useNetwork, useSignMessage } from "wagmi";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 mt-32">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl mb-2 font-bold">
              Welcome to AuctifyArt - where Digital Masterpieces Find Their Forever Home!
            </span>
            <span className="block text-xl p-14">
              Embark on a journey into the world of digital art and blockchain innovation. AuctifyArt is your gateway to
              discovering, bidding, and owning unique NFTs from talented creators around the globe. Immerse yourself in
              a community passionate about art, technology, and the boundless possibilities of the blockchain. 🎨
              Explore Ongoing Auctions, Bid Now, and Secure Your Own Piece of Digital Art History! 🚀
            </span>
          </h1>
          <p className="text-center mt-10 font-bold text-amber-400 text-2xl">Ongoing Auctions</p>
          <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Top Bidder Address: <span className="text-amber-400 font-semibold">0xe34....0987</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Bid Amount: <span className="text-amber-400 font-semibold">127 AuA</span>
                </p>
                <Link
                  href="/biddingpage?4"
                  passHref
                  className={`bg-amber-500 hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
                >
                  <span>Place Bid(please click me)</span>
                </Link>{" "}
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Top Bidder Address: <span className="text-amber-400 font-semibold">0xe34....0987</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Bid Amount: <span className="text-amber-400 font-semibold">127 AuA</span>
                </p>
                <Link
                  href="/biddingpage"
                  passHref
                  className={`bg-amber-500 hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
                >
                  <span>Place Bid(please click me)</span>
                </Link>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Top Bidder Address: <span className="text-amber-400 font-semibold">0xe34....0987</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Bid Amount: <span className="text-amber-400 font-semibold">127 AuA</span>
                </p>
                <button className="btn mt-4 w-32 bg-amber-500">Place Bid</button>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Top Bidder Address: <span className="text-amber-400 font-semibold">0xe34....0987</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Bid Amount: <span className="text-amber-400 font-semibold">127 AuA</span>
                </p>
                <button className="btn mt-4 w-32 bg-amber-500">Place Bid</button>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Top Bidder Address: <span className="text-amber-400 font-semibold">0xe34....0987</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Bid Amount: <span className="text-amber-400 font-semibold">127 AuA</span>
                </p>
                <button className="btn mt-4 w-32 bg-amber-500">Place Bid</button>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Top Bidder Address: <span className="text-amber-400 font-semibold">0xe34....0987</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Bid Amount: <span className="text-amber-400 font-semibold">127 AuA</span>
                </p>
                <button className="btn mt-4 w-32 bg-amber-500">Place Bid</button>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Top Bidder Address: <span className="text-amber-400 font-semibold">0xe34....0987</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Bid Amount: <span className="text-amber-400 font-semibold">127 AuA</span>
                </p>
                <button className="btn mt-4 w-32 bg-amber-500">Place Bid</button>
              </div>
            </div>
          </div>
          <p className="text-center mt-10 font-bold text-amber-400 text-2xl">Upcoming Auctions</p>
          <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Starts at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Starting Bid Amount: <span className="text-amber-400 font-semibold">50 AuA</span>{" "}
                </p>

                <button className="btn mt-4 w-32 bg-red-600">Be notified</button>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Starts at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Starting Bid Amount: <span className="text-amber-400 font-semibold">50 AuA</span>{" "}
                </p>

                <button className="btn mt-4 w-32 bg-red-600">Be notified</button>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Starts at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Starting Bid Amount: <span className="text-amber-400 font-semibold">50 AuA</span>{" "}
                </p>

                <button className="btn mt-4 w-32 bg-red-600">Be notified</button>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Starts at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Starting Bid Amount: <span className="text-amber-400 font-semibold">50 AuA</span>{" "}
                </p>

                <button className="btn mt-4 w-32 bg-red-600">Be notified</button>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Starts at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Starting Bid Amount: <span className="text-amber-400 font-semibold">50 AuA</span>{" "}
                </p>

                <button className="btn mt-4 w-32 bg-red-600">Be notified</button>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Starts at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Starting Bid Amount: <span className="text-amber-400 font-semibold">50 AuA</span>{" "}
                </p>

                <button className="btn mt-4 w-32 bg-red-600">Be notified</button>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Starts at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ends at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Starting Bid Amount: <span className="text-amber-400 font-semibold">50 AuA</span>{" "}
                </p>

                <button className="btn mt-4 w-32 bg-red-600">Be notified</button>
              </div>
            </div>
          </div>
          <p className="text-center mt-10 font-bold text-amber-400 text-2xl">Past Auctions</p>
          <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ended at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Winner Address: <span className="text-amber-400 font-semibold">0xe34....0987</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Starting Amount:<span className="text-amber-400 font-semibold">50 AuA</span>
                </p>

                <p className="w-full font-bold">
                  Winning Amount: <span className="text-amber-400 font-semibold">127 AuA</span>
                </p>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ended at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Winner Address: <span className="text-amber-400 font-semibold">0xe34....0987</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Starting Amount:<span className="text-amber-400 font-semibold">50 AuA</span>
                </p>

                <p className="w-full font-bold">
                  Winning Amount: <span className="text-amber-400 font-semibold">127 AuA</span>
                </p>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ended at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Winner Address: <span className="text-amber-400 font-semibold">0xe34....0987</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Starting Amount:<span className="text-amber-400 font-semibold">50 AuA</span>
                </p>

                <p className="w-full font-bold">
                  Winning Amount: <span className="text-amber-400 font-semibold">127 AuA</span>
                </p>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ended at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Winner Address: <span className="text-amber-400 font-semibold">0xe34....0987</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Starting Amount:<span className="text-amber-400 font-semibold">50 AuA</span>
                </p>

                <p className="w-full font-bold">
                  Winning Amount: <span className="text-amber-400 font-semibold">127 AuA</span>
                </p>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ended at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Winner Address: <span className="text-amber-400 font-semibold">0xe34....0987</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Starting Amount:<span className="text-amber-400 font-semibold">50 AuA</span>
                </p>

                <p className="w-full font-bold">
                  Winning Amount: <span className="text-amber-400 font-semibold">127 AuA</span>
                </p>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ended at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Winner Address: <span className="text-amber-400 font-semibold">0xe34....0987</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Starting Amount:<span className="text-amber-400 font-semibold">50 AuA</span>
                </p>

                <p className="w-full font-bold">
                  Winning Amount: <span className="text-amber-400 font-semibold">127 AuA</span>
                </p>
              </div>
            </div>
            <div className="carousel-item bg-white rounded-md">
              <img
                src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
                className="rounded-box w-1/2"
              />
              <div className="flex flex-col justify-center items-center p-4">
                <p className="w-full font-bold">
                  Started at: <span className="text-amber-400 font-semibold">08:42</span>
                </p>
                <p className="w-full font-bold">
                  Ended at: <span className="text-amber-400 font-semibold">10:42</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Winner Address: <span className="text-amber-400 font-semibold">0xe34....0987</span>{" "}
                </p>
                <p className="w-full font-bold">
                  Starting Amount:<span className="text-amber-400 font-semibold">50 AuA</span>
                </p>

                <p className="w-full font-bold">
                  Winning Amount: <span className="text-amber-400 font-semibold">127 AuA</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="btn mt-10 bg-black text-white hover:text-black">List your NFT to be auctioned</button>
          </div>
        </div>
      </div>
    </>
  );
};

// function PageBody() {
//   return (
//     <>
//       <p className="text-center text-lg">Here we are!</p>
//       <WalletInfo></WalletInfo>
//     </>
//   );
// }
// function WalletInfo() {
//   const { address, isConnecting, isDisconnected } = useAccount();
//   const { chain } = useNetwork();
//   if (address)
//     return (
//       <div>
//         <p>Your account address is {address}</p>
//         <p>Connected to the network {chain?.name}</p>
//         <WalletAction></WalletAction>
//         <WalletBalance address={address as `0x${string}`}></WalletBalance>
//         <TokenInfo address={address as `0x${string}`}></TokenInfo>
//       </div>
//     );
//   if (isConnecting)
//     return (
//       <div>
//         <p>Loading...</p>
//       </div>
//     );
//   if (isDisconnected)
//     return (
//       <div>
//         <p>Wallet disconnected. Connect wallet to continue</p>
//       </div>
//     );
//   return (
//     <div>
//       <p>Connect wallet to continue</p>
//     </div>
//   );
// }

// function WalletAction() {
//   const [signatureMessage, setSignatureMessage] = useState("");
//   const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage();
//   return (
//     <div className="card w-96 bg-primary text-primary-content mt-4">
//       <div className="card-body">
//         <h2 className="card-title">Testing signatures</h2>
//         <div className="form-control w-full max-w-xs my-4">
//           <label className="label">
//             <span className="label-text">Enter the message to be signed:</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Type here"
//             className="input input-bordered w-full max-w-xs"
//             value={signatureMessage}
//             onChange={e => setSignatureMessage(e.target.value)}
//           />
//         </div>
//         <button
//           className="btn btn-active btn-neutral"
//           disabled={isLoading}
//           onClick={() =>
//             signMessage({
//               message: signatureMessage,
//             })
//           }
//         >
//           Sign message
//         </button>
//         {isSuccess && <div>Signature: {data}</div>}
//         {isError && <div>Error signing message</div>}
//       </div>
//     </div>
//   );
// }

// function WalletBalance(params: { address: `0x${string}` }) {
//   const { data, isError, isLoading } = useBalance({
//     address: params.address,
//   });
//   if (isLoading) return <div>Fetching balance</div>;
//   if (isError) return <div>Error fetching balance</div>;
//   return (
//     <div className="card w-96 bg-primary text-primary-content mt-4">
//       <div className="card-body">
//         <h2 className="card-title">Testing useBalance wagmi hook</h2>
//         Balance: {data?.formatted} {data?.symbol}
//       </div>
//     </div>
//   );
// }

// function TokenInfo(params: { address: `0x${string}` }) {
//   return (
//     <div className="card w-96 bg-primary text-primary-content mt-4">
//       <div className="card-body">
//         <h2 className="card-title">Testing useContractRead wagmi hook</h2>
//         <TokenName></TokenName>
//         <TokenBalance address={params.address}></TokenBalance>
//       </div>
//     </div>
//   );
// }

// function TokenName() {
//   const { data, isError, isLoading } = useContractRead({
//     address: "0x37dBD10E7994AAcF6132cac7d33bcA899bd2c660",
//     abi: [
//       {
//         constant: true,
//         inputs: [],
//         name: "name",
//         outputs: [
//           {
//             name: "",
//             type: "string",
//           },
//         ],
//         payable: false,
//         stateMutability: "view",
//         type: "function",
//       },
//     ],
//     functionName: "name",
//   });
//   const name = typeof data === "string" ? data : 0;
//   if (isLoading) return <div>Fetching name...</div>;
//   if (isError) return <div>Error fetching name</div>;
//   return <div>Token name: {name}</div>;
// }

// function TokenBalance(params: { address: `0x${string}` }) {
//   const { data, isError, isLoading } = useContractRead({
//     address: "0x37dBD10E7994AAcF6132cac7d33bcA899bd2C660",
//     abi: [
//       {
//         constant: true,
//         inputs: [
//           {
//             name: "_owner",
//             type: "address",
//           },
//         ],
//         name: "balanceOf",
//         outputs: [
//           {
//             name: "balance",
//             type: "uint256",
//           },
//         ],
//         payable: false,
//         stateMutability: "view",
//         type: "function",
//       },
//     ],
//     functionName: "balanceOf",
//     args: [params.address],
//   });
//   const balance = typeof data === "number" ? data : 0;
//   if (isLoading) return <div>Fetching balance...</div>;
//   if (isError) return <div>Error fetching balance</div>;
//   return <div>Balance: {balance}</div>;
// }
export default Home;
