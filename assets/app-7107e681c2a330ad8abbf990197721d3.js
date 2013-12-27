!function(e,n){var t,c,i,r={beforeChange:"deck.beforeChange",change:"deck.change",beforeInitialize:"deck.beforeInit",initialize:"deck.init"},s={},o=e(document),a=function(e){e.stopPropagation()},d=function(){var e=i.data("onSlide");i.removeClass(s.classes.onPrefix+e),i.addClass(s.classes.onPrefix+c),i.data("onSlide",c)},u=function(){var n=e("."+s.classes.current),i=n.parentsUntil(s.selectors.container),r=t[c],o=r.parentsUntil(s.selectors.container);i.removeClass(s.classes.childCurrent),o.addClass(s.classes.childCurrent)},l=function(){var n=e();e.each(t,function(e,t){n=n.add(t)}),n.removeClass([s.classes.before,s.classes.previous,s.classes.current,s.classes.next,s.classes.after].join(" "))},f=function(){t[c].addClass(s.classes.current),c>0&&t[c-1].addClass(s.classes.previous),c+1<t.length&&t[c+1].addClass(s.classes.next),c>1&&e.each(t.slice(0,c-1),function(e,n){n.addClass(s.classes.before)}),c+2<t.length&&e.each(t.slice(c+2),function(e,n){n.addClass(s.classes.after)})},h=function(){d(),u(),l(),f()},g=function(n){e.isArray(n)?e.each(n,function(n,c){t.push(e(c))}):e(n).each(function(n,c){t.push(e(c))})},k=function(){var n=["input","textarea","select","button","meter","progress","[contentEditable]"].join(", ");o.unbind("keydown.deck").bind("keydown.deck",function(n){var t=n.which===s.keys.next,c=n.which===s.keys.previous;t=t||e.inArray(n.which,s.keys.next)>-1,c=c||e.inArray(n.which,s.keys.previous)>-1,t?(y.next(),n.preventDefault()):c&&(y.prev(),n.preventDefault())}),o.undelegate(n,"keydown.deck",a),o.delegate(n,"keydown.deck",a)},p=function(){var t;i.unbind("touchstart.deck"),i.bind("touchstart.deck",function(n){t||(t=e.extend({},n.originalEvent.targetTouches[0]))}),i.unbind("touchmove.deck"),i.bind("touchmove.deck",function(c){e.each(c.originalEvent.changedTouches,function(c,i){if(!t||i.identifier!==t.identifier)return!0;var r=i.screenX-t.screenX,o=i.screenY-t.screenY,a=r>s.touch.swipeTolerance,d=r<-s.touch.swipeTolerance,u=o>s.touch.swipeTolerance,l=o<-s.touch.swipeTolerance;return a||u?(e.deck("prev"),t=n):(d||l)&&(e.deck("next"),t=n),!1}),c.preventDefault()}),i.unbind("touchend.deck"),i.bind("touchend.deck",function(c){e.each(c.originalEvent.changedTouches,function(e,c){t&&c.identifier===t.identifier&&(t=n)})})},v=function(e){return"number"==typeof e&&e>=0&&e<t.length},y={init:function(n,a){s=e.extend(!0,{},e.deck.defaults,a),t=[],c=0,i=e(s.selectors.container),tolerance=s.touch.swipeTolerance,o.trigger(r.beforeInitialize),i.addClass(s.classes.loading),g(n),k(),p(),i.scrollLeft(0).scrollTop(0),t.length&&h(),i.removeClass(s.classes.loading),o.trigger(r.initialize)},go:function(n){var i,s=e.Event(r.beforeChange);v(n)?i=n:"string"==typeof n&&e.each(t,function(e,t){return t.attr("id")===n?(i=e,!1):void 0}),"undefined"!=typeof i&&(o.trigger(s,[c,i]),s.isDefaultPrevented()||(o.trigger(r.change,[c,i]),c=i,h()))},next:function(){y.go(c+1)},prev:function(){y.go(c-1)},getSlide:function(e){return e="undefined"!=typeof e?e:c,v(e)?t[e]:null},getSlides:function(){return t},getContainer:function(){return i},getOptions:function(){return s},extend:function(e,n){y[e]=n}};e.deck=function(e,n){var t=Array.prototype.slice.call(arguments,1);return y[e]?y[e].apply(this,t):y.init(e,n)},e.deck.defaults={classes:{after:"deck-after",before:"deck-before",childCurrent:"deck-child-current",current:"deck-current",loading:"deck-loading",next:"deck-next",onPrefix:"on-slide-",previous:"deck-previous"},selectors:{container:".deck-container"},keys:{next:[13,32,34,39,40],previous:[8,33,37,38]},touch:{swipeTolerance:60}},o.ready(function(){e("html").addClass("ready")})}(jQuery),function(){$.deck(".slide")}.call(this);