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


$.fn.timePick = function(options) {
    var defaults = {
        datefield: null,
        ampm: true,
        minuteIncrement: 5,
        hourIncrement: 1,
        hourSel: "hh",
        minuteSel: "mm",
        ampmSel: "ampm"
    };
    options = $.extend(defaults, options);

    var objDate = new Date();
    var strDate = "";
    var destinationId = this.prop('id');
    var hourSel = this.prop('id') + "_" + options.hourSel;
    var minuteSel = this.prop('id') + "_" + options.minuteSel;
    var ampmSel = this.prop('id') + "_" + options.ampmSel;
    
    //internal functions

    
    
    var minutePickerOptions = "";
    for (i = 0; i < 60; i = i + options.minuteIncrement) {
        val = (i < 10) ? "0" + i : i;
        minutePickerOptions += "<option>" + val + "</option>";
    }
    var hourPickerOptions = "";
    for (i = 0; i < 12; i = i + options.hourIncrement) {
        var displayVal = (i === 0) ? "12" : i;
        var optVal = (i === 0) ? "00" : i;
        hourPickerOptions += "<option value='" + optVal + "'>" + displayVal + "</option>";
    }
    picker = "<select id='" + hourSel + "'>" + hourPickerOptions + "</select>" + " " + ":" + " " + "<select id='" + minuteSel + "'>" + minutePickerOptions + "</select>" + "<select id='" + ampmSel + "'>" + "<option>am</option>" + "<option>PM</option>" + "</select>" + "<input type='hidden' id='" + this.prop('id') + "'/>";

    this.replaceWith(picker);
    
    
    function setTime() {
        hourVal = (($("#" + hourSel).val() == 00)&&(options.ampm==true) &&($("#" + ampmSel).val() == "PM")) ? 12 : 00;
        $("#" + destinationId).val(strDate + " " + hourVal + ":" + $("#" + minuteSel).val() + "" + $("#" + ampmSel).val());
        
    }

    function setDate() {
        if(options.datefield){
            strDate = $("#" + options.datefield).val();
            objDate = new Date(strDate);
        } else {
            objDate = new Date();
            strDate = (objDate.getMonth() + 1) + "/" + objDate.getDate() + "/" + objDate.getFullYear();
        }
        
        return strDate;
    }

    function updateDate() {
        setDate();
        setTime();
    }
    updateDate();


    $("#" + hourSel).change(function(){
        setTime();
    });
    $("#" + minuteSel).change(function(){
        setTime();
    });
    $("#" + ampmSel).change(function(){
        setTime();
    });

    if (options.datefield) {
        $("#" + options.datefield).change(function (){
        updateDate();
        });
    }


};