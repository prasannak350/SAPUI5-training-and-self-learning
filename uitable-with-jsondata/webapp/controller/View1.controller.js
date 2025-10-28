sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.sap.uitablewithjsondata.controller.View1", {
        onInit() {
            var oModel = new sap.ui.model.json.JSONModel("model/mydata.json");
            this.getView().setModel(oModel);
            //sample model
            var oModel2 = new sap.ui.model.json.JSONModel("model/sampledata.json");
            this.getView().setModel(oModel2,"SampleModel");
            //Perform the binding - obvious that we pass a path
            this.getView().byId("idSalary").bindValue("/empStr/salary");
            //for property binding with generic function
            this.getView().byId("idCurrency").bindProperty("value","/empStr/currency");
        },
        onExit : function(){
            //here goes my clean-up code
        },
        onBeforeRendering: function(){
            //pre-processing logic
            // var empName = this.getView().byId("idEmpName").getValue();
            // if(empName === ""){
            //     this.getView().byId("idSalary").setEnabled(false);
            // }
        },
        onAfterRendering: function(){
            $("#View1--idSimpleForm").fadeOut(3000).fadeIn(3000);
        },
        onGetValue: function(){
            var sData = this.getView().getModel().getProperty("/empStr");
            console.log(sData);
        },
        onSetValue: function(){
            //Step 1: get the model object
            var oModel = this.getView().getModel();
            //Step 2: change the data inside model
            oModel.setProperty("/empStr",{
                "empId": 5555,
                "empName": "Robin",
                "salary": 14500,
                "currency": "EUR",
                "smoker": false
            });
        },
        onFlipFlop: function(){
            var oModel = this.getView().getModel();
            var oModelSample = this.getView().getModel("SampleModel");
            this.getView().setModel(oModelSample);
            this.getView().setModel(oModel, "SampleModel");
        },
    });
});