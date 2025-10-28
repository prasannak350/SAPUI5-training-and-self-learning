/*global QUnit*/

sap.ui.define([
	"com/sap/demokitgenerictile/controller/LaunchTile.controller"
], function (Controller) {
	"use strict";

	QUnit.module("LaunchTile Controller");

	QUnit.test("I should test the LaunchTile controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
