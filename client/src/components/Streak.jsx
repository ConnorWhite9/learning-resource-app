import React from 'react';

const Streak = ({ streak }) => {
    return (
        <div className="flex items-center ml-[0.5rem]">
            <span className="text-[2.5rem] text-orange-500">🔥</span> {/* Fire emoji */}
            <span className="text-[1rem] font-semibold">
                {streak} Day Streak
            </span>
        </div>
    );
};

export default Streak;