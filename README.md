# Address Book

## Description

This is a React-based web application built with Next.js 15 and utilizing SWR for data fetching. It includes TailwindCSS for styling, ESLint for linting, Prettier for code formatting, and Vitest for testing. The app demonstrates functionality such as user search, filtering, and local storage persistence.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (>= 16.x recommended).
- **pnpm**: Install pnpm globally using:
  ```bash
  npm install -g pnpm
  ```

## Installation

Clone the repository

    git clone git@github.com:tropical32/address-book.git
    cd address-book

## Install dependencies

    pnpm install

## Scripts

Here are the available scripts to run, build, and test the application:
### Development Server

Start the development server:

    pnpm dev

This runs the app locally on http://localhost:3000 with Turbopack for fast builds.
### Build for Production

Build the app for production:

    pnpm build

### Start the Production Server

After building, start the production server:

    pnpm start

### Run Tests

Run all tests with Vitest:

    pnpm test

### Coverage Report

Generate a test coverage report:

    pnpm coverage

### Lint Code

Lint the codebase using ESLint:

    pnpm lint

### Features

* User Search: Search users and filter results dynamically.
* SWR Integration: Efficient data fetching with cache revalidation.
* Local Storage Persistence: Nationality selections are saved locally for consistency.
* TailwindCSS Styling: Modern and responsive design.
