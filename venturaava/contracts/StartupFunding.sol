// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract StartupFunding {
    struct Funder {
        address funderAddress;
        uint256 amount;
    }

    struct EquityHolder {
        string name;
        uint256 percentage;
    }

    struct Startup {
        address owner;
        string title;
        string description;
        EquityHolder[] equityHolders; // Array of EquityHolder structs
        string pitchVideo; // URL or IPFS hash of pitch video
        string image;
        string documents; // URL or IPFS hash of business licenses, tax papers, etc.
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        Funder[] funders; // Array of Funder structs
    }

    struct LoanRequest {
        address requester;
        string name;
        string purpose;
        uint256 amount;
        uint256 duration;
        uint256 amountCollected;
        Funder[] lenders; // Array of lenders who have funded the loan
        bool repaid;
    }

    mapping(uint256 => Startup) public startups;
    mapping(uint256 => LoanRequest) public loanRequests;

    uint256 public numberOfStartups = 0;
    uint256 public numberOfLoans = 0;

    // Create a new startup campaign
    function createStartup(
        address _owner,
        string memory _title,
        string memory _description,
        EquityHolder[] memory _equityHolders, // Pass equity holders as an array
        string memory _pitchVideo,
        string memory _image,
        string memory _documents, // Add document field
        uint256 _target,
        uint256 _deadline
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in the future");

        Startup storage startup = startups[numberOfStartups];

        startup.owner = _owner;
        startup.title = _title;
        startup.description = _description;
        startup.pitchVideo = _pitchVideo;
        startup.image = _image;
        startup.documents = _documents; // Store document information
        startup.target = _target;
        startup.deadline = _deadline;
        startup.amountCollected = 0;

        for (uint256 i = 0; i < _equityHolders.length; i++) {
            startup.equityHolders.push(_equityHolders[i]);
        }

        numberOfStartups++;

        return numberOfStartups - 1;
    }

    // Fund a startup campaign
    function fundStartup(uint256 _id) public payable {
        uint256 amount = msg.value;
        Startup storage startup = startups[_id];

        require(block.timestamp < startup.deadline, "Funding period has ended");
        require(
            startup.amountCollected < startup.target,
            "Funding target reached"
        );

        startup.funders.push(Funder(msg.sender, amount));

        startup.amountCollected += amount;
    }

    // Withdraw funds from a startup campaign after the deadline has passed
    function withdrawFunds(uint256 _id) public {
        Startup storage startup = startups[_id];
        require(
            msg.sender == startup.owner,
            "Only the owner can withdraw funds"
        );
        require(
            block.timestamp > startup.deadline,
            "Cannot withdraw funds before the deadline"
        );
        require(
            startup.amountCollected >= startup.target,
            "Funding target not met"
        );

        uint256 amount = startup.amountCollected;
        startup.amountCollected = 0;

        (bool sent, ) = payable(startup.owner).call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    // Get the funders of a specific startup campaign
    function getFunders(uint256 _id) public view returns (Funder[] memory) {
        return startups[_id].funders;
    }

    // Get the equity holders of a specific startup
    function getEquityHolders(
        uint256 _id
    ) public view returns (EquityHolder[] memory) {
        return startups[_id].equityHolders;
    }

    // Get all startups
    function getStartups() public view returns (Startup[] memory) {
        Startup[] memory allStartups = new Startup[](numberOfStartups);

        for (uint256 i = 0; i < numberOfStartups; i++) {
            Startup storage item = startups[i];
            allStartups[i] = item;
        }

        return allStartups;
    }

    // Create a new loan request
    function requestLoan(
        address _requester,
        string memory _name,
        string memory _purpose,
        uint256 _amount,
        uint256 _duration
    ) public returns (uint256) {
        LoanRequest storage loanRequest = loanRequests[numberOfLoans];

        loanRequest.requester = _requester;
        loanRequest.name = _name;
        loanRequest.purpose = _purpose;
        loanRequest.amount = _amount;
        loanRequest.duration = _duration;
        loanRequest.amountCollected = 0;
        loanRequest.repaid = false;

        numberOfLoans++;

        return numberOfLoans - 1;
    }

    // Fund a loan request
    function fundLoan(uint256 _id) public payable {
        uint256 amount = msg.value;
        LoanRequest storage loanRequest = loanRequests[_id];

        require(
            loanRequest.amountCollected < loanRequest.amount,
            "Loan fully funded"
        );

        loanRequest.lenders.push(Funder(msg.sender, amount));
        loanRequest.amountCollected += amount;
    }

    // Withdraw loan funds by the requester
    function withdrawLoanFunds(uint256 _id) public {
        LoanRequest storage loanRequest = loanRequests[_id];
        require(
            msg.sender == loanRequest.requester,
            "Only the requester can withdraw funds"
        );
        require(
            loanRequest.amountCollected >= loanRequest.amount,
            "Loan target not met"
        );

        uint256 amount = loanRequest.amountCollected;
        loanRequest.amountCollected = 0;

        (bool sent, ) = payable(loanRequest.requester).call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    // Repay loan with interest
    function repayLoan(uint256 _id) public payable {
        LoanRequest storage loanRequest = loanRequests[_id];
        require(
            msg.sender == loanRequest.requester,
            "Only the requester can repay the loan"
        );
        require(!loanRequest.repaid, "Loan already repaid");

        uint256 repaymentAmount = loanRequest.amount +
            (loanRequest.amount / 10); // 10% interest
        require(msg.value >= repaymentAmount, "Insufficient repayment amount");

        loanRequest.repaid = true;

        for (uint256 i = 0; i < loanRequest.lenders.length; i++) {
            Funder storage lender = loanRequest.lenders[i];
            uint256 lenderAmount = lender.amount + (lender.amount / 10); // 10% interest to lenders

            (bool sent, ) = payable(lender.funderAddress).call{
                value: lenderAmount
            }("");
            require(sent, "Failed to repay lender");
        }
    }

    // Get the lenders of a specific loan request
    function getLenders(uint256 _id) public view returns (Funder[] memory) {
        return loanRequests[_id].lenders;
    }

    // Get all loan requests
    function getLoanRequests() public view returns (LoanRequest[] memory) {
        LoanRequest[] memory allLoanRequests = new LoanRequest[](numberOfLoans);

        for (uint256 i = 0; i < numberOfLoans; i++) {
            LoanRequest storage item = loanRequests[i];
            allLoanRequests[i] = item;
        }

        return allLoanRequests;
    }
}
