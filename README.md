# toggles.io

## Structure of this repository

This repository is being split into 2 major directories - `client` and `api`.
The `client` part contains all code necessary to build and deploy single page
web application for toggles.io. The `api` part contains all code necessary to
build and deploy server providing the HTTP API to be consumed by the client.

These two are logically separate projects in terms that we aim to make them
disconnected. However, as `api` and `client` form a single usable application
it makes sense to keep them in a single repository, use single versioning, and
release tagging. At the point of the project we are in now it's highly likely that
each release might contain breaking changes in the API and client will need to
accomodate for it. This is why it just makes thing simpler to store both
in a single repository which can ease the pain of synchronizing versions and
releases.

Please keep in mind, that we aim to have `client` and `api` part entirely
logically separate anyways, so that at any point in time they can be extracted
to separate repositories. This is why each of these directories has it's
own `README` file, uses it's own build system and dependency manager. Please
consult `README` in these directories for further details on testing, building
and deploying `client` and `api` part.

