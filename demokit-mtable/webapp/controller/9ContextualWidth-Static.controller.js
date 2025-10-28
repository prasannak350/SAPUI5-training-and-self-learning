sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device"
], (Controller, Device) => {
    "use strict";
    return Controller.extend("com.sap.demokitmtable.controller.9ContextualWidth-Static", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        onNavBack:function(){
            this.oRouter.navTo("RouteView8");
        },
        onPressNext:function(){
            this.oRouter.navTo("RouteView10");
        },
        onPress: function () {
			this.getView().byId("idContextualWidthStaticTable").setContextualWidth("100px");
		},
        onSetBackWidth: function () {
			this.getView().byId("idContextualWidthStaticTable").setContextualWidth("500px");
		}
    });
});