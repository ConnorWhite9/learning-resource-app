import React from 'react';
import image from '../assets/streak.png';

const Streak = ({ streak }) => {
    return (
        <div className="flex items-center ml-[0.5rem] gap-2">
            <span className="text-orange-500"><img className="w-[40px] h-[40px] max-[730px]:hidden " src={image} /></span> {/* Fire emoji */}
            <span className="text-[1rem] font-semibold">
                {streak} Day Streak
            </span>
        </div>
    );
};

export default Streak;