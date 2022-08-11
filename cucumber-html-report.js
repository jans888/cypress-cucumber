const report = require("multiple-cucumber-html-reporter");
report.generate({
jsonDir: "cypress/cucumber-json",  // ** Path of .json file **//
reportPath: "./reports/cucumber-report.html",
metadata: {
browser: {
name: "chrome",
version: "",
},
device: "Local test machine",
platform: {
name: "",
version: "",
},
},
});