# Order delivery
## Description
This project is still in development but supposed to be an E-commerce web application for ordering delivery of products using Stripe checkout.

A flower store is used in this example for ordering flower delivery.
## Built with
- Next.js
- Typescript
- Keystone.js [(repository for backend)](https://github.com/th-olsson/order-delivery-backend)
- PostgreSQL
- Chakra UI
- Stripe
## Prerequisites
- yarn
- Have [backend](https://github.com/th-olsson/order-delivery-backend) installed
## Getting Started
Follow these steps to run the application locally
### Installation
- Clone repository
```
git clone https://github.com/th-olsson/order-delivery.git client
```
- Install dependencies
```
yarn install
```

- Set environment variables, see [sample.env](https://github.com/th-olsson/order-delivery/blob/main/sample.env)
### Usage
- Have the [backend](https://github.com/th-olsson/order-delivery-backend) configured and running
- Run developer mode
```
yarn dev
```
or production mode
```
yarn build
yarn start
```

- Open [http://localhost:3000](http://localhost:3000) to use the application
