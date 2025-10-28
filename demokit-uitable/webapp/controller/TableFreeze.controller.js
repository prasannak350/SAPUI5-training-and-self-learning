sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("com.sap.demokituitable.controller.TableFreeze", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        onNavBack : function(){
            this.oRouter.navTo("RouteView3");
        },
        onPressNext: function(){
            this.oRouter.navTo("RouteView5");
        },
        buttonPress: function(oEvent){
            var oView = this.getView(),
				oTable = oView.byId("tableFreeze"),
				sColumnCount = oView.byId("inputColumn").getValue() || 0,
				sRowCount = oView.byId("inputRow").getValue() || 0,
				sBottomRowCount = oView.byId("inputButtomRow").getValue() || 0,
				iColumnCount = parseInt(sColumnCount),
				iRowCount = parseInt(sRowCount),
				iBottomRowCount = parseInt(sBottomRowCount),
				iTotalColumnCount = oTable.getColumns().length,
				iTotalRowCount = oTable.getRows().length;

            // Fixed column count exceeds the total column count
            if (iColumnCount > iTotalColumnCount) {
                iColumnCount = iTotalColumnCount;
                oView.byId("inputColumn").setValue(iTotalColumnCount);
                MessageToast.show("Fixed column count exceeds the total column count. Value in column count input got updated.");
            }

            // Sum of fixed row count and bottom row count exceeds the total row count
			if (iRowCount + iBottomRowCount > iTotalRowCount) {

				if ((iRowCount < iTotalRowCount) && (iBottomRowCount < iTotalRowCount)) {
					// both row count and bottom count smaller than total row count
					iBottomRowCount = 1;
				} else if ((iRowCount > iTotalRowCount) && (iBottomRowCount < iTotalRowCount)) {
					// row count exceeds total row count
					iRowCount = iTotalRowCount - iBottomRowCount - 1;
				} else if ((iRowCount < iTotalRowCount) && (iBottomRowCount > iTotalRowCount)) {
					// bottom row count exceeds total row count
					iBottomRowCount = iTotalRowCount - iRowCount - 1;
				} else {
					// both row count and bottom count exceed total row count
					iRowCount = 1;
					iBottomRowCount = 1;
				}

				// update inputs
				oView.byId("inputRow").setValue(iRowCount);
				oView.byId("inputButtomRow").setValue(iBottomRowCount);
				MessageToast.show("Sum of fixed row count and buttom row count exceeds the total row count. Input values got updated.");
			}

            oTable.setFixedColumnCount(iColumnCount);
			oTable.setFixedRowCount(iRowCount);
			oTable.setFixedBottomRowCount(iBottomRowCount);
        }
    });
});