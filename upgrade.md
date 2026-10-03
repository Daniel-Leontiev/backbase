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

- Goal: upgrade from Angular 10 to Angular 11.
- Command:

```powershell
ng update @angular/core@11 @angular/cli@11 --force
```

- To document:
  - dependency versions after the update
  - any peer conflicts or warnings
  - build or test output
  - code changes required for TypeScript, compiler, or template API differences

### Angular 12

- Goal: upgrade from Angular 11 to Angular 12.
- Command:

```powershell
ng update @angular/core@12 @angular/cli@12 --force
```

- To document:
  - Angular 12 package versions
  - Ivy/zone changes or deprecations
  - build/test issues
  - code modifications required

### Angular 13

- Goal: upgrade from Angular 12 to Angular 13.
- Command:

```powershell
ng update @angular/core@13 @angular/cli@13 --force
```

- To document:
  - package updates and peer warnings
  - any TypeScript or RxJS adjustment needs
  - build/test output

### Angular 14

- Goal: upgrade from Angular 13 to Angular 14.
- Command:

```powershell
ng update @angular/core@14 @angular/cli@14 --force
```

- To document:
  - package changes
  - lint/build fixes
  - template or API changes

### Angular 15

- Goal: upgrade from Angular 14 to Angular 15.
- Command:

```powershell
ng update @angular/core@15 @angular/cli@15 --force
```

- To document:
  - package updates
  - compile or test issues
  - deprecated API replacements

### Angular 16

- Goal: upgrade from Angular 15 to Angular 16.
- Command:

```powershell
ng update @angular/core@16 @angular/cli@16 --force
```

- To document:
  - dependency and builder changes
  - build warnings or errors
  - any code fixes or config changes

### Angular 17

- Goal: upgrade from Angular 16 to Angular 17.
- Command:

```powershell
ng update @angular/core@17 @angular/cli@17 --force
```

- To document:
  - Angular 17 package versions
  - any config and build updates
  - final validation results

### Angular 18

- Goal: upgrade from Angular 17 to Angular 18.
- Command:

```powershell
ng update @angular/core@18 @angular/cli@18 --force
```

- To document:
  - package changes
  - runtime or build adjustments
  - final validation output

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
