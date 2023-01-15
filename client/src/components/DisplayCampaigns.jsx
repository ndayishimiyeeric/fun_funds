import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import CampaignCard from './CampaignCard';

const DisplayCampaigns = ({ title, campaigns, isLoading }) => {
  const navigate = useNavigate();
  const handleNavigate = (campaign) => {
    navigate(`/campaign/${campaign.title}`, { state: campaign });
  };
  return (
    <div>
      <h1
        className="font-epilogue font-semibold text-white text-left"
      >
        {title} ({campaigns.length})
      </h1>
      <div
        className="flex flex-wrap mt-[20px] gap-[26px]"
      >
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}
        {!isLoading && campaigns.length === 0 && (
          <p
            className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#808191]"
          >
            No campaigns available
          </p>
        )}
        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.pid}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
          />
        ))}
      </div>
    </div>
  )
}

export default DisplayCampaigns