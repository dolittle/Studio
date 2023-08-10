# [3.7.1] - 2023-8-10 [PR: #434](https://github.com/dolittle/Studio/pull/434)
## Summary

Add environment selections and display environment column in MicroservicesDataGrid.

### Added

- Environment selection dropdown to DeployMicroservice
- Environment selection dropdown to Microservice Configuration page
- DataGrid default props to Design System
- DataGridWrapper component to Design System
- Environment column to MicroservicesDataGrid
- (New)Switch component to Design System

### Fixed

- Logs page layout on smaller screens
- Logs line elements alignment

### Removed

- Redundant code


# [3.7.0] - 2023-8-8 [PR: #234](https://github.com/dolittle/Studio/pull/234)
### Summary

This changes the tag list to use the new image-tags endpoint in platform-api, to get a list of
tags (sorted by creation date), with additional meta data.
It also adds linking between the tags list and the create microservice
screen, where it prefills the head image field with the value found in
the URI fragment identifier.

### Added

- Mechanism for adding prefilled image name to the head image field in the create new microservice screen
- New metadata to the tags list
- Links from the tags list to the create new microservice screen

### Changed

- The tags api to use the `image-tags` endpoint instead of `tags`
- The tags list
- The create new microservice screen (to be able to get an optional image name from the URI fragment identifier for the head image field)


# [3.6.7] - 2023-8-7 [PR: #437](https://github.com/dolittle/Studio/pull/437)
## Summary
Add Certificate Authority file for a user to download from the Consume Event Streams tab


# [3.6.6] - 2023-8-4 [PR: #436](https://github.com/dolittle/Studio/pull/436)
- Rename before fixing casing
- Fix casing


# [3.6.5] - 2023-8-4 [PR: #435](https://github.com/dolittle/Studio/pull/435)
- View Access Certificate & Key
- Download Access Certificate & Key
- Delete multiple Kafka Service Accounts


# [3.6.4] - 2023-7-31 [PR: #433](https://github.com/dolittle/Studio/pull/433)
## Summary

Display error page when error 500 appears.

<img width="921" alt="Screenshot 2023-07-31 at 23 08 18" src="https://github.com/dolittle/Studio/assets/19160439/c609e4fe-4e96-404e-8e43-d164b8010740">

### Added

- AigonIsLostSvg for graphic

### Changed

- Renamed 'DieAndRestart' to 'Problem' as this is more suitable
- Refactored code

### Removed

- FluentUI from PickEnvironment


# [3.6.3] - 2023-7-31 [PR: #432](https://github.com/dolittle/Studio/pull/432)
## Summary

Fix LandingPageDecider errors.

