sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/table/RowSettings"
], (Controller, RowSettings) => {
    "use strict";

    return Controller.extend("com.sap.demokituitable.controller.RowHighlights", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();

            // this is not working properly

            // var oModel = this.getOwnerComponent().getModel();
            // var oTable = this.getView().byId("RowHighlights");

            // //wait for the odata model to finish loading data
            // oModel.attachRequestCompleted(function(){
            //     var oBinding = oTable.getBinding("rows");
            //     this.formatHighlight();
            //     if(oBinding){
            //         var aContexts = oBinding.getCurrentContexts();
            //         aContexts.map(function(oContext){
            //             var aDiscontinuedValue =  oContext.getObject().Discontinued;
            //             if(aDiscontinuedValue == true){
            //                 this.byId("RowHighlights").setRowSettingsTemplate(new RowSettings({
            //                     highlight: "Success"
            //                 }))
            //             }
            //             else{
            //                 this.byId("RowHighlights").setRowSettingsTemplate(new RowSettings({
            //                     highlight: "Error"
            //                 }))
            //             }
            //         })
            //     }
            // })


            // if(this.getView().byId("idDiscontinued").getText()=="True"){
            //     this.byId("RowHighlights").setRowSettingsTemplate(new RowSettings({
            //         highlight: "Success"
            //     }))
            // }
            // else{
            //     this.byId("RowHighlights").setRowSettingsTemplate(new RowSettings({
            //         highlight: "Error"
            //     }))
            // }
        },

        // other way to format highlight property
        formatHighlight: function(bDiscontinued){
            if(bDiscontinued){
                return "Success"
            }
            else{
                return "Error"
            }
        },
        onNavBack : function(){
            this.oRouter.navTo("RouteView7");
        },
        onPressNext: function(){
            this.oRouter.navTo("RouteView9");
        },
        onHighlightToggle: function(oEvent) {
			var oTable = this.byId("RowHighlights");
			var oToggleButton = oEvent.getSource();

			if (oToggleButton.getPressed()) {
				oTable.setRowSettingsTemplate(new RowSettings({
                    highlight:{
                        path: "Discontinued",
                        formatter : this.formatHighlight
                    }
				}));
			} else {
				oTable.setRowSettingsTemplate(null);
			}
		},
        onAlternateToggle: function(oEvent) {
			this.byId("RowHighlights").setAlternateRowColors(oEvent.getParameter("pressed"));
		},
        onSelectionModeChange: function(oEvent) {
			var oTable = this.byId("RowHighlights");
			var sKey = oEvent.getParameter("selectedItem").getKey();

			oTable.setSelectionMode(sKey);
		}
       
    });
});