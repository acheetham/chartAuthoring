/*!
Copyright 2015 OCAD University

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/gpii/universal/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    fluid.registerNamespace("gpii.tests.calculatePercentage");

    gpii.tests.calculatePercentage.inputs = [undefined, null, NaN, false, true, function () {}, {}, ["array"], "", "string", 2.2, "2.2", 0, "0", 50, "50", 100, "100"];
    gpii.tests.calculatePercentage.outputs = [
        // value:
        // undefined, null,     NaN,      false,     true,      function,  {},        [],        "",        "string",  2.2,       "2.2",     0,         "0",       50,       "50",       100,       "100"]
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], // total === undefined
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], // total === null
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], // total === NaN
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], // total === false
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], // total === true
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], // total === function () {}
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], // total === {}
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], // total === []
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], // total === ""
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], // total === "string"
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 100, 100, 0, 0, 2272.7272727272725, 2272.7272727272725, 4545.454545454545, 4545.454545454545], // total === 2.2
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 100, 100, 0, 0, 2272.7272727272725, 2272.7272727272725, 4545.454545454545, 4545.454545454545], // total === "2.2"
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, 0, 0, 0, 0, 0, 0, 0], // total === 0
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, 0, 0, 0, 0, 0, 0, 0], // total === "0"
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 4.4, 4.4, 0, 0, 100, 100, 200, 200], // total === 50
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 4.4, 4.4, 0, 0, 100, 100, 200, 200], // total === "50"
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2.2, 2.2, 0, 0, 50, 50, 100, 100], // total === 100
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2.2, 2.2, 0, 0, 50, 50, 100, 100] // total === "100"
    ];

    jqUnit.test("Test gpii.chartAuthoring.percentage.calculate", function () {
        fluid.each(gpii.tests.calculatePercentage.inputs, function (total, totalIdx) {
            fluid.each(gpii.tests.calculatePercentage.inputs, function (value, valIdx) {
                var actual = gpii.chartAuthoring.percentage.calculate(value, total);
                var expected = gpii.tests.calculatePercentage.outputs[totalIdx][valIdx];
                // Using fluid.model.isSameValue to remove any javascript precision errors on floating point numbers.
                jqUnit.assertTrue("The percentate for value: " + value + " total: " + total + " should be calculated as " + expected, fluid.model.isSameValue(expected, actual));
            });
        });
    });

    fluid.registerNamespace("gpii.tests.renderPerencentage");

    gpii.tests.percentages = ["10.5", 10.5, "10", 10, "10.5", 10.5, "10", 10];

    gpii.tests.renderPerencentage.templates = [undefined, "%percentage%"];

    gpii.tests.renderPerencentage.digits = [undefined, 2];

    gpii.tests.renderPerencentage.outputs = [
        ["11", "11", "10", "10", "11", "11", "10", "10"], // template === undefined
        ["11%", "11%", "10%", "10%", "11%", "11%", "10%", "10%"] // template === "%percentage%"
    ];

    fluid.each(gpii.tests.renderPerencentage.templates, function (template, templateIdx) {
        fluid.each(gpii.tests.percentages, function (percentage, perIdx) {
            jqUnit.test("Test gpii.chartAuthoring.percentage.render - percentage: " + percentage + ", template: " + template, function () {
                var elm = $(".renderPerencentage-test");
                var expected = gpii.tests.renderPerencentage.outputs[templateIdx][perIdx];
                gpii.chartAuthoring.percentage.render(elm, percentage, template);
                var actual = elm.text();
                jqUnit.assertEquals("The percentage should be rendered into the DOM correctly.", expected, actual);
            });
        });
    });

    gpii.tests.renderPerencentage.digitOutputs = [
        ["11", "11", "10", "10", "11", "11", "10", "10"], // digits === undefined
        ["10.50", "10.50", "10.00", "10.00", "10.50", "10.50", "10.00", "10.00"] // digits === "2"
    ];

    fluid.each(gpii.tests.renderPerencentage.digits, function (digits, digitIdx) {
        fluid.each(gpii.tests.percentages, function (percentage, perIdx) {
            jqUnit.test("Test gpii.chartAuthoring.percentage.render - percentage: " + percentage + ", digits: " + digits, function () {
                var elm = $(".renderPerencentage-test");
                var expected = gpii.tests.renderPerencentage.digitOutputs[digitIdx][perIdx];
                gpii.chartAuthoring.percentage.render(elm, percentage, undefined, digits);
                var actual = elm.text();
                jqUnit.assertEquals("The percentage should be rendered into the DOM correctly.", expected, actual);
            });
        });
    });


    fluid.registerNamespace("gpii.tests.percentagesIfValue");

    gpii.tests.percentagesIfValue.values = [undefined, null, NaN, "", false, true, 0, "0", 10];
    gpii.tests.percentagesIfValue.outputs = [
        ["", "", "", "", "", "", "", ""], // value === undefined
        ["", "", "", "", "", "", "", ""], // value === null
        ["10.5", "10.5", "10", "10", "10.5", "10.5", "10", "10"], // value === NaN
        ["10.5", "10.5", "10", "10", "10.5", "10.5", "10", "10"], // value === ""
        ["10.5", "10.5", "10", "10", "10.5", "10.5", "10", "10"], // value === false
        ["10.5", "10.5", "10", "10", "10.5", "10.5", "10", "10"], // value === true
        ["10.5", "10.5", "10", "10", "10.5", "10.5", "10", "10"], // value === 0
        ["10.5", "10.5", "10", "10", "10.5", "10.5", "10", "10"], // value === "0"
        ["10.5", "10.5", "10", "10", "10.5", "10.5", "10", "10"] // value === 10
    ];

    jqUnit.test("Test gpii.chartAuthoring.percentage.percentageIfValue", function () {
        fluid.each(gpii.tests.percentagesIfValue.values, function (value, valIdx) {
            fluid.each(gpii.tests.percentages, function (percentage, perIdx) {
                var expected = gpii.tests.percentagesIfValue.outputs[valIdx][perIdx];
                var actual = gpii.chartAuthoring.percentage.percentageIfValue(percentage, value);
                jqUnit.assertEquals("The expected percentage is returned", expected, actual);
            });
        });

        var defaultPercentage = 100;
        var actualPercentage = gpii.chartAuthoring.percentage.percentageIfValue(10, null, defaultPercentage);
        jqUnit.assertEquals("The expected defaultPercentage is returned", defaultPercentage, actualPercentage);
    });

})(jQuery, fluid);
