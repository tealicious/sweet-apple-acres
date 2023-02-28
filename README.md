# Welcome to Remix!

- [Staged Project](https://clinquant-sable-606b9c.netlify.app/)
- [Remix Docs](https://remix.run/docs)

## Notes from the developer
___
I chose to build this in Remix because it was listed in your enjoyed technologies list found in the job description. I had 0 experience with this framework. My feelings on Remix are… mixed so far.

I consider this to be a ‘minimal viable product’, which is to say, a bare minimal interpretation of features needed to complete the provided business requirements. Rather than spend time polishing the UI, I tried to make sure accessibility targets were hit such as color contrast ratios, keyboard accessibility standards, and appropriate aria labels for screen readers.

Your code standards page suggested that unit and e2e testing are very important at Wander, so I chose to write some example e2e tests which run against the staged URL shared for this repository. The job description only emphasized e2e testing, so I forwent writing spec unit tests at this time. Again, I used Playwright because it was listed in your enjoyed technologies stack, but do not have any prior experience with it (I have only used Cypress and Jest).

I chose to use the provided REST API because I have more experience with them, but got almost to the end before I realized, due to CORS, I can’t actually submit anything to that POST endpoint. If that was an intended gotcha, I’d love to know what you were looking for there as a solution (see my notes @ app/components/Cart/PaymentForm.tsx lines 11, 21, & 24).
___

## Development

Install depencies

```sh
npm install
```

The Remix dev server starts your app in development mode, rebuilding assets on file changes. To start the Remix dev server:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000), and you should be ready to go!

## E2E Tests

Run business requirement e2e tests against staged app and open results

```sh
npm run test:e2e
```