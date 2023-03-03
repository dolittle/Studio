# [1.4.0] - 2023-3-3 [PR: #316](https://github.com/dolittle/Studio/pull/316)
## Summary
To enable requests to be routed to different backend services, this PR introduces proxy configuration via the `PROXY` environment variable. This is needed for e.g. routing bridge related requests to the bridge-api, and platform related request to the platform-api. Also some rudimentary tests are added.

### Added

Configurable routing via the optional `PROXY` environment variable. The value of this variable, if present, is assumed to be a valid json document where the keys are a [http.ServeMux](https://pkg.go.dev/net/http#ServeMux) pattern and the values are the corresponding host for the backend to setup a reverse proxy to. 

If no `PROXY` environment variable is given, or if it's value is empty, we'll fallback to the old behavior of using the `PLATFORM_API` environment variable.

The `PLATFORM_API` environment variable is kept as a legacy option, but will be ignored completely if the `PROXY` environment variable is set.

### Example

Routing bridge request to `localhost:2222`, and all other to `localhost:1111`:
```
PROXY='{"/": "localhost:1111", "/bridge/": "localhost:2222"}'
```

### Ref
[RFC-0001](https://github.com/dolittle/rfcs/blob/main/0001_use_rest_in_studio.md)
[Task](https://app.asana.com/0/0/1203966934671264/f)


# [1.3.1] - 2022-5-2 [PR: #179](https://github.com/dolittle/Studio/pull/179)
## Summary

Fixes make develop-backend


Remember to remove sections that you don't need or use.

### Added

- added x/sys to sum and mod files for Selfervice Backend


# [1.2.0] - 2021-11-23 [PR: #136](https://github.com/dolittle/Studio/pull/136)
## Summary

Adds a new dropdown menu and uses it for selecting the Runtime image when creating a new base microservice. If `None` is selected for the Runtime image the microservice won't have a Runtime container created.

The new dropdown menu is styled according to this Figma design:
![image](https://user-images.githubusercontent.com/10163775/141797437-5b9ae903-da0b-4546-9a11-393d452fd5ac.png)

In action:
![Peek 2021-11-15 15-20](https://user-images.githubusercontent.com/10163775/141797722-56badbd9-706c-4b6f-9b88-6e1526bb8005.gif)

Related to https://github.com/dolittle/platform-api/pull/61

Also adds `yarn.lock` into the repo.


# [1.1.0] - 2021-10-8 [PR: #121](https://github.com/dolittle/Studio/pull/121)
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


# [1.0.2] - 2021-8-27 [PR: #95](https://github.com/dolittle/Studio/pull/95)
## Summary

Ignore main branch when running the CI/CD workflows.


# [1.0.1] - 2021-8-27 [PR: #94](https://github.com/dolittle/Studio/pull/94)
## Summary

Fixes version numbers and uses new versions of GitHub Actions


