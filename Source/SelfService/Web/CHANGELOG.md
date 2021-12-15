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


