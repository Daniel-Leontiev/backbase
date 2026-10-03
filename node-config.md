# Node configuration notes

This project has older Angular/Webpack tooling, so Node version and OpenSSL compatibility matter.

## Use a compatible Node version

For Angular 9/10 builds, Node 14 is the safest option.

```powershell
nvm install 14.21.3
nvm use 14.21.3
npm install
npm run build
```

If you are using a normal Node installation instead of nvm, install Node 14 and use it for this project.

## Windows `setx` for environment variables

These are useful when the current shell is not enough and you want the setting to persist.

### OpenSSL legacy provider (common for older Angular/Webpack projects)

```powershell
setx NODE_OPTIONS --openssl-legacy-provider
```

Then close and reopen the terminal, or start a new PowerShell session before running:

```powershell
npm run build
```

### Remove the setting later

```powershell
setx NODE_OPTIONS ""
```

Then reopen the terminal.

## Inline shell usage (temporary, current session only)

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run build
```

This does not persist to future terminals.

## Common `NODE_OPTIONS` values

### `--openssl-legacy-provider`

Used for legacy webpack / Angular 9-10 projects running on Node 17+ or Node 18+ / 20+ / 22+.

This is the main setting relevant to the OpenSSL error:

```text
ERR_OSSL_EVP_UNSUPPORTED
```

### `--max-old-space-size=4096`

Increase Node memory for large builds.

```powershell
setx NODE_OPTIONS "--max-old-space-size=4096"
```

This is commonly used with Angular CLI builds.

### Combined settings

You can combine several flags in one value:

```powershell
setx NODE_OPTIONS "--openssl-legacy-provider --max-old-space-size=4096"
```

Then reopen the terminal.

## Important note

`NODE_OPTIONS` is a general Node runtime setting. The legacy OpenSSL flag is specifically helpful for older webpack-based Angular apps. For the long-term clean approach, upgrading the Angular project to a modern version and using a matching Node version is the better solution.
