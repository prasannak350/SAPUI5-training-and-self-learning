sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("com.sap.demokitgenerictile.controller.1LaunchTile", {
        onInit() {
			this.oRouter = this.getOwnerComponent().getRouter();
        },
		onPressNext(){
			this.oRouter.navTo("MonitorTile");
		},

        // this is not working -- screen is not loading
        onFormSubmit: function(evt) {
			var iMiliSeconds = parseInt(this.byId("loadingMinSeconds").getValue()) || 0;
			var content = this.oView.getAggregation('content');
			for (var i = 1; i < content.length; i++) {
				content[i].setState("Loading");
			}
			setTimeout(function() {
				for (var j = 1; j < content.length; j++) {
					content[j].setState("Loaded");
				}
			}, iMiliSeconds * 10000);
		},
        press : function(evt) {
			MessageToast.show("The GenericTile is pressed.");
		},
    });
});