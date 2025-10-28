sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.sap.odatabinding.controller.View1", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        oRouter: null,
        onNext: function(sPath){
            //the path look like as element path /fruits/3, /fruits/4
            //Extract the id from the path ==> SPLIT text BY '/' INTO itab.
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            
            this.oRouter.navTo("RouteView2",{
                productId : sIndex
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
        
        onSearch: function(oEvent){
            //Step 1: get the 'query' parameter - The search query string.
            var sValue = oEvent.getParameter('query');
            var oFilter = new Filter("ProductName", FilterOperator.Contains, sValue);
            //Step 4: Get the binding of all the list item
            var oList = this.getView().byId("idList");
            var oBinding = oList.getBinding("items");
            //Step 5: Push the filter inside the binding
            oBinding.filter(oFilter);
        }
    });
});