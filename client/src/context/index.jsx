import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xFe1189d04e574BE81c3bf7055b9bB3A00D59Dfe4');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCompain');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description, // description
        form.goal, // goal
        new Date(form.deadline).getTime(), // deadline
        form.image, // image
      ]);
    } catch (error) {
      console.log("Contract call error",error);
    }
    
  };

  const getCampaigns = async () => { 
    try {
      const campaigns = await contract.call('getCompaigns');
      const data = campaigns.map((campaign, id) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        goal: ethers.utils.formatEther(campaign.goal.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pid: id,
      }));
      return data;
    } catch (error) {
      console.log("Contract call error",error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  )
};

export const useStateContext = () => useContext(StateContext);
