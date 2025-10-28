/*global QUnit*/

sap.ui.define([
	"com/sap/draganddrop/controller/List-DragAndDrop.controller"
], function (Controller) {
	"use strict";

	QUnit.module("List-DragAndDrop Controller");

	QUnit.test("I should test the List-DragAndDrop controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
