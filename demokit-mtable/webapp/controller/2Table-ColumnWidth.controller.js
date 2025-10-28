sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/base/util/deepExtend",
    "sap/ui/model/json/JSONModel"
], (Controller, deepExtend, JSONModel) => {
    "use strict";
    return Controller.extend("com.sap.demokitmtable.controller.2Table-ColumnWidth", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oColumnModel = new JSONModel();
			this.oColumnModel.setData(this.oData);

            var oCloneData = deepExtend([], this.oData);
            // var oCloneData = this.oData;            //if we use this then width wouldn't be changed to 30% for the second table
			oCloneData[0].width = "auto";
			this.oColumnModelClone = new JSONModel();
			this.oColumnModelClone.setData(oCloneData);

			this.getView().setModel(this.oColumnModel, "columns");
			this.getView().setModel(this.oColumnModelClone, "clone");
        },
        onNavBack:function(){
            this.oRouter.navTo("RouteView1");
        },
        onPressNext:function(){
            this.oRouter.navTo("RouteView3");
        },
        oData : [{
            width: "30%",
            header: "Category Name",
            demandPopin: false,
            minScreenWidth: "",
            styleClass: "cellBorderLeft cellBorderRight"
        }, {
            width: "20%",
            header: "CategoryID",
            demandPopin: false,
            minScreenWidth: "",
            styleClass: "cellBorderRight"
        }, {
            width: "50%",
            header: "Description",
            demandPopin: true,
            minScreenWidth: "Tablet",
            styleClass: "cellBorderRight"
        }
        ],

        onCheckBoxSelect: function (oEvent) {
			var bStrictLayout = oEvent.getParameter("selected");
			this.byId("idCategoryTable").setFixedLayout(bStrictLayout ? "Strict" : true);
		},
    });
});