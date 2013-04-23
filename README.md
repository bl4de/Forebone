Forebone
========

JavaScript multi-purpose library. My implementations of various JS things.
This is my JavaScript polygon, feel free to use it as You want to :)

Build
-----

``
$ git clone git@github.com:bl4de/Forebone.git
``
``
$ cd Forebone
``
``
$ npm install
``
``
$ grunt
``

In dist/ folder You'll find forebone.min.js

Tests
-----
TBD

Documentation
-------------
TBD

Modules
-------

* Forebone.Util - misc functions (equal(), clone())
* Forebone.Ajax - async communication with servers
* Forebone.Dater - misc functions for manipulate and fromat date/time input/output
* Forebone.User - handles users accounts
* Forebone.Event - my implementation os Sub/Pub and/or Observer pattern
* Forebone.Canvas - simple wrappers for native Canvas HTML5 API

All modules are SID (still-in-development) now, there isn't any ready-to-go version :)


In the nearest future I'll add a module called Algorythm - implementations of some of the most popular algorythms used in various programs (sorting, searching, binary-trees and so on).


ToDo
----

* tests - QUnit and Jasmine test suites
* simple build system, based on Grunt.js
* AMD-module version for projects based on Require.js
* some more advanced examples
* documentation (in .md format)
