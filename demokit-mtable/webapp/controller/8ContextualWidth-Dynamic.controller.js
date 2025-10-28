sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device"
], (Controller, Device) => {
    "use strict";
    return Controller.extend("com.sap.demokitmtable.controller.8ContextualWidth-Dynamic", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        onNavBack:function(){
            this.oRouter.navTo("RouteView7");
        },
        onPressNext:function(){
            this.oRouter.navTo("RouteView9");
        },
        onBeforeRendering: function () {
			if (Device.system.phone) {
				Device.orientation.attachHandler(this._orientationHandler, this);
				if (Device.orientation.portrait) {
					this._showMessageStrip(false);
				} else {
					this._showMessageStrip(true);
				}
			}
		},
        _orientationHandler: function (mParams) {
			if (mParams.landscape) {
				this._showMessageStrip(true);
			} else {
				this._showMessageStrip(false);
			}
		},
        _showMessageStrip: function (bShow) {
			var oMessageStrip = this.getView().byId("idMessageStrip");
			oMessageStrip.setVisible(bShow);
		},
        onExit: function () {
			Device.orientation.detachHandler(this._orientationHandler, this);
		}
    });
});