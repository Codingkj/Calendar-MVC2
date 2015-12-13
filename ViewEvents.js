var ViewEvents = (function () {     

    function showClickedOnDate(clickEvent){  
       
        var dateSelected = clickEvent.target.textContent;
        Model.setDateSelected(dateSelected);  
        console.log("dateSelected has been set at",dateSelected);
        var taskEntryExistingInModel = Model.getExistingTask(dateSelected); 
        console.log("task existing is coming back as ",taskEntryExistingInModel);   
        var formToChange = View.chooseAFormToDisplay(taskEntryExistingInModel);
       
        var currentMonth = Utilities.getCurrentMonthNumber();
        var currentMonthName = Utilities.getMonthName(currentMonth);
        var currentYearNumber = Utilities.getYearNumber(); 
        View.changeformHeader(dateSelected,currentMonthName,currentYearNumber);
        View.changeFormToVisible(formToChange);
        View.changeMapOnForm(formToChange);    
        View.displayTaskText(taskEntryExistingInModel);
        View.highlightDate(dateSelected);
        }   

    function saveTaskEntry(event){
        event.preventDefault(); 
        event.stopPropagation();
        var dateSelected = Model.getDateSelected();
        var textEntered = $('textarea').val(); 
        var validText = Utilities.validateTaskEntry(textEntered);
        var latitude = Model.getUnsavedLatitude();
        var longitude = Model.getUnsavedLongitude(); 
        Model.storeDayDetails(dateSelected, validText,latitude,longitude);

        View.clearPostcode();
        View.clearTaskEntry();
        View.highlightDate(dateSelected);    
        View.changeFormToHidden('divTaskEntryForm');  
        
        } 

    function cancelTaskEntry(event){
        event.preventDefault(); 
        event.stopPropagation();   
        var dateSelected = Model.getDateSelected();                  
        View.changeFormToHidden('divTaskEntryForm');                      
        View.unHighlightDate(dateSelected);     
        View.clearTaskEntry();
        }

    function closeEditForm(event){
        event.preventDefault(); 
        event.stopPropagation();
     
        var dateSelected = Model.getDateSelected();
        View.changeFormToHidden('divTaskEditForm');
        View.highlightDate(dateSelected);
        dateSelected="";
      }  

      function showEditForm(event){
            event.preventDefault();
            event.stopPropagation(); 
            var dateSelected = Model.getDateSelected();    
            View.changeFormToVisible('divTaskEntryForm');     
      } 

      function removeTask(event){
            event.preventDefault(); 
            event.stopPropagation();
            var dateSelected = Model.getDateSelected();
            View.unHighlightDate(dateSelected); 
            Model.removeDayDetails(dateSelected);                    
            View.changeFormToHidden('divTaskEditForm');  
      } 
      function returnToCalendarScreen(event){
            event.preventDefault(); 
            event.stopPropagation();   
            var dateSelected = Model.getDateSelected(); 
            View.hideSummaryMap();                       
            View.removeTasksInSliderView();  
            View.removeAllMarkers();                           
      }

      function findPostcode(event){
            event.preventDefault(); 
            event.stopPropagation();  
            var dateSelected = Model.getDateSelected();
            var search = $('#postcode').val();
            mapContainer = document.getElementById('mapTaskEntry');
            View.showPostcodeCoordinates(search,dateSelected,mapContainer); 
      }


      function showSummaryMap(event) {   // to display all tasks on 1 map
        event.preventDefault(); 
        event.stopPropagation();
        console.log("got here too!!!!"); 
        
        View.createTaskListing();
        View.showTaskListing(1,31);
        
        View.showMapView();   
        var mapCreated = View.addMapSummaryView();
        var currentMonthNumber = Utilities.getCurrentMonthNumber();
        var daysInMonth = Utilities.getDatesInCurrentMonth(2015,currentMonthNumber);
        var currentMonthName = Utilities.getMonthName(currentMonthNumber);
        
        View.createMultipleMarkers(1,daysInMonth,mapCreated);
        

        $ (function() {
        $("#slider-range").slider({
          range: true,
          min: 1,
          max: 31,       
          values:[1,31], 
          step:1,
            slide: function( event, ui ) {
                      $( "#slidevalue" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] + ' '+ currentMonthName);
                      View.showTaskListing(ui.values[0],ui.values[1]);
                      View.filterMarkers(ui.values[0],ui.values[1]);
                   },
            start: function( event, ui ) {
                      $( "#startvalue" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
                      // View.removeAllMarkers();

                   },
            stop: function( event, ui ) {

                      $( "#stopvalue" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );

                      View.showTaskListing(ui.values[0],ui.values[1]);
                      View.createMultipleMarkers(ui.values[0],ui.values[1],mapCreated);
                      View.filterMarkers(ui.values[0],ui.values[1]);


                          
                    },  //end of slider stop function
                }); //end of .slider function
         
      });  //end of  slider functionality function call
      }
  
  return {
    cancelTaskEntry:cancelTaskEntry,
    closeEditForm:closeEditForm,
    findPostcode:findPostcode,
    removeTask:removeTask,
    returnToCalendarScreen:returnToCalendarScreen,
    showClickedOnDate:showClickedOnDate,
    saveTaskEntry:saveTaskEntry,
    showEditForm:showEditForm,
    showSummaryMap:showSummaryMap,
   
  };


})();