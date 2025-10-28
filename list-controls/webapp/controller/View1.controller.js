sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.sap.listcontrols.controller.View1", {
        onInit() {
        },
        onNext: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView2");
        }
    });
});