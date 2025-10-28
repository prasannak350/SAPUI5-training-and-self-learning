sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.sap.demokituitable.controller.Aggregations", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        onNavBack : function(){
            this.oRouter.navTo("RouteView1");
        },
        onPressNext: function(){
            this.oRouter.navTo("RouteView3");
        },

        // Important - filtering with two different data types
        handleTxtFilter: function(oEvent) {
			// var sQuery = oEvent.getParameter("query");
            // var oFilter2;

			// if (sQuery) {
            //     var oFilter1 = new Filter("ProductName", FilterOperator.Contains, sQuery);
            //     if(isFinite(sQuery)){
            //         oFilter2 = new Filter("ProductID", FilterOperator.EQ,+sQuery);
            //     }
            //     var aFilters = [];
            //     aFilters.push(new Filter({
            //         filters: [oFilter1,oFilter2],
            //         and: false
            //     }));
			// }
            // this.byId("aggregationTable").getBinding("rows").filter(aFilters);

            var sQuery = oEvent.getParameter("query");
            var aFilters=[];

			if (sQuery) {
                aFilters.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
                if(isFinite(sQuery)){
                    aFilters.push(new Filter("ProductID", FilterOperator.EQ, sQuery));
                }
                var oCombinedFilter = new Filter({
                    filters: aFilters,
                    and: false
                })
			}
            this.byId("aggregationTable").getBinding("rows").filter(oCombinedFilter);
		},
        clearFilters: function(oEvent){
            this.byId("aggregationTable").getBinding("rows").filter(null);
            this.byId("idSearchFiled").setValue("");
        },
        handleListClose: function(oEvent){
            // this is demokit code - a bit complex
            var oFacetFilter = this.byId("facetFilter").getLists();
            var aFacetFilterLists = oFacetFilter.filter(function(oList){
                return oList.getActive() && oList.getSelectedItems().length;
            })
            var newFilter = new Filter(aFacetFilterLists.map(function(oList){
                return new Filter(oList.getSelectedItems().map(function(oItem){
                    return new Filter(oList.getTitle(), FilterOperator.EQ, oItem.getText());
                }),false);
            }),true);
            this.byId("aggregationTable").getBinding("rows").filter(newFilter);

        },
        handleFacetFilterReset: function(oEvent){
            var aFacetFilterLists = this.byId("facetFilter").getLists();

			for (var i = 0; i < aFacetFilterLists.length; i++) {
				aFacetFilterLists[i].setSelectedKeys();
			}
            this.byId("aggregationTable").getBinding("rows").filter(null);
        }
    });
});