![MicrosoftTeams-image (1)](https://github.com/dolittle/Studio/assets/19160439/ba8f4fc2-bede-4be5-b30f-5c1ccef05223)

### Changed

- Rename create new 'Space' to 'application' in NavigationBar

### Fixed

- Get current application ID from GlobalContext
- Typo in 'LandingPageDecider'


# [3.6.2] - 2023-7-31 [PR: #431](https://github.com/dolittle/Studio/pull/431)
## Summary

Fix rendering of pod status where it can be undefined from the server.


# [3.6.1] - 2023-7-31 [PR: #430](https://github.com/dolittle/Studio/pull/430)
## Summary

Improved log in pages appearance.

Create new applications in a Dialog, not on a separate page.

If the user has only one application, navigate directly to the Microservices page, otherwise navigate to the Applications page.

<img width="956" alt="Screenshot 2023-07-28 at 12 05 18" src="https://github.com/dolittle/Studio/assets/19160439/eff17a7d-8839-4632-baf4-abac0660d8bb">

### Added

- LandingPageDesider that navigates to the starting page

### Changed

- ApplicationsScreen 'create new application' appearance

### Fixed

- Style fixes
- Add currentApplicationId to store if navigated directly to Home page and application is not selected yet


# [3.6.0] - 2023-7-28 [PR: #429](https://github.com/dolittle/Studio/pull/429)
## Summary

- Ability to create Kafka Service Accounts from the Consume Data (Event Streams) page for a connection
- Listing out of existing Kafka Service Accounts
- UX details
  - Hide Generate button from header when form is visible
  - Show the ISODate time on hover over the created at column for a service account


# [3.5.0] - 2023-7-27 [PR: #424](https://github.com/dolittle/Studio/pull/424)
## Summary

Adds a new sub-page for consuming event streams that link to the async-api -specification for the connection.

### additional

- sets up k3d in the devcontainer and adds a new version of the reset-local-k3d -script (which works with recent versions of k3d)
- re-generated code from the bridge-api open-api -spec (swagger) to one that includes the KafkaServiceAccount -models


# [3.4.65] - 2023-7-26 [PR: #428](https://github.com/dolittle/Studio/pull/428)
## Summary

Made links clearer to improve UX.

### Changed

- LayoutWithSidebar 'Documentation' link label to 'Setup'
- WorkSpaceLayout SelectMenu 'Documentation' Link href to open 'https://dolittle.io/docs/' in new tab


# [3.4.64] - 2023-7-26 [PR: #427](https://github.com/dolittle/Studio/pull/427)
- Introduce a MaxWidthBlock to be used as a Div
- Fix correct rendering of contents within CopyTextBox to respect semantic HTML rules (no nested p's), and ensure it respects the max readable width
- Set to edit mode by default if the status is pending
- Support ValidationRule<boolean> in the isRequired check, and also apply to Select fields
- Show error snackbars as error variant


# [3.4.63] - 2023-7-26 [PR: #426](https://github.com/dolittle/Studio/pull/426)
## Summary

Updated branding from Dolittle to Aigonix.

<img width="397" alt="Screenshot 2023-07-26 at 13 32 26" src="https://github.com/dolittle/Studio/assets/19160439/3a9909f8-15a4-4b45-a459-c58775c707d9">

### Changed

- Replaced Dolittle logo with Aigonix in LoginWrapper
- Replaced Dolittle logo with Aigonix in LayoutWithSidebar
- Replaced Dolittle background gradient symbol with Aigonix cube symbol
- Replaced Dolittle favicons with Aigonix
- Page meta title from Dolittle Studio to Aigonix Studio


# [3.4.62] - 2023-7-13 [PR: #423](https://github.com/dolittle/Studio/pull/423)
## Summary

Few fixes and code refactoring for new layout.

### Added

- Auto focus on SpaceCreateDialog input field
- Required 'pageTitle' prop to WorkSpaceLayout

### Changed

- Replaced HomeScreen 'Dolittle' text with 'Aigonix'
- Renamed CreateSpaceDialog to SpaceCreateDialog
- Added WorkSpaceLayoutWithSidePanel and changed naming on them

### Fixed

- Select new space after creating it
- Comment out the 'Breadcrumbs' as they are not working correctly at the moment
- SidePanel 'ErpConnections' link path so it would take to main Integrations page
- Connections Form errors from required prop

### Removed

- Variant 'success' from Integrations Snackbar


# [3.4.61] - 2023-7-7 [PR: #420](https://github.com/dolittle/Studio/pull/420)
## Summary

Use new Breadcrumbs component to show current location in Integrations page.

<img width="905" alt="Screenshot 2023-07-07 at 14 40 57" src="https://github.com/dolittle/Studio/assets/19160439/fac4d48b-e3ea-4dd1-a6e9-998cdd678b3d">

### Added

- Breadcrumbs to Integrations page

### Removed

- Refactored code


# [3.4.60] - 2023-7-7 [PR: #419](https://github.com/dolittle/Studio/pull/419)
## Summary

Change WorkSpaceLayout with adding in working links. Use a different SidePanel MenuList for each model (applications, integrations).

Also create the Design System components accordingly and add them to the Storybook with JsDocs.

They still need to be improved as we create a new login flow.

<img width="965" alt="Screenshot 2023-07-07 at 13 24 16" src="https://github.com/dolittle/Studio/assets/19160439/b7463c42-034d-4098-84bb-8f1416e3f7c8">

### Added

- Breadcrumbs component to Design System
- DialogForm component to Design System
- MenuList component to Design System
- Stories with documentation into Storybook
- Different SidePanel MenuList for each module
- `PageTitle` props to WorkSpaceLayout component
- `CircularProgress` props to LoadingSpinner component
- `tooltipPlacement` props for the IconButton to change where the Tooltip is displayed
- Save SidePanel open state in sessionStorage so after page refreshes, it stays the same mode (expanded or collapsed)
- WorkPlaceNavigations component links
- Dummy links for Design System

### Changed

- Updated NavigationBar logo to the new one
- Updated SimpleCard styles
- Updated DropdownMenu component
- Updated other components as needed
- Navigation links improvements
- Navigation links appearance in smaller screens
- SidePanel styles and links
- Combined regex helper files from different places
- Rename SideBar component to SidePanel as this is more accurate

### Fixed

- When navigating to Microservices, a Snackbar appears as a new Microservice was created. Removed localStorage from Microservises.
- Snackbars in App. They are no longer imported from Design System as it was not neccessary.

### Removed

- Deleted dublicated ApplicationsList component
- Snackbars from Design System
- Old unused code


# [3.4.59] - 2023-6-27 [PR: #418](https://github.com/dolittle/Studio/pull/418)
## Summary

Fixed SimpleCardGrid breakpoints from sm (small) to md (medium).

### Fixed

- SimpleCardGrid responsive layout grid


# [3.4.58] - 2023-6-27 [PR: #417](https://github.com/dolittle/Studio/pull/417)
- Make TextCopyBox a reusable component
- Wrap instructions for IonServiceCredentials in a CopyBox


# [3.4.57] - 2023-6-27 [PR: #416](https://github.com/dolittle/Studio/pull/416)
## Summary

Replace old Card components with Design System SimpleCardGrid ones.

### Changed

- Improved SimpleCardGrid width and breakpoints to improve appearance on different screen sizes.


# [3.4.56] - 2023-6-27 [PR: #415](https://github.com/dolittle/Studio/pull/415)
## Summary

- Delete Connector from within the configuration page
- Remove Delete-functionality from the connection list table


# [3.4.55] - 2023-6-26 [PR: #414](https://github.com/dolittle/Studio/pull/414)
Actually fix redirect logic to evaluate the subpath exists, not that it ends with the route


# [3.4.54] - 2023-6-26 [PR: #413](https://github.com/dolittle/Studio/pull/413)
## Summary

Fixed an issue where clicking into creating new messages or editing an existing message took the user to the configuration tab, or stayed on the same tab.


# [3.4.53] - 2023-6-23 [PR: #412](https://github.com/dolittle/Studio/pull/412)
## Summary

Added landing page to Studio. Also improved the main NavigationBar so that the links are usable.

Advanced Design System components as needed.

<img width="1594" alt="Screenshot 2023-06-23 at 17 54 13" src="https://github.com/dolittle/Studio/assets/19160439/dcb77600-d148-4035-a658-a132145cab04">

### Added

- HomeScreen component.
- MenuList component to Design System.
- DropdownMenu component to Design System.

### Changed

- Make sideBar as optional in Layout.
- SimpleCard actionButtons usage. Now it uses primaryButton and secondaryButton only.

### Fixed

- Improved SimpleCard styles.

### Removed

- Redundant dummy content.


# [3.4.52] - 2023-6-23 [PR: #411](https://github.com/dolittle/Studio/pull/411)
- WIP: Todos
- Redirect to correct tab when loading connection screen
- Extract redirect to logic into hook
- Slight improvement to the active tab resolving logic - would be good to make this part of the tab component though, maybe a RouterTabs?


# [3.4.51] - 2023-6-22 [PR: #410](https://github.com/dolittle/Studio/pull/410)
- Reset form state after succesful submit
- Reset Form back to original values when pressing "Cancel"
- More straight forward saving of form and cleaned up ActionToolbar


# [3.4.50] - 2023-6-22 [PR: #409](https://github.com/dolittle/Studio/pull/409)
- Move all configuration components into configuration folder
- Replace static configuration tab with real configuration components
- Fix broken imports after moving files
- Move ActionButtons component back to "new" as it's specific to the new component
- Wire up the action toolbar to enable edit, save and cancel actions
- Toggle "Cancel", "Done" and "Save" based on isDirty/isValid/Edit mode
- Make saving reset the form and go back to "read" mode
- Don't show loading spinners until an action has been taken on that configuration step
- Trigger save on the "next tick" with a useEffect
- Disabled inputs when in Edit mode
- Wrap the FileIploadForm in a MaxWidthTextBlock so it doesn't use ALL THE SPACE :)


# [3.4.49] - 2023-6-20 [PR: #408](https://github.com/dolittle/Studio/pull/408)
Force deploy. Again.


# [3.4.47] - 2023-6-20 [PR: #405](https://github.com/dolittle/Studio/pull/405)
## Summary

Improvements to the new connector page that supports better validation and flow of the form

## Added 
 - PasswordInput: Add PasswordInput component with show/hide password functionality
 - New Connector:  Validation and enabling save button when configuring new connector
   - Enable save button when there are changes and valid
   - Reset fields after successfully saving
   - Make connector name and deployment type required
   - Required metadata password/url to be required if one of them is set
- Enable "Start Message Mapping" button when conneciton is Connected

## Changed
- New Connector: Expand configuration sections when user has selected deployment typw
- Input: Extend Input to accept "type" as a string prop that defaults to text


# [3.4.46] - 2023-6-19 [PR: #404](https://github.com/dolittle/Studio/pull/404)
## Summary

This pull request introduces several enhancements and fixes to the Backups page functionality.

### Added

- Elevation to DataGrid.
- Backups page DataGrid date column check to ensure the date is valid. Otherwise, it returns 'N/A'
- Loading spinner to Backups page while data is fetching.

### Changed

- Refactored code.

### Fixed

- Removed the DataGrid wrapper height from 100% as it was causing empty space below the DataGrid.
- Updated Backups DataGrid styles.
- Fixed the issue where the 'Delete Microservice' dialog was closing prematurely.


# [3.4.45] - 2023-6-16 [PR: #403](https://github.com/dolittle/Studio/pull/403)
## Summary

BackupsListItems displayed only limited hardcoded environment values. If the value was not listed, 'N/A' was displayed.

<img width="935" alt="Screenshot 2023-06-16 at 12 46 41" src="https://github.com/dolittle/Studio/assets/19160439/4ca56d57-d79f-4117-8e2b-1b54d5ec3620">

### Fixed

- Removed fixed environment values from BackupsListItems.


# [3.4.44] - 2023-6-16 [PR: #401](https://github.com/dolittle/Studio/pull/401)
## Summary

 - Show correct status indicators for each step of wizard
 - Add ability to save upload and save ION Configuration 

### Added

- [Accordion]: Added `disabled` option to the Accordion
- [FileUploadForm]: Added `clearSelected` to the `fileUploadRef` as a way to programmatically remove the selected files in the form. 


### Changed

- [FileUploadForm]: Changed the form to be appended to `document.body` so as not to interfere with other active forms.
- [FileUploadForm]: Changed `hideForm` prop to `hideDropArea`


# [3.4.43] - 2023-6-16 [PR: #402](https://github.com/dolittle/Studio/pull/402)
## Summary

Packup page appearance update.

### Added

- DataGridPro to Backups page

### Changed

- Packup page Cards from FluentUI to Design System one

### Removed

-


# [3.4.42] - 2023-6-7 [PR: #400](https://github.com/dolittle/Studio/pull/400)
## Summary

Make health status metrics dynamic based on data, instead of hardcoding y-axis. This to cater to some pods having hight limits than the presets. We don't necessarily know what the pod resource limits are. These can be re-introduced at a later time when the API returns the exact resource limit information.

### Changed

- Dynamic y-axis on health metrics graphs, instead of fixed limits.


# [3.4.41] - 2023-5-21 [PR: #398](https://github.com/dolittle/Studio/pull/398)
## Summary

Small fixes to improve our appearance.

<img width="584" alt="Screenshot 2023-05-21 at 18 13 37" src="https://github.com/dolittle/Studio/assets/19160439/ae44cbde-53cb-4abd-864b-b879a679a78d">

### Added

- Aigonix light logo icon as svg.
- TextField endIcon props.
- EditField placeholder text.

### Changed

- Page title order.
- Dolittle logo in Inegrations to Aigonix light cube.
- Moved EditField icon from start to the end.

### Fixed

- Regex string helper functions return statements if there is no value.
- TextField font-size to 'inherit'.


# [3.4.40] - 2023-5-19 [PR: #397](https://github.com/dolittle/Studio/pull/397)
## Summary

Improve DataGrid usage.
  - Add proper use cases into Design System and improve the documentation.
  - Add in components, that we use in DataGrids (EditCell, SelectCell, DataGridWrapper).

### Added

- TextField component to Design System.
- EditCell component to Design System.
- EditCell to MessageMappingTable DataGrid.
- EditCell to EnvironmentVariables DataGrid.

### Changed

- Aligned HealthStatusTable columns text to center.
- Aligned EnvironmentVariables columns header text to center.
- Rename DataTablePro component to DataGrid.
- Move DataGrid in Design System from Atoms to Molecules.
- Replace Integrations TableSearchSection 'search' field with Design System one.
- Move Design System 'dummy content' into helpers folder.
- Overall code refactoring and wording improvements.

### Fixed

- MS EnvironmentVariables DataGrid 'secret' cell width and styles wording.
- Status for ConnectionsTable. Added 'undefined' as possible status.


# [3.4.39] - 2023-5-11 [PR: #396](https://github.com/dolittle/Studio/pull/396)
## Credentials generation and management
<img width="819" alt="image" src="https://github.com/dolittle/Studio/assets/102054/5eef7bb4-a31d-4394-8ff2-484a95674132">

This PR introduces the capability for managing credentials for an exposed API.

### Commits: 
- Generate integrations API with ServiceAccount API objects
- Add hooks to wrap the ServiceAccountApi
- Add rest of Content components into the design system
- Remove Content-components from SelfService and update imports
- Add support to hide divider to ContentSection
- Add Content*-components to expose API page
- Separate out the CredentialsSection
- Wired up a functional-first credentials list component
- Update the generated API with latest ServerAccounts + JqAssistant experimental api
- Show error message if there's an errro
- Separate CredentialsForm to separate component
- Flesh out the functionality for creating a credential token
- Disable generate new credentials button when form is open
- Allow generating subsequent tokens by resetting the form
- Show the previously active credential in the credential list
- Implement Delete Dialog functionality with a reducer
- Clean up when canceling the delte dialog so nothing is deleted by accident
- Update generated API with fix to ServiceAccountDelete and some new things from LinqAssistant
- Separate Credentials to another ContentContainer and add separators
- Move CredentialsContainer to own component and introduce header
- Add sane-default my-spacing for content header. can be overridden as needed
- Don't override the MaxWidthTextBlock maxWidth value on the sx prop
- harcode and style the credentials form components
- Apply styling to proper form state and remove Paper
- Add divider between form and credentials list
- Hide form when credential form is cancelled
- Derive state of new credential button instead of setting it explicitly
- Move the collapsible content around the entire Form Section to hide margins and whitespace
- Add default spacing to ContentSection and ability to remove spacing with compact mode
- Only show credentials list when there are items to list
- Allow styling divider without accidentally overriding the default style
- Style CredentialListItems
- Only show description when set
- Show credential name as part of dialog title
- Add title to generate credentials section
- Adjust credentials list divider to be more subtle
- Format the date in a human-readable way
- Show title-tooltip when a user hovers over the date
- Disable Generate Token button when form is not valid
- Sort credentials by date
- Add single quotes to delete credential title
- Compare active token by lower case, as this is changed when submitting
- Expand & collapse the credential form state correctly
- Don't allow cancelling credentials form when there are no credentials
- Fix typo in deployed messages snackbar


# [3.4.38] - 2023-5-11 [PR: #395](https://github.com/dolittle/Studio/pull/395)
## Summary

Make MessageMappingTable scrollable instead of using pagination.

<img width="1024" alt="Screenshot 2023-05-11 at 13 37 28" src="https://github.com/dolittle/Studio/assets/19160439/206feee7-42dd-43ad-a103-a440afc4672e">


# [3.4.37] - 2023-5-8 [PR: #394](https://github.com/dolittle/Studio/pull/394)
### Fixed

- Empty podStatus gave error to entire MS DataTable. Added 'undefined' as possible PodStatus that returns 'unknown' as status.

![MicrosoftTeams-image](https://user-images.githubusercontent.com/19160439/236857129-1e4baf3d-bbc1-4253-9618-722535784ee7.png)


# [3.4.36] - 2023-5-8 [PR: #393](https://github.com/dolittle/Studio/pull/393)
## Summary

Replaced MS statuses with Design System 'StatusIndicator'.
Added ConnectionsTable statuses.

### Added

- Status types and variants
- Statuses to ConnectionsTable
- Correct statuses to Accordion and AccordionList

### Changed

- Status in StatusIndicator.stories so it would show updated status variants
- MS status display from 'Button' component to 'StatusIndicator'
- Accordion status display from 'setInterval' to 'setTimeout' as this is more correct use case
- Overall code cleanup

### Fixed

- Initialy expanded AccordionList accordion was not expanded
- Add margin to DataTable header icon only. Before margin was added to all DataTable icons.
- MS HealthStatus DataTable border color
- Improved wording

### Removed

- SX control from StatusIndicator.sories as it is hard to add styles like this in Storybook


# [3.4.35] - 2023-5-4 [PR: #392](https://github.com/dolittle/Studio/pull/392)
- Update current alpha numeric regex pattern to include it's for lower case only
- Use any cased alpha numeric regex for input validation of message type name
- Trigger form validation after initial values have been set


# [3.4.34] - 2023-5-2 [PR: #391](https://github.com/dolittle/Studio/pull/391)
Rules when mapping fields:
✅ When you check the box, we map a value for you based on description
✅ When you map a value, we sanitise it and ensure it's PascalCased, then check the row.
✅ If you remove a check, then the mapping is removed
✅ If you remove the contents of a mapped field, the checkmark is removed
✅ If you go into an unselected field to edit it and don't make a change then it is not selected



Commits: 
- Add validation to the message type name field
- Update other uses of the pattern to lean on shared regex
- Update nonWhitespace regex to apply to full line
- Automatically PascalCase the value of the mapped field cell
- Generate unique table names with field name for uniqueness, when needed
- Move all logic around naming and selection into the MessageMappingTable
- Remove selection magic using useEffect, and explicitly set form values in table section
- Move the form updating into a separate hook for clarity
- Add a simple mechanism allow opting out of the form props on an input
- Mark switch as not part of the Form so it isn't marked as dirty after use
- Extend Switch with a Switch.UI subcomponent, making it possible to use without a form
- Revert introducing withoutForm as a baseprop on InputProps
- Verify if mappedFields in form is set initially, and mark dirty for subsequent sets
- Make submit button now listen to isDirty, as this respects the mappableFields
- Put the size='small', which got lost in the refactor
- Explicitly select or deselect the row
- Don't try to remap the selected field name if the cell is in edit mode. It means the user is manually updating
- Remove console.log


# [3.4.33] - 2023-4-26 [PR: #390](https://github.com/dolittle/Studio/pull/390)
- Enable deploy service and disable
- Link to live running swagger service


# [3.4.32] - 2023-4-25 [PR: #389](https://github.com/dolittle/Studio/pull/389)
- Generate unique fieldname when mass-selecting a table
- Optimize the unique creation slightly by not needing to create a new Set for each loop


# [3.4.31] - 2023-4-25 [PR: #388](https://github.com/dolittle/Studio/pull/388)
- Update generated integrations API
- Update renamed field after api update
- Update generated API and usage to match
- Wire up the Delete Multiple messages Button
- Add TODO and removed uneeded optional chaining operator
- Fix typo in button text
- Enable the Delete Message Types button
- Add error-handling for when params aren't set for the ChangeMesage page


# [3.4.29] - 2023-4-24 [PR: #384](https://github.com/dolittle/Studio/pull/384)
- Update generated API
- Update syntax based on updated return types
- Remove non-null assertion operator for properties that are no longer marked optional
- Handle possible undefined route paramaters
- Update generated API
- Use new createdAt, now that metadata has been removed


# [3.4.28] - 2023-4-21 [PR: #383](https://github.com/dolittle/Studio/pull/383)
Dummy PR to force build


# [3.4.26] - 2023-4-21 [PR: #381](https://github.com/dolittle/Studio/pull/381)
- No longer deselect a mapped row automatically
- Update copy based on Figma


# [3.4.25] - 2023-4-21 [PR: #380](https://github.com/dolittle/Studio/pull/380)
- Extend Form with a ref that returns the hook methods
- Use secondary option by passing in ref as props without forwardRef
- Set the form values after request has returned data


# [3.4.24] - 2023-4-21 [PR: #379](https://github.com/dolittle/Studio/pull/379)
- No longer allow the Description to be editable
- Automatically add a remapped fieldName
- Refactor for clarity
- only select the row if it isn't already selected
- Generated the column name based on m3 description, not the m3 column
- Set unique mapped names based on what is actually selected in the table
- When removing the remapped text, unselect the field
- Remove fieldnames for any previously mapped fields when they are deselected


# [3.4.22] - 2023-4-19 [PR: #377](https://github.com/dolittle/Studio/pull/377)
<img width="1649" alt="image" src="https://user-images.githubusercontent.com/102054/233118227-de9d60a2-045d-4a62-a164-0418f64ccab3.png">


# [3.4.21] - 2023-4-19 [PR: #376](https://github.com/dolittle/Studio/pull/376)
- Update generated API based on latest
- Update generated API without nullable, and required deploymapping
- Improve code a little bit
- Use the batch api-method to deploy message types
- Remove unused imports
- Rename prop to better describe intent


# [3.4.20] - 2023-4-18 [PR: #375](https://github.com/dolittle/Studio/pull/375)
## Summary

Fix new workspace layout on smaller screens.

### Fixed

- Page title and status info alignment on smaller screens
- Main layout break in smaller screens
- ExposeData responsivnes


# [3.4.19] - 2023-4-18 [PR: #374](https://github.com/dolittle/Studio/pull/374)
- Remove local reference to defaultEmptyDate
- Replace Table Header with Content components
- Move Container outside Table component and wire up selected
- Move header section to separate component and pass in selectedIds
- Separate message buttons into separate components
- Show status indictor while copying messages
- Disable other toolbar buttons when an action is executing
- Wire up the DeployButton functionality
- Remove table sorting
- Fix issue where Tablename was not persisted at the Form level
- Disable Delete and Copy to buttons


# [3.4.18] - 2023-4-17 [PR: #373](https://github.com/dolittle/Studio/pull/373)
- Show '-' for dates without deployedAt set or set to minValue
- Add sorting to the mapped message type rows so fields that aren't deployed are at the bottom


# [3.4.17] - 2023-4-17 [PR: #372](https://github.com/dolittle/Studio/pull/372)
- Move the Form component around the entire component so it is available to all sub-components
- Extract MessageMappingForm to its own component
- Move the form contents to separate component
- Wire up the cancel button logic to not prompt if there are no changes
- Remove the need for the mutation from within the ChangeMessageView
- Hoist query and params into the props so the component doesn't need to reach outside
- Add support for passing in custom components into the header as a slot
- Move logic for cancel/discard into a separate component
- Move <Content/> components into shared layout folder


# [3.4.16] - 2023-4-14 [PR: #371](https://github.com/dolittle/Studio/pull/371)
## Summary

Overall code cleanup from old code and used Design System comonents.


# [3.4.15] - 2023-4-14 [PR: #370](https://github.com/dolittle/Studio/pull/370)
## Summary

Improved code turing hackhaton event.


# [3.4.14] - 2023-4-8 [PR: #369](https://github.com/dolittle/Studio/pull/369)
## Summary

Refactored Button icons. Buttons now use icons from the `SvgIconsDefinition` list.

<img width="1005" alt="Screenshot 2023-04-08 at 19 14 17" src="https://user-images.githubusercontent.com/19160439/230732018-5a11c337-63bc-4bb1-8e30-10e731db3d2c.png">

### Changed

- Improved Button documentation wording
- Refactored Icons type definition
- Refactored Button.stories
- Made `tooltip` text 'required' for IconButton

### Fixed

- Button lineHeight so text would be center in 'Edge' and 'Chrome' browsers


# [3.4.13] - 2023-4-5 [PR: #367](https://github.com/dolittle/Studio/pull/367)
## Summary

Added initial Configuration page.


# [3.4.10] - 2023-4-5 [PR: #365](https://github.com/dolittle/Studio/pull/365)
- Update codegen to go towards 127.0.0.1 (since bridge api is hosted in a devcontainer)
- Updated generated api's
- Use the messageName from the url after api changes
- Fix succesful navigation


# [3.4.9] - 2023-4-5 [PR: #364](https://github.com/dolittle/Studio/pull/364)
- Move messageList into its own component folder
- Map values from the messageMappingsModel
- Move practical date formating functions into utils so it's available for both modules
- Format date correctly
- Allow clicking a table entry to navigate to the edit view of message type


# [3.4.8] - 2023-4-5 [PR: #363](https://github.com/dolittle/Studio/pull/363)
- Add query for getting a message
- Use query to fetch message type on edit page
- Change selectedTable to be selectedTableName.
- Use the existing field mapping to set the initial state in table
- Not show "back to search" for edit mode
- Only render content if new or query returns data
- Rename wording of hide/show selected switch
- Remove the "isDirty" check for now - need to get this to work with table values
- Add support to override the onClose action on AlertDialog


# [3.4.7] - 2023-4-5 [PR: #362](https://github.com/dolittle/Studio/pull/362)
## Summary

Added 'Expose Data' static page to Connection Details.

<img width="1261" alt="Screenshot 2023-04-05 at 12 57 27" src="https://user-images.githubusercontent.com/19160439/230048014-590175c9-f050-4837-bbd9-b012ada59e94.png">


# [3.4.6] - 2023-4-5 [PR: #361](https://github.com/dolittle/Studio/pull/361)
- Successfully map the fiieldName changes from table into state
- clean up the code and remove some logging
- Use form context to set the selected fields in form
- Use form context's isValid to disable save button
- Mark row as selected when value has been mapped
- Wire up the mutation to save a new message type
- Add success and error handling with navigation and snackbars


# [3.4.5] - 2023-4-4 [PR: #360](https://github.com/dolittle/Studio/pull/360)
- Add query to get a MessageMappingTable
- Show MessageMappingTable
- Update generated Integrations API-s
- Add first steps of the table selection process
- Preselect and disable MessageMappingTable row
- Code refactoring
- Remove MessageType input values
- Fix MessageMappingTable pagination warning
- Add TableSearchSection typography
- Move SubmitButtonSection into right place
- Add MessageMappingTable header section
- Show  MessageMappingTable selected row count in footer
- Hide unselected MessageMappingTable rows
- Add DataTablePro stories
- Update theme - remove MuiDataGrid overrides
- Add MessageMapping styles
- Add AlertDialog to ChangeMessageView
- TableSearchResult style update
- Add MessageMappingTable styles
- Update DataGrid styles in Theme
- Add spacing
- Change hiding of unselected to be done on the dataset, instead of through css
- Not return any initial content when loading the table data
- Replace "null" with a linear indicator to indicate that something is happening
- Move early returns after the query into the main render
- Wrap the filter logic in a useMemo


# [3.4.4] - 2023-4-3 [PR: #359](https://github.com/dolittle/Studio/pull/359)
- Presist the search state when going back to search results
- Not show '0' when there are no search results


# [3.4.3] - 2023-3-31 [PR: #358](https://github.com/dolittle/Studio/pull/358)
## Summary

General code refactoring and wording improvements.


# [3.4.2] - 2023-3-31 [PR: #357](https://github.com/dolittle/Studio/pull/357)
- Add child routes for new message and edit message
- Scaffold page structure for new message
- Separate card header (for now) and adding some spacing
- Add more sections and pass inn viewmode to sections
- Add Table Section
- Rename the Card* components to Content* components
- Navigate to new message type page on click


# [3.4.1] - 2023-3-31 [PR: #356](https://github.com/dolittle/Studio/pull/356)
## Summary

Add ConnectionDetails/MessageView page.

### Added

- MessageMappingApi.hooks

### Changed

- Describe the outwards facing code change
- 'MessageRounded' to available Icons list


# [3.4.0] - 2023-3-30 [PR: #335](https://github.com/dolittle/Studio/pull/335)
Bumps [webpack](https://github.com/webpack/webpack) from 5.74.0 to 5.76.0.
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a href="https://github.com/webpack/webpack/releases">webpack's releases</a>.</em></p>
<blockquote>
<h2>v5.76.0</h2>
<h2>Bugfixes</h2>
<ul>
<li>Avoid cross-realm object access by <a href="https://github.com/Jack-Works"><code>@​Jack-Works</code></a> in <a href="https://redirect.github.com/webpack/webpack/pull/16500">webpack/webpack#16500</a></li>
<li>Improve hash performance via conditional initialization by <a href="https://github.com/lvivski"><code>@​lvivski</code></a> in <a href="https://redirect.github.com/webpack/webpack/pull/16491">webpack/webpack#16491</a></li>
<li>Serialize <code>generatedCode</code> info to fix bug in asset module cache restoration by <a href="https://github.com/ryanwilsonperkin"><code>@​ryanwilsonperkin</code></a> in <a href="https://redirect.github.com/webpack/webpack/pull/16703">webpack/webpack#16703</a></li>
<li>Improve performance of <code>hashRegExp</code> lookup by <a href="https://github.com/ryanwilsonperkin"><code>@​ryanwilsonperkin</code></a> in <a href="https://redirect.github.com/webpack/webpack/pull/16759">webpack/webpack#16759</a></li>
</ul>
<h2>Features</h2>
<ul>
<li>add <code>target</code> to <code>LoaderContext</code> type by <a href="https://github.com/askoufis"><code>@​askoufis</code></a> in <a href="https://redirect.github.com/webpack/webpack/pull/16781">webpack/webpack#16781</a></li>
</ul>
<h2>Security</h2>
<ul>
<li><a href="https://github.com/advisories/GHSA-3rfm-jhwj-7488">CVE-2022-37603</a> fixed by <a href="https://github.com/akhilgkrishnan"><code>@​akhilgkrishnan</code></a> in <a href="https://redirect.github.com/webpack/webpack/pull/16446">webpack/webpack#16446</a></li>
</ul>
<h2>Repo Changes</h2>
<ul>
<li>Fix HTML5 logo in README by <a href="https://github.com/jakebailey"><code>@​jakebailey</code></a> in <a href="https://redirect.github.com/webpack/webpack/pull/16614">webpack/webpack#16614</a></li>
<li>Replace TypeScript logo in README by <a href="https://github.com/jakebailey"><code>@​jakebailey</code></a> in <a href="https://redirect.github.com/webpack/webpack/pull/16613">webpack/webpack#16613</a></li>
<li>Update actions/cache dependencies by <a href="https://github.com/piwysocki"><code>@​piwysocki</code></a> in <a href="https://redirect.github.com/webpack/webpack/pull/16493">webpack/webpack#16493</a></li>
</ul>
<h2>New Contributors</h2>
<ul>
<li><a href="https://github.com/Jack-Works"><code>@​Jack-Works</code></a> made their first contribution in <a href="https://redirect.github.com/webpack/webpack/pull/16500">webpack/webpack#16500</a></li>
<li><a href="https://github.com/lvivski"><code>@​lvivski</code></a> made their first contribution in <a href="https://redirect.github.com/webpack/webpack/pull/16491">webpack/webpack#16491</a></li>
<li><a href="https://github.com/jakebailey"><code>@​jakebailey</code></a> made their first contribution in <a href="https://redirect.github.com/webpack/webpack/pull/16614">webpack/webpack#16614</a></li>
<li><a href="https://github.com/akhilgkrishnan"><code>@​akhilgkrishnan</code></a> made their first contribution in <a href="https://redirect.github.com/webpack/webpack/pull/16446">webpack/webpack#16446</a></li>
<li><a href="https://github.com/ryanwilsonperkin"><code>@​ryanwilsonperkin</code></a> made their first contribution in <a href="https://redirect.github.com/webpack/webpack/pull/16703">webpack/webpack#16703</a></li>
<li><a href="https://github.com/piwysocki"><code>@​piwysocki</code></a> made their first contribution in <a href="https://redirect.github.com/webpack/webpack/pull/16493">webpack/webpack#16493</a></li>
<li><a href="https://github.com/askoufis"><code>@​askoufis</code></a> made their first contribution in <a href="https://redirect.github.com/webpack/webpack/pull/16781">webpack/webpack#16781</a></li>
</ul>
<p><strong>Full Changelog</strong>: <a href="https://github.com/webpack/webpack/compare/v5.75.0...v5.76.0">https://github.com/webpack/webpack/compare/v5.75.0...v5.76.0</a></p>
<h2>v5.75.0</h2>
<h1>Bugfixes</h1>
<ul>
<li><code>experiments.*</code> normalize to <code>false</code> when opt-out</li>
<li>avoid <code>NaN%</code></li>
<li>show the correct error when using a conflicting chunk name in code</li>
<li>HMR code tests existance of <code>window</code> before trying to access it</li>
<li>fix <code>eval-nosources-*</code> actually exclude sources</li>
<li>fix race condition where no module is returned from processing module</li>
<li>fix position of standalong semicolon in runtime code</li>
</ul>
<h1>Features</h1>
<ul>
<li>add support for <code>@import</code> to extenal CSS when using experimental CSS in node</li>
<li>add <code>i64</code> support to the deprecated WASM implementation</li>
</ul>
<h1>Developer Experience</h1>
<ul>
<li>expose <code>EnableWasmLoadingPlugin</code></li>
<li>add more typings</li>
<li>generate getters instead of readonly properties in typings to allow overriding them</li>
</ul>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/webpack/webpack/commit/97b1718720c33f1b17302a74c5284b01e02ec001"><code>97b1718</code></a> Merge pull request <a href="https://redirect.github.com/webpack/webpack/issues/16781">#16781</a> from askoufis/loader-context-target-type</li>
<li><a href="https://github.com/webpack/webpack/commit/b84efe6224b276bf72e4c5e2f4e76acddfaeef07"><code>b84efe6</code></a> Merge pull request <a href="https://redirect.github.com/webpack/webpack/issues/16759">#16759</a> from ryanwilsonperkin/real-content-hash-regex-perf</li>
<li><a href="https://github.com/webpack/webpack/commit/c98e9e001441b165c7ed4845700839730b505833"><code>c98e9e0</code></a> Merge pull request <a href="https://redirect.github.com/webpack/webpack/issues/16493">#16493</a> from piwysocki/patch-1</li>
<li><a href="https://github.com/webpack/webpack/commit/5f34acfbc074da6cc09f48944d7f2b4273ffb3f8"><code>5f34acf</code></a> feat: Add <code>target</code> to <code>LoaderContext</code> type</li>
<li><a href="https://github.com/webpack/webpack/commit/b7fc4d876deb958d7ee81ecc00a312e39a354a44"><code>b7fc4d8</code></a> Merge pull request <a href="https://redirect.github.com/webpack/webpack/issues/16703">#16703</a> from ryanwilsonperkin/ryanwilsonperkin/fix-16160</li>
<li><a href="https://github.com/webpack/webpack/commit/63ea82da4d4e4242b6a6285fc937f0684f264fe8"><code>63ea82d</code></a> Merge branch 'webpack:main' into patch-1</li>
<li><a href="https://github.com/webpack/webpack/commit/4ba225225b1348c8776ca5b5fe53468519413bc0"><code>4ba2252</code></a> Merge pull request <a href="https://redirect.github.com/webpack/webpack/issues/16446">#16446</a> from akhilgkrishnan/patch-1</li>
<li><a href="https://github.com/webpack/webpack/commit/1acd6350be3d74d4ac70b64cbbc60f27724b618b"><code>1acd635</code></a> Merge pull request <a href="https://redirect.github.com/webpack/webpack/issues/16613">#16613</a> from jakebailey/ts-logo</li>
<li><a href="https://github.com/webpack/webpack/commit/302eb37fe19ed7ca60eaf895aca4f9da9dfd7931"><code>302eb37</code></a> Merge pull request <a href="https://redirect.github.com/webpack/webpack/issues/16614">#16614</a> from jakebailey/html5-logo</li>
<li><a href="https://github.com/webpack/webpack/commit/cfdb1dfe59b33bf7441b8a8e4fc58d75e4f54cee"><code>cfdb1df</code></a> Improve performance of hashRegExp lookup</li>
<li>Additional commits viewable in <a href="https://github.com/webpack/webpack/compare/v5.74.0...v5.76.0">compare view</a></li>
</ul>
</details>
<details>
<summary>Maintainer changes</summary>
<p>This version was pushed to npm by <a href="https://www.npmjs.com/~evilebottnawi">evilebottnawi</a>, a new releaser for webpack since your current version.</p>
</details>
<br />


[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=webpack&package-manager=npm_and_yarn&previous-version=5.74.0&new-version=5.76.0)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

Dependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.

[//]: # (dependabot-automerge-start)
Dependabot will merge this PR once CI passes on it, as requested by @pavsaund.

[//]: # (dependabot-automerge-end)

---

<details>
<summary>Dependabot commands and options</summary>
<br />

You can trigger Dependabot actions by commenting on this PR:
- `@dependabot rebase` will rebase this PR
- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it
- `@dependabot merge` will merge this PR after your CI passes on it
- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it
- `@dependabot cancel merge` will cancel a previously requested merge and block automerging
- `@dependabot reopen` will reopen this PR if it is closed
- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually
- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)
- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)
- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)
- `@dependabot use these labels` will set the current labels as the default for future PRs for this repo and language
- `@dependabot use these reviewers` will set the current reviewers as the default for future PRs for this repo and language
- `@dependabot use these assignees` will set the current assignees as the default for future PRs for this repo and language
- `@dependabot use this milestone` will set the current milestone as the default for future PRs for this repo and language

You can disable automated security fix PRs for this repo from the [Security Alerts page](https://github.com/dolittle/Studio/network/alerts).

</details>


# [3.3.20] - 2023-3-30 [PR: #355](https://github.com/dolittle/Studio/pull/355)
## Summary

Start the ConnecitonDetails implementation. Add link tabs to navigate through connection details. Refine the design system accordingly.

<img width="998" alt="Screenshot 2023-03-30 at 09 55 19" src="https://user-images.githubusercontent.com/19160439/228757798-4dd278ee-6f6b-4056-9b7c-867b3ffc3dd6.png">

### Added

- StatusIndicator improvements
- Override props in Tabs to add Tabs as a Link component
- Route to 'messages' tab by default if ConnectionTable is clicked
- StatusIndicator to Page component
- DataTableToolbar to Design System
- NewMessage component

### Changed

- Updated generated API-s
- Added `id` to Tabs to get the last opened tab from `sessionStorage`, if necessary
- Replaced 'QuesrionMarkRounded' with 'HelpRounded' in Icons and in StatusIndicator

### Fixed

- Tooltips display in NewM3Conneciton


# [3.3.19] - 2023-3-29 [PR: #354](https://github.com/dolittle/Studio/pull/354)
## Summary

Fixing broken build

### Added

yarn.lock 

### Changed

build

### Fixed

- ???


# [3.3.18] - 2023-3-27 [PR: #353](https://github.com/dolittle/Studio/pull/353)
## Summary

Add StatusIndicator component to Design System.

<img width="879" alt="Screenshot 2023-03-27 at 09 36 59" src="https://user-images.githubusercontent.com/19160439/227859997-14c87f3a-5303-4cf0-b390-34800f961fdc.png">

### Added

- Accordion 'expand' on title click
- StatusIndicator comonent to Design System
- StatusIndicator to Accordtion props

### Changed

- Minor styling fixes
- Wording/components name fixes


# [3.3.17] - 2023-3-26 [PR: #352](https://github.com/dolittle/Studio/pull/352)
## Summary

Add titles to pages. 

<img width="673" alt="Screenshot 2023-03-26 at 01 46 36" src="https://user-images.githubusercontent.com/19160439/227748513-8f73a6d7-123e-4a85-8de1-2cbcbe434573.png">

### Added

- usePageTitle hook.


# [3.3.16] - 2023-3-24 [PR: #351](https://github.com/dolittle/Studio/pull/351)
## Summary

Add functionality to 'new m3 connection' page.

<img width="739" alt="Screenshot 2023-03-24 at 18 48 14" src="https://user-images.githubusercontent.com/19160439/227589484-c8639927-8b7a-4251-a62f-878b5ce60939.png">

### Added

- Api hooks

### Fixed

- Tooltip sx props location

### Removed

- Unused code


# [3.3.15] - 2023-3-23 [PR: #350](https://github.com/dolittle/Studio/pull/350)
- Only show error message when query has error
- Set the staleTime for connectionId query to 1 min
- Populate name and start use of reducer to save value
- Successfully post a name change to the server


# [3.3.14] - 2023-3-23 [PR: #349](https://github.com/dolittle/Studio/pull/349)
## Summary

Add NewM3Connetion page content


# [3.3.12] - 2023-3-22 [PR: #347](https://github.com/dolittle/Studio/pull/347)
- Initial test component for Accordion List => needs to be moved to Design System
- Initial implementation of AccordList component
- Create first stories for AccordionList component
- Fix wrong import of componentStories
- Fix typo in comment


# [3.3.11] - 2023-3-22 [PR: #346](https://github.com/dolittle/Studio/pull/346)
- Basic routing for connection details tab routes & new connection page
- Scaffold connection details sub components
- Move 'new connection' route to own folder


# [3.3.10] - 2023-3-22 [PR: #345](https://github.com/dolittle/Studio/pull/345)
## Summary

Integration page connection updates


# [3.3.9] - 2023-3-21 [PR: #344](https://github.com/dolittle/Studio/pull/344)
## Summary

Change Integration page Wizzard to Accortion (hard coded version).

<img width="758" alt="Screenshot 2023-03-21 at 21 21 03" src="https://user-images.githubusercontent.com/19160439/226721720-015f82ce-4c08-43cc-88b8-2c5e4201bc0e.png">

### Added

- Accordion to stories
- Icon to stories
- Design System docs
- Accordion to Integration page (hard coded)

### Changed

- Accordion 'expand' icon rotate direction

### Fixed

- Improved Design System components

### Removed

- Cleaned Design System code


# [3.3.8] - 2023-3-21 [PR: #342](https://github.com/dolittle/Studio/pull/342)
- add hook to get a specific connection by id
- Add route to the connection page, and route for creating new


# [3.3.7] - 2023-3-20 [PR: #341](https://github.com/dolittle/Studio/pull/341)
## Summary

Add Stepper into Design System and use it in: integrations/connections/new-m3-connection/wizard

<img width="1078" alt="Screenshot 2023-03-20 at 21 39 05" src="https://user-images.githubusercontent.com/19160439/226456969-3d25aaee-91ca-440f-96b7-29c03b79369b.png">


# [3.3.6] - 2023-3-16 [PR: #339](https://github.com/dolittle/Studio/pull/339)
## Summary

Add FileUploadForm component to Design System and used it in filesSection.tsx.

<img width="712" alt="Screenshot 2023-03-16 at 23 53 29" src="https://user-images.githubusercontent.com/19160439/225761292-0d40cf96-6891-4c8c-90c6-b869458e2037.png">


# [3.3.5] - 2023-3-14 [PR: #334](https://github.com/dolittle/Studio/pull/334)
Don't need to have this prefix in right now, and it's a little annoying.
When we model "workspaces" in, it may need to come back


# [3.3.4] - 2023-3-14 [PR: #331](https://github.com/dolittle/Studio/pull/331)
## Summary

Make it possible to create and delete connections from the integrations/connections page. The Delete functionality is added as a debug-only feature.


# [3.3.3] - 2023-3-14 [PR: #330](https://github.com/dolittle/Studio/pull/330)
## Summary

Don't show 'change customer' button, if there is only one customer.

<img width="208" alt="Screenshot 2023-03-14 at 07 54 55" src="https://user-images.githubusercontent.com/19160439/224910089-aef62218-1b0f-40ea-b07a-4f2003c8d5e1.png">

### Added

- Lang attribute to HTML

### Changed

- Combine sidebar bottom navigation items with main navigation

### Removed

- Button line-height from theme
- BackupsScreen list item dot


# [3.3.2] - 2023-3-10 [PR: #329](https://github.com/dolittle/Studio/pull/329)
## Summary

Small code cleanup and made microservices detail view page more mobile friendly.

### Changed

- Used 'dashedBorder' styles from Design System on inputs

### Fixed

- Disabled buttons going multiple lines
- Styles so pages are looking better on mobile


# [3.3.1] - 2023-3-9 [PR: #327](https://github.com/dolittle/Studio/pull/327)
# Summary

- Add generated api's for integrations based on Swagger/OpenAPI and typescript fetch
- Replace hand-rolled connections api with generated in hook and use in component
- Update api-hooks filename to match api filename


# [3.3.0] - 2023-3-8 [PR: #325](https://github.com/dolittle/Studio/pull/325)
## Summary

- First steps of the Connections page
- Add react query
- First api-integration against the bridge


# [3.2.2] - 2023-3-8 [PR: #323](https://github.com/dolittle/Studio/pull/323)
## Summary

This adds a new layout to workspaces. The layout includes a responsive top main navigation bar with SelectMenus and a collapsible sidebar.

<img width="993" alt="Screenshot 2023-03-08 at 02 51 15" src="https://user-images.githubusercontent.com/19160439/223591179-4fa19b2b-4b1c-4ebf-944b-93901bca8d9b.png">

### Added

- Icon component to Design System/atoms
- NavigationBar to Design System/molecules
- SideBar to Design System/molecules
- JsDocs to Design System
- Display 'current route' in stories


# [3.2.1] - 2023-3-1 [PR: #320](https://github.com/dolittle/Studio/pull/320)
## Summary

Improved IconButton in Design System. Now we can choose icon from the list and not import them from '@mui/icons'.

<img width="1021" alt="Screenshot 2023-03-02 at 00 48 29" src="https://user-images.githubusercontent.com/19160439/222283220-fb51589d-01c5-4421-b5fe-6203c21d671d.png">

### Added

- Icon folder and files to hold all our icons that we use
- Tooltip to IconButton
- JsDocs and controls to IconButton.stories


# [3.2.0] - 2023-2-28 [PR: #314](https://github.com/dolittle/Studio/pull/314)
## Summary

Studio Web project is currently set up to only know about the platform hosting part. The project needs to be restructured to take a more modular approach and be able to scale. Perhaps this is also a good opportunity to remove some old / stale components and code

- [x] Update structure
- [x] Anchor with team
- [x] Update onboarding docs (README)
- [x] Add ADR with description


### Added

- ADR's to Studio. Use the vscode plugin and read the documentation in ADR 0000 for information.
- ADR-0001:  Expand studio web with modules structure

### Changed

- Updated the Studio Web structure to give more space for areas and modules based on the ADR-0001. Important to notice that some shared folders are left outside the modules. Nameley shared `components`, `apis`, `utils` and `spaces`. And the usual folders needed for hosting the static app. 


---
- To see the specific tasks where the Asana app for GitHub is being used, see below:
  - https://app.asana.com/0/0/1203983959681225


# [3.1.3] - 2023-2-27 [PR: #317](https://github.com/dolittle/Studio/pull/317)
## Summary

Overall Design System component improvements. Added documentation with controls to Storybook.
Display The default version of this component, which can also be changed using the controls.

<img width="1076" alt="Screenshot 2023-02-27 at 17 02 19" src="https://user-images.githubusercontent.com/19160439/221599363-480d07c8-b0b2-43e4-9a1d-1bee95842dd1.png">

### Added

- Missing Stories - Dialog, Select, Switch
- Documentation to Design System

### Changed

- Design System improvements

### Removed

- Wrongly used style overrides from Theme


# [3.1.2] - 2023-2-23 [PR: #315](https://github.com/dolittle/Studio/pull/315)
## Summary

Add reusable 'Alert Dialog' component to Design System and to stories with JsDocs.

<img width="643" alt="Screenshot 2023-02-23 at 20 35 02" src="https://user-images.githubusercontent.com/19160439/220999326-867bdb9a-fd4f-4555-84bc-b28cbb40f652.png">

### Added

- 'error' color to dialogs confirm buttons whose action or output is irreversible
- JsDocs for documentation
- Helper function that holds regex patterns
- Helper function that converts bytes


# [3.1.1] - 2023-2-16 [PR: #313](https://github.com/dolittle/Studio/pull/313)
## Summary

As part of the upgrade to latest react router (#301) the image/tags route was changed and no longer supported using `/` as part of the URL. This fix encodes the :image parameter so that it should work


### Fixed

- Fix broken links to images tags in container registry view for images containing '/'


# [3.1.0] - 2023-2-15 [PR: #310](https://github.com/dolittle/Studio/pull/310)
- add kubelogin to documentation

## Summary

Add a section on kubelogin to the verify kubernetes access -documentation


# [3.0.0] - 2023-2-15 [PR: #301](https://github.com/dolittle/Studio/pull/301)
## Summary

This PR upgrades the react router to the latest version, and does cleans up a few things along the way. There are a few motivations for the upgrade at this time.
 - Prepare for introducing several `modules` with their own navigation
 - Ensure that Studio doesn't lag behind on versions, making upgrading even harder in the future
 - Clean up some of the routes / Nested routes along the way

The guide at https://reactrouter.com/en/6.7.0/upgrading/v5 was the main reference for helping along the way.

What is **not done** in this PR:
 - Fixing click-jacking of navigation url's (no more onClick) for simple navigation
 - removing `selfservice` as base-url
 - Change ApplicationChanger behaviour to updated pattern. The reason for this is the store does not reset microservices across applications, and thus merges them across application environments. This needs to be fixed as a separate PR.

### Added

- For local dev, added handling in webpack devserver for known urls not using /selfservice basename
- Added a `ButtonLink` component in Studio that extends the design system button with react-router`Link`-component

### Changed

- Upgraded react router to v6.6.2
- Now leaning on relative url's. from within a Nested route, simplifying navigation and the need to build up full urls for router-navigation
- `Button` has a new optional `overrides` property to allow overriding from external usage. Used by `ButtonLink`


### Fixed

- microserviceTable now re-renders when microservices change, and sets the isLoading flag before and after.

---
- To see the specific tasks where the Asana app for GitHub is being used, see below:
  - https://app.asana.com/0/0/1203789530758097


# [2.22.1] - 2023-2-6 [PR: #312](https://github.com/dolittle/Studio/pull/312)
## Summary

Used new Design System Button component to display correct styles on Microservice statuses.

<img width="141" alt="Screenshot 2023-02-06 at 16 31 22" src="https://user-images.githubusercontent.com/19160439/217015599-6cee049b-5f0e-47c7-9043-6175cc521a0d.png">

### Fixed

- FilterSelect.tsx style
- MicroserviceStatus.tsx style


# [2.22.0] - 2023-2-3 [PR: #311](https://github.com/dolittle/Studio/pull/311)
## Summary

- Update latest selectable runtime version to 8.9.1


# [2.21.0] - 2023-2-2 [PR: #309](https://github.com/dolittle/Studio/pull/309)
## Summary

update latest runtime version to 8.9.0


# [2.20.1] - 2023-2-2 [PR: #307](https://github.com/dolittle/Studio/pull/307)
## Summary

Improved Button component. Added documentation and controls to Storybook so it would be clear how to use them.

<img width="1039" alt="Screenshot 2023-02-02 at 10 47 45" src="https://user-images.githubusercontent.com/19160439/216277212-67896887-e889-4f6b-a61e-a1d134987d4a.png">

### Added

- 'subtle' color for cases where button does not need attention.
- Controls for Button.stories
- Link functionality

### Removed

- 'danger' variant from Button
- Unnecessary Button from filterSelect.tsx


# [2.20.0] - 2023-2-2 [PR: #306](https://github.com/dolittle/Studio/pull/306)
this puts new services on the at-this-time latest runtime version

## Summary

change the "8" version of the runtime to 8.8.2, which is currently the latest

not 100% sure that nothing else needs to change - so a review would be nice :)


# [2.19.7] - 2023-1-31 [PR: #305](https://github.com/dolittle/Studio/pull/305)
## Summary

Added and improved JsDocs in Design System.
Cleaned a code little bit.

<img width="1026" alt="Screenshot 2023-01-31 at 16 51 49" src="https://user-images.githubusercontent.com/19160439/215793843-689bb382-d7f0-4fe6-8089-8c471906b94d.png">

### Added

- JsDocs to Storybook components

### Changed

- Combined imports from same place into one line

### Fixed

- Tabs styling as it was outdated


# [2.19.6] - 2023-1-30 [PR: #304](https://github.com/dolittle/Studio/pull/304)
## Summary

Trying to fix configuration files fetch error that appear after opening microservice.

<img width="410" alt="Screenshot 2023-01-30 at 19 23 00" src="https://user-images.githubusercontent.com/19160439/215549925-925fb5dc-3b9d-49e2-874c-2d79acf9db28.png">

### Fixed

- Configuration files fetch error


# [2.19.5] - 2023-1-30 [PR: #300](https://github.com/dolittle/Studio/pull/300)
## Summary

This is new style and features for 'Deploy Base Microservice' page.

<img width="1026" alt="Screenshot 2023-01-17 at 13 28 39" src="https://user-images.githubusercontent.com/19160439/212889203-6b537000-97e0-4bcc-96f6-907da2340819.png">

### Added

- Validation for head command fields
- Link component to Storybook
- Tooltip component to Storybook
- Index exports to Storybook
- JsDocs to Storybook

### Fixed

- Disable password managers on input fields


# [2.19.4] - 2023-1-30 [PR: #303](https://github.com/dolittle/Studio/pull/303)
## Summary

Made Storybook Icon Buttons component reusable.
Added JsDocs to Icon Buttons so it would be easier to understand how to use Icons.

<img width="1051" alt="Screenshot 2023-01-30 at 10 18 07" src="https://user-images.githubusercontent.com/19160439/215424537-d18ef437-0210-4448-9c81-08ff0eee7d8d.png">

### Added

- Link functionality to Icon Button
- JsDocs to Icon Button 
- Controls to IconButton.stories

### Fixed

- Wording on IconButton.stories

### Changed

- Refactor downloadHelpers.tsx props


# [2.19.3] - 2023-1-26 [PR: #302](https://github.com/dolittle/Studio/pull/302)
## Summary

Make AlertBox component in Design System reusable and add JsDocs for documentation.
Display AlertBox in stories and added controls so it would be easier to understand how to use alerts in code.

<img width="985" alt="Screenshot 2023-01-27 at 01 06 05" src="https://user-images.githubusercontent.com/19160439/214970644-d61029d0-edd0-4fca-a76b-71cf6d59f397.png">

### Added

- JsDocs to AlertBox.tsx
- Controls to AlertBox.stories.tsx
- Controlled alert 'open' and 'close' state if needed

### Fixed

- Better wording in alertBox.stories.tsx
- How to use links inside alert message


# [2.19.2] - 2023-1-10 [PR: #299](https://github.com/dolittle/Studio/pull/299)
## Summary

Small change to force build to be re-run


# [2.19.1] - 2023-1-10 [PR: #297](https://github.com/dolittle/Studio/pull/297)
## Summary

The build step "Push Semantic Image to Docker Hub" was missing the build-args attribute so this was never passed into the dockerisation, and thus the license key was never set.

### Fixed
  - deployment step for semantic version to include build-args

### Changed
 - made small change to self-service to force deployment


# [2.19.0] - 2023-1-3 [PR: #296](https://github.com/dolittle/Studio/pull/296)
## Summary

To fix the problem with the Dashlane browser extension, I added component='span' and role='none' to the Button component.

<img width="521" alt="Screenshot 2023-01-03 at 15 16 51" src="https://user-images.githubusercontent.com/19160439/210365774-7dc02984-fc76-444a-b8f3-a0f512006e01.png">

Otherwise, Dashlane wanted to interact with the regular button component and significantly slowed down the 'live logs' page.

<img width="283" alt="Screenshot 2023-01-03 at 14 11 04" src="https://user-images.githubusercontent.com/19160439/210365748-8795db92-dca5-4654-988f-660da49502b7.png">

### Added

- Component props to Button.
- Role props to Button.


# [2.18.0] - 2023-1-3 [PR: #292](https://github.com/dolittle/Studio/pull/292)
## Summary

Made cleanup - deleted unused code.

### Changed

- Refactored layoutWithSidebar.tsx
- Refactored m3connector/container.tsx

### Removed

- podStatus.tsx and route to that page
- PurchaseOrder
- switch.tsx
- themeScreen.tsx
- todoScreen.tsx
- insightScreen and related content


# [2.17.2] - 2023-1-3 [PR: #291](https://github.com/dolittle/Studio/pull/291)
## Summary

This deals with Creating New Application. Added better validation error message for application name field.
After application is created successfully, it redirects to overall 'applications' page. Otherwise it shows AlertBox and Button to navigate back to 'applications' page.

<img width="548" alt="Screenshot 2023-01-03 at 03 26 08" src="https://user-images.githubusercontent.com/19160439/210289657-7bcc3807-4004-4e74-a26b-1eccc84ac56d.png">

<img width="672" alt="Screenshot 2023-01-03 at 03 26 46" src="https://user-images.githubusercontent.com/19160439/210289663-b99e0695-13a7-4520-90f5-55c96e35c859.png">

<img width="569" alt="Screenshot 2023-01-03 at 03 27 41" src="https://user-images.githubusercontent.com/19160439/210289667-c221764c-7069-495e-b15f-ee89a6fde1ad.png">

### Changed

- After creating application page successfully, redirect to '/applications/' page. Otherwise display error.
- Refactored 'Create application' component.

### Fixed

- 'Create new application' application name field validation bug. Still need improvement from backend to support uppercase letters.


# [2.17.1] - 2023-1-2 [PR: #290](https://github.com/dolittle/Studio/pull/290)
## Summary

Add Dark theme to the Storybook as it fits better with Studio.
Added jsDocs for Button component.
Created custom button variant 'danger' for cases where the primary action is destructive such as deleting content.
Created cutom button variant 'fullwidth' that makes button as wide, as its container. Used mostly in Data Table Grids when there is no rows yet.

<img width="1096" alt="Screenshot 2023-01-02 at 12 11 10" src="https://user-images.githubusercontent.com/19160439/210259819-f41b25e9-77c5-4dba-8942-fe54f2872afc.png">

### Added

- Dark theme to Storybook. Components didn't had good contrast with white background.
- Custom button variants: 'danger' and 'fullwith'.
- Secondary color variant to button.

### Changed

- Button default variant to 'text'.
- Renamed button that adds new environment variable file.
- Renamed button that takes back to tenant.

### Removed

- Actions on the Storybook Canvas. This is still to be discussed but removed for a better user experience.


# [2.17.0] - 2022-12-27 [PR: #289](https://github.com/dolittle/Studio/pull/289)
## Summary

Created multible index.ts export files so it would be easier to import reusable code into components.

<img width="1060" alt="Screenshot 2022-12-27 at 18 13 02" src="https://user-images.githubusercontent.com/19160439/209693537-1759336b-e0ad-4707-9202-3f9f80cc7c04.png">

### Changed

- Combined component imports more together using the new export method.


# [2.16.0] - 2022-12-27 [PR: #288](https://github.com/dolittle/Studio/pull/288)
## Summary

Destructured Storybook props to keep code consistent and easier to read.

<img width="1579" alt="Screenshot 2022-12-27 at 09 10 34" src="https://user-images.githubusercontent.com/19160439/209626733-d2398747-fe8c-4e3a-853a-bf03e537fadf.png">


### Changed

- Code cleanup.


# [2.15.1] - 2022-12-23 [PR: #280](https://github.com/dolittle/Studio/pull/280)
## Summary

Added Configuration page Environment Variables section. User can add, delete, download and edit Environment Variables.

<img width="1295" alt="Screenshot 2022-12-14 at 07 29 27" src="https://user-images.githubusercontent.com/19160439/207514033-e1be27aa-8e42-437d-99c5-be11ed741a15.png">

<img width="1288" alt="Screenshot 2022-12-14 at 07 30 52" src="https://user-images.githubusercontent.com/19160439/207514041-64acedd4-9af5-4325-af77-1abdf2446251.png">


# [2.15.0] - 2022-12-5 [PR: #260](https://github.com/dolittle/Studio/pull/260)
## Summary

This is Configuration Files section from Configuration page. User can upload, delete and download configuraion files. Files are displayed in data table. With every action, Snackbar also appears to show status of the action.

<img width="1319" alt="Screenshot 2022-11-28 at 18 56 25" src="https://user-images.githubusercontent.com/19160439/204336703-dbd803a8-e477-4de3-91f5-24754a5b5e39.png">

<img width="531" alt="Screenshot 2022-11-28 at 18 56 47" src="https://user-images.githubusercontent.com/19160439/204336715-cf27e199-08f3-4955-9c81-688918c722b0.png">

### Changed

- Updated Notistack to Alpha version.

### Fixed

- 'ENV variable' button was commented out - added it back.

### Removed

- delete.tsx as it was not needed anymore.


# [2.14.0] - 2022-11-29 [PR: #261](https://github.com/dolittle/Studio/pull/261)
## Summary

Create the scaffolding of a frontend for the Bridge. It is based on Nextjs, and is set up to work against the bridge-api for localdev. It also lives in the Studio monorepo, and this has access to and is using the design system. 

Made some changes to the yarn workspace dependencies and configuration to maake this possible.
Changed how fonts are loaded in the DesignSystem and SelfService/Web to allow a different approach in the Bridge-Frontend

Some key aspects:
**Scaffolded using create next app with typescript template**
- Some basic routes
  - /
  - /designer
  - /explorer - this is where there is some data-fetching
- Expected data-layer on `/api`

**Leveraging @tanstack/react-query as a wrapper around queries / server-side state**
Decision to use react-query as a wrapper around data-fetching allows us to change the underlying query mechanism as needed. Current implementation relies on using the `fetch`-api directly. Also set query `staleTime` to 1 minute, since most of the data shouldn't be updated very often, unless explicitly requested (ex after a mutation).

**Local development mode when running the bridge-api on port 5000**
Set up rewrites in `next.config.js` to allow a good local dev experience
- Generated api-layer from Open-API schema in bridge-api (not scripted/automated yet) available 

### Added

- bridge-frontend as part of the Studio monorepo

### Changed

- No longer include fonts as part of the design system `theme.ts`. In stead exposed as a separate export that can be imported. This will allow the consuming project to decide how it wants to load fonts. SelfService/Web explicitly loads fonts separately from `fonts.ts`.
- Consolidated versions of `eslint` across package-json to allow adding the bridge-frontend with dependencies
- Enforce yarn version used across workspace to 1.22.19 to easier manage dependencies

### Removed

- Dependency to `@dolittle/typescript-build`- removed.


# [2.13.0] - 2022-11-9 [PR: #258](https://github.com/dolittle/Studio/pull/258)
## Summary

This PR will fix error that occurred when Microservice object is not containing 'extra' object and when configuration files fetch failes.

Also added few helper functions that capitalize string and removes unwanted part from string.

<img width="494" alt="Screenshot 2022-11-09 at 19 23 56" src="https://user-images.githubusercontent.com/19160439/200902920-416786cd-4db1-4e6b-9871-7554d81e0548.png">

<img width="486" alt="Screenshot 2022-11-08 at 18 28 07" src="https://user-images.githubusercontent.com/19160439/200902944-95281173-11cc-4a14-a80a-c2207113379a.png">

### Added

- Helper functions for capitalization and cleaning string.

### Fixed

- Error on 'Configuration Files' failed fetch
- Error if Microservice object does not contain 'extra' object.


# [2.12.0] - 2022-11-8 [PR: #257](https://github.com/dolittle/Studio/pull/257)
## Summary

Fix for errors that appeared after merge and wrongly solved conflicts in MicroserviceView.tsx.

<img width="621" alt="Screenshot 2022-11-08 at 16 08 47" src="https://user-images.githubusercontent.com/19160439/200586305-a40787f9-b86b-4f8b-9699-014bf4259346.png">

### Fixed

- Removed double code


# [2.11.0] - 2022-11-8 [PR: #256](https://github.com/dolittle/Studio/pull/256)
## Summary

Moved AlertDialog into Storybook and used it to ask confirmation before microservice is restarted and before microservice is deleted.

<img width="899" alt="Screenshot 2022-11-04 at 10 57 24" src="https://user-images.githubusercontent.com/19160439/199933881-fe1a6571-b286-465d-a55f-1fa07eeb7934.png">

### Added

- Confirmation dialog for restarting microservice.


# [2.10.1] - 2022-10-24 [PR: #254](https://github.com/dolittle/Studio/pull/254)
## Summary

Fixes a bug that caused the page to go blank when navigating away from the Terminal-tab. Also make it a bit larger (depending on viewport height) so we get more room to play.

### Changed

- The Terminal view is now `70vh` tall.

### Fixed

- A bug in the `xterm.js` library causes it to `throw` whenever it is disposed (at least using the `WebglAddon`. For now we are just catching this.


# [2.10.0] - 2022-10-24 [PR: #249](https://github.com/dolittle/Studio/pull/249)
## Summary

Adds a Terminal to connect to a shell running _inside_ a Microservice.

<img width="659" alt="image" src="https://user-images.githubusercontent.com/1014990/197510632-39688ecc-d045-41fc-9113-749d450e303f.png">


### Added

- A new Terminal component in the DesignSystem that can be connected to any TTY-like interface. A browser-local sample is implemented in the `fake.ts` file - and a similar thing could be used to do something with a terminal-like UI if we want to.
- A new tab on the `MicroserviceView` page - only visible if a shell is available for the current microservice. This opens a new view with a Terminal.
- A mock TTYd server for local development when running with mocks. It starts a new TTY on your local machine in your home folder (I don't know how well this works on Windows).

### Changed

- The custom `wrapper` setup in the `componentStories.ts` was changed to use the Storybook-builtin `decorator` setup.


# [2.9.0] - 2022-10-18 [PR: #253](https://github.com/dolittle/Studio/pull/253)
## Summary

Fixed error that accoured after Creating New Application - React needs uniq keys for every list item whitch we did not have.
Also removed console.log that should not be in production.
Fixed some styling that they would be more uniformed.
Used Buttons from Storybook instead imports from MUI.

<img width="1123" alt="Screenshot 2022-10-17 at 10 53 31" src="https://user-images.githubusercontent.com/19160439/196437316-2d38f2c9-75ff-4d0d-a601-859019a1299c.png">

<img width="453" alt="Screenshot 2022-10-17 at 10 53 03" src="https://user-images.githubusercontent.com/19160439/196437408-a19e32f1-d97a-4eed-89a9-026a526cc785.png">

### Added

- Each list items in Applications page has now uniq key that React needs

### Changed

- MUI imported Button to Button from Storybook

### Fixed

- Made styles more uniform

### Removed

- console.log after new application was created


# [2.8.1] - 2022-10-17 [PR: #252](https://github.com/dolittle/Studio/pull/252)
## Summary

When logging in to studio and there are no applications in the tenant you were logged in for you'd get a black screen. Now instead you will get an empty list and the choice to create a new application or go back to choose another tenant.

### Fixed

- Bug when no applications existed in the tenant


Before fix:
<img width="1590" alt="Screenshot 2022-10-14 at 21 01 37" src="https://user-images.githubusercontent.com/13407188/195926532-81df9186-0f35-4404-bd2b-815ea6b5798c.png">

After Fix:
<img width="1343" alt="Screenshot 2022-10-14 at 21 27 17" src="https://user-images.githubusercontent.com/13407188/195926642-7a5b148d-f606-4373-aae4-dbf82b6b4b1e.png">


# [2.8.0] - 2022-10-13 [PR: #251](https://github.com/dolittle/Studio/pull/251)
## Summary

Updated styles as Theme is updated.
Added loading states to data tables and its content.
Added reusable components to Storybook and used them.
Cleaned some code.
Added SessionStorage to Tabs component in Storybook so active Tab will remain the same after page refresh.

<img width="538" alt="Screenshot 2022-10-13 at 09 56 33" src="https://user-images.githubusercontent.com/19160439/195527260-e7e7b410-a716-49f6-91d5-9a6c29864dd2.png">

<img width="1501" alt="Screenshot 2022-10-13 at 09 54 05" src="https://user-images.githubusercontent.com/19160439/195527294-653c8988-a457-4cf7-b90c-08ba325e938e.png">

### Added

- Save current active Tab in SessionStorage so Tab will stay the same after page refresh.
- Loading states to data table and container logs.

### Changed

- Moved reusable components to Storybook and used them.
- Updated styles according to Theme updates.

### Removed

- Unused components.


# [2.7.0] - 2022-10-12 [PR: #250](https://github.com/dolittle/Studio/pull/250)
## Summary

Smaller 'Create new appliaction' page fixes.

<img width="587" alt="Screenshot 2022-10-12 at 14 00 53" src="https://user-images.githubusercontent.com/19160439/195326018-fa8654db-a6ab-439d-a826-0abbfee29d5c.png">

### Added

- Loading state while application is created.

### Changed

- Remove form active field error when user starts to typing again previosly errored field.
- Styling improvements.


# [2.6.0] - 2022-10-11 [PR: #247](https://github.com/dolittle/Studio/pull/247)
## Summary

Show and catch errors in Create New Application page form.

![image](https://user-images.githubusercontent.com/1014990/195088399-95235084-1ca5-43e6-9ed9-9738f2780725.png)

![image](https://user-images.githubusercontent.com/1014990/195088573-6bf5ef18-a0bc-42a4-9aa7-9f74ac9225ab.png)


### Added

- Display input field error message when input looses focus.
- Components for making forms in the DesignSystem, namely `<Form>`, `<Input>` and `<Checkbox>`.

### Changed

- MUI TextField into Outlined Input.

### Fixed

- Minor naming fixes.


# [2.5.4] - 2022-10-10 [PR: #248](https://github.com/dolittle/Studio/pull/248)
## Summary

Update the runtime dropdown selection to display the latest version `8.6.0` when creating a microservice.


# [2.5.3] - 2022-10-5 [PR: #246](https://github.com/dolittle/Studio/pull/246)
## Summary

Fixes a bug where switching environments on the `MicroserviceView` (and other) screens causes a blank page to be a shown. Turns out it was not filtering microservices from the `MicroserviceStore` correctly - which caused it to partially load data for the wrong microservice. This is definitely not a good fix - but solves the problem for now.

### Changed

- The Mock-server now behaves more like the actual production APIs

### Fixed

- Getting Microservice-data from the store did not filter on environment, causing redirects to the overview not happening.


# [2.5.2] - 2022-10-5 [PR: #245](https://github.com/dolittle/Studio/pull/245)
## Summary

The `Vega` graph components use the `window:resize` event to re-calculate their own size. However, it turns out that this event **is not triggered** when a scrollbar is shown or hidden. This lead to some graphs having the wrong size if more content was loaded later and making the scrollbar appear.

This little fix listens to the `window.visualViewport:resize` event, which **is triggered** when a scrollbar is shown or hidden, and re-dispatches a new `window:resize` event. This forces `Vega` graphs to recalculate as normal, and it shouldn't cause issues for other elements.

### Fixed

- The `Vega` graphs did not re-calculate their size when a scrollbar appeared, which meant that for small windows the `CPU Usage` graph would be a little too wide when the `Memory Usage` graph appeared.


# [2.5.1] - 2022-10-4 [PR: #244](https://github.com/dolittle/Studio/pull/244)
## Summary

Adds a `range` and `domain` property on the `Graph` component so that we can make the empty-state look a bit better. The HealthStatus page should now look like this when there is no data:
![image](https://user-images.githubusercontent.com/1014990/193765926-616154f9-5ab0-4aa5-b265-4a5f7447b693.png)

### Added

- `range` and `domain` props to set the extends on a `Graph` component explicitly. By default they are calculated from the data.

### Changed

- The `HealthStatus` page sets the domain to be the last 24 hours - and sensible ranges for CPU and Memory.


# [2.5.0] - 2022-10-3 [PR: #243](https://github.com/dolittle/Studio/pull/243)
## Summary

Adds container-level CPU and Memory usage metrics for each Microservice in the HealthStatus page. Each row in the container table gets the average / max / current metrics for the last 24 hours - and below the table a line chart displays the metrics measured every 1 minute.

![image](https://user-images.githubusercontent.com/1014990/193535765-0dbd8519-3e86-4e8e-acf9-b3d6c666648d.png)


### Added

- Graph, Legend and Summary components to the DesignSystem
- The metrics display for CPU and Memory in the HealthStatus Microservice page.
- Metrics mock data in `Environments/mock` backend - and implement some more platform-api endpoints so we can get to the HealthStatus page using the mock backend.

### Changed

- A component-factory helper function in DesignSystem to reduce the boilerplate for creating Component Stories.
- Automatic title generation for DesignSystem Stories in Storybook.

### Fixed

- The `onClick` in the DesignSystem Button component was not set, so you could not click it.


# [2.4.0] - 2022-9-14 [PR: #239](https://github.com/dolittle/Studio/pull/239)
## Summary

Updated Health Status page so it would offer better user experience.

<img width="1488" alt="Screenshot 2022-09-12 at 19 33 25" src="https://user-images.githubusercontent.com/19160439/189708018-8178a179-320b-4c55-af4b-854dbf47609c.png">

### Added

- Tabs component to Storybook
- Storybook button component custom style support as 'sx'

### Changed

- MUI Data Table to MUI Data Grid Pro

### Fixed

- Updated Fluent UI because of their side bug

### Removed

- Fluent UI from components, that I did worked on


# [2.3.0] - 2022-9-13 [PR: #242](https://github.com/dolittle/Studio/pull/242)
## Summary

Theme font weights was outdated and needed update.

<img width="300" alt="Screenshot 2022-09-13 at 17 11 13" src="https://user-images.githubusercontent.com/19160439/189923933-9ebe3ea7-fa0b-4502-9b32-c9d4ff71b361.png">

### Changed

- Updated theme font weights and divider opacity.


# [2.2.0] - 2022-9-13 [PR: #240](https://github.com/dolittle/Studio/pull/240)
## Summary

Updated Theme colors.

### Changed

- Theme colors


# [2.1.11] - 2022-9-8 [PR: #238](https://github.com/dolittle/Studio/pull/238)
## Summary

Commented out all code related to 'Insight' page doe need for needing improvements (access the db directly instead of using APIs) etc.

### Removed

- Hided Insight menu item and its content.


# [2.1.10] - 2022-8-25 [PR: #237](https://github.com/dolittle/Studio/pull/237)
## Summary

Guards against missing runtime version in microservices page


# [2.1.9] - 2022-8-25 [PR: #232](https://github.com/dolittle/Studio/pull/232)
## Summary

Added background color for body what resolves white loading screen.

Changed background Dolittle logo color for having more contrast.

<img width="1287" alt="Screenshot 2022-08-18 at 11 36 06" src="https://user-images.githubusercontent.com/19160439/185350109-4c28d956-e6f8-4204-8ce1-159abc8194ee.png">

### Added

- Body background color

### Changed

- Background logo color


# [2.1.8] - 2022-8-22 [PR: #233](https://github.com/dolittle/Studio/pull/233)
## Summary
Capitalized first letter in data table runtime version column.

<img width="1000" alt="Screenshot 2022-08-18 at 14 57 00" src="https://user-images.githubusercontent.com/19160439/185389002-edee114e-30df-4dcf-b721-5811350b2cc8.png">

### Fixed

- Capitalized first letter in runtime version


# [2.1.7] - 2022-8-19 [PR: #236](https://github.com/dolittle/Studio/pull/236)
## Summary

Improves the initial page-load time by removing the unused (and not published) `manifest.json` file. This file is part of the PWA framework (https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) - and I don't think we need it now.

The way it was setup today introduced a delay in the initial page-load time because it:
1. Caused an unnecessary request to a file that did not exist (so no caching) which seems to block the DOM content loaded. So it would not allow any React rendering before this failing request completed.
2. Chrome seems to load this file without any cookies - meaning that it was treated as an unauthenticated request, and was redirect to the login page (which is also a little bit slow).


### Fixed

- The `<base>` tag was moved before the `<link>` tags to make it apply to those URLs as well. See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base

### Removed

- The unused `manifest.json` file and the corresponding `<link>` tag to speed up initial page-load.


# [2.1.6] - 2022-8-19 [PR: #235](https://github.com/dolittle/Studio/pull/235)
## Summary

Fixes an issue we have where navigating back to e.g. `dolittle.studio` after logging out caused a cached version of the frontend to be loaded - which then failed to get any data because the user is not logged in. By changing the server of the SelfService/Web frontend to NGINX, and setting up explicit caching rules - the browsers should now only cache the static files (which webpack invalidates by changing the name) and not any paths leading to the `index.html` file. This means that the frontend will be reloaded on any browser navigation.

### Changed

- The SelfService/Web server from `gostatic` to `nginx` to allow more control of the serving of content.

### Fixed

- The SPA caching that caused strange behaviour when navigating after logging out, and old versions of the SPA served after new deployments until a manual refresh.


# [2.1.5] - 2022-8-18 [PR: #229](https://github.com/dolittle/Studio/pull/229)
## Summary

Shows the environment variables alphabetically on load in the edit page


# [2.1.4] - 2022-8-17 [PR: #231](https://github.com/dolittle/Studio/pull/231)
## Summary

Made login flow styles consistent with authentication side.

<img width="1315" alt="Screenshot 2022-08-16 at 17 31 59" src="https://user-images.githubusercontent.com/19160439/184905905-86cbe159-c1ed-49fc-8ee1-df4a1b7645c6.png">

### Added

- Babel plugin for faster MUI builds
- Loading of .svg files as <Box component=svg /> to webpack and typescript
- Logout button to 'Select Your Application & Environment' page

### Changed

- Describe the outwards facing code change

### Fixed

- Describe the fix and the bug
- Overall code refactoring and extraction

### Removed

- Unused logo files


# [2.1.3] - 2022-8-17 [PR: #225](https://github.com/dolittle/Studio/pull/225)
## Summary

Fixed menu dropdown styles when hovered and added padding.

<img width="339" alt="Screenshot 2022-08-08 at 10 32 02" src="https://user-images.githubusercontent.com/19160439/183364028-9cdf8ec1-963e-4c97-add1-2e535190ac6f.png">

### Fixed

- Menu items hover and focused state style


# [2.1.2] - 2022-8-15 [PR: #230](https://github.com/dolittle/Studio/pull/230)
## Summary

This PR will fix errors with microservices overview data table, when data is undefined.

<img width="1037" alt="Screenshot 2022-08-12 at 17 49 44" src="https://user-images.githubusercontent.com/19160439/184381791-c3c35de4-2d29-4ebb-b847-4c2b3a3e0ba3.png">

### Changed

- Refactored customUrlFieldSort function

### Fixed

- Microservices data table errors


# [2.1.1] - 2022-8-12 [PR: #227](https://github.com/dolittle/Studio/pull/227)
## Summary

Brings back the DesignSystem and Storybook introduced by @soumikgm a while back. This required a bit of finagling with `tsconfig` and `package.json` files to bring it back into a building state. The final result is that we have a working Storybook that builds, and the components defined in there can be imported in the `SelfService/Web` project with e.g. `import { Button } from '@dolittle/design-system/atoms/Button'`. This works with WebPack and hot-reloading while editing (although a bit slow).

Further, to improve DX - I have reconfigured the build pipeline and checks in GitHub. Now, we build `DesignSystem`, `SelfService/Web` and `SelfService/Backend` on every push. This means that there is less of a chance of us inadvertently doing something that breaks one of these things without noticing in a PR. It also means that when merged to master - we will see a build result on the commit.


# [2.1.0] - 2022-8-12 [PR: #224](https://github.com/dolittle/Studio/pull/224)
## Summary

This PR make microservice overview page look more clean and beautiful.

<img width="1015" alt="Screenshot 2022-08-10 at 18 19 40" src="https://user-images.githubusercontent.com/19160439/183942471-d1e6dfcf-5803-4906-842d-be2e553b4124.png">

### Added

- MUI Pro for data table
- No microservides page

### Changed

- Top navbar-breadcrumbs look
- Custom breadcrumbs setub to MUI breadcrumbs

### Removed

- Fluent-UI from microservices page


# [2.0.7] - 2022-8-11 [PR: #228](https://github.com/dolittle/Studio/pull/228)
## Summary

- Removes forced capitalization of variable names
- Lets the input fields fill the column space, giving more space to view the content


# [2.0.6] - 2022-8-9 [PR: #226](https://github.com/dolittle/Studio/pull/226)
## Summary

Removed unused 'edit' and 'delete' buttons with them styles.

<img width="289" alt="Screenshot 2022-08-08 at 11 59 05" src="https://user-images.githubusercontent.com/19160439/183380603-aecaa143-214c-4e94-b38e-591a543efba8.png">

### Removed

- Unused 'edit' and 'delete' buttons from deployed microservices page.

### Fixed

- Formatted code since it was quite messy.


# [2.0.5] - 2022-7-25 [PR: #223](https://github.com/dolittle/Studio/pull/223)
## Summary

Made application buttons to be as wide as the longest button is.

Fixed error message on 'application name' field for not giving error when name is only one char long because it is not what error message would suggest.

Removed underline styling from 'select new customer' link.

<img width="476" alt="Screenshot 2022-07-22 at 10 10 13" src="https://user-images.githubusercontent.com/19160439/180430310-7a4a996e-a6b2-40a9-aead-59804413824c.png">

### Fixed

- Application selection buttons width
- Text field error handling
- Link appearance on Safary and Chrome

### Removed

- Unnecessary punctuations


# [2.0.4] - 2022-7-21 [PR: #218](https://github.com/dolittle/Studio/pull/218)
## Summary

Improved login flow. This is the first page user sees after login. User can create new application, which includes the application name, contact name, contact email and selecting which environments they would like their application to have.

<img width="1310" alt="Screenshot 2022-07-19 at 16 15 52" src="https://user-images.githubusercontent.com/19160439/179759347-6a94579e-bf33-4744-9261-7086c0f4edfe.png">

### Added

1. Created layout without left sidebar.
2. Created right sided layout.
3. Basic form validation.

### Changed

-Removed stepper from 'Create new application' and reaplaced it with form.
-Refactored 'create' component into multiple smaller ones.

### Fixed

-General styling and updated theme.

### Removed

-Unnecessary code.


# [2.0.3] - 2022-7-13 [PR: #220](https://github.com/dolittle/Studio/pull/220)
## Summary

Added correct favicons for many different devices and browsers.

### Added

- Favicons in different sizes and formats.


# [2.0.2] - 2022-7-7 [PR: #217](https://github.com/dolittle/Studio/pull/217)
## Summary

Fixes the issue of changing the customer button not working properly by forcing a reload of the webpage instead of using the router.


# [2.0.1] - 2022-7-7 [PR: #215](https://github.com/dolittle/Studio/pull/215)
## Summary

This PR brings a more polished look to Studio by removing "TODOs" from various parts of the application.

### Changed
- Side menu item objects are now consistently named across the file layoutWithSideBar.tsx

### Removed

- Removed the `STATUS:TODO` from the Microservice cards
- Removed the snackbar TODO when typing in the contact email in the Create new application flow.
- Removed the bell icon and the three-dot menu from the top right of every page as they were "TODOs" as well.


# [2.0.0] - 2022-7-7 [PR: #211](https://github.com/dolittle/Studio/pull/211)
## Summary

This PR brings in the Design System Component library from [Dolittle Entropy ](https://github.com/dolittle-entropy/design-system) to a standalone project in Studio.

### Added

- Storybook that allows us to interact with different states of a component (stories) without having to run code locally.
- A first component called `Button` that leverages MUI at its core with a wrapper on top to suit our needs.
- A folder structure that follows the atomic design
- Theming to view our atoms/molecules/organisms/pages like the way we intend to use them


# [1.35.0] - 2022-7-6 [PR: #214](https://github.com/dolittle/Studio/pull/214)
## Summary

This PR brings in a refreshed side menu to Studio. This enables users to see and navigate features in Studio better than before. Icons help you quickly recognize different pages, and you can easily see which page you are currently on by looking at the active item in the menu. Also, the menu had been divided into two sections to help the users distill the actions they can take from the menu.
![image](https://user-images.githubusercontent.com/22228314/177161207-19e67836-9b6d-46ff-a557-0351eccc6172.png)


### Added

- Mui Icons to the side menu items.
- Custom icons on the container registry menu item.
- New Dolittle Logo on the top.
- Hover and active status indicators for the menu items.
- A bottom item section for the side menu.

### Changed

- "Change customer" option has been moved from the top-right menu to the bottom of the side menu.
- Side menu is now rendered using MUI `<List>` component family instead of standard HTML `<ul>` and `<li>` components. 

### Fixed

- Fixed the styling to accommodate the changes mentioned above and to make it look like the mockups.


# [1.34.3] - 2022-7-4 [PR: #213](https://github.com/dolittle/Studio/pull/213)
## Summary

- Search filter placeholder text style changed to italic
- Updated search to be case insensitive

![image](https://user-images.githubusercontent.com/102054/176217994-c1621820-85ed-4407-ac5e-c179120eb9ad.png)


# [1.34.2] - 2022-6-27 [PR: #210](https://github.com/dolittle/Studio/pull/210)
## Summary

Removed code that involves 'create new static site microservice' as it is no longer in use.

### Removed

Removed Card and options in code to select 'kind=static-site' .

![image](https://user-images.githubusercontent.com/19160439/174993400-7064d094-4d79-456b-b980-a66041a0a592.png)


# [1.34.1] - 2022-6-27 [PR: #209](https://github.com/dolittle/Studio/pull/209)
## Summary

The appearance of the page has been changed in the browser tab.

<img width="167" alt="Screenshot 2022-06-21 at 14 09 45" src="https://user-images.githubusercontent.com/19160439/174795910-9bb62377-4e8d-4bf8-848d-eafc382cfac5.png">


### Added

Added favicon in two formats: in most cases svg format, but also in favicon.ico format for edge cases.

### Changed

 Changed page tiltle tag from 'Studio' to 'Dolittle Studio' for better UX.


# [1.34.0] - 2022-6-21 [PR: #206](https://github.com/dolittle/Studio/pull/206)
## Summary

This PR does two things:
1) It stores the state of the `LogsScreen` in the URL search querystring, this means that it can be shared with others and you can reload the page without resetting the filters.
2) The `ApplicationsChanger` component reuses whatever URL search querystring for the current URL when switching environments. Together with the first change, this means that switching environments/apps while looking at logs will keep the filters after switching environments.

While working on it, I found a little bit of a strange setup with multiple routers that made the querystring changes not propagate properly - and I don't know if that is intended usage. But I think we can leave this for later. Also 2) is a little bit hacky, but I don't think we should bother with doing it more properly (passing in props) before we have had a chance to revisit the structure and state management of the app as a whole.


# [1.33.0] - 2022-6-17 [PR: #208](https://github.com/dolittle/Studio/pull/208)
## Summary

Added the `SHOW` button on log lines in the `LogPanel` that, when clicked, opens a dialog that displays logs without any filters for the microservice that logged this line. The dialog shows the selected log line at the top, and initially 10 more back in time. A button can be clicked to load 10 more (as many times as you want) further back in time, to a maximum time of one day back.

This is useful in two cases:
1) When you have filtered the logs to find an interesting line (e.g. a specific exception), and you want to see the logs leading up to that exception.
2) When viewing logs from multiple microservices, and you find a line of interest. In this case clicking the context would "hide" the logs from all the other microservices.

![image](https://user-images.githubusercontent.com/1014990/174119948-c66c9401-046a-4246-88ca-833de7634ef8.png)

Also added a header and footer in the `LogLines` view that shows the beginning and end of the currently shown date ranges. These will show (in conjunction with the timestamp) when we did find stored logs.

![image](https://user-images.githubusercontent.com/1014990/174120199-c14b4004-fe22-4b5e-af30-d3c083dae884.png)


### Changed

- To be able to reuse the `LogLines` and `useLogs...` hooks to render the dialog. The structure of the components had to change quite a bit. Props have moved around a little, and the `LogPanelAbsolute` and `LogPanelRelative` have changed into `LogsInRange` and `LogsFromLast` components respectively, that accepts a render function prop used to render the actual component showing the logs.
- The `header` and `footer` props of the `LogPanel` was also removed, as it did not make sense anymore with the restructuring.


# [1.32.0] - 2022-6-16 [PR: #205](https://github.com/dolittle/Studio/pull/205)
## Summary

Adds "infinite scrolling" to the date-range log view (`LogPanelAbsolute`). This works by adding an empty div to the bottom of the `LogPanel` and when it is scrolled into the viewport, it triggers loading more logs (which only happens if there are more to load).

Currently this will only work on browsers with the `IntersectionObserver` api supported: https://caniuse.com/mdn-api_intersectionobserver. Which I believe is fine. For browsers without the support, no auto-loading will happen.

### Added

- `LogPanel` accepts extra content before and after the log-lines with a `header` and `footer` property.
- Some hardcoded values in `LogPanelRelative` and `LogPanelAbsolute` are exposed now with props as defaults.
- `LogPanelAbsolute` now accepts a Ref as a prop that will be set to the `loadMoreLogs` function so it ready to accept loading more logs from the outside. This made sense to prepare it for the "Context Popover" that we might get to.


# [1.31.0] - 2022-6-16 [PR: #207](https://github.com/dolittle/Studio/pull/207)
## Summary

 A microservice name column has been added to the log panel. This can be triggered via a new switch toggle in the header. 
![image](https://user-images.githubusercontent.com/22228314/174037958-0eb162c8-8258-4544-99a7-d6814646d42e.png)


# [1.30.4] - 2022-6-15 [PR: #204](https://github.com/dolittle/Studio/pull/204)
## Summary

Adds shimmering LogLines in a LogPanel that is currently loading more logs. Also fixed the "No logs found" message so that it does not appear while loading logs.

Note: A slightly annoying behaviour is - if you toggle the Timestamp while shimmering lines are shown, the animation is not in sync with the text. But this is kind of edge case, as the loading doesn't really appear for long.

![image](https://user-images.githubusercontent.com/1014990/173665357-8d1964b0-0fc3-476c-b255-e4786861cf9b.png)

### Changed

- The `useLogsFromLast` no longer retains the last loaded logs while loading more, this seems more in line with the designed UX with these new shimmering lines.

### Fixed

- A tiny bug in `useLogFromRange` caused it to not update the state to `loading: true` while fetching logs.


# [1.30.3] - 2022-6-8 [PR: #202](https://github.com/dolittle/Studio/pull/202)
## Summary

- Fixes crashing app when manually entering invalid date in logs date-range filter


# [1.30.2] - 2022-6-7 [PR: #201](https://github.com/dolittle/Studio/pull/201)
## Summary

Fix deployment workflows from using the `env` context.


# [1.30.1] - 2022-6-3 [PR: #198](https://github.com/dolittle/Studio/pull/198)
## Summary
 - Fixes so that the microservice filter dropdown only shows microservices for the current environment


# [1.30.0] - 2022-6-2 [PR: #197](https://github.com/dolittle/Studio/pull/197)
## Summary

- Change the "Last 24 hours" into -> "Live logs" and enable streaming.
- Move the _selection description_ into the title of the LogPanel.
- Add `Timestamp` switch to the LogPanel, that turns on timestamps for each log line.
- Fix indentation of wrapped lines, the wrapped lines will now be indented the same amount as the leading whitespace of the original line.
- Enable "Date Range" selection to view logs from a absolute range (and implement the code to fetch logs from a range)
- Add the Microservice selection multi select dropdown, and corresponding chips in the filters.

To fix a bug with the math of nanosecond timestamps returned by Loki, I needed to use BigInts - which required an upgrade of the TypeScript target to ES2020. I believe this is OK now, and 90% reported by caniuse.com supports this feature.

Hidden updates we will use later:
- When using logs from range, internally there is a loadMoreLogs function returned that can be used to fetch the next N number of lines to display. This is intended to be used when viewing "Date Range" logs, and the user scrolls to the end (top or bottom) of the panel to view more logs. It also returns a boolean describing whether or not there are more logs to fetch.
- The `SHOW` context button in log lines are also implemented, and will call a provided handler function with the correct labels and timestamp to show the context of the logs in question. It is hidden right now - but can be used to implement the context view, and then enable the button.


# [1.29.1] - 2022-5-24 [PR: #196](https://github.com/dolittle/Studio/pull/196)
## Summary

Small adjustments to the padding and breakpoints
Makes some small adjustments to the log panel font styling by introducing Roboto Mono, and a new font-type `monospace`.
Loading the different variants of Rubik properly so it can be used correctly by MUI.


# [1.29.0] - 2022-5-24 [PR: #195](https://github.com/dolittle/Studio/pull/195)
## Summary

Added a "Logs" page that displays the logs for all microservices in the current environment - the last 24 hours (max 1000 lines). The logs can be filtered with "including" free text search filters.


# [1.28.0] - 2022-5-16 [PR: #192](https://github.com/dolittle/Studio/pull/192)
## Summary


Introduce Dolittle Material Theme - Minimal visual changes, but a better inheritance of colors and ease of use as we go forward with future styles
- Dark color palette & typography based on Figma
- Introduce `<Typography>` component in place of headers across Studio


# [1.27.0] - 2022-5-11 [PR: #191](https://github.com/dolittle/Studio/pull/191)
## Summary

Via m3connector screen, clicking on the links will reveal the contents


# [1.26.0] - 2022-5-11 [PR: #190](https://github.com/dolittle/Studio/pull/190)
Previous PR that was merged to main didn't trigger.


# [1.25.1] - 2022-5-11 [PR: #188](https://github.com/dolittle/Studio/pull/188)
## Summary

Fix firefox file upload not working. Refactor code slightly to improve code quality


### Changed

- Moved part of the form logic to its own component. Cleans up the code slightly.

### Fixed

- File upload not working for Firefox. Firefox uses default browser behaviour where the button click inside a form triggers the onsubmit event


# [1.25.0] - 2022-5-6 [PR: #184](https://github.com/dolittle/Studio/pull/184)
# Summary

Frontend solution for managing configuration files in hosted microservices

# New features

- Section in Microservice Configuration page displaying files mounted at /app/data/.
- Ability to upload new file
- Ability to remove a single file
- Validation messages for failed uploads


# [1.24.0] - 2022-5-5 [PR: #182](https://github.com/dolittle/Studio/pull/182)
# New features

### Personalized docs: how to create docker image and push to Container Registry
<img width="1287" alt="Screenshot 2022-05-03 at 22 51 03" src="https://user-images.githubusercontent.com/8811/166563811-000897d2-ba79-4ad5-8346-8efb98c490bf.png">

### Browse Container Registry in Studio
<img width="1277" alt="Screenshot 2022-05-03 at 21 23 30" src="https://user-images.githubusercontent.com/8811/166542666-1344aa7e-4229-4d84-a2e4-6fbcf91c3301.png">

<img width="1282" alt="Screenshot 2022-05-03 at 21 23 57" src="https://user-images.githubusercontent.com/8811/166543202-b334b57b-6731-4643-a6c1-7cc05f5b5357.png">


# [1.23.1] - 2022-5-4 [PR: #185](https://github.com/dolittle/Studio/pull/185)
## Summary

- Fixed bug in customer screen within admin where view access would be repeated for each environment


# [1.23.0] - 2022-5-3 [PR: #181](https://github.com/dolittle/Studio/pull/181)
Solves: https://app.asana.com/0/1202121266838773/1202029655339366/f

Remove all references to "business moments"
- Remove menu item & route
- Remove Backing code for route
- Remove creating and viewing of Business Moments Adaptor
- Remove data objects in api / stores


# [1.22.0] - 2022-5-3 [PR: #176](https://github.com/dolittle/Studio/pull/176)
## Summary

Followed migtation path from MUI v4 to v5 as described here: https://mui.com/material-ui/guides/migration-v4/
Updated to and enabled react 18 as described here: https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis

using the `sx`-prop in favour of `makeStyles()` - and updated across all components - more info here https://mui.com/material-ui/guides/migration-v4/#1-use-styled-or-sx-api

### Changed

- Update to Typescript 4.6.3
- Update to React v18
- Update from MUI v4 to MUI v5.6.2
- Removed resolutions workaround as introduced in https://github.com/dolittle/Studio/pull/175


# [1.21.0] - 2022-4-28 [PR: #174](https://github.com/dolittle/Studio/pull/174)
## Summary

- Via microservice creation, if m3connector connection is enabled, give the user the option to connect m3connector for this microservice


# [1.20.1] - 2022-4-26 [PR: #180](https://github.com/dolittle/Studio/pull/180)
## Summary

Make the `TextField` for arguments not required.


# [1.20.0] - 2022-4-26 [PR: #178](https://github.com/dolittle/Studio/pull/178)
## Summary

Adds the ability to specify a command and/or many arguments for the head image. Both options are optional. The command overwrites the `ENTRYPOINT` of the Docker image, while the arguments overwrite the `CMD` and act as arguments for the command. If not specified the default `ENTRYPOINT` and `CMD` are used.

![image](https://user-images.githubusercontent.com/10163775/165300466-4e1579f2-2620-4162-8584-6430191ea2f1.png)


# [1.19.1] - 2022-4-25 [PR: #171](https://github.com/dolittle/Studio/pull/171)
## Summary

- Application view access screen, with add + remove
- Link page to take you to the customers from the admin screen


# [1.19.0] - 2022-4-7 [PR: #173](https://github.com/dolittle/Studio/pull/173)
## Summary

Add ability to manually specify multiple tenants for each environment when creating an application.


# [1.18.0] - 2022-4-6 [PR: #170](https://github.com/dolittle/Studio/pull/170)
## Summary

Add support for Runtime version 8.0.0 when creating a new base microservice

Note: This needs changes in platform-api to add environment variable or configuration for `DOLITTLE__RUNTIME__EVENTSTORE__BACKWARDSCOMPATIBILITY__VERSION`

## Reference
- https://app.asana.com/0/1202023614957161/1202062723906543/f


# [1.17.1] - 2022-4-1 [PR: #169](https://github.com/dolittle/Studio/pull/169)
## Summary

Remove duplicate isPublic properties, set to false when creating, and true when displaying


# [1.17.0] - 2022-4-1 [PR: #168](https://github.com/dolittle/Studio/pull/168)
## Summary

This PR will
- Introduce a toggle to allow the user to specify if they want to create a private or public microservice. This is set to private by default.
- Bump latest selectable runtime version to 7.8.1
- Contains the contents of https://github.com/dolittle/Studio/pull/165

## Reference
https://app.asana.com/0/1202023614957161/1202039820012594/f
https://github.com/dolittle/platform-api/pull/105

https://app.asana.com/0/1201955720774352/1201993650094128/f
https://github.com/dolittle/platform-api/pull/102


# [1.16.2] - 2022-3-31 [PR: #167](https://github.com/dolittle/Studio/pull/167)
## Summary

Fix microservice creation to default to a public microservice. This is because platform-api v4 has a breaking change where it defaults to private microservice creation if the `isPublic` property on the request is not set (as `bool` types in Go default to `false`).

## Reference
- https://github.com/dolittle/platform-api/pull/102
- https://github.com/dolittle-platform/Operations/pull/192


# [1.16.1] - 2022-3-25 [PR: #163](https://github.com/dolittle/Studio/pull/163)
## Summary
Opening direct links to microservices in an environment failed sometimes. The cause of this failure is related to which environment the user has last visited. If the user has last been in "Dev", and the link is pointing to "Prod", it would fail. This information is currently stored in local storage.

This PR introduces a higher-order component that reads the `environment` and `applicationId` parameters from the URL, and overwrites these in the global context, which also updates the value in local storage.

### Fixed

- Fix direct links to environments not working when pointing to another environment than the user last visited


# [1.16.0] - 2022-3-15 [PR: #159](https://github.com/dolittle/Studio/pull/159)
## Summary

Adds new customer view on `/admin/customer/{customerID}`, which can be navigated to by clicking on a customers name in `/admin/customers` page.

![image](https://user-images.githubusercontent.com/10163775/156578864-660d24a8-d2f9-4844-a350-b2f6bfa1edcf.png)

On this page you can toggle between enabling or disabling all of the customers environments. It currently supports only enabling them all (aka no disabled environments) or disabled them all (having a `*` wildcard entry in the array).

Also upgrades `@fluentui/react` package to `8.57.1`. This is because the frontend docker image had stopped mysteriously building earlier, upgrading the package fixed it.

## Reference
- [Related platform-api PR](https://github.com/dolittle/platform-api/pull/95)
- [Asana](https://app.asana.com/0/1201885260673030/1201894099742054)


# [1.15.0] - 2022-2-28 [PR: #156](https://github.com/dolittle/Studio/pull/156)
## Summary

- Adding 6.1.0 to the runtime list for create microservice
- Moving to 7.8.0 for the latest runtime


# [1.14.0] - 2022-2-22 [PR: #154](https://github.com/dolittle/Studio/pull/154)
## Summary

- Fixing the http contract for tenantId -> customerId and tenantName -> customerName.
- Renaming to use DEVELOPMENT_CUSTOMER_ID and DEVELOPMENT_USER_ID


# [1.13.1] - 2022-2-18 [PR: #153](https://github.com/dolittle/Studio/pull/153)
## Summary

- Making the delete button for a microservice work via viewcard.
- Making the delete button for a microservice work via microservice view.
- Delete screen, to warn the action today is permanent.


# [1.13.0] - 2022-2-16 [PR: #152](https://github.com/dolittle/Studio/pull/152)
## Summary

Via [Documentation /Verify access to kubernetes it bubbles up some helper commands


# [1.12.0] - 2022-2-14 [PR: #151](https://github.com/dolittle/Studio/pull/151)
## Summary

Fixing a bug when trying to map ingress details to the microservice, ignoring it for now, as the view is not even using the extra.ingress info.


# [1.11.1] - 2022-2-11 [PR: #135](https://github.com/dolittle/Studio/pull/135)
## Summary
- Form to create application (one time)
- Admin screen to create customer
- Admin screen to list customers
- Building branches without the hash suffix


# [1.11.0] - 2022-2-2 [PR: #150](https://github.com/dolittle/Studio/pull/150)
## Summary

- Adding typing to the data coming via personalised-info endpoint.
- Able to override the DOLITTLE_CUSTOMER_ID via `make develop-backend`.


# [1.10.0] - 2022-2-2 [PR: #149](https://github.com/dolittle/Studio/pull/149)
## Summary

- Pass in the extact name of the Environment
- On success from the server update original data


# [1.9.7] - 2022-1-11 [PR: #147](https://github.com/dolittle/Studio/pull/147)
## Summary

- Disable creation of microservice, whilst we fix a few bugs


# [1.9.6] - 2021-12-17 [PR: #145](https://github.com/dolittle/Studio/pull/145)
## Summary

Nothing to see, just triggering labels.


# [1.9.5] - 2021-12-17 [PR: #143](https://github.com/dolittle/Studio/pull/143)
## Summary

- View current environment variables for a microservice
- Update microservice environment variables


# [1.9.4] - 2021-12-15 [PR: #142](https://github.com/dolittle/Studio/pull/142)
## Summary

- A button to restart the microservice.


# [1.9.3] - 2021-12-7 [PR: #141](https://github.com/dolittle/Studio/pull/141)
## Summary

Fixes that only the microservices that belong to the environment are showed in the microservices overview screen.


# [1.9.2] - 2021-12-1 [PR: #138](https://github.com/dolittle/Studio/pull/138)
## Summary

Via settings, possible to change customer


# [1.9.1] - 2021-12-1 [PR: #139](https://github.com/dolittle/Studio/pull/139)
## Summary

- Base configuartion view is not based on material-ui
- Display customerTenantId and the ingress path (host + path)
- Display Microservice Paths
- Rename HttpResponseApplications2 to HttpResponseApplication


# [1.9.0] - 2021-11-23 [PR: #136](https://github.com/dolittle/Studio/pull/136)
## Summary

Adds a new dropdown menu and uses it for selecting the Runtime image when creating a new base microservice. If `None` is selected for the Runtime image the microservice won't have a Runtime container created.

The new dropdown menu is styled according to this Figma design:
![image](https://user-images.githubusercontent.com/10163775/141797437-5b9ae903-da0b-4546-9a11-393d452fd5ac.png)

In action:
![Peek 2021-11-15 15-20](https://user-images.githubusercontent.com/10163775/141797722-56badbd9-706c-4b6f-9b88-6e1526bb8005.gif)

Related to https://github.com/dolittle/platform-api/pull/61

Also adds `yarn.lock` into the repo.


# [1.8.0] - 2021-11-10 [PR: #134](https://github.com/dolittle/Studio/pull/134)
## Summary

- getLatestRuntimeInfo() returns the latest image and the link to the changelog
- Creating base microservice uses getLatestRuntimeInfo() to get the runtime to use by default.
- Creating purchaseOrderApi microservice uses getLatestRuntimeInfo() to get the runtime to use by default.
- Creating businessMomentsAdaptor microservice uses getLatestRuntimeInfo() to get the runtime to use by default.


# [1.7.0] - 2021-11-9 [PR: #133](https://github.com/dolittle/Studio/pull/133)
## Summary

- Able  to download service account credentials, making it easier to setup azure pipeline.
- Able to download container registery, making it easier to setup azure pipeline.


# [1.6.1] - 2021-10-26 [PR: #132](https://github.com/dolittle/Studio/pull/132)
## Summary

Fix the workflows and release the unreleased features:
- Removes the horizontal scrollbar from all pages (#128)


# [1.6.0] - 2021-10-8 [PR: #121](https://github.com/dolittle/Studio/pull/121)
## Summary
- When viewing a base microservice, it will default to "healthStatus".
- Button
- ButtonText
- Tab
- Tabs
- DownloadButton
- DownloadButtons component to reduce duplication of add download config files for a microservice.
- A Themes page, to see asset components (http://localhost:9007/selfservice/debug/theme)

Linked:
- https://app.asana.com/0/1201028542784316/1201126860304300/f
- https://app.asana.com/0/1201028542784316/1201126860304304/f


# [1.5.1] - 2021-10-6 [PR: #120](https://github.com/dolittle/Studio/pull/120)
## Summary

ERP integration icons match that in figma

Linked to https://app.asana.com/0/1201028542784316/1201126860304301/f


# [1.5.0] - 2021-10-5 [PR: #118](https://github.com/dolittle/Studio/pull/118)
Brings in #113, #115 and as a fake way to fake the flow into "view" screen of config, not the setup screen

## Summary
- Fake data flow on "view" screen (http://localhost:9007/selfservice/microservices/application/11b6cf47-5d9f-438f-8116-0d9828654657/Dev/view/043a71f8-a7fa-304a-9111-fb2eeea22206?waitForData=fakeit&dataState=waiting) change dataState from "waiting" to "waiting", "flowing", "error".
- Creating a purchaseOrder mircoservice redirects to purchaseOrder view
- The view screen is "first time" aware via query param
- The view screen allows to toggle the edit of the username and password
- Ability to click Generate password for the webhook password
- Fake dataState via the queryParm for the DataStateIcon
- Replaced a few cases of setNotification with the snackbar
- Intoducing "save protection" logic when editing username and password


Linked to
- https://app.asana.com/0/1200899594200551/1201018124798231/f
- https://www.figma.com/file/OPDbO214o4LjpTu316WyMf/Studio-Mockups?node-id=1403%3A72103


# [1.4.1] - 2021-9-30 [PR: #117](https://github.com/dolittle/Studio/pull/117)
## Summary

Handle PurchaseOrderAPI creation errors by displaying an error snackbar with the message from the HTTP response.

Preview (some of the HTTP responses are fixed in https://github.com/dolittle/platform-api/pull/34 as shown here):
![image](https://user-images.githubusercontent.com/10163775/134651915-1ebd0335-962a-40be-b372-2b8517badb6e.png)

### Added

- Error handling to POAPI creation view


# [1.4.0] - 2021-9-27 [PR: #116](https://github.com/dolittle/Studio/pull/116)
## Summary

Hides the delete button for the raw data log view card


#### How to test
- Start with a clean cluster (or without raw-data-log and purchase-order)
- Click Microservices
- Click Create new microservice
- Click Create within the Purchase order api card
- Select Infor graphic
- Enter name
- Click next
- Enter username
- Enter password
- Click Next
- Click Microservices
- See that there is no delete button on the raw-data-log-v1 webhook microservice

### Added

- canDelete property to microservice view card

### Changed

- Uses HTML5 hidden to hide delete button from raw data log microservice view card


# [1.3.0] - 2021-9-22 [PR: #114](https://github.com/dolittle/Studio/pull/114)
## Summary

Removes the views that allow creation of a Raw Data Log Ingestor manually. It is created automatically when the user creates a PurchaseOrderAPI instead.

### Removed

- The ability to manually create a Raw Data Log Ingestor


# [1.2.1] - 2021-9-22 [PR: #110](https://github.com/dolittle/Studio/pull/110)
## Summary
- Fixing the white text for name
- Fixing the white text for username and password
- Removing the warning messages in the console
- Making the file names make a little more sense
- Delete icon and text is white
- Validation on username and password
- Validation on name of microservice

# Reference
- https://app.asana.com/0/1200899594200551/1200948921136344/f


# [1.2.0] - 2021-9-21 [PR: #111](https://github.com/dolittle/Studio/pull/111)
## Summary

Adds a Snackbar when user copies PurchaseOrderAPI URLs to clipboard, with an error if it fails. I found a library that seemed nice https://iamhosseindhv.com/notistack, that simplifies handling multiple snackbars (which is not allowed by Material Design). The library required a bit of hacking with types to get the animation and styling to work, but I think that might be down to something with typescript and dependencies and versions. I think we can clean that up later.

The styling corresponds to the Figma designs for notifications to the best of my ability.

### Added

- A global provider to display Snackbars from anywhere easily (notistack)
- Snackbars when copying URLs during the creation of PurchaseOrderAPI


# [1.1.2] - 2021-9-20 [PR: #108](https://github.com/dolittle/Studio/pull/108)
## Summary

Fixes the "COPY TO CLIPBOARD" button in the PurchaseOrderAPI microservice creation view to actually work.

### Fixed

- The "COPY TO CLIPBOARD" button actually works now


# [1.1.1] - 2021-9-20 [PR: #109](https://github.com/dolittle/Studio/pull/109)
## Summary
Error in the image url.

# Reference
https://app.asana.com/0/1200899594200551/1201018124798215/f


# [1.1.0] - 2021-9-17 [PR: #104](https://github.com/dolittle/Studio/pull/104)
Summary

Frontend Components for Purchase Order API Microservice is added. What is required to add is to retrieve M3 data, Automate the creation of the PO API microservice

Some modifications are required to do to satisfy the Figma design.

Merging #99 #102

### Added

- Added the functionality to create and delete a PurchaseOrderAPI Microservice in the UI

### Fixed

- Mismatching between expected input for the backend


# [1.0.3] - 2021-8-27 [PR: #93](https://github.com/dolittle/Studio/pull/93)
# What
- 1 dropdown menu
- 1 no duplicate data
- closer to https://www.figma.com/file/OPDbO214o4LjpTu316WyMf/Studio-Mockups?node-id=1256%3A56795

# Todo
- [x] Align to the right, so it is closer still to the UX.

# How to run
- run backend main with Flokk tenant to see more than one application and environment
```sh
HEADER_SECRET="FAKE" \
DEVELOPMENT_TENANT_ID="388c0cc7-24b2-46a7-8735-b583ce21e01b" \
DEVELOPMENT_USER_ID="be194a45-24b4-4911-9c8d-37125d132b0b" \
go run main.go
```

Helps with https://app.asana.com/0/1200181647276434/1200843654574930/f


# [1.0.2] - 2021-8-27 [PR: #95](https://github.com/dolittle/Studio/pull/95)
## Summary

Ignore main branch when running the CI/CD workflows.


# [1.0.0] - 2021-8-27 [PR: #90](https://github.com/dolittle/Studio/pull/90)
## Summary

Adds CI/CD workflows for the SelfService application. This makes sure to setup this repo with the normal release pipeline that we're used to from our other repos. Whenever a pull request to main is merged and it has a 'patch', 'minor' or 'major' label it will trigger a release for the microservices that has had its source files changed


### Added

- CI/CD workflows for SelfService Backend
- CI/CD workflows for SelfService Web


### Removed

- Unused workflows


