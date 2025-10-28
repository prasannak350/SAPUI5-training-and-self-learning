sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/Device",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
	"sap/m/Menu",
	"sap/m/MenuItem",
	"sap/m/MessageToast"
], (Controller, Fragment, Device, Sorter, Filter, Menu, MenuItem, MessageToast) => {
    "use strict";
    return Controller.extend("com.sap.demokitmtable.controller.6Table-ViewSettingsMenus", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();

			var oView = this.getView();
			Fragment.load({
				id: this.getView().getId(),
				name: "com.sap.demokitmtable.fragments.ColumnMenu",
				controller: this
			}).then(function(oMenu) {
				oView.addDependent(oMenu);
				return oMenu;
			});

            // Keeps reference to any of the created sap.m.ViewSettingsDialog-s in this sample
			this._mViewSettingsDialogs = {};
			this.mGroupFunctions = {
				SupplierID: function(oContext) {
					var name = oContext.getProperty("SupplierID");
					return {
						key: name,
						text: name
					};
				},
				UnitPrice: function(oContext) {
					var price = oContext.getProperty("UnitPrice");
					var key, text;
					if (price <= 20) {
						key = "LE20";
						text = "20 " + " or less";
					} else if (price <= 40) {
						key = "BT20-40";
						text = "Between 20 and 40 ";
					} else {
						key = "GT40";
						text = "More than 40 ";
					}
					return {
						key: key,
						text: text
					};
				}
			};
           
        },
        onNavBack:function(){
            this.oRouter.navTo("RouteView5");
        },
        onPressNext:function(){
            this.oRouter.navTo("RouteView7");
        },
        getViewSettingsDialog: function (sDialogFragmentName) {
			var pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

			if (!pDialog) {
				pDialog = Fragment.load({
					id: this.getView().getId(),
					name: sDialogFragmentName,
					controller: this
				}).then(function (oDialog) {
					if (Device.system.desktop) {
						oDialog.addStyleClass("sapUiSizeCompact");
					}
					return oDialog;
				});
				this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
			}
			return pDialog;
		},
        handleSortButtonPressed: function () {
			this.getViewSettingsDialog("com.sap.demokitmtable.fragments.SortDialog")
				.then(function (oViewSettingsDialog) {
					oViewSettingsDialog.open();
				});
		},
        handleSortDialogConfirm: function (oEvent) {
			var oTable = this.byId("idViewSettingsMenusTable"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				aSorters = [];

			sPath = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));

			// apply the selected sort and group settings
			oBinding.sort(aSorters);
		},
        handleFilterButtonPressed: function () {
			this.getViewSettingsDialog("com.sap.demokitmtable.fragments.FilterDialog")
				.then(function (oViewSettingsDialog) {
					oViewSettingsDialog.open();
				});
		},
        handleFilterDialogConfirm: function (oEvent) {
			var oTable = this.byId("idViewSettingsMenusTable"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				aFilters = [];

			mParams.filterItems.forEach(function(oItem) {
				var aSplit = oItem.getKey().split("___"),
					sPath = aSplit[0],
					sOperator = aSplit[1],
					sValue1 = aSplit[2],
					sValue2 = aSplit[3],
					oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
				aFilters.push(oFilter);
			});

			// apply filter settings
			oBinding.filter(aFilters);

			// update filter bar
			this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
			this.byId("vsdFilterLabel").setText(mParams.filterString);
		},

		handleGroupButtonPressed: function(){
			this.getViewSettingsDialog("com.sap.demokitmtable.fragments.GroupDialog")
				.then(function (oViewSettingsDialog) {
					oViewSettingsDialog.open();
				});
		},
		handleGroupDialogConfirm: function (oEvent) {
			var oTable = this.byId("idViewSettingsMenusTable"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				vGroup,
				aGroups = [];

			if (mParams.groupItem) {
				sPath = mParams.groupItem.getKey();
				bDescending = mParams.groupDescending;
				vGroup = this.mGroupFunctions[sPath];
				aGroups.push(new Sorter(sPath, bDescending, vGroup));
				// apply the selected group settings
				oBinding.sort(aGroups);
			} else if (this.groupReset) {
				oBinding.sort();
				this.groupReset = false;
			}
		},
		resetGroupDialog: function(oEvent){
			this.groupReset =  true;
		},

		// when you right click on any of the cells in the table, then this appears
		onToggleContextMenu: function (oEvent) {
			var oToggleButton = oEvent.getSource();
			if (oEvent.getParameter("pressed")) {
				oToggleButton.setTooltip("Disable Custom Context Menu");
				this.byId("idViewSettingsMenusTable").setContextMenu(new Menu({
					items: [
						new MenuItem({text: "{ProductName}"}),
						new MenuItem({text: "{ProductID}"})
					]
				}));
			} else {
				oToggleButton.setTooltip("Enable Custom Context Menu");
				this.byId("idViewSettingsMenusTable").destroyContextMenu();
			}
		},

		onSortChange: function(oEvent) {
			const oTable = this.byId("idViewSettingsMenusTable");
			const oBinding = oTable.getBinding("items");
			const oQuickSortItem = oEvent.getParameter("item");

			if (oQuickSortItem.getSortOrder() === "None") {
				oBinding.sort();
			} else {
				oBinding.sort([new Sorter(oQuickSortItem.getKey(), oQuickSortItem.getSortOrder() === "Descending")]);
			}
		},

		onActionItemPress: function() {
			MessageToast.show('Action Item Pressed');
		}
    });
});