sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], (Controller, Fragment) => {
    "use strict";
    return Controller.extend("com.sap.demokitmtable.controller.4FixedVsAuto-Layout", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
           
        },
        onNavBack:function(){
            this.oRouter.navTo("RouteView3");
        },
        onPressNext:function(){
            this.oRouter.navTo("RouteView5");
        },
        onCheckBoxSelect : function(oEvent){
            var bFixedLayout = oEvent.getParameter("selected");
            var oTable = oEvent.getSource().getParent().getParent(); // to acces the table in the fragment as well 
            // var oTable = this.getView().byId("idCategoryNewTable");
            oTable.setFixedLayout(bFixedLayout);
        },
        onOpenPressed : function(oEvent){
            var oView = this.getView();
			if (!this._pDialog) {
				this._pDialog = Fragment.load({
					id: oView.getId(),
					name: "com.sap.demokitmtable.fragments.Dialog",
					controller: this
				}).then(function(oDialog){
					oView.addDependent(oDialog);
					return oDialog;
				});
			}

			this._pDialog.then(function(oDialog){
				oDialog.open();
			});
        },
        onClosePressed: function(){
            this._pDialog.then(function(oDialog){
				oDialog.close();
			});
        }
        
    });
});