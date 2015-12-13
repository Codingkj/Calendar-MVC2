var View = (function () {
  
    var starterMarkerIsOn = true;
    var taskEntryFormShown = false;
    
      var currentMonthNumber = Utilities.getCurrentMonthNumber();
      var currentMonthName = Utilities.getMonthName(currentMonthNumber); 
      var currentYearNumber = Utilities.getYearNumber(); 
      var numDaysInMonth = Utilities.getDatesInCurrentMonth(currentYearNumber,currentMonthNumber);

    function createCalendarPage(){
      var bodyElement = $('body');
      var gridElement = $('#grid');

      View.createPageHeader(currentMonthName,currentYearNumber,bodyElement);
      View.createGridOfDatesView(bodyElement);
      Model.createWeekdayLabelCells(gridElement);

      var headerCells = Model.getWeekdayCells();
      var weekdayLabels = Model.getWeekdayLabels();

      View.setWeekdayLabelsToColumns(headerCells, weekdayLabels);
     
      var startCell = Model.getStartCell(currentMonthName);
      var daysToUse = Model.setBlanksAtStartOfMonth(currentMonthName,startCell); 
      var daysToUseWithBlanksAdded = Model.setNumbersToRestOfMonth(currentMonthName,daysToUse,numDaysInMonth,startCell);
      var allCellsForDates = View.setArrayValuesToTablePosition(daysToUseWithBlanksAdded);  
    }

    function changeFormToVisible(formToChange){
      var $changeform = $('#'+ formToChange);
      $changeform.addClass('visible').removeClass('hidden');    
     } 

    function changeFormToHidden(formToChange){
        var $changeform = $('#'+ formToChange);
        $changeform.addClass('hidden').removeClass('visible'); 
    }

    function changeformHeader(dateSelected, currentMonthName, year){
        $('p.headingtext').text([dateSelected]+ ' '+currentMonthName+' '+ year);
    }

    function chooseAFormToDisplay(daysIndex){
        if (daysIndex === ""){
            return 'divTaskEntryForm'
            }  
        return 'divTaskEditForm';       
    } 

    function hideSummaryMap(){
        $('#divMapViewForm').addClass("hidden").removeClass("mapsurround2");
    }

    function createGridOfDatesView(parentElement){
      var $table1 = $('<table id="grid"></table>');
      parentElement.append($table1);
    }

    function highlightDate(date){
      var checkdates = $('.active');
      $.each(checkdates,function(index) {
            if (checkdates[index].innerHTML == date.toString()){
              var selectedDate = checkdates[index];
             $(selectedDate).addClass('shaded').removeClass('unshaded');
          }
      });
    } 

    function unHighlightDate(date){
        var checkdates = $('.shaded');
        $.each(checkdates,function(index) {
            if (checkdates[index].innerHTML == date.toString()){
              var selectedDate = checkdates[index];
              $(selectedDate).addClass('unshaded').removeClass('shaded');
            }
        });
    }

    function displayTaskText(taskText){
      $('#storedTextId').text(taskText);
    }
    
    function setTodayHighlight(dateToHighlight){
      var alldates = $('[class="active"]');
      for (var counter=0; counter<alldates.length;counter++){
        if (alldates[counter].textContent == dateToHighlight){
          var selectedBox = alldates[counter];
          $(selectedBox).addClass('todaysdate').removeClass('active');
        }
      }
    }

    function setWeekdayLabelsToColumns(headerCells,day_names){
     for (var counter=0;counter<day_names.length-1; counter++) {
          headerCells[counter].html = day_names[counter];
        }
        return headerCells;
    }

    function createPageHeader(currentMonth,currentYear,parentElement){
      var $divTop= $('<div></div>');
      var $pageHeader =$('<p class="calendarMonth"></p>').text(currentMonth+' '+currentYear);
      var $mapViewButton=$('<button id="mapViewButton" type="button">View Tasks by Map</button>');
      $divTop.append($mapViewButton);
      $divTop.append($pageHeader);
      parentElement.append($divTop);
    }
    function removeTasksInSliderView(){     //don't think this is needed.
      $('#textBox4').val('');
    
    }
    function showPostcodeCoordinates(search,dateSelected,mapcontainer){
        var url=('http://api.postcodes.io/postcodes/'+ search);
       
        console.log("url & date is...",url,dateSelected);
       
        var xhr = new XMLHttpRequest();
        xhr.open('GET', encodeURI(url));
        xhr.onload = function() {
            if (xhr.status !== 200) {
                console.log('Not OK: ' + xhr.status);
                 return;
            }  
            var data = JSON.parse(xhr.responseText);

            var latitudeReturnedFromLookup = data.result.latitude;
            var longitudeReturnedFromLookup = data.result.longitude;

            console.log('values are date,lat,lng',dateSelected,latitudeReturnedFromLookup,longitudeReturnedFromLookup);
            View.removeStartMarker();
            var mapCreated = Utilities.createGoogleMap(latitudeReturnedFromLookup,longitudeReturnedFromLookup,'mapTaskEntry');
            var markerCreated = Utilities.createMapMarker(latitudeReturnedFromLookup, longitudeReturnedFromLookup ,mapCreated); 
            Model.storeMarker(dateSelected, markerCreated);
            Model.storeUnsavedLatitude(latitudeReturnedFromLookup);
            Model.storeUnsavedLongitude(longitudeReturnedFromLookup);          
        }     
        xhr.send();
    }


    function showTaskListing(startDate,stopDate){

       var tasklist = $('[data-tasklisting]');
       $.each(tasklist,function(index) {
          if (($(this).attr('data-tasklisting') >= startDate) && ($(this).attr('data-tasklisting') <= stopDate)){
            console.log("task in range",index);
            $(this).removeClass('hidden').addClass('task-list'); 
          }
          else 
          {
            console.log("Date outside range");
            $(this).addClass('hidden').removeClass('task-list'); 
          }
        });
      }


     function filterMarkers(startDate,stopDate){
       var allMarkers = Model.getMarkers();
       $.each(allMarkers,function(index) {            
          if ((index >= startDate) && (index <= stopDate)){
              console.log("value in range",index);

              //is there a marker already there? if not add it.How do I know marker is there?
          }
          else {
            console.log("Date outside range");
            allMarkers[index].setMap(null);
          }
      });
     }
    

    function hideTaskListing() {
      var tasklist = $('[data-tasklisting]').addClass('hidden').removeClass('task-list'); 
    }

    function createTaskListing(){
      // get all tasks that are not blank, create a stylised Div for them class hidden.
      var currentYear = Utilities.getYearNumber();
      var currentMonth = Utilities.getCurrentMonthNumber();
      var numDaysInMonth = Utilities.getDatesInCurrentMonth(currentYear,currentMonth);
      console.log("Inside the createTaskListing");
      for (var counter=1;counter<numDaysInMonth+1;counter++){
          var selectedTask = Model.getExistingTask(counter);
          if (selectedTask !== ""){
                $textBox4 = $('<div id="textBox4" class="task-list"></div>'); 
                $textBox4.attr('data-tasklisting', counter);
                var $lineBr = $('<br></br>'); 
                $('#mapform2').append($lineBr).append($lineBr);
                var monthName = Utilities.getMonthName(currentMonth);
                $textBox4.append(counter + ' ' + monthName + ' ' + selectedTask).append($lineBr);  
                $('#mapform2').append($textBox4);  
                }
          }
    }

    function showMapView(){
        var formToChange = $('#divMapViewForm'); 
        formToChange.addClass('mapsurround2').removeClass('hidden'); 
        var starterMarker = Model.getStarterMarkerOnSummary();
    }

    function addMapSummaryView(){
        var latitude = 51.4996829;
        var longitude = -0.0845579;
        var mapCreatedinSummaryDiv = Utilities.createGoogleMap(latitude,longitude,'mapSummaryDiv');

        // var starterMarker = Utilities.createMapMarker(latitude,longitude,mapCreatedinSummaryDiv);
        // Model.storeStarterMarkerOnSummary(starterMarker);
    
        return mapCreatedinSummaryDiv;
    }

  function setArrayValuesToTablePosition(daysToUse){
    var NUMBER_OF_COLUMNS = 7; 
    
      $.each(daysToUse, function(index) {
          if(!(index%NUMBER_OF_COLUMNS)) tableRow = $('<tr>');
          
          cell = $('<td>').html(daysToUse[index]);
          $(cell).addClass('active');
          $(cell).attr('data-active','');
          $('#grid').append(tableRow.append(cell)); 
      });   
    }   

    function setMapOnForm(formToChange){    
      var dateSelected = Model.getDateSelected();
      if (formToChange === 'divTaskEditForm'){
            var locationSelected = Model.getExistingLocation(dateSelected);
            var latitude = locationSelected[0];
            var longitude = locationSelected[1];
            var mapCreatedInTaskEdit = Utilities.createGoogleMap(latitude,longitude,'mapTaskEdit');
            // var markerCreated = Utilities.createMapMarker(latitude,longitude,mapCreatedInTaskEdit);
            //Don't store marker as you have no way to find new value.
            return;
      }
      var latitude = 51.4996829;
      var longitude = -0.0845579;
      var mapCreatedInTaskEntry = Utilities.createGoogleMap(latitude,longitude,'mapTaskEntry');  
      var markerCreated = Utilities.createMapMarker(latitude,longitude,mapCreatedInTaskEntry); 
      var storedMarker = Model.storeStarterMarker(markerCreated);
      console.log("Ive just stored",markerCreated);
      } 
    

    function createMultipleMarkers(startDate,stopDate,map){
            console.log("creating MultipleMarkers");
            var markerCreated; 
            var infowindow = new google.maps.InfoWindow();   
            View.removeStartMarker();
            for (var dateIterator = startDate; dateIterator < stopDate+1; dateIterator++){
                var dateWithTask = Model.getExistingTask(dateIterator);
                if (dateWithTask !== ""){
                    var coords = Model.getExistingLocation(dateIterator);
                    var latitude = coords[0];
                    var longitude = coords[1];
                    // mapContainer = $('#mapSummaryDiv');
                  
                    markerCreated = Utilities.createMapMarker(latitude,longitude,map); 
                    Model.storeMarker(dateIterator, markerCreated);   
                    google.maps.event.addListener(markerCreated, 'click', (function(markerCreated, dateIterator) { 
                            return function() {
                              var content = Model.getExistingTask(dateIterator);
                              infowindow.setContent(content);
                              infowindow.open(map, marker);
                            }
                    })(markerCreated, dateIterator));  //end of Listener
                }   //end of if loop
               }   //end of for loop
           }

  
  function removeAllMarkers(){  //to be called when user navigates back to calendar view.
    var markersToRemove = Model.getMarkers();
    $.each(markersToRemove,function(index) {
      markersToRemove[index].setMap(null);
    });
    View.filterMarkers(markersToRemove);
    Model.removeMarkersFromStorage(markersToRemove);
    }

  function removeStartMarker(){
    marker = Model.getStarterMarker();
    console.log("in remove starter marker",marker);
    marker.setMap(null);   
   }
  

  function showStartMarker(mapContainer){
    marker = Model.getStarterMarker();
    marker.setMap(mapContainer);
  }

  function changeMapOnForm(formToChange){
    if (formToChange === 'divTaskEntryForm') {
          if  (!taskEntryFormShown) {
            View.setMapOnForm(formToChange);
            View.repositionStarterMarkerOnTaskEntryForm();
            taskEntryFormShown = true;
            }   
          }
    else if (formToChange === 'divTaskEditForm')  { 
            View.setMapOnForm(formToChange);
            }   
    }


  function repositionStarterMarkerOnTaskEntryForm(){
    var markerNeeded = Model.getStarterMarker();
    var mapNeeded = $('.google.maps.Map');
    Utilities.moveMarkerToMap(markerNeeded,mapNeeded);
    //place on map
  }

  function clearPostcode(){
    var postcodeEntry = $('#postcode').val('')
  }

  function clearTaskEntry(){
    var taskEntry = $('textarea').val('');
  }
  
  return {
    changeFormToVisible: changeFormToVisible,
    changeFormToHidden: changeFormToHidden,
    changeformHeader: changeformHeader,
    changeMapOnForm:changeMapOnForm,
    chooseAFormToDisplay:chooseAFormToDisplay,
    clearPostcode:clearPostcode,
    clearTaskEntry:clearTaskEntry,
    createCalendarPage:createCalendarPage,
    createGridOfDatesView:createGridOfDatesView,
    addMapSummaryView:addMapSummaryView,
    createPageHeader:createPageHeader,
    createMultipleMarkers:createMultipleMarkers,
    // createSlider:createSlider,
    createTaskListing:createTaskListing,
    displayTaskText:displayTaskText,
    filterMarkers:filterMarkers,
    hideTaskListing:hideTaskListing,
    hideSummaryMap:hideSummaryMap,
    highlightDate:highlightDate,
    removeAllMarkers:removeAllMarkers,
    removeStartMarker:removeStartMarker,
    removeTasksInSliderView:removeTasksInSliderView,
    repositionStarterMarkerOnTaskEntryForm:repositionStarterMarkerOnTaskEntryForm,
    setMapOnForm:setMapOnForm,
    setTodayHighlight:setTodayHighlight,
    setWeekdayLabelsToColumns:setWeekdayLabelsToColumns, 
    setArrayValuesToTablePosition:setArrayValuesToTablePosition,
    showPostcodeCoordinates:showPostcodeCoordinates,
    showMapView:showMapView,
    showStartMarker:showStartMarker,
    showTaskListing:showTaskListing,
    unHighlightDate:unHighlightDate
  };
  
})();