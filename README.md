# HelloFresh - Front-end Test

## Concepts

Project based on React/Redux architeture, Webpack for the tooling and Express to mock the back-end.

## Try it out
1. Clone this project
```
git@github.com:hellofreshdevtests/ivanbanov-frontend-test.git
```

2. Install all dependencies
```
npm install
```

3. Run the back-end mock server
```
npm run server
```

4. Run the dev server
```
npm start
```

Then access [http://localhost:3000/](http://localhost:3000/)


## Routes

- `/login` - Authentication screen
- `/recipes` - List of recipes

### Authentication
To access the restrict area use the user
```
email: user@hellofresh.com
password: 123
```

##  Features
### UX
- Full login authentication with fields validation
- Restrict access to authenticated routes
- Responsive and mobile first
- Rating is only available in the details modal to avoid user give stars without enough knowledge about the recipe

### Dev
- It's a React SPA ❤
- React Helmet for title, favivon and meta tags
- Redux to control the state of the application
- Axios for data fetching
- UI components configs synced with the style files
- Components for Grid, Col with semantic gutters
- SVG sprite icons
- Project full linted with eslint
- Flowtype FTW
- Webpack to control all the tooling

## Tooling

All the tooling is developed with Webpack, it will automate all the process of bundling and generate a static `index.html` with the bundle and styles injected.

It's configured to run a dev server with HMR and compile all the project.

### What is configure for
- **Styles:** CSSModules, Stylus and PostCss for prefixes
- **Scripts:** Parse all ES6, import of image files and use `./src` as path for global modules import

## Tests
All the tests are available in the `__tests__` around the project. There is unit tests for the validators and snapshot tests for the components.

To run the tests use:
```
npm run tests
```

## Tasks
Compile and start the server on `http://localhost:3000/`

```
npm start
```

Just build to the dist directory
```
npm run build
```

Start back-end server
```
npm run server
```

Run the ESLint
```
npm run lint
```

Run tests

```
npm run tests
```
