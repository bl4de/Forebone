test("Check Forebone.Window instance", function () {
	var obj = Forebone.Window;
	equal(typeof obj, "object");
});

test("Check Forebone.Util instance", function () {
	var obj = Forebone.Util;
	equal(typeof obj, "object");
});

test("Check Forebone.Ajax instance", function () {
	var obj = Forebone.Ajax;
	equal(typeof obj, "object");
});

test("Check Forebone.Dater instance", function () {
	var obj = Forebone.Dater;
	equal(typeof obj, "object");
});

test("Check Forebone.User instance", function () {
	var obj = Forebone.User;
	equal(typeof obj, "object");
});

test("Check Forebone.Event instance", function () {
	var obj = Forebone.Event;
	equal(typeof obj, "object");
});

test("Check Forebone.Canvas instance", function () {
	var obj = Forebone.Canvas;
	equal(typeof obj, "object");
});

test("Check Forebone.Dom instance", function () {
	var obj = Forebone.Dom;
	equal(typeof obj, "object");
});

test("Forebone.Dater test suite", function () {
	var obj = Forebone.Dater;
	obj.createDate(1);
	equal(obj.showDate(), "Thu Jan 01 1970 01:00:00 GMT+0100 (CET)");

	// default date formatter day month year
	obj.formatDate();
	equal(obj.showDate(), "1 0 1970");

});

test("Forebone.Dom test suite", function () {
	var obj = Forebone.Dom;

	// find DOM node
	var elem = obj.find('.testdiv');
	equal(typeof elem.style, "object");

	// add new attribute to DOM node
	var testAttr = "testAttrVal";
	obj.set(elem, "testattr", "testAttrVal");
	var _testElem = document.querySelector(".testdiv");

	equal(_testElem.getAttribute("testattr"), testAttr);


	// get new property from DOM node
	equal(obj.get(elem, "testattr"), testAttr);


	// test content()
	obj.content('.testdiv', "test");
	var elem = document.getElementsByClassName('testdiv');
	equal(elem[0].innerHTML, "test");

});