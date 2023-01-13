// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract FunFunding {
    struct Compaign {
        address owner;
        string title;
        string description;
        uint256 goal;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] contributors;
        uint256[] contributions;
    }

    mapping(uint256 => Compaign) public compaigns;

    uint256 public compaignCount = 0;

    // create a compaign
    function createCompain(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _goal,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        // create a new compaign
        Compaign storage compain = compaigns[compaignCount];

        // check if the compaign is valid
        require(
            compain.deadline < block.timestamp,
            "The deadline should be in the future"
        );

        // set the compaign details
        compain.owner = _owner;
        compain.title = _title;
        compain.description = _description;
        compain.goal = _goal;
        compain.deadline = _deadline;
        compain.amountCollected = 0;
        compain.image = _image;

        // increment the compaign count
        compaignCount++;

        // return the compaign id
        return compaignCount - 1;
    }

    // contribute to a compaign
    function contribute(uint256 _id) public payable {
        // get the amount sent
        uint256 amount = msg.value;

        // get the compaign
        Compaign storage compain = compaigns[_id];

        // populate the compaign details
        compain.contributors.push(msg.sender);
        compain.contributions.push(amount);

        // increment the amount collected
        (bool success, ) = payable(compain.owner).call{value: amount}(""); // send the amount to the owner

        // check if the transaction was successful
        if (success) {
            compain.amountCollected = compain.amountCollected += amount;
        }
    }

    // get the contributors and contributions
    function getcontributors(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        // get the compaign
        Compaign storage compain = compaigns[_id];

        // return the contributors and contributions
        return (compain.contributors, compain.contributions);
    }

    // get the compaigns
    function getCompaigns() public view returns (Compaign[] memory) {
        // create a new array of compaigns
        Compaign[] memory _compaigns = new Compaign[](compaignCount);

        // loop through the compaigns
        for (uint256 i = 0; i < compaignCount; i++) {
            // get the compaign
            Compaign storage compain = compaigns[i];

            // populate the compaigns array
            _compaigns[i] = compain;
        }

        // return the compaigns
        return _compaigns;
    }
}
