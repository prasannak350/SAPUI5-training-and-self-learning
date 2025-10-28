sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Input"
], function (Controller, Input) {
    "use strict";

    return Controller.extend("com.sap.draganddrop.controller.List-DragAndDrop", {
        onInit: function () {
            this._oRouter = this.getOwnerComponent().getRouter()
            var oData = {
                items: [
                    { name: "Item 1", desc: "First item" },
                    { name: "Item 2", desc: "Second item" },
                    { name: "Item 3", desc: "Third item" }
                ]
            };
            var oModel = new sap.ui.model.json.JSONModel(oData);
            this.getView().setModel(oModel);

            var newData = {
                items: [
                    { name: "", desc: "" },
                    { name: "", desc: "" },
                    { name: "", desc: "" }
                ]
            };
            var oModel = new sap.ui.model.json.JSONModel(newData);
            this.getView().setModel(oModel, "TargetModel");
        },

        onDrop: function (oEvent) {
            var oDragged = oEvent.getParameter("draggedControl"),
                oDropped = oEvent.getParameter("droppedControl"),
                sDropPosition = oEvent.getParameter("dropPosition"),
                oList = oDropped.getParent(),
                oModel = oList.getModel(),
                aItems = oModel.getProperty("/items"),

                oDraggedItem = oDragged.getBindingContext().getObject(),
                oDroppedItem = oDropped.getBindingContext().getObject();

            // Remove dragged item
            var iDraggedIndex = aItems.indexOf(oDraggedItem);
            aItems.splice(iDraggedIndex, 1);

            // Insert at new position
            var iDroppedIndex = aItems.indexOf(oDroppedItem);
            if (sDropPosition === "After") {
                iDroppedIndex++;
            }
            aItems.splice(iDroppedIndex, 0, oDraggedItem);

            oModel.setProperty("/items", aItems);
        },

        // onDropToPanel: function (oEvent) {
        //     // get dragged list item
        //     var oDraggedItem = oEvent.getParameter("draggedControl");
        //     var sText = oDraggedItem.getTitle();

        //     // create new Input with dragged text
        //     var oVBox = this.byId("dropBox");
        //     var oInput = new Input({
        //         value: sText,
        //         width: "100%"
        //     });
        //     oVBox.addItem(oInput);
        // },

        // onDropToPanel: function (oEvent) {
		// 	var oDragged = oEvent.getParameter("draggedControl"),
		// 		oDropped = oEvent.getParameter("droppedControl"),
		// 		sInsertPosition = oEvent.getParameter("dropPosition"),

		// 		oDragContainer = oDragged.getParent(),
		// 		oDropContainer = oEvent.getSource().getParent(),

		// 		oDragModel = oDragContainer.getModel(),
		// 		oDropModel = oDropContainer.getModel(),
		// 		oDragModelData = oDragModel.getData(),
		// 		oDropModelData = oDropModel.getData(),

		// 		iDragPosition = oDragContainer.indexOfItem(oDragged),
		// 		iDropPosition = oDropContainer.indexOfItem(oDropped);

		// 	// remove the item
		// 	var oItem = oDragModelData[iDragPosition];
		// 	oDragModelData.splice(iDragPosition, 1);

		// 	if (oDragModel === oDropModel && iDragPosition < iDropPosition) {
		// 		iDropPosition--;
		// 	}

		// 	if (sInsertPosition === "After") {
		// 		iDropPosition++;
		// 	}

		// 	// insert the control in target aggregation
		// 	oDropModelData.splice(iDropPosition, 0, oItem);

		// 	if (oDragModel !== oDropModel) {
		// 		oDragModel.setData(oDragModelData);
		// 		oDropModel.setData(oDropModelData);
		// 	} else {
		// 		oDropModel.setData(oDropModelData);
		// 	}

		// 	this.byId("grid1").focusItem(iDropPosition);
		// },

        // onDropToPanel: function (oEvent) {
        //     sap.m.MessageToast.show("Drop triggered ");

        //     var oDragged = oEvent.getParameter("draggedControl");
        //     var sText = oDragged.getTitle();

        //     var oVBox = this.byId("dropBox");
        //     oVBox.addItem(new Input({ value: sText, width: "100%" }));
        // },

        onDropToList: function(oEvent){
            var oDragged = oEvent.getParameter("draggedControl");
        }
    });
});
