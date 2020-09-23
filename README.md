# Issue Tracker

A full stack application that tracks and manages issues for the Freecodecamp curriculum.

**Final Project:** [https://lovely-experienced-emu.glitch.me/](https://lovely-experienced-emu.glitch.me/)

**User Story #1:** Prevent cross site scripting(XSS attack).

**User Story #2:** I can POST /api/issues/{projectname} with form data containing required issue_title, issue_text, created_by, and optional assigned_to and status_text.

**User Story #3:** The object saved (and returned) will include all of those fields (blank for optional no input) and also include created_on(date/time), updated_on(date/time), open(boolean, true for open, false for closed), and \_id.

**User Story #4:** I can PUT /api/issues/{projectname} with a \_id and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+\_id. This should always update updated_on. If no fields are sent return 'no updated field sent'.

**User Story #5:** I can DELETE /api/issues/{projectname} with a \_id to completely delete an issue. If no \_id is sent return '\_id error', success: 'deleted '+\_id, failed: 'could not delete '+\_id.

**User Story #6:** I can GET /api/issues/{projectname} for an array of all issues on that specific project with all the information for each issue as was returned when posted.

**User Story #7:** I can filter my get request by also passing along any field and value in the query(ie. /api/issues/{project}?open=false). I can pass along as many fields/values as I want.

**User Story #8:** All 11 functional tests are complete and passing.

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Built With

- [Node](https://nodejs.org/) - JavaScript runtime environment
- [MongoDB](https://www.mongodb.com/) - NoSQL database

## Authors

- **Peter Huang** - Principal developer - [Portfolio](https://www.peterhuang.net/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
