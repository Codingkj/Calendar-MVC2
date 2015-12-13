var Model = (function () {
  
  var DAY_NAMES = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']; 
  var NUMBER_OF_COLUMNS = 7;
  var dateSelected = "";
  var days = {'1':{task:"", latitude:0, longitude:0},
              '2':{task:"", latitude:0, longitude:0},
              '3':{task:"", latitude:0, longitude:0},
              '4':{task:"", latitude:0, longitude:0},
              '5':{task:"", latitude:0, longitude:0},
              '6':{task:"", latitude:0, longitude:0},
              '7':{task:"", latitude:0, longitude:0},
              '8':{task:"", latitude:0, longitude:0},
              '9':{task:"", latitude:0, longitude:0},
              '10':{task:"", latitude:0, longitude:0},
              '11':{task:"", latitude:0, longitude:0},
              '12':{task:"", latitude:0, longitude:0},
              '13':{task:"", latitude:0, longitude:0},
              '14':{task:"", latitude:0, longitude:0},
              '15':{task:"", latitude:0, longitude:0},
              '16':{task:"", latitude:0, longitude:0},
              '17':{task:"", latitude:0, longitude:0},
              '18':{task:"", latitude:0, longitude:0},
              '19':{task:"", latitude:0, longitude:0},
              '20':{task:"", latitude:0, longitude:0},
              '21':{task:"", latitude:0, longitude:0},
              '22':{task:"", latitude:0, longitude:0},
              '23':{task:"", latitude:0, longitude:0},
              '24':{task:"", latitude:0, longitude:0},
              '25':{task:"", latitude:0, longitude:0},
              '26':{task:"", latitude:0, longitude:0},
              '27':{task:"", latitude:0, longitude:0},
              '28':{task:"", latitude:0, longitude:0},
              '29':{task:"", latitude:0, longitude:0},
              '30':{task:"", latitude:0, longitude:0},
              '31':{task:"", latitude:0, longitude:0}
            };

  var currentDateSelected = "";
  var currentNumberOfDaysInMonth;
  var mapMarkers = {};
  var firstMarker;
  var firstMarkerSummary;
  var unsavedLatitude = 0;
  var unsavedLongitude = 0;


  function createWeekdayLabelCells(gridElement){
     $.each(DAY_NAMES, function (index) {
        if (!(index % NUMBER_OF_COLUMNS)) {
            tableRow = $('<tr>');
        }

        cell = $('<td>').html(DAY_NAMES[index]);
        cell.addClass('firstrow');
        $('#grid').append(tableRow.append(cell)); 
      });
   }

  
  function storeDayDetails(dateSelected,taskText,latitude,longitude){
    console.log("store coords fr location",dateSelected, taskText, latitude,longitude); 
    days[dateSelected].task = taskText;  
    days[dateSelected].latitude = latitude;
    days[dateSelected].longitude = longitude;
    console.log("stored TASK are now",days[dateSelected].task);
  }

  function storeMarker(dateSelected,marker){
    mapMarkers[dateSelected] = marker;
    console.log("I'm storing marker for day ");
  }

  function storeNumberOfDaysInMonth(numDaysInMonth){
    currentNumberOfDaysInMonth = numDaysInMonth;
  }

  function storeStarterMarker(marker){
    firstMarker = marker;
    console.log("I've stored startermarker as..",firstMarker);
  }

  function storeStarterMarkerOnSummary(marker){
    firstMarkerSummary = marker;
    console.log("I've stored Summary startermarker as..",firstMarker);
  }

  function getStarterMarker(){
    console.log("At GET firstmarker is..",firstMarker);
   return firstMarker;
  }

  function removeDayDetails(dateSelected){
    days[dateSelected].task = "";
    days[dateSelected].longitude=0;
    days[dateSelected].latitude=0;
  }

  function removeMarkersFromStorage(){  //not finished.
//     var allMarkers = mapMarkers;
//     $.each(allMarkers,function(index) {
//     Model.storeMarker(dateSelected,null);
//   }
// }
    mapMarkers = {};
  }

  function setDateSelected(dateSelected){
    currentDateSelected = dateSelected;
    console.log("Date now set as..",currentDateSelected);
  }

  function getDateSelected(){
    return currentDateSelected;
  }

  function getMarkers(){
    return mapMarkers;
  }

  function getStartCell(currentMonthName){
    var $getString = currentMonthName + ' 1, 2015 00:00:00';
    $startCell = new Date($getString).getDay();
    return $startCell;
  }

  function getWeekdayLabels(){
    return DAY_NAMES;
  }

  function getWeekdayCells(){
    var $headers = $('.firstrow');
    console.log("Inside get Weekday cells");
    return $headers;
  }

  function getColumns(){
    return NUMBER_OF_COLUMNS;
  }

  function getExistingTask(dateSelected){ 
    return days[dateSelected].task;
  }

  function getExistingLocation(dateSelected){ 
      return [days[dateSelected].latitude,days[dateSelected].longitude]
  }
  
  function getNumberOfDaysInMonth(){
    return currentNumberOfDaysInMonth;
  }

  function setBlanksAtStartOfMonth(currentMonthName,startCell){    
    var cellsThatCanHaveDates=$('datecell');    
    var daysToUse=[];

    for (var counter=0;counter<startCell-1;counter++){
        cellsThatCanHaveDates[counter]="";
        daysToUse.push(cellsThatCanHaveDates[counter]);
    }
    return daysToUse;
  }

  function setNumbersToRestOfMonth(currentMonthName,daysToUse,numDaysInMonth,startCell){
    var dayInTheMonthLabel=1;
    var cellsThatCanHaveDates=$('datecell'); 

    for (var counter = startCell-1; counter < numDaysInMonth + startCell-1; counter++){
        cellsThatCanHaveDates[counter]=dayInTheMonthLabel;

        dayInTheMonthLabel=dayInTheMonthLabel+1;
        daysToUse.push(cellsThatCanHaveDates[counter].toString());
    } 
    return daysToUse;
  } 

  function getTodaysCellOnCalendar(){
    var $alldates = $('.active');
    for (var counter=0; counter < $alldates.length;counter++){
        if ($alldates[counter].innerHTML == today){
            var selectedDate = $alldates[counter];
          return selectedDate;
        }
    }
  }

  function getNumberOfTasksInRange(startDate, endDate){
    var tkCount=0;
    for (var iterator=startDate;iterator<endDate+1; iterator++){
              if (days[iterator].task !=="") {
                        tkCount=tkCount+1;
              }
          }
        return tkCount;
  }

  function getStarterMarkerOnSummary(){
    return firstMarkerSummary;
  }

  function getUnsavedLatitude(){
    return unsavedLatitude;
  }

  function getUnsavedLongitude(){
    return unsavedLongitude;
  }

  function storeUnsavedLatitude(latitude){
    unsavedLatitude = latitude;
  }
  
  function storeUnsavedLongitude(longitude){
    unsavedLongitude = longitude;
  }

  return {
    removeDayDetails:removeDayDetails,
    createWeekdayLabelCells:createWeekdayLabelCells,
    getColumns:getColumns,
    getMarkers:getMarkers,
    getWeekdayLabels:getWeekdayLabels,
    getWeekdayCells:getWeekdayCells,
    getExistingTask:getExistingTask,
    getTodaysCellOnCalendar:getTodaysCellOnCalendar,
    getNumberOfTasksInRange:getNumberOfTasksInRange,
    getNumberOfDaysInMonth:getNumberOfDaysInMonth,
    getExistingLocation:getExistingLocation,
    getDateSelected:getDateSelected,
    getStartCell:getStartCell,
    getStarterMarker:getStarterMarker,
    getStarterMarkerOnSummary:getStarterMarkerOnSummary,
    getUnsavedLatitude:getUnsavedLatitude,
    getUnsavedLongitude:getUnsavedLongitude,
    // initialiseStorageObject:initialiseStorageObject,
    removeDayDetails:removeDayDetails,
    removeMarkersFromStorage:removeMarkersFromStorage,
    setDateSelected:setDateSelected,
    setBlanksAtStartOfMonth:setBlanksAtStartOfMonth,
    setNumbersToRestOfMonth:setNumbersToRestOfMonth,
    storeDayDetails:storeDayDetails,
    storeMarker:storeMarker,
    storeStarterMarker:storeStarterMarker,
    storeStarterMarkerOnSummary:storeStarterMarkerOnSummary,
    storeNumberOfDaysInMonth:storeNumberOfDaysInMonth,
    storeUnsavedLongitude:storeUnsavedLongitude,
    storeUnsavedLatitude:storeUnsavedLatitude,
  };
  
})();

