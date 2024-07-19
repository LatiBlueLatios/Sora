# Haruka Changelog

## [1.0.0] - 2024-7-19

First official release version, yay!

### Added

- Error handling with `handleError` method
- Lifecycle method `onMount`
- `hydrate` method for adding interactivity
- `destroy` method for cleanup
- Additional DOM handling methods: `insertBefore`, `replace`, `addClass`, `removeClass`, `toggleClass`
- Improved `isVisible` method
- `clearTimers` method placeholder

### Changed

- Refactored `init` method to be asynchronous
- Improved error handling consistency
- Enhanced type checking for method parameters

### Removed

- Direct event handling (now handled by SoulDew)

## [0.2.0] - Release Candidate 2

### Added

- Integration with SoulDew for event handling
- `appendTo` method for targeted element insertion
- `show`, `hide`, and `isVisible` methods for visibility control

### Changed

- Refactored to extend SoulDew class

## [0.1.0] - Release Candidate 1

### Added

- Basic state management with `setState` and `getState`
- CSS property handling with `setCSSProperty` and `getCSSProperty`
- `append` and `remove` methods for DOM manipulation

### Changed

- Improved template fetching with error handling

## [0.0.2] - Indev

Needed after v0.0.1 took a bit of my sanity away, resulting in some horribly implemented code. Thank you, asynchronous JavaScript.

### Added

- Refactored the module to reflect SRP and the goal of "small but mighty"

## [0.0.1] - Indev

### Added

- Initial implementation of Haruka class
- Asynchronous template fetching
- Basic rendering functionality
