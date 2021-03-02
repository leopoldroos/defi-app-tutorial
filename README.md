## Setup

Ensure node version > v12.0.0

Install Ganache: https://www.trufflesuite.com/ganache

Install specific Trufflesuite version globally: npm i -g truffle@v5.1.39

Install Solidity compiler globally: npm install -g solc@0.5.15 (or "brew install solidity", uncertain what made this option possible)
If issue with compiler version, Right click on the error, and change workspace compiler seems work, and select 5.1.17

Install Metamask plugin for chrome and singin with your account.

## Starting:

Make sure Ganache is running

Compile truffle:
`$ truffle compile` // builds contracts into contracts-build folder

`$ truffle migrate` // puts the smart contracts onto the blockchain
`$ truffle migrate --reset` // replace previsou smart contract that was put on the blockchainthe blockchain

Run truffle console:
`$ truffle console`
`truffle(development)> accounts = await web3.eth.getAccounts()`
`truffle(development)> balance = await mDai.balanceOf(accounts[1])`
`truffle(development)> formattedBalance = web3.utils.fromWei(balance)`
`truffle(development)> web3.utils.toWei('1.5', 'Ether')`

## Test:

`$ truffle test`

## Execute scripts:

`$ truffle exec scripts/issue-token.js`

## Notes from NextJS setup:

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
