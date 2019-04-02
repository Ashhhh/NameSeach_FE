# Namesearch

Name search FE App

## Instructions

Before doing anything, you must run `npm run-script generate:apisdk` to generate the API SDK via the provided swagger.doc (See below)
For local builds, you should also head over and start a NameSearch_API server!
NameSearch_API

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Notes

You would ideally pull the swagger.json from the API project or from the API itself

Sadly I prioritised the backend way too much. I should have spent more time on the Angular side of things! We are lacking E2E tests and as many component/service tests as we would like.

It definitely needs validation. I would have used express-validator

Finally, the Mongo query should really be cached in Redis. You could likely tell it to cache based on the search term used. It would be fairly easy to detect which key in redis to invalidate.
