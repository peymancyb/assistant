## BACKEND setup

navigate to `backend` directory and please follow the following instructions:

please add your mongodb URI in `/config/default.json` file as follow:

```
{
  "mongoURI": "",
  "jwtSecret": "jwtSecretToken",
  "jwtExpiration": 360000
}
```

you can use local URI or generate a new one from mongodb cloud
`https://www.mongodb.com/cloud/atlas/register`

#### Starting the server

from project directory run `yarn` and after installation is completed do `yarn start`

==========================================================================

## FRONTEND setup

please create `.env` file and define the server endpoint as follow:

```
REACT_APP_ENDPOINT=
```

example:

```
REACT_APP_ENDPOINT=http://localhost:5000/api
```

In the project directory, run:
`yarn`
then:
`yarn start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
