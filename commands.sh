#!/bin/bash

mkdir typescript-node-example
cd typescript-node-example/
npm i -y
yarn add -D typescript
npx tsc --init
yarn add express
yarn add -D @types/express
yarn add -D @types/node

##
ts-node src/index.ts

## tsc transpile ts to js
yarn build


## monitor changes
yarn add -D ts-node-dev


