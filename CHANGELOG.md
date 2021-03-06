# D2 Changelog

## 28.0.0
###### _September 19th 2017_

**Breaking changes:**

- `d2.system.loadAppStore` has changed in order to support the new [central app store](https://play.dhis2.org/appstore).
- Support for `dataType` and `contentType` options on API requests have been removed. These were added for
  compatibility with jQuery, and have been deprecated since version 2.25. To migrate, manipulate the request headers
  directly instead:
  - `dataType` corresponds to the `Accept` header:
    - Before: `api.get(url, { dataType: 'text' })`
    - Now: `api.get(url, { headers: { 'Accept': 'text/plain' }})`
  - `contentType` corresponds to the `Content-Type` header:
    - Before: `api.post(url, data, { contentType: 'text' })`
    - Now: `api.post(url, data, { headers: { 'Content-Type': 'text/plain' }})`


## 27.0.0
###### _February 20th 2016_

**Breaking changes:**

- `d2.currentUser.uiLocale` has been removed, `d2.currentUser.userSettings.get` should be used instead.
- `userSettings.get` will now now always return a Promise (This therefore also applies to `d2.currentUser.userSettings.get`)
- `systemSettings.get` will now always return a Promise.


## 25.2.0
###### _November 18th 2016_

**Breaking change:**

- Calling `save()` on an instance of `d2.Model` or `d2.ModelCollectionProperty`
that has no changes will now return a promise that immediately resolves to an
empty object, in stead of a promise that's rejected with an error message

## 25.0.1
###### _August 1st 2016_

##### Added

- [feat] `clone()` can now be used on a model instance to clone an object 
