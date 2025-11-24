import React from "react"; 


const HereSection = () => { 
  return ( 
    <div class='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("https://wallpapercave.com/wp/wp9049818.jpg")] bg-cover bg-center h-screen'> 
      <img 
        alt="" 
        class="max-h-11 lg:h-11 mt-20" 
        src="/assets/marvelLogo-D2PF-9pQ.svg" 
      /> 
      <h1 class="text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110"> 
        Guardians <br /> of the Galaxy 
      </h1> 
      <div class="flex items-center gap-4 text-gray-300"> 
        <span>Action | Adventure | Sci-Fi</span> 
        <div class="flex items-center gap-1"> 
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="lucide lucide-calendar w-4.5 h-4.5" 
            aria-hidden="true" 
          > 
            <path d="M8 2v4"></path> 
            <path d="M16 2v4"></path> 
            <rect width="18" height="18" x="3" y="4" rx="2"></rect> 
            <path d="M3 10h18"></path> 
          </svg>{" "} 
          2018 
        </div> 
        <div class="flex items-center gap-1"> 
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="lucide lucide-clock w-4.5 h-4.5" 
            aria-hidden="true" 
          > 
            <circle cx="12" cy="12" r="10"></circle> 
            <polyline points="12 6 12 12 16 14"></polyline> 
          </svg>{" "} 
          2h 8m 
        </div> 
      </div> 
      <p class="max-w-md text-gray-300"> 
        In a post-apocalyptic world where cities ride on wheels and consume each 
        other to survive, two people meet in London and try to stop a 
        conspiracy. 
      </p> 
      <button class="flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition bg-red-500 rounded-full font-medium cursor-pointer"> 
        Explore Movies 
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          class="lucide lucide-arrow-right w-5 h-5" 
          aria-hidden="true" 
        > 
          <path d="M5 12h14"></path> 
          <path d="m12 5 7 7-7 7"></path> 
        </svg> 
      </button> 
    </div> 
  ); 
}; 


export default HereSection; 