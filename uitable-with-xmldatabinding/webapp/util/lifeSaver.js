sap.ui.define(["sap/ui/core/format/NumberFormat"], function(NumberFormat){
    return {
        //here this is a reusable function
        convertName: function(inp){
            if(inp){
                return inp.toUpperCase();
            }
        },
        formatSalary: function(amt, curr){
            var oCurrencyFormat = NumberFormat.getCurrencyInstance({
                currencyCode: false
            });

            return oCurrencyFormat.format(amt, curr); // output: EUR 12,345.68
        }
    };
});