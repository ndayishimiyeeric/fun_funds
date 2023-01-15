import React from 'react';
import { tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';

const CampaignCard = ({ owner, title, description, goal, deadline, amountCollected, image, handleClick }) => {
  const days = daysLeft(deadline);
  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="campaign"
        className="w-full h-[157px] object-cover rounded-[15px]"
      />
      <div
        className="flex flex-col p-4"
      >
        <div
          className="flex items-center mb-[18px]"
        >
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p
            className="ml-[12px] mt-[2px] font-epilogue font-semibold text-[12px] leading-[22px] text-[#808191]"
          >
            Category
          </p>
        </div>
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left truncate leading-[26px]">{title}</h3>
          <p className="mp-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{description}</p>
        </div>
        <div className="flex justify-between flex-wrap gap-2 mt-[15px]">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{amountCollected}</h4>
            <p className="font-epilogue font-normal mt-[3px] leading-[18px] text-[#808191] truncate sm:max-w-[120px]">Raised of {goal}</p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{days}</h4>
            <p className="font-epilogue font-normal mt-[3px] leading-[18px] text-[#808191] truncate sm:max-w-[120px]">Days Left</p>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-[#13131a]">
            <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain" />
          </div>
          <p
            className="font-epilogue font-normal text-[12px] leading-[22px] text-[#808191] truncate"
          >
            By{' '}
            <span
              className="text-[#b2b3bd]"
            >
              {owner}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CampaignCard
