var Model = (function () {
  
  var DAY_NAMES = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']; 
  var NUMBER_OF_COLUMNS = 7;
  var dateSelected = "";
  var days = {};
  var currentDateSelected = "";
  var currentNumberOfDaysInMonth;
  var mapMarkers = {};
  var firstMarker;
  var firstMarkerSummary;

  function initialiseStorageObject(numDaysInMonth){
    for (var count =1 ;count <numDaysInMonth+1;count++){
      days[count] = null;
    }
  }

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

  function storeNumberOfDaysInMonth(numDaysInMonth){
    currentNumberOfDaysInMonth = numDaysInMonth;
  }

  function getNumberOfDaysInMonth(){
    return currentNumberOfDaysInMonth;
  }

  function storeCoordsForLocation(dateSelected,latitude,longitude){
    console.log("store coords fr location",dateSelected,latitude,longitude); 
    days[dateSelected] = dateSelected;  
    days.latitude = latitude;
    days.longitude = longitude;
    console.log("stored locations are now",days.latitude,days.longitude);
  }

  function storeMarker(dateSelected,marker){
    date = dateSelected;
    mapMarkers[date] = marker;
   
    console.log("I'm storing marker for day ",date,mapMarkers[date]);
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

  function storeTaskEntry(taskText,dateSelected){
    days[dateSelected]=dateSelected;
    console.log("days selected when storing task is",days[dateSelected]);

    days.task= taskText;
    console.log("day task is...",taskText);
    console.log("Storing task as",days.task);
  }

  function removeTaskEntry(dateSelected){
    days[dateSelected].task = "";
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

  console.log("Dateselected in GET days[dateSelected] is now",dateSelected, days[dateSelected]);
  if (days[dateSelected] !== null){  
    return days.task;
  }
  return null;
  }

  function getExistingLocation(dateSelected){ 
      var coords = [days.latitude,days.longitude];
      return coords;
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

  function removeTaskEntryText(){
    $('#taskWords').val('');           //empty the textbox  
                  
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
              if (days[iterator].task !==""){
                        tkCount=tkCount+1;
              }
          }
        return tkCount;
  }

  function getStarterMarkerOnSummary(){
    return firstMarkerSummary;
  }


  return {
    initialiseStorageObject:initialiseStorageObject,
    removeTaskEntryText:removeTaskEntryText,
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
    removeTaskEntry:removeTaskEntry,
    removeMarkersFromStorage:removeMarkersFromStorage,
    setDateSelected:setDateSelected,
    setBlanksAtStartOfMonth:setBlanksAtStartOfMonth,
    setNumbersToRestOfMonth:setNumbersToRestOfMonth,
    storeCoordsForLocation:storeCoordsForLocation,
    storeMarker:storeMarker,
    storeTaskEntry:storeTaskEntry,
    storeStarterMarker:storeStarterMarker,
    storeStarterMarkerOnSummary:storeStarterMarkerOnSummary,
    storeNumberOfDaysInMonth:storeNumberOfDaysInMonth,
  };
  
})();

