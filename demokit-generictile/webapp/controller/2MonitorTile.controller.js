sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("com.sap.demokitgenerictile.controller.2MonitorTile", {
       onInit() {
			this.oRouter = this.getOwnerComponent().getRouter();
        },
		onPressNext(){
			this.oRouter.navTo("KPITile");
		},
        onPressBack(){
            this.oRouter.navTo("RouteLaunchTile");
        },
        press : function(evt) {
			MessageToast.show("The GenericTile is pressed.");
		},
    });
});