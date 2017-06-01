# Digital Assessment Desktop Application

This project contains Digital Assessment's cross-platform (Windows, OS X) desktop application.

## Launching the App (Development Mode)

```
$ export DA_BASE_API_URL="https://tambler.lifeplansdev.com:8000"; grunt launch --env=development
```

## Launching the App (Production Mode)

```
$ grunt launch --env=production
```

## Building the App

```
$ grunt build (without code-signing)
$ grunt build --sign (with code-signing)
$ grunt build --sign (with code-signing)
```

## Configuration

### OS X

The following settings must be configured in `Gruntfile.js`:

- app.osx_signing_key

### Windows

The following settings must be configured in `Gruntfile.js`:

- app.windows_signing_key

### Electron Version

Change the version of Electron the application is shipped with by running:

```
$ npm i electron-prebuilt@x.x.x --save
```

## Deployments

```
$ grunt create-release-server-version --app-version=1.0.2
$ grunt create-release-server-asset --app-version=1.0.2 --platform=osx_64 --file=./dist/da-osx-1.0.0.dmg
$ grunt delete-release-server-asset --asset=assessments-1.0.0-full.nupkg
$ grunt delete-release-server-version --app-version=1.0.2
```

### OS X

- Upload the .zip file created by the builder.

### Windows

- Upload the .nuget file created by the builder.

## Related Resources

- [Electron](http://electron.atom.io/)
