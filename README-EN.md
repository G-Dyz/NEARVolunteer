**NEAR Volunteer** 
NEAR Volunteer is a dApp that allows people to collect certificates every time they volunteer. Volunteer events are created by hosts, who determine the period in which the certificate can be claimed.

Volunteers who have certificates can receive rewards and invitations. Also these volunteers are the only ones who will be able to rate the event and generate suggestions. In addition, volunteers can build a reputation for their level of participation.

The process can be improved, if you will create a reputation mechanism, and only those volunteers with a reputation level (number of certificates) can generate events, thus avoiding unnecessary imitations or events being created.

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


Step 5: 📑 Exploring the NEAR Volunteer smart contract methods!
---------------

### Command to add an event:
    near view aysel.testnet getAllEvents 

### Command to get all the events:
    near call <id_of_your_smart_contract> addEvent '{"text":"path of your certificate","code":"code","dateStart":"XXXX-XX-XX","dateEnd":"XXXX-XX-XX"}' --account-id <your_account.testnet>

Example:

    near call aysel.testnet addEvent '{"text":"http://www.relal.org.co/images/Redes_RELAL/Voluntariado/Logo-Voluntariado.jpg","code":"123234","dateStart":"2021-10-02","dateEnd":"2021-10-04"}' --account-id aysel.testnet

### Command to add a certificate:
    near view aysel.testnet getAllCertificates 

### Command to get all the certificates:
    near call <id_of_your_smart_contract> addCertificate '{"text":"path of your certificate"}' --account-id <your_account.testnet>

Example:

    near call aysel.testnet addCertificate '{"text":"123234"}' --account-id aysel.testnet

Step 6: 📑 Exploring the NEAR Volunteer tests!
---------------
### Smart contract tests

    yarn asp

### Integration & UI tests 

    yarn jest

### All tests

    npm run test

Step 7: 📑 Exploring the NEAR Volunteer on live!
---------------
Login in your near wallet, create events and claim your certificates

https://near-volunteer.vercel.app/

Add more ideas in the mockup figma, that'll be great to have more ideas

https://www.figma.com/file/gnhw58NXOAVfYnl7sg13zr/NEAR-Volunteer?node-id=0%3A1



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
