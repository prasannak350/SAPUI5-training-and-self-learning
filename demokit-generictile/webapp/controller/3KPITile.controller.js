sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("com.sap.demokitgenerictile.controller.3KPITile", {
       onInit() {
			this.oRouter = this.getOwnerComponent().getRouter();
        },
		onPressNext(){
			this.oRouter.navTo("RouteLaunchTile");
		},
        onPressBack(){
            this.oRouter.navTo("MonitorTile");
        },
        press : function(evt) {
			MessageToast.show("The GenericTile is pressed.");
		},
    });
});