var ViewForms = (function () {
  
  function createTaskEntryForm(parentElement){
    var $taskEntryDiv=$('<div id="divTaskEntryForm" class="hidden"></div>');  // 
    var $taskForm = $('<form id="taskForm"></form>'); 
    var $formHeader=$('<p id="headtext" class="headingtext"></p>');  //
    $taskForm.append($formHeader);
    var $textLabel=$('<p class="pcode2">Enter details of your task:</p>');
    $taskForm.append($textLabel);
    var $textField=$('<textarea id="taskWords" name="textFieldname"></textarea>');
    $textField.addClass("textbox");
    $taskForm.append($textField);
    var $mapTaskEntry=$('<div id="mapTaskEntry" class="mapStyle"></div>');
    $taskForm.append($mapTaskEntry);
 
    var $findButton=$('<button id="findbutton" type="button">FIND</button>');
    var $postcodeLabel=$('<p class="pcode">Enter Postcode for task (if there is one):</p>');
    var $postcodeBox=('<input type="text" id="postcode"></input>');
    $taskForm.append($postcodeLabel).append($postcodeBox).append($findButton);
    var $submitField=$('<button id="submitbutton" type="button">SAVE</button>'); 
    var $cancelField=$('<button id="cancelbutton" type="button">CANCEL</button>'); 
   
    $taskForm.append($submitField).append($cancelField);
    $taskEntryDiv.append($taskForm);
    parentElement.append($taskEntryDiv);
  }

  function createTaskEditForm(parentElement){
    var $taskEditDiv=$('<div id="divTaskEditForm" class="hidden"></div>');
    var $secondTaskForm=$('<form id="secondformpage"></form>');
    var $secondFormHeader=$('<p id="headtext" class="headingtext"></p>');
    var $introLine =$('<p id="intro">The task you have on this day is:</p>')
    var $secondTextField=$('<p id="storedTextId" class="oldtext"></p>');
    var $closeField=$('<button id="closebutton">CLOSE</button>');   
    var $editField=$('<button id="editbutton">EDIT</button>');      
    var $removeField=$('<button id="removebutton">REMOVE</button>');  
    var $lineBr=$('<br></br>');  

    var $mapEditDiv=$('<div id="mapTaskEdit" class="mapStyle3"></div>');

    $secondTaskForm.append($secondFormHeader).append($lineBr).append($lineBr).append($introLine).append($secondTextField).append($lineBr).append($closeField).append($editField).append($removeField);  
    $secondTaskForm.append($mapEditDiv);
    $taskEditDiv.append($secondTaskForm);
    parentElement.append($taskEditDiv); 

  }

  function createMapView(parentElement){  
    var $divMapViewForm=$('<div id="divMapViewForm" class="hidden"></div>');  // 
    var $mapForm2 = $('<form id="mapform2"></form>'); 
    var $formHeader2=$('<p id="mapheader">December Tasks by Map</p>'); 

    var $goBackField=$('<button id="gobackbutton" type="button">Go to calendar view</button>'); 
    $formHeader2.append($goBackField);
    $divMapViewForm.append($formHeader2);

    var $sliderContainer=$('<div id="slider-range"></div>'); 
    var $sliderText3=$('<p id="textbar"></p>');
    var $sliderSlideInput=$('<input id="slidevalue" type="text" class="sliderStyle"></input>');
    var $lineBr=$('<br></br>'); 
    $mapForm2.append($lineBr);
    var $sliderSlideLabel=$('<label for="amount">Show tasks between:</label>');
    $sliderSlideInput.readonly=true;
    $sliderText3.append($sliderSlideLabel).append($sliderSlideInput);
    $sliderContainer.append($sliderText3);
    $mapForm2.append($lineBr);
    $mapForm2.append($lineBr);
    $mapForm2.append($sliderContainer);
    var $textLabel=$('<p class="pcode2">The tasks in range are:</p>');
    var $mapDiv2=$('<div id="mapSummaryDiv" class="mapStyle2"></div>');
    $mapForm2.append($mapDiv2);

    var $taskDiv=$('<div id="taskDiv"></div>');
    $mapForm2.append($taskDiv);
    $divMapViewForm.append($mapForm2);
    parentElement.append($divMapViewForm);  
  }
  
  return {
    createTaskEntryForm: createTaskEntryForm,
    createTaskEditForm: createTaskEditForm,
    createMapView: createMapView
  };
  
})();