## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
npm install
```

Configure the database in the config/config.json file

If you have done the migration database using the command

```bash
sequelize db:migrate
```

or

```bash
npx sequelize db:migrate
```

If it is already, to run use the command

```bash
npm run dev
```

If so then the API will run on port 3000, which can be used with https://localhost:300

## License

[MIT](https://choosealicense.com/licenses/mit/)
