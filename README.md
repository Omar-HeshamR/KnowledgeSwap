# KnowledgeSwap
KnowledgeSwap Live Repository. Project will be working on the BTTC and MATIC mainnets.

## Inspiration
Sometimes, information must be received immediately with no strings attached. Even though the Internet has made attaining information much easier, this process is filled with a multitude of issues. For starters, when you create an inquiry that hasn’t been asked before, it can take a very long time to get an appropriate and engaging response. This is simply because users on the internet are simply not incentivized to answer your inquiry and the inquiry hasn’t reached many users who may be willing to offer input; there is no way to guarantee your inquiry will reach all corners of the globe. Additionally, individuals seeking to ask a sensitive question may feel intimidated since their identity is attached to the question; there is no guaranteed anonymity when asking for such information. 

Since blockchain technology and implementation guarantees a framework in which decentralization, self-sustainability, and global reach is at the forefront; we determined that building a new and better way to build an application around sharing and receiving information should implement the blockchain and embrace decentralization. Additionally, BTTC unlocks further outreach and network safety due to its compatibility with three major blockchains (TRON, Ethereum, and Binance). With realities in mind, we set out to develop KnowledgeSwap.

## What it does
**Summary ->** Meet KnowledgeSwap, the solution to all the problems stated above and many more. In essence, KnowledgeSwap is a decentralized application in which users can ask questions, solve asked questions, and learn by viewing previously asked questions on the blockchain. Whenever a user creates an inquiry, a bounty of KnowledgeSwap Tokens (the token of the platform) is attached to that specific inquiry. The most compelling answer (which is determined by the inquirer) is awarded that bounty; this in return incentives users all across the blockchain to share information in the most compelling and engaging way, creating a self-sustaining decentralized platform. 

**Users Interested in Learning:** Users interested in acquiring new knowledge by analyzing past answered inquiries can do so in the learning feed. A minimum of 1000 KnowledgeSwap Tokens is required to enter the learning feed. Once there, users can view every single answered inquiry on the application to expand their knowledge. 

**Users Interested in Solving:** Users interested in teaching and answering inquiries can do so in the solving feed. Users can pick any question they would like to answer; they have complete freedom of choice when selecting which questions they intend to answer. The answer the user who asked the question selects as the most valid is rewarded with a bounty attached to that specific inquiry. Hence, individuals who want to share information in that particular inquiry will be competing against time and each other to see who can come up with the most optimal response. 

**Users Interested in Asking:** Users seeking new knowledge and intending to ask educational questions can do so in the asking feed. A minimum of 300 KnowledgeSwap Tokens is required to start asking questions in the feed. Placing higher bounties is recommended if users want faster and more compelling answers to their inquiries. In this way, the demand to solve their questions would be greater. Nevertheless, the final choice in which solution will be rewarded with the bounty is up to the user who asked the question; users seeking new knowledge have complete freedom in deciding which solution to grant as most valid. 

**KnowledgeSwap Credibility Tokens:** KnowledgeSwap Credibility Tokens are awarded to users whose solutions have been granted as most valid by the user asking the question. As a result, users with more KnowledgeSwap Credibility Tokens are considered more reliable and credible on the application. Every time the solution posted by the user is granted as most valid, that user gains 1 KnowledgeSwap Credibility Token. Unlike, KnowledgeSwap Tokens, KnowledgeSwap Credibility Tokens can not be bought, traded, or sold. 

## Use Cases
The application can be used in the following but not limited to cases of utilization:
- Anyone who needs a quick, engaging, and thoughtful reply to an inquiry.
- College students seeking homework help or assistance.
- Tourists who need quick information from locals whilst on vacation.
- Individuals seeking information or anecdotal experiences about odd medical conditions or experiences.
- University students preparing exams by either asking or viewing answered inquiries. 
- Developers intending to solve bugs quickly to save time on writing or refining code.
- Users who intend to ask sensitive questions whilst also wanting to remain completely anonymous, or users who just wish to remain anonymous in general.
- Individuals who are knowledgeable or experts in certain fields looking for a quick side gig.
- Entrepreneurs, developers, or creative thinkers aspiring to generate a multitude of ideas on an upcoming project or development. 

## How we built it
We utilized HyperText Markup Language, Cascading style sheets, and React JS for our application front end. We established NextJS as our framework to organize our web application structure. We administered the backend with NodeJS, Metamask, Ethers, and Hardhat.

## Challenges we ran into
- We also ran into many challenges regarding making the app have a successful business model. For example, how to always keep high incentives for users to answer inquiries, prevent users from not rewarding the correct answer, and ensure that the user will not cycle tokens to himself or gain fake credibility. All those issues were addressed and solved either live or in the what’s next section.
- We ran into multiple challenges when it came to integrating all the functionalities into a straightforward and user-friendly user interface that runs smoothly. We also ran into many problems that reduced the simplicity of the user experience. We were able to overcome all the difficulties we have run into so far.

## Accomplishments that we're proud of
- We are very proud of completing this significant progress in a brief period, and with this rate, we can push the product to a great level as time goes on.
- We are proud that our self-sustaining application can still dodge many problems that prevent it from succeeding. Still, we were able to come up with ideas and creative solutions that would make the app as viable as possible.
- We are incredibly proud that we created a decentralized protocol solution that solves many significant problems and unlocks global access to knowledge.

## What we learned
- We learned that creating a new solution that beats existing products takes time and effort. But we also learned that this challenge could be overcome by using fresh, modern, and revolutionary technologies. In addition to utilizing new technologies, we also learned that you need to critically analyze and problem-solve all the unique issues that arise with your new solution, especially if it's going to be decentralized; there will be a need to predict all possible forms of malicious activities and put prevention methods to it.

## What's next for KnowledgeSwap
- Data compress all the replies so that the transaction fees of questions and replies are as little as possible. Potentially upgrade it so that it only holds a URI on the blockchain, and the URI will decentralized store it on IPFS, hence reducing cost.
- A very comprehensive search system by topics, and link topics to questions to make it super easy to answer questions of your expertise.
- Make a Staking contract, so that the user needs to have his tokens staked, thus one way to counter malicious behavior.
- An upvote system that allows all wallet viewers to provide input on replies. The upvote system will also be linked to the credibility system. Even if your response is not selected by the inquirer as most valid, you can still be rewarded with KnowledgeSwap Credibility Tokens based on your upvote count. In return, this still encourages users to reply, even if they have not been rewarded with the bounty, creating more responsive and engaging threads.
- Making the asker be allowed also to award multiple answers a credibility token rather than just the winner to incentivize repliers further to become more active.
- Implementing zero-knowledge authentication to ensure solvers and askers are not forging fake credibility or acquiring tokens incorrectly or maliciously. 
- Bounty-splitting on problems, we want the asker to be able to split his bounty to multiple responses that he is satisfied with to encourage solvers further into responding, and thus, creating more responsive and engaging threads.
- Add a KnowledgeSwap governance DAO, but unlike any other DAO, your power will be linked to both your KnowledgeSwap token and your credibility tokens. Hence, active users can have meaningful changes pushed to the platform, not just whales.
- Reducing the number of times users need to wait for block confirmations by increasing code efficiency and the number of times users need to sign a transaction, to simplify the experience.
- Developing a smart contract for the credibility airdrops and giveaways for people who have worked hard and earned many credibility tokens. This will decentralize the reward of credible replies.
- Redesigning the smart contracts into safe, non-outside executable smart contracts and auditing them to ensure their total safety and self-sustainability. 

