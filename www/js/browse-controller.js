/*global $:false, document:false, console:false, alert:false, FormGenerator:false, DBController:false, SubStation:false, JSONController:false */

/**
 * Created by cwilson on 12/18/2014.
 */

var BrowseController = function (db_controller, form_generator) {

    var that = this,
        form_controller,
        navigation_controller;

    this.setFormController = function (controller) {
        form_controller = controller;
    };

    this.setNavigationController = function (controller) {
        navigation_controller = controller;
    };

    this.listReadings = function(readings) {
        form_generator.clearMainMenu();
        form_generator.drawViewHeaders();
        readings.forEach(function(reading) {
            var reading_id = reading.station_name.replace(' ', '') + reading.date;
            $('.table-wrapper').append('<div class="row" id="' + reading_id + '"></div>');
            $('#' + reading_id).append('<div class="column">' + reading.station_name + '</div>');
            $('#' + reading_id).append('<div class="column">' + reading.date + '</div>');
            $('#' + reading_id).append('<div class="column" id="edit' + reading_id + '">Edit</div>');
            $('#' + reading_id).append('<div class="column" id="delete' + reading_id + '">Delete</div>');
            addViewActions(reading_id, reading);
        });
        $('#main-menu').append('<input type="button" class="button-dark" id="back" name="back" value="BACK" />');
        $('#back').click(navigation_controller.showButtons);
    };

    var addViewActions = function(reading_id, reading) {
        $('#edit' + reading_id).click({
            id: reading["station-id"],
            name: reading.station_name,
            reading: reading.read_id
        }, form_controller.openForm);

        $('#delete' + reading_id).click({
            id: reading["station-id"],
            name: reading.station_name,
            reading: reading.read_id
        }, deleteReading);
    };

    var deleteReading = function(event) {
        console.log(event.data);
        db_controller.deleteEntry(event.data.reading, "station_readings");
        alert("Reading Deleted");
        navigation_controller.showButtons();
    };

    var showReading = function(reading) {
        for (var property in reading) {
            if(reading.hasOwnProperty(property)) {
                $('#' + property).val(reading[property]);
            }
        }
    };
};