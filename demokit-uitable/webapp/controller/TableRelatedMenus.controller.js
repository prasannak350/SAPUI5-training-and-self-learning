sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/unified/Menu",
	"sap/ui/unified/MenuItem",
    "sap/ui/core/Popup",
    "sap/m/table/columnmenu/Menu",
	"sap/m/table/columnmenu/ActionItem",
    "sap/m/Menu",
	"sap/m/MenuItem"
], (Controller, MessageToast, Menu, MenuItem, Popup, ColumnMenu, ActionItem, MenuM, MenuItemM) => {
    "use strict";

    return Controller.extend("com.sap.demokituitable.controller.TableRelatedMenus", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
            var oJSONModel = new sap.ui.model.json.JSONModel({
                showVisibilityMenuEntry: false,
				showFreezeMenuEntry: false,
				enableCellFilter: false
            });
            this.getView().setModel(oJSONModel, "menuPanel");
        },
        onNavBack : function(){
            this.oRouter.navTo("RouteView2");
        },
		onPressNext: function(){
            this.oRouter.navTo("RouteView4");
        },
        onColumnSelect : function(oEvent){
            var oCurrentColumn = oEvent.getParameter("column");
			var oShipperColumn = this.byId("tableShipperName");
			if (oCurrentColumn === oShipperColumn) {
				MessageToast.show("Column header " + oCurrentColumn.getLabel().getText() + " pressed.");
			}
        },
        onProductIdCellContextMenu: function(oEvent){
            if (oEvent.getParameter("columnId") != this.getView().createId("tableProdId")) {
				return; //Custom context menu for product id column only
			}

			oEvent.preventDefault();

			var oRowContext = oEvent.getParameter("rowBindingContext");

			if (!this._oIdContextMenu) {
				this._oIdContextMenu = new Menu();
				this.getView().addDependent(this._oIdContextMenu);
			}

			this._oIdContextMenu.destroyItems();
			this._oIdContextMenu.addItem(new MenuItem({
				text: "My Custom Cell Action",
				select: function() {
					MessageToast.show("Context action triggered on Column 'Product ID' on id '" + oRowContext.getProperty("ProductID") + "'.");
				}
			}));

            //Open the menu on the cell
			var oCellDomRef = oEvent.getParameter("cellDomRef");
			var eDock = Popup.Dock;
			this._oIdContextMenu.open(false, oCellDomRef, eDock.BeginTop, eDock.BeginBottom, oCellDomRef, "none none");
        },
        onSwitchHeaderMenu : function(oEvent){
            var bUseHeaderMenu = oEvent.getSource().getState();

			if (bUseHeaderMenu) {
				this.oMenu = new ColumnMenu();
				this.byId("tableProdName").setHeaderMenu(this.oMenu.getId());
				this.byId("tableProdId").setHeaderMenu(this.oMenu.getId());

				this.oCustomMenu = new ColumnMenu({
					items: [
						new ActionItem({
							label: "My custom menu entry",
							press: [function(oEvent) {
								this.onQuantityCustomItemSelect(oEvent);
							}, this]
						}),
						new ActionItem({
							label: "Sort",
							icon: "sap-icon://sort",
							press: [function(oEvent) {
								this.onQuantitySort(oEvent);
							}, this]
						})
					]
				});
				this.byId("tableQuantity").setHeaderMenu(this.oCustomMenu.getId());
			} else {
				this.byId("tableProdName").setHeaderMenu(null);
				this.byId("tableProdId").setHeaderMenu(null);
				this.byId("tableQuantity").setHeaderMenu(null);
			}
        },
        onQuantityCustomItemSelect: function(oEvent) {
			MessageToast.show("Some custom action triggered on column 'Quantity'.");
		},
        onQuantitySort: function(oEvent) {
			var bAdd = oEvent.getParameter("ctrlKey") === true;
			var oColumn = this.byId("tableQuantity");
			var sOrder = oColumn.getSortOrder() == "Ascending" ? "Descending" : "Ascending";

			this.byId("tableMenus").sort(oColumn, sOrder, bAdd);
		},
        onToggleContextMenu : function(oEvent){
            if (oEvent.getParameter("pressed")) {
				this.byId("tableMenus").setContextMenu(new MenuM({
					items: [
						new MenuItemM({text: "{ProductName}"}),
						new MenuItemM({text: "{ProductID}"})
					]
				}));
			} else {
				this.byId("tableMenus").destroyContextMenu();
			}
        },
        onColumnMenuOpen : function(oEvent){
            var oCurrentColumn = oEvent.getSource();
			var oShipperColumn = this.byId("tableShipperName");
			if (oCurrentColumn != oShipperColumn) {
				return;
			}

			//Just skip opening the column Menu on column "Image"
			oEvent.preventDefault();
        }
    });
});