sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], (Controller, MessageBox, MessageToast) => {
    "use strict";

    return Controller.extend("com.sap.listcontrols.controller.View2", {
        onInit() {
        },
        onBack: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView1");
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