# Changelog

## HEAD

- Switch to using [rake-jekyll] for git based deployment.
  You may now set the `SOURCE_BRANCH` environment variable
  to enable testing on all other branches.
- Add staging environment support for Travis CI builds.
- Travis CI deployment now uses deploy keys instead of personal access tokens.
  If you use this feature you must follow the new setup instructions.
- New material theme: a clean responsive style to help bootstrap your deck.

[rake-jekyll]: https://github.com/jirutka/rake-jekyll

## 1.2.8

- Travis CI optimizations.

## 1.2.7

- Fix Twitter button width bug.

## 1.2.6

- Update MathJax, Firebase, and Remodal.

## 1.2.5

- Simplify social button code.

## 1.2.4

- Smooth loading process.

## 1.2.3

- Update Google +1 Button code.
- Update Facebook Like Button code.

## 1.2.2

- Regenerate bower.json.

## 1.2.1

Version 1.2.0 introduced a change that would
print your deploy token in the Travis CI build.

If you suspect you were affected:
**regenerate your personal access tokens!**

- Hide secure token in deploy_url.

## 1.2.0

- Add favicon.
- Add LiveReload support.

## 1.1.2

- Fix body display bug.

## 1.1.1

- Avoid flash of unstyled content due to asynchronously loading CSS.
- Require fonts in head.js instead of inline.
- Travis CI updates.

## 1.1.0

- Enable autosize for Jekyll Assets.
- Load app.css with HeadJS.
- Loading screen waits until MathJax typesetting completes.
- Replace Modernizr.load with HeadJS.
- Update Remodal to 0.4.1.
- Update jQuery to 2.1.3.

## 1.0.0

- Update Remodal to 0.3.0.
- Update highlightjs to 8.4.0.
- Update uglifier to 2.6.0.
- Update rake to 10.4.2.
- Jekyll to 2.5.2.
- Firebase to 2.0.6: uses new core auth.
- All other libraries updated.
- Check-in Gemfile.lock.

## 0.1.0

- Use parseUri.
- Added 'use strict'.
- Added Display Advertising to Google Analytics Tracking Code.

## 0.0.5

- Use HTML over markdown.
- Added slide notes using Remodal.

## 0.0.4

- Bumped highlightjs to 8.0.

## 0.0.3

- jQuery to 2.1.0.
- Normalize.css to 3.0.0.

## 0.0.2

- Automatically publish to GitHub pages with Travis CI.
- Use Markdown for slides, not haml.
- New Liquid slide tag to make slides.
- Switched to highlight.js.
- Use `rake static` and `rake zip` to build a
  deck for portable static offline viewing.
- Added deck remote control using Firebase.

## 0.0.1

- Initial release.
