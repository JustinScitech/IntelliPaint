import React from 'react';
import { download } from '../assets';
import { ideaPrompts } from '../prompts';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="rounded-br-xl group relative shadow-card hover:shadow-cardhover card">
      <img className="w-full h-auto object-cover rounded-xl" src={photo} alt={prompt} />
      
      <div className="group-hover:flex flex-col max-h-[100%] hidden absolute bottom-0 right-0 left-0 bg-black m-2 p-4 rounded-md text-xs font-thin text-white">
      
      <p className="text-white overflow-y-auto prompt text-sm">{prompt}</p>
      <div className="mt-5 justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center w-20 h-7 rounded-md object-cover text-xs font-medium">
            <p>Author: {name}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Card;
