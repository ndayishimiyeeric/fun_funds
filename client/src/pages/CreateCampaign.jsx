import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context';

import { money } from '../assets';
import { CustomButton, FormField } from '../components';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    goal: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    const value = e.target.value;
    setForm({ ...form, [fieldName]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { name, title, description, goal, deadline, image } = form;

    if (!name || !title || !description || !goal || !deadline || !image) {
      alert('Please fill all the fields');
      setIsLoading(false);
      return;
    }

    checkIfImage(image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({ ...form, goal: ethers.utils.parseUnits(goal, 18) });
        setIsLoading(false);
        navigate('/campaigns');
      } else {
        alert('Please enter a valid image URL');
        setForm({ ...form, image: '' });
        setIsLoading(false);
      }
    })
  }

  return (
    <div
      className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4"
    >
      {isLoading && 'Loading...'}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1
          className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-[30px] mt-[65px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="Enter your name"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Enter campaign title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>
        <FormField
          labelName="Story *"
          placeholder="Tell us about your campaign"
          isTextArea={true}
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div
          className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] rounded-[10px] h-[120px]"
        >
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4
            className="font-epilogue font-bold text-[25px] text-white ml-[20px]"
          >
            You will get 100% of the raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.00"
            inputType="text"
            value={form.goal}
            handleChange={(e) => handleFormFieldChange('goal', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>
          <FormField
            labelName="Campaign image *"
            placeholder="Place image URL here"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title={isLoading ? 'Loading...' : 'Create new Campaign'}
            disabled={isLoading}
            styles="bg-[#1dc071] text-white font-bold text-[18px] leading-[38px]"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign