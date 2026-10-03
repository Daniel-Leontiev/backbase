# Angular upgrade notes

This project started on Angular 9.1.2 and is being upgraded step-by-step to newer Angular versions.

## Current state

- Angular: 9.1.2
- TypeScript: 3.8.3
- Node: incompatible with Angular 9 in the current environment
- Project build currently fails because of missing `@types/minimatch` / legacy dependency setup

## Recommended upgrade flow

Do upgrades one major version at a time, not directly to the latest Angular version.

```powershell
ng update @angular/core@10 @angular/cli@10 --force
ng update @angular/core@11 @angular/cli@11 --force
ng update @angular/core@12 @angular/cli@12 --force
ng update @angular/core@13 @angular/cli@13 --force
ng update @angular/core@14 @angular/cli@14 --force
ng update @angular/core@15 @angular/cli@15 --force
ng update @angular/core@16 @angular/cli@16 --force
ng update @angular/core@17 @angular/cli@17 --force
ng update @angular/core@18 @angular/cli@18 --force
ng update @angular/core@19 @angular/cli@19 --force
```

## Command recorded from the first upgrade attempt

```powershell
ng update @angular/core@10 @angular/cli@10
```

Output observed:

```text
The installed local Angular CLI version is older than the latest stable version.
Installing a temporary version to perform the update.
Installing packages for tooling via npm.
Installed packages for tooling via npm.
Workspace extension with invalid name (defaultProject) found.
Using package manager: npm
Collecting installed dependencies...
Found 47 dependencies.
Fetching dependency metadata from registry...
    Package "codelyzer" has an incompatible peer dependency to "@angular/compiler" (requires ">=2.3.1 <10.0.0 || >9.0.0-beta <10.0.0 || >9.1.0-beta <10.0.0 || >9.2.0-beta <10.0.0", would install "10.2.5").
    Package "ng-mocks" has an incompatible peer dependency to "@angular/compiler" (requires ">=5.x <=9.x", would install "10.2.5").
    Package "@thisissoon/angular-inviewport" has an incompatible peer dependency to "@angular/core" (requires ">=5.0.0 <9.0.0", would install "10.2.5").
    Package "ng-mocks" has an incompatible peer dependency to "@angular/forms" (requires ">=5.x <=9.x", would install "10.2.5").
    Package "@angular/cdk" has an incompatible peer dependency to "tslib" (requires "^1.9.0", would install "2.8.1").
Incompatible peer dependencies found. See above for details. You can bypass this check using the --force option.
```

## Interpretation

This means Angular 10 is a valid next step, but the project has several old dependencies that are not yet compatible. The normal fix is to rerun the command with `--force` and resolve the breakages that appear during build/test after the update.

## Helpful follow-up commands

```powershell
npm install
npm run build
```

After each major upgrade, build the project and fix compiler/type issues before proceeding to the next version.

## Upgrade appendix by version

Use this appendix to record each major upgrade as it is performed. Add a new section for each version and record the command, dependency changes, build output, and any code fixes required.

### Angular 10

- Goal: move the project from Angular 9.1.2 to Angular 10 with matching CLI and CDK versions.
- Command:

```powershell
ng update @angular/core@10 @angular/cli@10 --force
```

- What changed:
  - `@angular/core` was aligned to `10.2.5`
  - `@angular/cli` was aligned to `10.2.4`
  - `@angular-devkit/build-angular` aligned to `0.1002.4`
  - `@angular/cdk` moved from `9.2.1` to `10.2.7`
  - `ng-mocks` moved from `9.2.0` to `10.2.0`
  - `tslib` moved to a compatible version range
  - `@thisissoon/angular-inviewport` removed because it was incompatible with Angular 10
  - `codelyzer` removed because it had Angular 9 peer constraints
- Environment issue discovered:
  - Angular 10 + webpack 4 fails on newer Node versions with `ERR_OSSL_EVP_UNSUPPORTED`
- Fix used:

```powershell
node --openssl-legacy-provider ./node_modules/@angular/cli/bin/ng
```

- Validation:

```powershell
npm install
npm run build
```

- Result:
  - Install succeeded
  - Build succeeded
  - Non-blocking warning remained for lodash/CommonJS optimization bailout

### Angular 11

- Goal: upgrade from Angular 10 to Angular 11 with a fully consistent Angular toolchain.
- Command used:

```powershell
ng update @angular/core@11 @angular/cli@11 --force
```

- Resulting dependency state after the upgrade attempt:
  - `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router`, `@angular/platform-browser`, `@angular/platform-browser-dynamic`, and `@angular/compiler` updated to `11.2.14`
  - `@angular/cli` updated to `11.2.19`
  - `@angular-devkit/build-angular` updated to `0.1102.19`
  - `@angular/compiler-cli` updated to `11.2.14`
  - `@angular/cdk` was left behind at `10.2.7` in the project and later corrected to the Angular 11 major
  - `typescript` remained at `4.0.8`
  - `karma` remained on `~6.4.4`
- Error encountered during install after the upgrade attempt:

```text
npm error code ERESOLVE
npm error While resolving: customer-portal-app@0.0.1
npm error Found: @angular-devkit/build-angular@0.1002.4
npm error node_modules/@angular-devkit/build-angular
npm error   dev @angular-devkit/build-angular@"0.1102.19" from the root project
npm error
npm error Could not resolve dependency:
npm error dev @angular-devkit/build-angular@"0.1102.19" from the root project
npm error
npm error Conflicting peer dependency: @angular/compiler-cli@11.2.14
npm error node_modules/@angular/compiler-cli
npm error   peer @angular/compiler-cli@"^11.0.0 || ^11.2.0-next" from @angular-devkit/build-angular@0.1102.19
```

- Root cause:
  - the repo had a mixed Angular 10/11 dependency tree
  - stale Angular 10 build-tooling remained in the project
  - the Angular CLI, compiler, build-angular package, and CDK were not aligned as a single toolchain
  - the project had also picked up a newer transitive `@types/ws` package from Karma/Socket.IO
- TypeScript error discovered after the dependency fix:

```text
Error: node_modules/@types/ws/index.d.ts:336:18 - error TS2315: Type 'Server' is not generic.
Error: node_modules/@types/ws/index.d.ts:336:34 - error TS2315: Type 'Server' is not generic.
```

- Diagnosis:
  - `@types/ws` from `socket.io` / `engine.io` had become too new for the project’s TypeScript 4.0.8
  - the generated type definitions used a generic `HTTPServer<V>`, which is not valid in the older TypeScript compiler version
- Fix applied:

```json
"overrides": {
  "@types/ws": "7.4.5"
}
```

and in the final manifest this was pinned explicitly in devDependencies as:

```json
"@types/ws": "7.4.5"
```

- Build validation after fix:

```powershell
npm install
npm ls @types/ws --depth=5
npm run build
```

- Verification result:

```text
customer-portal-app@0.0.1 C:\Projects\Angular\backbase-master
└─┬ karma@6.4.4
  └─┬ socket.io@4.8.4
    └─┬ engine.io@6.6.11
      └── @types/ws@7.4.5 overridden
```

and then:

```text
> customer-portal-app@0.0.1 build
> npm run ng build

✔ Browser application bundle generation complete.
✔ ES5 bundle generation complete.
✔ Copying assets complete.
✔ Index html generation complete.
Build at: 2026-10-03T18:54:30.626Z - Hash: fb2a8f9bf30a1c13f4c3 - Time: 21833ms
```

- Final note:
  - the Angular 11 upgrade is working in the repo after version alignment and the `@types/ws` override
  - one non-blocking warning remains about `lodash` being a CommonJS dependency and causing optimization bailouts
  - that warning does not block the app from building

### Angular 12

- Goal: upgrade from Angular 11 to Angular 12 while preserving a consistent toolchain and eliminating the peer mismatch left behind by the earlier partial update attempt.
- Command used:

```powershell
npx ng update @angular/core@12 @angular/cli@12 --allow-dirty
```

- Resulting dependency state after the upgrade attempt:
  - `@angular/core` aligned to `12.2.17`
  - `@angular/common`, `@angular/forms`, `@angular/router`, `@angular/platform-browser`, `@angular/platform-browser-dynamic`, `@angular/compiler`, and `@angular/compiler-cli` aligned to `12.2.17`
  - `@angular/cli` aligned to `12.2.18`
  - `@angular-devkit/build-angular` aligned to `12.2.18`
  - `@angular/cdk` aligned to `12.2.13`
  - `@angular/language-service` aligned to `12.2.17`
  - `zone.js` aligned to `0.11.8`
  - TypeScript remained on `4.3.5`
