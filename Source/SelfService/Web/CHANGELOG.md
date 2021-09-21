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


