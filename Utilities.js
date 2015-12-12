var Utilities = (function () {
  
  function getCurrentMonthNumber(){
    return new Date().getMonth()+1;
  }
  function getYearNumber(){
      return new Date().getFullYear();
  }

  function getMonthName(monthNumber){
      
      var monthNamesArray=['January','February','March','April','May','June','July','August','September','October','December','December'];
      var currentMonthName = monthNamesArray[monthNumber-1];
      return currentMonthName;
  }
    

  function getDatesInCurrentMonth(currentYear,currentMonthNumber){        
      var dateCount;  //could this all be in the return statement.
      dateCount = new Date(currentYear, currentMonthNumber, null).getDate();    
      return dateCount;
  }

  function findTodaysDate(){
      var today = new Date().getDate();
    return today;
  }


  function createGoogleMap(latitude,longitude,mapContainer){
     
      console.log("lat-lng passed into createGoogleMap...",latitude,longitude,mapContainer); 
    
      var mapOptions={ 
            center:new google.maps.LatLng(latitude,longitude),
            zoom:12   };
    
      var map = new google.maps.Map(document.getElementById(mapContainer),mapOptions);

      google.maps.event.trigger(document.getElementById(mapContainer), 'resize');
      console.log('map is...',map);
    return map;
  }

  
  function createMapMarker(latitude,longitude,map){
      console.log("lat-lng passed into create marker...",latitude,longitude,map);

      var marker = new google.maps.Marker({
                            position:{lat:latitude,lng:longitude},
                            map: map,
                            title: 'Your task is here!',
                          });
      console.log('Utilities mapmarker now..',marker);
      return marker; 
    }


  function validateTaskEntry(taskText){
    if (taskText===""){
          return ('Hey, enter something before you leave - or press Cancel');   
        }
      return null;
}
  
  return {
    getCurrentMonthNumber: getCurrentMonthNumber,
    getYearNumber:getYearNumber,
    getMonthName:getMonthName,
    getDatesInCurrentMonth:getDatesInCurrentMonth,
    findTodaysDate:findTodaysDate,
    createGoogleMap:createGoogleMap,
    createMapMarker:createMapMarker,
    validateTaskEntry:validateTaskEntry
  };
  
})();