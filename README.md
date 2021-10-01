# NEAR Library Starter Kit
## 📄 Introduction
NEAR Library is a smart contract where you can to create, rate, comment, store and transfer books using the NEAR protocol, making a library online where you can request one book and change the owner. The following are the main functionalities of this smart contract:

Add a Book to the library.
Get all the list of Books.
Get only the books that you added.
Rate a book.
Add a comment where you describe why do you liked... or not.
Transfer the book to another Owner.
## 📦 Installation
To run this project locally you need to follow the next steps:

### Step 1: Prerequisites
Make sure you've installed [Node.js] ≥ 12 (we recommend use [nvm])

Make sure you've installed yarn: npm install -g yarn

Install dependencies: yarn install

Create a test near account [NEAR test account]

Install the NEAR CLI globally: [near-cli] is a command line interface (CLI) for interacting with the NEAR blockchain

yarn install --global near-cli

### Step 2: Configure your NEAR CLI
Configure your near-cli to authorize your test account recently created:

near login
### Step 3: Build and make a smart contract development deploy
Build the NEAR library smart contract code and deploy the local development server: yarn build:release (see package.json for a full list of scripts you can run with yarn). This script return to you a provisional smart contract deployed (save it to use later). You can also follow the instructions on the folder scripts.

## 📑 Exploring the NEAR library smart contract methods
The following commands allow you to interact with the smart contract methods using the NEAR CLI (for this you need to have a provisional smart contract deployed).

Information: the command for rate will require especific data (AccountId, Rate)

Rate values:

- The value 0 represents a bad rate.
- The value 1 represents a regular rate.  
- The value 2 represents a awesome rate.    
### Command to add a book:
near call $CONTRACT AddBook '{"isbn": "string","name":"string","description":"string","numpage":"number","author":"string","datepublished":"date","editions":"number"}' --account-id <your test account>
### Command to get all the books on the library:
near view $CONTRACT getBooks
### Command to get a specific book in the library:
near view $CONTRACT getBook '{"id":int}'
### Command to get the number of Books added:
near view <your deployed contract> getNBooks
Thing that we can add in the future

### Command to rate a book:
 near call $CONTRACT rate '{"id":3,"valor":2}' --accountId joehank.testnet
### Command to see the rates of a book:
 near call $CONTRACT rate '{"id":3}' --accountId joehank.testnet
### Command to comment a book:
 near call $CONTRACT comment '{"id":3,"comment":"i love it"}' --accountId joehank.testnet
### Command to see the rates of a book:
 near call $CONTRACT getComments '{"id":3}' --accountId joehank.testnet
### WireFraming
https://www.figma.com/file/I7oewIevwZP5LAAsPOUel0/Untitled?node-id=7%3A49


## Commands
near view tammm.testnet getAllEvent5s 

near view tammm.testnet getAllCertificates 

near call tammm.testnet addEvent '{"text":"pathimage","code":"123234","dateStart":"2021-10-02","dateEnd":"2021-10-04"}' --account-id tammm.testnet

near call tammm.testnet addCertificate '{"text":"123234"}' --account-id tammm.testnet

Example:
near call tammm.testnet addEvent '{"text":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOmKjNt5bf4t-Z-oos2LPHzOBs63IQZsfIag&usqp=CAU","code":"123234","dateStart":"2021-10-02","dateEnd":"2021-10-04"}' --account-id tammm.testnet

### test

yarn asp

Guest Book
==========

[![Build Status](https://travis-ci.com/near-examples/guest-book.svg?branch=master)](https://travis-ci.com/near-examples/guest-book)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/near-examples/guest-book)

<!-- MAGIC COMMENT: DO NOT DELETE! Everything above this line is hidden on NEAR Examples page -->

Sign in with [NEAR] and add a message to the guest book! A starter app built with an [AssemblyScript] backend and a [React] frontend.


Quick Start
===========

To run this project locally:

1. Prerequisites: Make sure you have Node.js ≥ 12 installed (https://nodejs.org), then use it to install [yarn]: `npm install --global yarn` (or just `npm i -g yarn`)
2. Run the local development server: `yarn && yarn dev` (see `package.json` for a
   full list of `scripts` you can run with `yarn`)

Now you'll have a local development environment backed by the NEAR TestNet! Running `yarn dev` will tell you the URL you can visit in your browser to see the app.


Exploring The Code
==================

1. The backend code lives in the `/assembly` folder. This code gets deployed to
   the NEAR blockchain when you run `yarn deploy:contract`. This sort of
   code-that-runs-on-a-blockchain is called a "smart contract" – [learn more
   about NEAR smart contracts][smart contract docs].
2. The frontend code lives in the `/src` folder.
   [/src/index.html](/src/index.html) is a great place to start exploring. Note
   that it loads in `/src/index.js`, where you can learn how the frontend
   connects to the NEAR blockchain.
3. Tests: there are different kinds of tests for the frontend and backend. The
   backend code gets tested with the [asp] command for running the backend
   AssemblyScript tests, and [jest] for running frontend tests. You can run
   both of these at once with `yarn test`.

Both contract and client-side code will auto-reload as you change source files.


Deploy
======

Every smart contract in NEAR has its [own associated account][NEAR accounts]. When you run `yarn dev`, your smart contracts get deployed to the live NEAR TestNet with a throwaway account. When you're ready to make it permanent, here's how.


Step 0: Install near-cli
--------------------------

You need near-cli installed globally. Here's how:

    npm install --global near-cli

This will give you the `near` [CLI] tool. Ensure that it's installed with:

    near --version


Step 1: Create an account for the contract
------------------------------------------

Visit [NEAR Wallet] and make a new account. You'll be deploying these smart contracts to this new account.

Now authorize NEAR CLI for this new account, and follow the instructions it gives you:

    near login


Step 2: set contract name in code
---------------------------------

Modify the line in `src/config.js` that sets the account name of the contract. Set it to the account id you used above.

    const CONTRACT_NAME = process.env.CONTRACT_NAME || 'your-account-here!'


Step 3: change remote URL if you cloned this repo 
-------------------------

Unless you forked this repository you will need to change the remote URL to a repo that you have commit access to. This will allow auto deployment to Github Pages from the command line.

1) go to GitHub and create a new repository for this project
2) open your terminal and in the root of this project enter the following:

    $ `git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git`


Step 4: deploy!
---------------

One command:

    yarn deploy

As you can see in `package.json`, this does two things:

1. builds & deploys smart contracts to NEAR TestNet
2. builds & deploys frontend code to GitHub using [gh-pages]. This will only work if the project already has a repository set up on GitHub. Feel free to modify the `deploy` script in `package.json` to deploy elsewhere.



  [NEAR]: https://nearprotocol.com/
  [yarn]: https://yarnpkg.com/
  [AssemblyScript]: https://docs.assemblyscript.org/
  [React]: https://reactjs.org
  [smart contract docs]: https://docs.nearprotocol.com/docs/roles/developer/contracts/assemblyscript
  [asp]: https://www.npmjs.com/package/@as-pect/cli
  [jest]: https://jestjs.io/
  [NEAR accounts]: https://docs.nearprotocol.com/docs/concepts/account
  [NEAR Wallet]: https://wallet.nearprotocol.com
  [near-cli]: https://github.com/nearprotocol/near-cli
  [CLI]: https://www.w3schools.com/whatis/whatis_cli.asp
  [create-near-app]: https://github.com/nearprotocol/create-near-app
  [gh-pages]: https://github.com/tschaub/gh-pages
