# react-grid
### [Demo](https://opuscapita.github.io/react-grid)

### [API](./src/datagrid/README.md)

### Installation

```
npm install --save @opuscapita/react-grid
```

### Development

* Run `npm install` to get the project's dependencies
* Run `npm run build` to produce minified version of the library
* Run `npm run dev` to produce development version of the library.
* Run `npm run test` to run tests
* Run `npm run docs` to run generate examples

#### Development workflow
* Run `npm run docs`
* Open `docs/index.html`

  Or

* Run `npm run hot`
* Open `http://localhost:5555/`

#### Contributing
* Make a new branch for the changes
* Update `CHANGELOG.md` file
* Commit changes (not `lib`)
* Make a pull request

#### Creating a new release
* Run `npm version [major|minor|patch]` [Info](https://docs.npmjs.com/cli/version)
* Run `npm publish`