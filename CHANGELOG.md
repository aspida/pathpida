# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.20.1](https://github.com/aspida/pathpida/compare/v0.20.0...v0.20.1) (2022-12-04)

### Bug Fixes

- support for nextjs app dir inside src dir (https://github.com/aspida/pathpida/pull/158)

## [0.20.0](https://github.com/aspida/pathpida/compare/v0.19.3...v0.20.0) (2022-11-25)

### Features

- remove sapper (https://github.com/aspida/pathpida/pull/151)

## [0.19.3](https://github.com/aspida/pathpida/compare/v0.19.2...v0.19.3) (2022-11-22)

### Bug Fixes

- support for cases without pages dir (https://github.com/aspida/pathpida/pull/150)

## [0.19.2](https://github.com/aspida/pathpida/compare/v0.19.1...v0.19.2) (2022-11-22)

### Bug Fixes

- change srcDir logic (https://github.com/aspida/pathpida/pull/149)

## [0.19.1](https://github.com/aspida/pathpida/compare/v0.19.0...v0.19.1) (2022-11-22)

### Bug Fixes

- input path of appDir (https://github.com/aspida/pathpida/pull/148)

## [0.19.0](https://github.com/aspida/pathpida/compare/v0.18.1...v0.19.0) (2022-11-22)

### Features

- support appDir of Nextjs (https://github.com/aspida/pathpida/pull/146)

## [0.18.1](https://github.com/aspida/pathpida/compare/v0.18.0...v0.18.1) (2022-03-25)

### Bug Fixes

- fix: stringify to enclose path name into quotations (https://github.com/aspida/pathpida/pull/127)

## [0.18.0](https://github.com/aspida/pathpida/compare/v0.17.0...v0.18.0) (2022-02-24)

### Features

- use type-only imports for types (https://github.com/aspida/pathpida/pull/113)

### Refactoring

- remove eslint-disable and prettier-ignore directives. please add `$*.ts` pattern to your `.prettierignore` and `.eslintignore` by yourself. (https://github.com/aspida/pathpida/pull/116)

## [0.17.0](https://github.com/aspida/pathpida/compare/v0.16.0...v0.17.0) (2021-08-29)

### Features

- support pageExtensions for nextjs ([5586235](https://github.com/aspida/pathpida/commit/5586235218f277fb4c122c0879d33959975dfb37))

## [0.16.0](https://github.com/aspida/pathpida/compare/v0.15.5...v0.16.0) (2021-08-19)

### Features

- add ignorePath option ([4fb9d43](https://github.com/aspida/pathpida/commit/4fb9d43d21a655fd0e66f7ce69b429eddc7a3d23))
- add output option ([97c107c](https://github.com/aspida/pathpida/commit/97c107c820634d39b6864e65103a0ca6ce1ae775))

### [0.15.5](https://github.com/aspida/pathpida/compare/v0.15.4...v0.15.5) (2021-08-12)

### Bug Fixes

- change next config path for v11.1.0 ([7d85387](https://github.com/aspida/pathpida/commit/7d85387bc142c2cb92a13d9516c2b0b0c5642700))
- ignore typed-css-modules files ([300c8a3](https://github.com/aspida/pathpida/commit/300c8a3ff40b1a3c5d358619fc0fbd24107825c4))

### [0.15.4](https://github.com/aspida/pathpida/compare/v0.15.3...v0.15.4) (2021-07-22)

### Bug Fixes

- create plugins dir of nuxt if not exists ([196b11a](https://github.com/aspida/pathpida/commit/196b11abc1afa77728541a9f397138664f2a5a55))
- move next and nuxt to devDependencies ([2b50643](https://github.com/aspida/pathpida/commit/2b5064383fc5093a438b4faad0738131503e5238))

### [0.15.3](https://github.com/aspida/pathpida/compare/v0.15.2...v0.15.3) (2021-07-17)

### Bug Fixes

- update dependencies ([990d42a](https://github.com/aspida/pathpida/commit/990d42ac031e5be17e37b543a720d8c074d7a0bb))

### [0.15.2](https://github.com/aspida/pathpida/compare/v0.15.1...v0.15.2) (2021-05-22)

### Bug Fixes

- Support duplicate file and directory names ([7c6c415](https://github.com/aspida/pathpida/commit/7c6c41570dbf61b2d47d5d08b298e3091fadb9f4))

### [0.15.1](https://github.com/aspida/pathpida/compare/v0.15.0...v0.15.1) (2021-04-22)

### Bug Fixes

- remove useless prettier comments ([7c25df4](https://github.com/aspida/pathpida/commit/7c25df4bc917990fd50184d3299cf7780916ab8e))

## [0.15.0](https://github.com/aspida/pathpida/compare/v0.14.0...v0.15.0) (2021-04-03)

### Features

- **nextjs:** ignore scss/css file ([c06a3fc](https://github.com/aspida/pathpida/commit/c06a3fc1c0d0788cbc854d9790c417624b6317fa))
- update templates for prettier ([b6eb92c](https://github.com/aspida/pathpida/commit/b6eb92cd66af9b9368f5d4f0a51f5a809dd4201f))

## [0.14.0](https://github.com/aspida/pathpida/compare/v0.13.1...v0.14.0) (2021-03-06)

### Features

- support sapper ([6c72524](https://github.com/aspida/pathpida/commit/6c7252422b385389c357c98547b5b369ad2add00))

### [0.13.1](https://github.com/aspida/pathpida/compare/v0.13.0...v0.13.1) (2021-02-25)

### Bug Fixes

- rename duplicated properties ([e28fba2](https://github.com/aspida/pathpida/commit/e28fba2189287ffec1bdae8aed093952b21acf64))
- update next and @nuxt/config ([b81854f](https://github.com/aspida/pathpida/commit/b81854fb9dc31795b28ae4d88d8aa95629a85c37))

## [0.13.0](https://github.com/aspida/pathpida/compare/v0.12.1...v0.13.0) (2021-01-31)

### Features

- import query when Nuxt.js file is tsx ([ebc16b8](https://github.com/aspida/pathpida/commit/ebc16b8e0270d4d50c7c036d1d87aeecdfe4790c))

### Bug Fixes

- fix some typo in README.md ([d2d135d](https://github.com/aspida/pathpida/commit/d2d135df8c931437eb6513d493ca161bef11c844))
- update next@10.0.6 ([699198b](https://github.com/aspida/pathpida/commit/699198b0275e6638eea9caffd83ed869ab976be9))

### [0.12.1](https://github.com/aspida/pathpida/compare/v0.12.0...v0.12.1) (2021-01-20)

### Bug Fixes

- update chokidar@3.5.1 ([f1cfa18](https://github.com/aspida/pathpida/commit/f1cfa18efe6f42d0b13516144e6bbeac11a73ff3))

### Documentation

- fix typo in README ([39fd684](https://github.com/aspida/pathpida/commit/39fd684c25fed127434dceb04ca2ad23b6f75876))

## [0.12.0](https://github.com/aspida/pathpida/compare/v0.11.0...v0.12.0) (2021-01-10)

### ⚠ BREAKING CHANGES

- support basepath config for staticPath

### Features

- support basepath config for staticPath ([d8dddc0](https://github.com/aspida/pathpida/commit/d8dddc0a28f366b9bbd51855bdf2de3cc38f32d0))

## [0.11.0](https://github.com/aspida/pathpida/compare/v0.10.2...v0.11.0) (2021-01-04)

### Features

- support nuxt esm config and more complex patterns using @nuxt/config ([ad1cbd3](https://github.com/aspida/pathpida/commit/ad1cbd3e71e1093d91f574bca8ef0ee62a6fc0e6))

### [0.10.2](https://github.com/aspida/pathpida/compare/v0.10.1...v0.10.2) (2020-12-28)

### Bug Fixes

- path value is optional when \_slug.vue ([7cca39c](https://github.com/aspida/pathpida/commit/7cca39c6ed66704f9d22279a41710be0e64b2d50))

### [0.10.1](https://github.com/aspida/pathpida/compare/v0.10.0...v0.10.1) (2020-12-25)

### Bug Fixes

- ignore pages/api on nextjs ([7cc612d](https://github.com/aspida/pathpida/commit/7cc612ddd004f0b32a9cfa6c6fcc591843b30054))

## [0.10.0](https://github.com/aspida/pathpida/compare/v0.9.4...v0.10.0) (2020-12-25)

### Features

- support config.srcDir on nuxtjs ([5fdfb4c](https://github.com/aspida/pathpida/commit/5fdfb4ca09ea9d80fbfc8bde9b70234e218a8ce9))
- support src/pages on nextjs ([ee70bdc](https://github.com/aspida/pathpida/commit/ee70bdcfdad29bf78516f7a89b62847495f593bc))

### [0.9.4](https://github.com/aspida/pathpida/compare/v0.9.3...v0.9.4) (2020-12-25)

### Bug Fixes

- type of slugs of nextjs ([a3cf164](https://github.com/aspida/pathpida/commit/a3cf164f6bd2a34d43e0e4a54ec5ac9808b1f755))

### [0.9.3](https://github.com/aspida/pathpida/compare/v0.9.2...v0.9.3) (2020-12-25)

### Bug Fixes

- break slug dir of nextjs ([bc04c39](https://github.com/aspida/pathpida/commit/bc04c3956991e24ca5014aa44ec1b59b07adc33d))

### [0.9.2](https://github.com/aspida/pathpida/compare/v0.9.1...v0.9.2) (2020-12-25)

### Bug Fixes

- replace params of nuxtjs ([8ef26ef](https://github.com/aspida/pathpida/commit/8ef26ef46a0759e2f1f826f1080d2688c3d22dfa))

### [0.9.1](https://github.com/aspida/pathpida/compare/v0.9.0...v0.9.1) (2020-12-25)

### Bug Fixes

- add optional when url is optional ([e4fa62a](https://github.com/aspida/pathpida/commit/e4fa62a3cf21020480abc6774bb3eb65a47d6fdc))

## [0.9.0](https://github.com/aspida/pathpida/compare/v0.8.0...v0.9.0) (2020-12-25)

### ⚠ BREAKING CHANGES

- add hash property to $url args

### Features

- add hash property to $url args ([706567b](https://github.com/aspida/pathpida/commit/706567b27a517f4cb9748faf7827e61253e14331))

## [0.8.0](https://github.com/aspida/pathpida/compare/v0.7.0...v0.8.0) (2020-12-24)

### ⚠ BREAKING CHANGES

- change $path() to $url()

### Features

- change $path() to $url() ([6c931ec](https://github.com/aspida/pathpida/commit/6c931ec11ce74ce81bc8a910e1dbf98e13dc8ec9))

## [0.7.0](https://github.com/aspida/pathpida/compare/v0.6.0...v0.7.0) (2020-12-24)

### ⚠ BREAKING CHANGES

- return path object

### Features

- add enableStatic option ([97e6385](https://github.com/aspida/pathpida/commit/97e6385b4c481a7378d9b50d415ed50e9feab385))
- add image assets ([8fe9bb8](https://github.com/aspida/pathpida/commit/8fe9bb8e29643bab504182e116dbec6770a681c3))
- add nuxt combined inject ([2dc9915](https://github.com/aspida/pathpida/commit/2dc9915e98a6c0a19f2b65864783ffd16b642889))
- return path object ([ec2e41c](https://github.com/aspida/pathpida/commit/ec2e41c1acb678c8dec22bc5889615e78ddc8517))

### Bug Fixes

- version command for building depth ([4ae24cf](https://github.com/aspida/pathpida/commit/4ae24cf186972ff64be2ffa54b345ef04868b065))

### Refactors

- clarify version command ([2937d0f](https://github.com/aspida/pathpida/commit/2937d0fa142a95b9b7c23fc6a74b0a6d4d940b56))

## [0.6.0](https://github.com/aspida/pathpida/compare/v0.5.1...v0.6.0) (2020-07-28)

### Features

- optimize commands ([03dbe1f](https://github.com/aspida/pathpida/commit/03dbe1fe540b91fa75676556780dd7c63801ca50))
- support crlf ([9cadf3a](https://github.com/aspida/pathpida/commit/9cadf3a7c6e0f67b63e61fd7a70e450edc221e2f))

### Documentation

- update README ([161ff46](https://github.com/aspida/pathpida/commit/161ff46a24b40ea70011d77c1234e6e9ae7335fd))

### [0.5.1](https://github.com/aspida/pathpida/compare/v0.5.0...v0.5.1) (2020-06-19)

### Bug Fixes

- index.spec.ts ([cd3fd36](https://github.com/aspida/pathpida/commit/cd3fd3649b84ed52674fdf6a86783c9e8526d0c6))
