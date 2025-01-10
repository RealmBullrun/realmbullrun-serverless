import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ShareOnTwitterButtonProps {
  url: string; // The URL of the page you want to share
  text: string; // The text that will accompany the URL
  via?: string; // Optional Twitter username of the content author
  hashtags?: string; // Optional hashtags appended to the tweet
}

const ShareOnTwitterButton: React.FC<ShareOnTwitterButtonProps> = ({
  url,
  text,
  via,
  hashtags,
}) => {
  const createTwitterLink = () => {
    let twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`;

    if (via) {
      twitterUrl += `&via=${encodeURIComponent(via)}`;
    }

    if (hashtags) {
      twitterUrl += `&hashtags=${encodeURIComponent(hashtags)}`;
    }

    return twitterUrl;
  };

  return (
    <Link className="bg-border p-1.5 rounded-md hover:scale-95" href={createTwitterLink()} target="_blank">
      <Image width={48} height={48} alt="copy" src={'/share.png'} />

      {/*  <svg fill="#000000" height="24" width="24" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 481.6 481.6" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M381.6,309.4c-27.7,0-52.4,13.2-68.2,33.6l-132.3-73.9c3.1-8.9,4.8-18.5,4.8-28.4c0-10-1.7-19.5-4.9-28.5l132.2-73.8 c15.7,20.5,40.5,33.8,68.3,33.8c47.4,0,86.1-38.6,86.1-86.1S429,0,381.5,0s-86.1,38.6-86.1,86.1c0,10,1.7,19.6,4.9,28.5 l-132.1,73.8c-15.7-20.6-40.5-33.8-68.3-33.8c-47.4,0-86.1,38.6-86.1,86.1s38.7,86.1,86.2,86.1c27.8,0,52.6-13.3,68.4-33.9 l132.2,73.9c-3.2,9-5,18.7-5,28.7c0,47.4,38.6,86.1,86.1,86.1s86.1-38.6,86.1-86.1S429.1,309.4,381.6,309.4z M381.6,27.1 c32.6,0,59.1,26.5,59.1,59.1s-26.5,59.1-59.1,59.1s-59.1-26.5-59.1-59.1S349.1,27.1,381.6,27.1z M100,299.8 c-32.6,0-59.1-26.5-59.1-59.1s26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1S132.5,299.8,100,299.8z M381.6,454.5 c-32.6,0-59.1-26.5-59.1-59.1c0-32.6,26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1C440.7,428,414.2,454.5,381.6,454.5z"></path> </g> </g></svg>
      */} {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
      </svg> */}
    </Link>
  );
};

export default ShareOnTwitterButton;