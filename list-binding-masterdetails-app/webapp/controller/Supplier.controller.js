sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
  ], (Controller, History) => {
    "use strict";
  
    return Controller.extend("com.sap.listbindingmasterdetailsapp.controller.Supplier", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("RouteView3").attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched : function(oEvent){
            //Step 1: extract the id
            var sIndex = oEvent.getParameter("arguments").suppId;
            //Step 2: Rebuild the path
            var sPath = "/supplier/" + sIndex;
            //Step 3: get the current view object
            var oSupplierView = this.getView();
            //Step 4: Bind the element
            oSupplierView.bindElement(sPath);
        },
        onBack: function(){
            //chaining in JS with same thing done to use parent to nav to view1
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView2", {
                    fruitId: 0
                }, true);
            }
        },
    });
  });