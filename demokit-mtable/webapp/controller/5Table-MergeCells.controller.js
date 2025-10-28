sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], (Controller, Fragment) => {
    "use strict";
    return Controller.extend("com.sap.demokitmtable.controller.5Table-MergeCells", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
           
        },
        onNavBack:function(){
            this.oRouter.navTo("RouteView4");
        },
        onPressNext:function(){
            this.oRouter.navTo("RouteView6");
        },
        
    });
});