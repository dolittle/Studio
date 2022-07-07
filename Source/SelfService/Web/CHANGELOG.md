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


