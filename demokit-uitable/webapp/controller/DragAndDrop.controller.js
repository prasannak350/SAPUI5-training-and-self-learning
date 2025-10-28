sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/table/RowSettings"
], (Controller, RowSettings) => {
    "use strict";

    return Controller.extend("com.sap.demokituitable.controller.DragAndDrop", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();

        },
        onNavBack : function(){
            this.oRouter.navTo("RouteView8");
        },


        //didn't understand the functionality properly from the demo kit
        onDragStart: function(oEvent) {
			var oDraggedRow = oEvent.getParameter("target");
			var oDragSession = oEvent.getParameter("dragSession");

			// keep the dragged row context for the drop action
			oDragSession.setComplexData("draggedRowContext", oDraggedRow.getBindingContext());
		},
       
    });
});