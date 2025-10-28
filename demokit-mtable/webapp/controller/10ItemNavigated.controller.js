sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel"
], (Controller, Device, JSONModel) => {
    "use strict";
    return Controller.extend("com.sap.demokitmtable.controller.10ItemNavigated", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
			var oSettingsModel = new JSONModel({ navigatedItem: ""});
			this.getView().setModel(oSettingsModel, 'settings');
        },
        onNavBack:function(){
            this.oRouter.navTo("RouteView9");
        },
        onPressNext:function(){
            this.oRouter.navTo("RouteView11");
        },
        onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oBindingContext = oItem.getBindingContext();
			var oModel = this.getView().getModel();
			var oSettingsModel = this.getView().getModel('settings');
			oSettingsModel.setProperty("/navigatedItem", oModel.getProperty("ProductID", oBindingContext));
		},

		isNavigated: function(sNavigatedItemId, sItemId) {
			return sNavigatedItemId === sItemId;
		}
    });
});