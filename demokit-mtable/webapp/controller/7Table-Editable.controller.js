sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/base/util/deepExtend",
    'sap/m/ColumnListItem',
	'sap/m/Input',
	'sap/m/MessageToast'
], (Controller, deepExtend, ColumnListItem, Input, MessageToast) => {
    "use strict";
    return Controller.extend("com.sap.demokitmtable.controller.7Table-Editable", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();

            this.oModel = this.getOwnerComponent().getModel();
            this.getView().setModel(this.oModel);
            this.oTable = this.byId("idEditableTable");
            this.oReadOnlyTemplate = this.byId("idEditableTable").removeItem(0);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
			this.oEditableTemplate = new ColumnListItem({
				cells: [
					new Input({
						value: "{ProductName}"
					}), new Input({
						value: "{SupplierID}"
					}), new Input({
						value: "{Discontinued}"
					}), new Input({
						value: "{UnitPrice}"
					})
				]
			});
        },
        onNavBack:function(){
            this.oRouter.navTo("RouteView6");
        },
        onPressNext:function(){
            this.oRouter.navTo("RouteView8");
        },
        
		// removed the binding in XMl and added it here 
        rebindTable: function(oTemplate, sKeyboardMode) {
			this.oTable.bindItems({
				path: "/Products",
				template: oTemplate,
				templateShareable: true,
				key: "ProductID"
			});
		},

        onEdit: function() {
			var allProducts = [];
			for(var key in this.oModel.oData){
					allProducts.push(this.oModel.oData[key]);
			}
			// this.aProductCollection = deepExtend([], this.oModel.getProperty("/Products"));
			this.aProductCollection = deepExtend([], allProducts);
			this.byId("editButton").setVisible(false);
			this.byId("saveButton").setVisible(true);
			this.byId("cancelButton").setVisible(true);
			this.rebindTable(this.oEditableTemplate, "Edit");
		},

		onCancel: function(){
			this.byId("cancelButton").setVisible(false);
			this.byId("saveButton").setVisible(false);
			this.byId("editButton").setVisible(true);
			this.oModel.setProperty("/Products", this.aProductCollection);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
		},

		onSave: function() {
			this.byId("saveButton").setVisible(false);
			this.byId("cancelButton").setVisible(false);
			this.byId("editButton").setVisible(true);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
		},

		onOrder: function() {
			MessageToast.show("Order button pressed");
		},

		onExit: function() {
			this.aProductCollection = [];
			this.oEditableTemplate.destroy();
			this.oModel.destroy();
		},

		onPaste: function(oEvent) {
			var aData = oEvent.getParameter("data");
			MessageToast.show("Pasted Data: " + aData);
		}

    });
});