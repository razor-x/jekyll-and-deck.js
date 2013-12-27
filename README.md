# Jekyll & deck.js

[![Dependency Status](https://gemnasium.com/razor-x/jekyll-and-deck.js.png)](https://gemnasium.com/razor-x/jekyll-and-deck.js)
[![Build Status](https://travis-ci.org/razor-x/jekyll-and-deck.js.png?branch=master)](https://travis-ci.org/razor-x/jekyll-and-deck.js)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/razor-x/jekyll-and-deck.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

Source for your deck running on Jekyll and deck.js.
Just clone and deck.

- Create your [deck.js](http://imakewebthings.com/deck.js/) deck with [Jekyll](http://jekyllrb.com/).
- Write your deck with [Haml](http://haml.info/).
- MathJax ready: just set `mathjax: true` in `_config.yml`.
- Asset pipeline with [Jekyll::AssetsPlugin](https://github.com/ixti/jekyll-assets).
- Bower for asset dependency management.
- Basic [Rake](https://github.com/jimweirich/rake) tasks with support for dev and offline mode, run `rake -D` for info.
- Meta data system for SEO and social media: see `_data/meta.yml`.
- [Google Analytics](http://www.google.com/analytics/) ready: see `google_analytics` variable in `_config.yml`.
- [Piwik](https://piwik.org/) ready: set `piwik: yoursite.com/piwik/` in `_config.yml` (yoursite.com/piwik/ points to the piwik install root).

## Quick start

You will need [Ruby Bundler](http://bundler.io/) and [Bower](http://bower.io/).

Just clone this with

````bash
$ git clone https://github.com/razor-x/jekyll-and-deck.js.git my-deck
````

run `bundle && bower install` and make your deck in `index.haml`.
Head over to the [Jekyll Docs](http://jekyllrb.com/docs/home/) and [deck.js docs](http://imakewebthings.com/deck.js/docs/) for the rest of the details.

## Add future update support

If you want to merge in future updates from this project and have your own origin,
set up a separate branch to track this.

````bash
$ git remote rename origin razor-x-jekyll-and-deck.js
$ git branch jekyll-and-deck.js
$ git branch -u razor-x-jekyll-and-deck.js/master jekyll-and-deck.js
````

Then add an origin and push master

````bash
$ git remote add origin git@github.com:username/my-deck.git
$ git push -u origin master
````

Now, the `jekyll-and-deck.js` branch will pull changes from this project,
which you can then merge into your other branches.

If you later clone your repo you will need to create the update branch again.

````bash
$ git remote add razor-x-jekyll-and-deck.js https://github.com/razor-x/jekyll-and-deck.js.git
$ git fetch razor-x-jekyll-and-deck.js
$ git checkout -b jekyll-and-deck.js razor-x-jekyll-and-deck.js/master
````

## Updating

The `Gemfile` is using pessimistic version constraints for everything,
so if you want major updates, you need to bump the versions yourself.

JavaScript library versions need to be updated in `bower.json` and `_config.yml` (for CDN).

## License

This code is licensed under the MIT license.

## Warranty

This software is provided "as is" and without any express or
implied warranties, including, without limitation, the implied
warranties of merchantibility and fitness for a particular
purpose.
