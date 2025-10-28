sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("com.sap.demokituitable.controller.Resizing", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
            var oJSONModel = new sap.ui.model.json.JSONModel({
                visibleRowCountMode: "Fixed"
            });
            this.getView().setModel(oJSONModel, "menuPanel");
            this.onColumnWidthsChange();
            this._messageBuffer = [];
        },
        onNavBack : function(){
            this.oRouter.navTo("RouteView4");
        },
        onPressNext: function(){
            this.oRouter.navTo("RouteView6");
        },
        onColumnWidthsChange: function(oEvent) {
			var sColumnWidthMode = oEvent ? oEvent.getParameter("item").getKey() : "Static";
			var oWidthData;

			if (sColumnWidthMode == "Flexible") {
				oWidthData = {
					productName: "25%",
					Id: "25%",
					shipperName: "15%",
					quantity: "10%",
					price: "25%"
				};
			} else {
				oWidthData = {
					productName: sColumnWidthMode == "Mixed" ? "20%" : "13rem",
					Id: "11rem",
					shipperName: "7rem",
					quantity: "6rem",
					price: "9rem"
				};
			}

			this.getView().getModel("menuPanel").setProperty("/widths", oWidthData);
		},
        onColumnResize: function(oEvent) {
			var oColumn = oEvent.getParameter("column");

			if (this.byId("ResizingUnitPrice") == oColumn) {
				oEvent.preventDefault();
			} else {
				this._messageBuffer.push("Column '" + oColumn.getLabel().getText() + "' was resized to " + oEvent.getParameter("width") + ".");
				if (this._messageTimer) {
					clearTimeout(this._messageTimer);
				}
				this._messageTimer = setTimeout(function() {
					MessageToast.show(this._messageBuffer.join("\n"));
					// this._messageBuffer = [];
					this._messageTimer = null;
				}.bind(this), 50);
			}
		}
    });
});