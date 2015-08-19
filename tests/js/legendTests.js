/*!
Copyright 2015 OCAD University

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/gpii/universal/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    fluid.registerNamespace("gpii.tests.chartAuthoring");

    fluid.defaults("gpii.tests.chartAuthoring.pieChart.legend", {
        gradeNames: ["gpii.chartAuthoring.pieChart.legend", "autoInit"],
        legendOptions: {
            width: 200,
            height: 200,
            colors: ["#000000", "#ff0000", "#00ff00", "#0000ff", "#aabbcc", "#ccbbaa"]
        },
        listeners: {
            "onLegendCreated.addMouseoverListener": {
                listener: "{that}.addD3Listeners",
                args: ["{that}.dom.row", "mouseover", "gpii.tests.chartAuthoring.mouseOverListener"]
            }
        },
        members: {
            mouseOverListenerCalled: false
        }
    });

    // Necessary to get jQuery to return .css("background-color") value in hexadecimal
    // See http://stackoverflow.com/questions/6177454/can-i-force-jquery-cssbackgroundcolor-returns-on-hexadecimal-format
    $.cssHooks.backgroundColor = {
        get: function(elem) {
            if (elem.currentStyle)
                var bg = elem.currentStyle["backgroundColor"];
            else if (window.getComputedStyle)
                var bg = document.defaultView.getComputedStyle(elem,
                    null).getPropertyValue("background-color");
            if (bg.search("rgb") == -1)
                return bg;
            else {
                bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                function hex(x) {
                    return ("0" + parseInt(x).toString(16)).slice(-2);
                }
                return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
            }
        }
    }

    gpii.tests.chartAuthoring.objectArray = [{
        id: "id0",
        value: 15,
        label: "One"
    }, {
        id: "id1",
        value: 67,
        label: "Two"
    }, {
        id: "id2",
        value: 20,
        label: "Three"
    }, {
        id: "id3",
        value: 45,
        label: "Four"
    }];

    gpii.tests.chartAuthoring.objectArrayAdd = [{
        id: "id0",
        value: 15,
        label: "One"
    }, {
        id: "id1",
        value: 67,
        label: "Two"
    }, {
        id: "id2",
        value: 20,
        label: "Three"
    }, {
        id: "id3",
        value: 45,
        label: "Four"
    },
    {
        id: "id4",
        value: 26,
        label: "Five"
    }
  ];

  gpii.tests.chartAuthoring.objectArrayRemove = [{
      id: "id0",
      value: 15,
      label: "One"
  }, {
      id: "id1",
      value: 67,
      label: "Two"
  }, {
      id: "id2",
      value: 20,
      label: "Three"
  }
];

    gpii.tests.chartAuthoring.mouseOverListener = function (data, i, that) {
        that.mouseOverListenerCalled = true;
    };

    gpii.tests.chartAuthoring.validateLegend = function (that) {
        var table = that.locate("table");

        // Test the legend creation
        jqUnit.assertNotEquals("The TABLE element for the legend is created with the proper selector", 0, table.length);

        jqUnit.assertEquals("A TR element has been created for each value in the dataset, with proper selectors", that.model.dataSet.length, that.locate("row").length);

        var d3ColorCells = that.jQueryToD3($(that.locate("legendColorCell")));
        d3ColorCells.each(function (d, i) {
            jqUnit.assertEquals("The data colors are filled correctly in the legend", d.color, ($(this).css("background-color")));
        });

        var d3LabelCells = that.jQueryToD3($(that.locate("labelCell")));
        d3LabelCells.each(function (d, i) {
            jqUnit.assertEquals("The data labels are applied correctly in the legend", d.label, ($(this).html()));
        });

        var d3LabelCells = that.jQueryToD3($(that.locate("valueCell")));
        d3LabelCells.each(function (d, i) {
            jqUnit.assertEquals("The data values are applied correctly in the legend", d.value, ($(this).html()));
        });

    };

    jqUnit.test("Test the legend component created based off an array of objects, unsorted", function () {
        jqUnit.expect(42);

        var that = gpii.tests.chartAuthoring.pieChart.legend(".gpii-ca-legend-objects-unsorted", {
            model: {
                dataSet: gpii.tests.chartAuthoring.objectArray
            },
            legendOptions: {
              sort:false
            }
        });

        // Legend is created from dataset

        gpii.tests.chartAuthoring.validateLegend(that);

        // Legend is redrawn when data set changes

        // Item added to dataset

        that.applier.change("dataSet", gpii.tests.chartAuthoring.objectArrayAdd);
        gpii.tests.chartAuthoring.validateLegend(that);

        // Item removed from dataset

        that.applier.change("dataSet", gpii.tests.chartAuthoring.objectArrayRemove);
        gpii.tests.chartAuthoring.validateLegend(that);

    });

    jqUnit.test("Test the legend component created based off an array of objects, sorted", function () {
        jqUnit.expect(42);

        var that = gpii.tests.chartAuthoring.pieChart.legend(".gpii-ca-legend-objects-sorted", {
            model: {
                dataSet: gpii.tests.chartAuthoring.objectArray
            },
            legendOptions: {
              sort:true
            }
        });

        // Legend is created from dataset

        gpii.tests.chartAuthoring.validateLegend(that);

        // Legend is redrawn when data set changes

        // Item added to dataset

        that.applier.change("dataSet", gpii.tests.chartAuthoring.objectArrayAdd);
        gpii.tests.chartAuthoring.validateLegend(that);

        // Item removed from dataset

        that.applier.change("dataSet", gpii.tests.chartAuthoring.objectArrayRemove);
        gpii.tests.chartAuthoring.validateLegend(that);

    });


})(jQuery, fluid);
