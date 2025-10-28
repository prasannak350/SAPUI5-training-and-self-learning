sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/sap/listbindingmasterdetailsapp/util/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Formatter,Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.sap.listbindingmasterdetailsapp.controller.View1", {
        formatter: Formatter,
        onInit() {
            ///Now getting Component object
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        //Created a blank object to hold my router object when we reach to this view
        oRouter: null,
        onNext: function(sPath){
            //the path look like as element path /fruits/3, /fruits/4
            //Extract the id from the path ==> SPLIT text BY '/' INTO itab.
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            
            this.oRouter.navTo("RouteView2",{
                fruitId : sIndex
            });
        },
        onItemPress: function(oEvent){
            //Step 1: Get the object of the list item = Source Control (List) => Table Row
            var oListItem = oEvent.getParameter("listItem");
            //Step 2: Get the address of the element on which user perform the click
            var sPath = oListItem.getBindingContextPath();
            //Call the code for navigation
            this.onNext(sPath);
        },
        // the below function is used when the mode is set to "MultiSelect" in the view
        onDeleteItems: function(oEvent){
            //get the list control
            var oList = this.getView().byId("idList");
            ///Get all the items which are selected
            var aSelected = oList.getSelectedItems();                
            ///Loop at each item and delete
            aSelected.forEach(element => {
                oList.removeItem(element);
            });
        },
        // the below function is used when the mode is set to "Delete" view
        onItemDelete: function(oEvent){
            ///Get the object of the item
            var oListItemToBeDeleted = oEvent.getParameter("listItem");
            ///Get the source object
            var oList = oEvent.getSource();
            ///Delete the item now
            oList.removeItem(oListItemToBeDeleted);

        },
        onSearch: function(oEvent){
            //Step 1: get the 'query' parameter - The search query string.
            var sValue = oEvent.getParameter('query');
            //Step 2: Build a filter object - is like a IF condition
            //        IF  op1 (name) OPERATOR (Contains)  op2 (sValue)
            var oFilter1 = new Filter("name", FilterOperator.Contains, sValue);
            var oFilter2 = new Filter("taste", FilterOperator.Contains, sValue);
            //Step 3: Create Array
            var aFilter = [oFilter1, oFilter2];
            ////IF condition1 LOGICALOPERATOR condition2 => AND / OR
            var oFilter = new Filter({
                filters : aFilter,
                and: false
            });
            //Step 4: Get the binding of all the list item
            var oList = this.getView().byId("idList");
            var oBinding = oList.getBinding("items");
            //Step 5: Push the filter inside the binding
            oBinding.filter(oFilter);
        }
    });
});