## Project setup

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
