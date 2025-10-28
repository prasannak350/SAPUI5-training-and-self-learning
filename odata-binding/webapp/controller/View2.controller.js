sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
     "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, MessageBox, MessageToast, Fragment, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.sap.odatabinding.controller.View2", {
        onInit() {
            //Step 1: get router object
            this.oRouter = this.getOwnerComponent().getRouter();
            //Step 2: register this route
            //We attach the RMH event to a new onRouteMatched function, also pass controller object
            //to that function
            this.oRouter.getRoute("RouteView2").attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched : function(oEvent){
            //Step 1: extract the id
            var sIndex = oEvent.getParameter("arguments").productId;
            //Step 2: Rebuild the path
            var sPath = "/" + sIndex;
            //Step 3: get the current view object
            var oView2 = this.getView();
            //Step 4: Bind the element
            oView2.bindElement(sPath,{
                expand: "Supplier"
            });
        },
        onBack: function(){
            this.oRouter.navTo("RouteView1");
        },
        onSave: function(){
            //alert("do you want to save");
            MessageBox.confirm("Do you want to save?",{
                onClose: function(status){
                    if(status === "OK"){
                        MessageToast.show("The Order has been created 👌");
                    }else{
                        MessageBox.error("OOPS!! you broke my heart 💔");
                    }
                }
            });
        }
    });
});