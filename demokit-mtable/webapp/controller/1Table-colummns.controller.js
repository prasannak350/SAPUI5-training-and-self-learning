sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
	"sap/ui/model/json/JSONModel"
], (Controller, mobileLibrary,JSONModel) => {
    "use strict";
    var PopinLayout = mobileLibrary.PopinLayout;
    return Controller.extend("com.sap.demokitmtable.controller.1Table-colummns", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();

        },
        onPressNext:function(){
            this.oRouter.navTo("RouteView2");
        },
        onPopinLayoutChanged: function() {
			var oTable = this.byId("idProductsTable");
			var oComboBox = this.byId("idPopinLayout");
			var sPopinLayout = oComboBox.getSelectedKey();
			switch (sPopinLayout) {
				case "Block":
					oTable.setPopinLayout(PopinLayout.Block);
					break;
				case "GridLarge":
					oTable.setPopinLayout(PopinLayout.GridLarge);
					break;
				case "GridSmall":
					oTable.setPopinLayout(PopinLayout.GridSmall);
					break;
				default:
					oTable.setPopinLayout(PopinLayout.Block);
					break;
			}
		},

        //Defines the section of the control that remains fixed at the top of the page during vertical scrolling
        onSelect: function(oEvent) {
			var bSelected = oEvent.getParameter("selected"),
				sText = oEvent.getSource().getText(),
				oTable = this.byId("idProductsTable"),
				aSticky = oTable.getSticky() || [];


			if (bSelected) {
				aSticky.push(sText);
			} else if (aSticky.length) {
				var iElementIndex = aSticky.indexOf(sText);
				aSticky.splice(iElementIndex, 1);
			}

			oTable.setSticky(aSticky);

			//extra
			if(this.getView().getModel("testModel")){
				this.getView().byId("testId").setVisible(true);
			}
			else{
				this.getView().byId("testId").setVisible(false);
			}
			this.clearOldvalues();
		},

        onToggleInfoToolbar: function(oEvent) {
			var oTable = this.byId("idProductsTable");
			oTable.getInfoToolbar().setVisible(!oEvent.getParameter("pressed"));

			// extra test code
			this.getView().getModel().read("/Products",{
				success: function (oData){
					this.getView().setModel(new sap.ui.model.json.JSONModel(oData), "testModel");
				}.bind(this)
			});

			
		},
		clearOldvalues: function(){
			this.getView().getModel("testModel").refresh(true);
		}


    });
});