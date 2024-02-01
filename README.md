# Shopify product view

## Introduction

This repository contains a client-server application that fetches product data from the Shopify GraphQL API and stores it in a MongoDB database. The application is split into a client and a server component.

## Server Setup

1. Create a **.env** file in the root directory of the server.
2. Add the following environment variables to the .env file:
    - **MONGODB_URI**: MongoDB connection URI.
    - **SHOPIFY_GRAPHQL_API**: Shopify GraphQL API endpoint.
    - **SHOPIFY_ACCESS_TOKEN**: Shopify API access token.

## Server Installation
1. Run **npm install** in the server directory to install dependencies.
2. Start the server using the command:
`npm start`

## Client Installation
1. Run **npm install** in the server directory to install dependencies.
2. Start the server using the command:
`npm start`

## Usage

1. Once the server is running, it will fetch product data from Shopify and store it in the MongoDB database.
2. The client can then be started to interact with the stored product data.

