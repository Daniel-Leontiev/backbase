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
