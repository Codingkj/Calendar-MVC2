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

    return map;
  }

  
  function createMapMarker(latitude,longitude,map){
      console.log("lat-lng passed into create marker...",latitude,longitude,map);

      var marker = new google.maps.Marker({
                            position:{lat:latitude,lng:longitude},
                            map: map,
                            title: 'Your task is here!',
                          });
      return marker; 
    }

  function moveMarkerToMap(marker,map){
    marker.setMap(map);
  }

  function validateTaskEntry(textEntered){
    
    if (textEntered === ""){
          return ('Hey, enter something before you leave - or press Cancel');   
        }
      return textEntered;
}

// function moveToLocation(latitude, longitude){
//     var center = new google.maps.LatLng(latitude, longitude);
//     map.panTo(center);
// }  
  
  return {
    createGoogleMap:createGoogleMap,
    createMapMarker:createMapMarker,
    findTodaysDate:findTodaysDate,
    getCurrentMonthNumber: getCurrentMonthNumber,
    getYearNumber:getYearNumber,
    getMonthName:getMonthName,
    getDatesInCurrentMonth:getDatesInCurrentMonth,
    moveMarkerToMap:moveMarkerToMap,
    validateTaskEntry:validateTaskEntry,
    
  };
  
})();