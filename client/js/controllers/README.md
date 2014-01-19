## Using Controllers correctly

In general, a Controller shouldn't try to do too much. It should contain only the business logic needed for a single view.

The most common way to keep Controllers slim is by encapsulating work that doesn't belong to controllers into services and then using these services in Controllers via dependency injection. This is discussed in the Dependency Injection Services sections of this guide.

Do not use Controllers for:

* Any kind of DOM manipulation — Controllers should contain only business logic. DOM manipulation (the presentation logic of an application) is well known for being hard to test. Putting any presentation logic into Controllers significantly affects testability of the business logic. Angular offers databinding for automatic DOM manipulation. If you have to perform your own manual DOM manipulation, encapsulate the presentation logic in directives.
* Input formatting — Use angular form controls instead.
* Output filtering — Use angular filters instead.
* Sharing stateless or stateful code across Controllers — Use angular services instead.
* Managing the life-cycle of other components (for example, to create service instances).

taken from [http://docs.angularjs.org/guide/controller#using-controllers-correctly](http://docs.angularjs.org/guide/controller#using-controllers-correctly)
