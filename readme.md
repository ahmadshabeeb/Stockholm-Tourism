# Stockholm Tourism

A web application displays a map, where users can add their own named places. All saved places are shown in a filterable list. [Deployed version](https://stockholm-tourism.herokuapp.com)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Installing

A step by step series of examples that tell you how to get a development env running:

Install all dependencies:
```
yarn install
```

Add [Firebase](https://firebase.google.com/) database to the app by creating a project on Firebase, then at the root of the app create a file with name **.env.development**

In the **.env.development** add the config variables as follow:
```
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
```

Copy and paste the corresponding values from the Firebase project to this file

Add [Google-Maps-API-Key](https://developers.google.com/maps/documentation/javascript/get-api-key) to the app, by creating a project on the Maps JavaScript API.

Add a new variable to the **.env.development** file and copy the key to it:
```
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
GOOGLE_MAPS_API_KEY=
```

## Running dev-mode

After the installation, you can run the app in the dev mode:
```
yarn run dev-server
```

## Built With

* [React](https://reactjs.org/) - JavaScript library for building user interfaces
* [Redux](https://redux.js.org/) - JavaScript library for managing application state
* [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial) - Google API for customized maps

## Useful Resources
[google-maps-react](https://www.npmjs.com/package/google-maps-react) - Library for Google Map React component.
