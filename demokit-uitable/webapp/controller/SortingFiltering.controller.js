sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Sorter",
    "sap/ui/core/format/DateFormat",
    "sap/ui/table/library",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, Sorter, DateFormat, library, Filter, FilterOperator) => {
    "use strict";
    // shortcut for sap.ui.table.SortOrder
    var SortOrder = library.SortOrder;

    return Controller.extend("com.sap.demokituitable.controller.SortingFiltering", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        // to stop the scrolling of the page
        // onPageScroll : function(oEvent){
        //     oEvent.getSource().setFirstVisibleRow(0);
        // },
        onPressNext: function(){
            this.oRouter.navTo("RouteView2");
        },
        clearAllSortings: function(oEvent){
            var oTable = this.getView().byId("table");
            // to remove the sortings
            oTable.getBinding().sort(null);
            //to set the sorted symbol to false
            this._resetSortingState();
        },
        _resetSortingState: function() {
			var oTable = this.byId("table");
			var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				aColumns[i].setSorted(false);
			}
		},
        sortCities: function(oEvent) {
			var oView = this.getView();
			var oTable = oView.byId("table");
			var oCitiesColumn = oView.byId("city");

			oTable.sort(oCitiesColumn, this._bSortColumnDescending ? SortOrder.Descending : SortOrder.Ascending, /*extend existing sorting*/true);
			this._bSortColumnDescending = !this._bSortColumnDescending;
		},
        sortCitiesAndName: function(oEvent) {
			var oView = this.getView();
			var oTable = oView.byId("table");
			oTable.sort(oView.byId("city"), SortOrder.Ascending, false);
			oTable.sort(oView.byId("name"), SortOrder.Ascending, true);
		},
        sortOrderDate: function(oEvent){
            var oCurrentColumn = oEvent.getParameter("column");
			var oOrderDateColumn = this.byId("orderDate");
			if (oCurrentColumn != oOrderDateColumn) {
				oOrderDateColumn.setSorted(false); //No multi-column sorting
				return;
			}

			oEvent.preventDefault();

			var sOrder = oEvent.getParameter("sortOrder");
			var oDateFormat = DateFormat.getDateInstance({pattern: "dd/MM/yyyy"});

			this._resetSortingState(); //No multi-column sorting
			oOrderDateColumn.setSorted(true);
			oOrderDateColumn.setSortOrder(sOrder);

			var oSorter = new Sorter(oOrderDateColumn.getSortProperty(), sOrder === SortOrder.Descending);
			//The date data in the JSON model is string based. For a proper sorting the compare function needs to be customized.
            // I didn't get this code properly
			oSorter.fnCompare = function(a, b) {
				if (b == null) {
					return -1;
				}
				if (a == null) {
					return 1;
				}

				var aa = oDateFormat.parse(a).getTime();
				var bb = oDateFormat.parse(b).getTime();

				if (aa < bb) {
					return -1;
				}
				if (aa > bb) {
					return 1;
				}
				return 0;
			};

			this.byId("table").getBinding().sort(oSorter);
        },

        // filtering code
        filterGlobally: function(oEvent){
            var sQuery = oEvent.getParameter("query");
            if(sQuery){
               var oFilter = new Filter([
                                new Filter("ProductName", FilterOperator.Contains, sQuery),
                                new Filter("City", FilterOperator.Contains, sQuery)
                            ], false);
            }
            this.byId("table").getBinding().filter(oFilter);
        },
        clearAllFilters : function(){
            var oTable = this.byId("table");
            var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				oTable.filter(aColumns[i], null);
			}
        },
        toggleCityFilter: function(oEvent){
            this.byId("city").filter(oEvent.getParameter("pressed") ? "Berlin" : "");
        },
        filterPrice : function(oEvent){
            var oColumn = oEvent.getParameter("column");
			if (oColumn != this.byId("unitPrice")) {
				return;
			}

			oEvent.preventDefault();
            var sValue = oEvent.getParameter("value");
            // converting the string to float value
            var fValue = parseFloat(sValue);
            if(fValue){
                var oFilter = new Filter("UnitPrice", FilterOperator.BT, fValue - 1, fValue + 1);
            }
            this.byId("table").getBinding().filter(oFilter);
        }
    });
});