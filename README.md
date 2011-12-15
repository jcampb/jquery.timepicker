The JQUERY timepicker plugin is something developed to clean up the UI of rails time pickers.

Today (rails 3.1) time_select and datetime_select are both are designed for picking 24 hour time. Adding 12 hour support meant simply adding a PM into the hour select. Leaving fields to read 3PM:34 which is not a very user friendly solution.

To use the timepicker we provide here, you can tell rails to output a time as a hidden field. This plugin replaces that field with a 3 select boxes: hours, minutes, and am/pm. If a date field is provided it will define a time for that date (assumes mm/dd/yy format). If a date field is not provided it will provide a time for the current day.

Our hope is to extend this plugin to support 24 hour time (based on localization or user preferences) and to replace an entire datetime with the proper date and time fields.

We hope others find this useful and have other ideas on how to improve it.