import React from "react";

const TeamCards = (member) => {
  return (
    <>
      <div className="bg-gradient-to-tl from-transparent via-slate-300 p-[2px] rounded-xl">
        <div className="flex h-full flex-col items-center bg-white dark:bg-[#111927]/90 p-8 rounded-[calc(0.75rem-2px)] border-2 border-gray-300 shadow-lg gap-2">
          <img
            src={member.image}
            alt={member.name}
            className="w-48 h-48 rounded-full object-cover mb-4"
          />
          <h3 className="text-2xl font-semibold dark:text-white">
            {member.name}
          </h3>
          <p className="text-xl dark:text-gray-400">{member.role}</p>
          <p className="text-lg dark:text-gray-300">{member.description}</p>
        </div>
      </div>
    </>
  );
};

export default TeamCards;
