import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Upcoming: NextPage = () => {
  const [auctionData, setAuctionData] = useState<[{}]>([{}]);
  useEffect(() => {
      const apiEndpoint = '/api/upcoming'; // Replace with your actual API endpoint
      // Make the API call using Axios
      axios.post(apiEndpoint)
        .then(response => {
          // Handle API response
          setAuctionData(response.data);
          // console.log(auctionData);
          console.log('API Response:', response.data);
        })
        .catch(error => {
          // Handle API error
          console.error('API Error:', error);
        });
  }, []);
  return (
    <>
      <p className="text-4xl text-black text-center mt-32">Upcoming Auctions Page</p>
      <p className="text-center mt-10 font-bold text-amber-400 text-2xl">Upcoming Auctions</p>
      <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        <div className="carousel-item bg-white rounded-md">
          <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" className="rounded-box w-1/2" />
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
          <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" className="rounded-box w-1/2" />
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
          <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" className="rounded-box w-1/2" />
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
    </>
  );
};
export default Upcoming;
