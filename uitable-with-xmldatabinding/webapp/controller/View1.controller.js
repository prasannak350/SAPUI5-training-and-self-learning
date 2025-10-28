sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/sap/uitablewithxmldatabinding/util/lifeSaver"
], (Controller, lifeSaver) => {
    "use strict";

    return Controller.extend("com.sap.uitablewithxmldatabinding.controller.View1", {
        formatter: lifeSaver,
        onInit() {
            var oModelXml = new sap.ui.model.xml.XMLModel("model/testdata.xml");
            this.getView().setModel(oModelXml);
            var oModel2 = new sap.ui.model.json.JSONModel("model/sampledata.json");
            this.getView().setModel(oModel2,"SampleModel");
        },
        onFlipFlop: function(){
            var oModel = this.getView().getModel();
            var oModelSample = this.getView().getModel("SampleModel");
            this.getView().setModel(oModelSample);
            this.getView().setModel(oModel, "SampleModel");
        },
        onRowSelect: function(oEvent){
            //somehow get the address of the element of selected row
            ///Step 1: Extract the path of the element from incoming event object
            var sPath = oEvent.getParameter("rowContext").getPath();
            //Step 2: get the simple form object
            var oSimpleForm = this.getView().byId("idSimpleForm");
            //Step 3: bind the element - element binding
            oSimpleForm.bindElement(sPath);
        },
        xmlModel: true,
        onFlipFlop: function(){
            var oModelXml = this.getView().getModel();
            var oModelSample = this.getView().getModel("SampleModel");
            this.getView().setModel(oModelSample);
            this.getView().setModel(oModelXml, "SampleModel");
            if(this.xmlModel === true){
                this.getView().byId("idTable").bindRows("/empTable");
                this.xmlModel = false;
            }else{
                this.getView().byId("idTable").bindRows("/empTable/rows");
                this.xmlModel = true;
            }
            
            
        },
    });
});