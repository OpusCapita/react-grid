### Development workflow
* Make a new branch
* Run `npm run hot` to start examples in watch hot module replacement mode
* Open `http://localhost:5555`

### Development workflow with project using the package
##### Link local package to your project
* Run `npm link` at Component root to make your local package linkable
* Run `npm link @opuscapita/package-name` at project's dir that's using the component to use local package
##### Build and watch the package
* Run `npm run watch[:cjs, :es, :umd]` to run dev builds in watch mode
##### Unlink local package
* Run `npm unlink @opuscapita/package-name` at project's dir that's using the component

### Preparing the PR
* Reset `docs` and `lib` directories to master branch state `git checkout master -- docs/* lib/*`
* Update `CHANGELOG.md` with your changes under the `<next>` header
* Make a pull request

### Preparing for new version
* Use `master` branch
* Add new version header to `CHANGELOG.md` and move everyting from `<next>` there (leave next header empty)
* Make sure `npm test` and `npm run lint` runs without errors

### Creating a new release
* Run `npm version [major|minor|patch]` [Info](https://docs.npmjs.com/cli/version)

### Publish new version to NPM
* Run `npm publish`
