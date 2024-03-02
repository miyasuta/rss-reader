/*global QUnit*/
import Controller from "miyasuta/rssreader/controller/List.controller";

QUnit.module("List Controller");

QUnit.test("I should test the List controller", function (assert: Assert) {
	const oAppController = new Controller("List");
	oAppController.onInit();
	assert.ok(oAppController);
});