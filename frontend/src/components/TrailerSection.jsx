import React from "react";
import { dummyTrailers } from "./DummyData";
import ReactPlayer from "react-player";
import { PlayCircleIcon } from "lucide-react";


const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = React.useState(dummyTrailers[0]);
  return (
    <div className="my-20 px-4 md:px-16 lg:px-40 w-full max-w-smxl text-2xl">
      <p className="mb-10">Trailers</p>
      <div>
        <div className="relative w-full mx-auto aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
          <ReactPlayer
            src={currentTrailer.videoUrl}
            width="100%"
            height="100%"
            controls={false}
          />
        </div>
      </div>
      <div className="grid grid-cols-4  gap-6 mt-6 overflow-x-auto whitespace-nowrap py-2">
        {
          dummyTrailers.map((trailer) => (
            <div key={trailer.id} className="inline-block relative mr-4 cursor-pointer" onClick={() => setCurrentTrailer(trailer)}>
              <img
                src={`https://img.youtube.com/vi/${new URL(trailer.videoUrl).searchParams.get("v")}/0.jpg`}
                alt={`Trailer ${trailer.id}`}
                className="w-full h-full object-cover"
              />
              <PlayCircleIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 md:w-12 md:h-12 text-white opacity-75" />
            </div>
          ))
        }
      </div>
    </div>
  );
};


export default TrailerSection;
