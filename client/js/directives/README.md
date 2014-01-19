## Why have a ``compile`` and ``link`` function?

So why does AngularJS have two functions that run at the compile phase instead of just combining them into one?
Boiled down, the answer is for performance. It’s slow to compile and interpolate against scopes every time a new
directive of the same type is created. Because of this, all of the slow parts of the compilation process are
front-loaded into the compile phase, while the linking happens when everything is associated and attached
to the DOM.

### In summary

We’ll use the compile function to both manipulate the DOM before it’s rendered and return a link function
(that will handle the linking for us). This also is the place to put any methods that need to be shared
around with all of the instances of this directive.

We’ll use the link function to register all listeners on a specific DOM element
(that’s cloned from the template) and set up our bindings to the page.

taken from [http://www.ng-newsletter.com/posts/directives.html](http://www.ng-newsletter.com/posts/directives.html)

also see [http://henriquat.re/directives/advanced-directives-combining-angular-with-existing-components-and-jquery/angularAndJquery.html](http://henriquat.re/directives/advanced-directives-combining-angular-with-existing-components-and-jquery/angularAndJquery.html)