- Error encountered during dependency resolution:

```text
npm ERR! code ERESOLVE
npm ERR! While resolving: customer-portal-app@0.0.1
npm ERR! Found: @angular-devkit/build-angular@0.1102.19
npm ERR! Could not resolve dependency:
npm ERR! dev @angular-devkit/build-angular@"0.1102.19" from the root project
npm ERR! Conflicting peer dependency: @angular/compiler-cli@11.2.14
```

- Root cause:
  - the workspace still had mixed Angular 10/11/12 package references in the manifest
  - `@angular/compiler`, `@angular/core`, `@angular/cli`, `build-angular`, and `cdk` were not all on the same version family
  - there was also a transitive type mismatch created by newer `@types/eslint` / `@types/estree` packages
- Type issue discovered while resolving the install:

```text
error TS2315: Type 'Server' is not generic.
```

- Diagnosis for the type mismatch:
  - `@types/ws` was being pulled in at a newer version by transitive dependencies
  - that newer type definition is incompatible with the project’s TypeScript 4.3.5 toolchain
- Fix applied:

```json
"overrides": {
  "@types/ws": "7.4.5",
  "@types/eslint": "8.56.0",
  "@types/estree": "1.0.9"
}
```

- Validation after the fix:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
npm run build
```

- Result:
  - clean install succeeded
  - Angular 12 build succeeded
  - output included the production bundle generation and a successful build timestamp
  - remaining warnings were only Sass slash-division deprecations, which are non-blocking warnings during the Angular 12 toolchain

### Angular 13

- Goal: upgrade from Angular 12 to Angular 13 with the CLI migrations applied and a clean build on the updated toolchain.
- Command used:

```powershell
npx ng update @angular/core@13 @angular/cli@13 --allow-dirty --force
```

- Dependency updates applied by the migration:
  - `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router`, `@angular/platform-browser`, `@angular/platform-browser-dynamic`, `@angular/compiler`, and `@angular/compiler-cli` updated to `13.4.0`
  - `@angular/cli` updated to `13.3.11`
  - `@angular-devkit/build-angular` updated to `13.3.11`
  - `@angular/animations` updated to `13.4.0`
  - `@angular/language-service` updated to `13.4.0`
  - `typescript` updated from `4.3.5` to `4.6.4`
- Angular CLI migration actions completed automatically:
  - removed unsupported IE polyfills from `src/polyfills.ts`
  - removed obsolete `angular.json` options
  - updated `.gitignore` with `.angular/cache`
  - updated the test teardown configuration in `src/test.ts`
- Validation performed:

```powershell
npm run build
```

- Result:
  - build succeeded
  - output included the Angular 13 bundle generation and final `Build at: ...` success timestamp
  - no blocking migration errors were present after the update

### Angular 14

- Goal: upgrade from Angular 13 to Angular 14 with the Angular 14 CLI migrations applied and the project validated on the upgraded toolchain.
- Command used:

```powershell
npx ng update @angular/core@14 @angular/cli@14 --allow-dirty --force
```

- Dependency updates applied by the migration:
  - `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router`, `@angular/platform-browser`, `@angular/platform-browser-dynamic`, `@angular/compiler`, and `@angular/compiler-cli` updated to `14.3.0`
  - `@angular/cli` updated to `14.2.13`
  - `@angular-devkit/build-angular` updated to `14.2.13`
  - `@angular/animations` updated to `14.3.0`
  - `@angular/language-service` updated to `14.3.0`
- CLI migration actions completed automatically:
  - removed the `defaultProject` option from the workspace config
  - removed deprecated browser builder options
  - replaced `defaultCollection` with `schematicCollections`
  - updated the TypeScript target to `ES2020` in `tsconfig.json`
- Code migration applied automatically:
  - updated `src/app/home/transactions/components/transfer/new-transfer-form/new-transfer-form.component.ts` to accommodate Angular 14 forms typing changes
- Validation performed:

```powershell
npm run build
```

- Result:
  - build succeeded
  - output included Angular bundle generation and a final `Build at: ...` success timestamp
  - the only remaining output was a non-blocking warning about CommonJS dependencies (`lodash` and `moment`) in the build, which does not stop the project from compiling

#### Component migration example: NewTransferFormComponent

The project contains a concrete example of the Angular 14 compatibility work in `src/app/home/transactions/components/transfer/new-transfer-form/new-transfer-form.component.ts`.

- Angular 14 tightened form typing for reactive forms, so the component was migrated to `UntypedFormBuilder`, `UntypedFormControl`, and `UntypedFormGroup` instead of requiring full generic form typing at that stage of the project.
- This was required because older validation code relied on runtime form-config patterns and the app had not yet been converted to the newer typed-forms model.
- The app still uses `OnPush` change detection and keeps the update strategy compatible with Angular 14 by using `markForCheck()` when the localization stream emits, instead of forcing a full render cycle with `detectChanges()`.
- The route configuration in `src/app/app-routing.module.ts` still uses `pathMatch: 'full'`, which is the valid Angular 14 route option, and the migration confirms that the stricter route typing is now enforced.
- Angular 13 also removed the old `entryComponents` pattern. This project did not rely on that legacy API in the app code, but the migration confirmed it is no longer needed and the update had to leave that pattern behind as part of the move to modern Angular.

This is a good example of a real component-level change: the app was not rewritten wholesale, but it had to adopt the modern Angular forms and change-detection conventions while preserving the same behavior.

### Angular 15

- Goal: upgrade from Angular 14 to Angular 15 with the Angular CLI migration set applied and the project revalidated on the updated toolchain.
- Command used:

```powershell
npx ng update @angular/core@15 @angular/cli@15 --allow-dirty --force
```

- Dependency updates applied by the migration:
  - `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router`, `@angular/platform-browser`, `@angular/platform-browser-dynamic`, `@angular/compiler`, and `@angular/compiler-cli` updated to `15.2.10`
  - `@angular/cli` updated to `15.2.11`
  - `@angular-devkit/build-angular` updated to `15.2.11`
  - `@angular/animations` updated to `15.2.10`
  - `@angular/language-service` updated to `15.2.10`
  - `typescript` updated from `4.6.4` to `4.9.5`
- Angular CLI migration actions completed automatically:
  - updated `src/test.ts` to remove no-longer-needed Karma builder calls
  - updated the TypeScript target and `useDefineForClassFields` settings in `tsconfig.json`
  - removed legacy Router config entries for `relativeLinkResolution`
  - replaced deprecated `RouterLinkWithHref` references with `RouterLink`
- Validation performed:

```powershell
npm run build
```

- Result:
  - build succeeded
  - output included the Angular 15 bundle generation and a final `Build at: ...` success timestamp
  - Angular CLI reported that some older Browserslist browsers were ignored because ES5 output is no longer supported, which is expected for Angular 15
  - the only warnings left were non-blocking CommonJS optimization warnings for `lodash` and `moment`

### Angular 16

- Goal: upgrade from Angular 15 to Angular 16 with the CLI migration set applied and the project revalidated on the updated toolchain.
- Command used:

```powershell
npx ng update @angular/core@16 @angular/cli@16 --allow-dirty --force
```

- Dependency updates applied by the migration:
  - `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router`, `@angular/platform-browser`, `@angular/platform-browser-dynamic`, `@angular/compiler`, and `@angular/compiler-cli` updated to `16.2.12`
  - `@angular/cli` updated to `16.2.16`
  - `@angular-devkit/build-angular` updated to `16.2.16`
  - `@angular/animations` updated to `16.2.12`
  - `@angular/language-service` updated to `16.2.12`
  - `zone.js` updated from `0.11.8` to `0.13.3`
- Angular CLI migration actions completed automatically:
  - removed legacy configuration entries for older Angular CLI defaults
  - updated the server builder settings for the newer build optimizer defaults
- Validation performed:

```powershell
npm run build
```

- Result:
  - build succeeded
  - output included Angular 16 bundle generation and a final `Build at: ...` success timestamp
  - Angular CLI reported that some legacy Browserslist targets were ignored because ES5 output is no longer supported, which is expected for Angular 16
  - the only remaining output was a non-blocking CommonJS optimization warning for `lodash` and `moment`

### Angular 17

- Goal: upgrade from Angular 16 to Angular 17 and fix the zone.js import path required by the modern package exports.
- Command used:

```powershell
npx ng update @angular/core@17 @angular/cli@17 --allow-dirty --force
```

- Dependency updates applied by the migration:
  - `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router`, `@angular/platform-browser`, `@angular/platform-browser-dynamic`, `@angular/compiler`, and `@angular/compiler-cli` updated to `17.3.12`
  - `@angular/cli` updated to `17.3.17`
  - `@angular-devkit/build-angular` updated to `17.3.17`
  - `@angular/animations` updated to `17.3.12`
  - `@angular/language-service` updated to `17.3.12`
  - `zone.js` updated from `0.13.3` to `0.14.10`
  - `typescript` updated from `4.9.5` to `5.4.5`
- Angular CLI migration actions completed automatically:
  - updated `angular.json` to remove deprecated CLI options
  - updated the Angular 17 builder and browser configuration defaults
- Build issue encountered:

```text
./src/polyfills.ts:47:0-27 - Error: Module not found: "./dist/zone" is not exported under the conditions ... from package .../node_modules/zone.js
```

- Root cause:
  - the App was still importing `zone.js/dist/zone`, which is no longer exported in the current `zone.js` package layout
- Fix applied:

```ts
import 'zone.js';
```

- Validation performed:

```powershell
npm run build
```

- Result:
  - build succeeded
  - output included Angular 17 bundle generation and a final `Build at: ...` success timestamp
  - Angular CLI still warns that some legacy Browserslist targets are ignored because ES5 output is no longer supported, which is expected for Angular 17
  - the only remaining output was a non-blocking CommonJS optimization warning for `lodash` and `moment`

### Angular 18

- Goal: upgrade from Angular 17 to Angular 18 and accept the Angular CLI’s optional build-system migration for the new application builder.
- Command used:

```powershell
npx ng update @angular/core@18 @angular/cli@18 --allow-dirty --force
```

- Dependency updates applied by the migration:
  - `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router`, `@angular/platform-browser`, `@angular/platform-browser-dynamic`, `@angular/compiler`, and `@angular/compiler-cli` updated to `18.2.14`
  - `@angular/cli` updated to `18.2.21`
  - `@angular-devkit/build-angular` updated to `18.2.21`
  - `@angular/animations` updated to `18.2.14`
  - `@angular/language-service` updated to `18.2.14`
- Optional Angular CLI migration accepted:
  - migrated application projects to the new Angular build system (`application` builder)
  - updated the build output location from `dist` to `dist/browser` in the Angular config
  - refreshed the TypeScript and Angular config defaults in `angular.json` and `tsconfig.json`
- Angular core migration actions completed automatically:
  - updated deprecated HTTP provider usage in `src/app/app.module.ts` by replacing the older module-based setup with the Angular 18 provider function `provideHttpClient(withInterceptorsFromDi())`
  - this reflects the move away from the legacy `HttpClientModule` pattern into the newer DI-based provider configuration
- Angular CLI build-system migration completed automatically:
  - transformed the app builder to `@angular-devkit/build-angular:application`
  - moved the browser build to the new `outputPath.base`/`browser` layout under `angular.json`
  - kept the application config aligned with the newer Angular build system introduced in v18
- Validation performed:

```powershell
npm run build
```

- Result:
  - build succeeded
  - output included the Angular 18 bundle generation and successful final output location summary
  - the only remaining output was a non-blocking CommonJS optimization warning for `lodash` and `moment`

#### Project-level migration notes

These are the two project changes that mattered most during the Angular 18 upgrade:

- `src/app/app.module.ts`: Angular 18 removed the old module-based HTTP pattern. The app was modernized to use `provideHttpClient(withInterceptorsFromDi())`, which keeps the configuration in the provider layer instead of relying on the deprecated module registration path.
- `angular.json`: Angular 18’s CLI migration converted the app to the new `application` builder and updated the output configuration to the modern browser/app layout. This is not a functional change to the project logic, but it is a major build-system change that must be accepted when upgrading to Angular 18.

### Angular 19

- Goal: upgrade from Angular 18 to Angular 19.
- Command:

```powershell
ng update @angular/core@19 @angular/cli@19 --force
```

- To document:
  - final dependency state
  - any migration work needed for the newest Angular release
  - final build/test summary

## Appendix template

Use this format for each future version:

```markdown
### Angular X

- Goal:
- Command:

```powershell
ng update @angular/core@X @angular/cli@X --force
```

- What changed:
- Dependency updates:
- Errors/warnings:
- Fixes applied:
- Validation:

```powershell
npm install
npm run build
```

- Result:

```

This keeps the historical upgrade record clear while leaving the original notes intact.
```
