/* =============================================================================
* Copyright (c) <2011> Magic+Might  http://www.magicandmight.com
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of 
* this software and associated documen tation files (the "Software"), to deal in 
* the Software without restriction, i ncluding without limitation the rights to 
* use, copy, modify, merge, publish, d istribute, sublicense, and/or sell copies 
* of the Software, and to permit person so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all 
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
* SOFTWARE.

* The MIT License (MIT)
// =============================================================================*/


(function($) {
    $.timePick = function(el, options) {

        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // reverse reference to the DOM object
        base.$el.data("timePick", base);

        base.init = function() {
            // initialization code 
            base.options = $.extend({},$.timePick.defaultOptions, options);

            base.objDate = new Date();
            base.strDate = "";
            base.destinationId = base.el.id;

            base.hourSel = base.el.id + "_" + base.options.hourName;
            base.minuteSel = base.el.id + "_" + base.options.minuteName;
            base.ampmSel = base.el.id + "_" + base.options.ampmName;
            base.priorVal = new Date(Date.parse(base.el.value));

            var minutePickerOptions = "";
            for (i = 0; i < 60; i = i + base.options.minuteIncrement) {
                val = (i < 10) ? "0" + i: i;
                minutePickerOptions += "<option>" + val + "</option>";
            }
            var hourPickerOptions = "";
            for (i = 0; i < 12; i = i + base.options.hourIncrement) {
                var displayVal = (i === 0) ? "12": i;
                var optVal = (i === 0) ? "00": i;
                hourPickerOptions += "<option value='" + optVal + "'>" + displayVal + "</option>";
            }
            picker = "<select id='" + base.hourSel + "'>" + hourPickerOptions + "</select>" + base.options.separator + "<select id='" + base.minuteSel + "'>" + minutePickerOptions + "</select>" + "<select id='" + base.ampmSel + "'>" + "<option>AM</option>" + "<option>PM</option>" + "</select>";
            base.$el.after(picker);
			base.$el.hide();

            group = new Array(base.options.hourName, base.options.minuteName, base.options.ampmName);

            for (i = 0; i < group.length; i++) {
                item = '#' + base.el.id + "_" + group[i];
                $(item).addClass(group[i]).addClass(base.options.groupName);
                $(item).change(function() {
                    base.setTime();
                });
            }

            base.configTime();
            base.updateDate();

            if (base.options.datefield) {
                $("#" + base.options.datefield).change(function() {
                    base.updateDate();
                });
            }

        };

        base.configTime = function() {
            $("#" + base.minuteSel).val(base.priorVal.getMinutes());
            hourVal = (base.priorVal.getHours() < 12) ? base.priorVal.getHours() : base.priorVal.getHours() - 12;
            ampmVal = (base.priorVal.getHours() > 11) ? "PM": "AM"
            $("#" + base.hourSel).val(hourVal);
            $("#" + base.ampmSel).val(ampmVal);
        }

        base.setTime = function() {
            v12h = $("#" + base.ampmSel).val();
            if ((base.options.ampm == true) && v12h == "pm") {
                hourVal = $("#" + base.hourSel).val();
                if (hourVal == "00") {
                    hourVal = "12";
                }
            } else {
                hourVal = $("#" + base.hourSel).val();
            }
            newVal = base.strDate + " " + hourVal + ":" + $("#" + base.minuteSel).val() + "" + $("#" + base.ampmSel).val();
            $("#" + base.destinationId).val(newVal);

        }

        base.setDate = function() {
            if (base.options.datefield) {
                base.strDate = $("#" + base.options.datefield).val();
                base.objDate = new Date(base.strDate);
            } else {
                base.objDate = new Date();
                base.strDate = (base.objDate.getMonth() + 1) + "/" + base.objDate.getDate() + "/" + base.objDate.getFullYear();
            }
            return base.strDate;
        }

        base.updateDate = function() {
            base.setDate();
            base.setTime();
        }

        // Run initializer
        base.init();
    };

    $.timePick.defaultOptions = {
        datefield: null,
        ampm: true,
        minuteIncrement: 1,
        hourIncrement: 1,
        separator: ":",
        hourName: "hh",
        minuteName: "mm",
        ampmName: "ampm",
        groupName: "time-group"
    };

    $.fn.timePick = function(options) {
        return this.each(function() {
            (new $.timePick(this, options));
        });
    };

})(jQuery);