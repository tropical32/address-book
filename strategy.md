# Address book app

## Pages
Two pages

### Home Page
  * search user details
  * lists users
  * view personal information and addresses for the selected user
  * URL is `/`
  * display users in a grid
  * each user displays:
    * `picture.thumbnail`
    * `name.first`
    * `name.last`
    * `name.username`
    * `email`
  * infinite scroll that loads the next 50 results
  * max users is 1000
  * display animated "Loading..." when the next 50 are fetched (could be superseded by pre-fetching)
  * display "end of users catalog" if has 1000 results
### Settings Page
  * filtering by nationalities
  * can select multiple or none nationalities
  * URL is `/settings`
  * choices are `CH`, `ES`, `FR`, `GB`

## Requirements
* display the list of users
* search field
* settings page
* unit tests
* get users from https://randomuser.me
* links to go between pages

### Search
* search field is on top of the app
* search query is case-insensitive
* filter results by `name.first + name.last`
* search field follows the scroll (always visible at the top)
* search filters visible users and shows matching ones
* disable infinite scrolling while filtering is applied and indicate it somewhere
* should combine selected nationalities
* selecting a nationality does not cause a reload

### Tests
* selecting a nationality persists it in storage
* searching narrows down how many elements are displayed
* response mocking?

## Requirements, extra
* pre-fetch next pages of users
* modal with user info
* persist settings between sessions

### Modal
* a modal is shown when a user is clicked
* is closeable
* detailed information with:
    * `location.street`
    * `location.city`
    * `location.state`
    * `location.postcode`
    * `phone`
    * `cell`

## Important
* clear commit history
* tooling -- code formatter, linter, etc.
* CSS preprocessor
* clean code
* webpack
* folder structure
* accessibility
* semantic markup
* typescript
* documentation (JSDoc)
* documentation (README.md -- what the app does)
* documentation (README.md -- how to run the app + tests)