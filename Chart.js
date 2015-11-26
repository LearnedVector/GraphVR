function init(){
  load_selectoptions();
}

function load_selectoptions(){
  var data = database["obj"];
  for(var i=0; i<Object.keys(database.obj).length; i++){
    $("#select1").append(get_options(data[i]));
    $("#select2").append(get_options(data[i]));
  }
}

function get_options(data){
  var html="";
  html+="<option value='"+data["name"]+"'>"+data["name"]+"</option>";
  return html;
}

function clear_info(){
  $("#leftside").empty()
  $("#rightside").empty()
  $("#elem1-header").empty()
  $("#elem2-header").empty()
}

//finds information about the two selected objects
function Go(){
  //get the two selections
  var element1=$("#select1").val();
  var element2=$("#select2").val();
  if (element1==element2)
  {
    alert("Cannot pick the same thing")
  }
  else{
    clear_info()
    $('#viewDescending').addClass("active")
    $('#viewImportance').removeClass("active")
    viewByDescending(element1,element2)
  }
}

//get object id
function find_id(value){
  var objID;
  for(var i=0; i<Object.keys(database.obj).length; i++) {
    if(database.obj[i].name == value)
    {
      objID=i;
    }
  }
  return objID;
}

//gets all the values of an object and returns an array
function find_values(elemid,elementName){
  var graphArray = [];
  for(var i=0; i<Object.keys(database.dataset).length; i++)     {
    if(database.dataset[i].objID == elemid)
    {
      var value = database.dataset[i].value
      var attID = database.dataset[i].attID
      var attName = database.attribute[attID].name
      var attWarning = database.attribute[attID].warning
      var attImportance = database.attribute[attID].importance
      var printableVal = 0
      var percentageDiff = 0

      graphArray.push({objName:elementName, att_Name: attName, value: value, warning: attWarning, importance: attImportance, printableVal:0, percentageDiff:0})
    }
  }
  return graphArray;
}

function hoverOver(object, side, index){

  if (side == 'l'){
    $("#leftside").on('mouseenter', 'div', function(e){
      // console.log(e.pageX)
      // console.log(e.pageY)
      for (i = 0; i < index; i++){
        divId = object[i].objName+[i]
        if ($(this).attr('id') == divId){
          hoverCalloutId = "callout"+object[i].objName+[i]
          $('#'+hoverCalloutId).css({'position':'fixed', 'top': e.pageY, 'left': e.pageX})
          $('#'+hoverCalloutId).css('display', 'block')
        }
      }
    })
    $("#leftside").on('mouseleave', 'div', function(){
      for (i = 0; i < index; i++){
        divId = object[i].objName+[i]
        if ($(this).attr('id') == divId){
          hoverCalloutId = "callout"+object[i].objName+[i]
          $('#'+hoverCalloutId).css('display', 'none')
        }
      }
    })
  }

  if (side == 'r'){
    $("#rightside").on('mouseenter', 'div', function(e){
      for (i = 0; i < index; i++){
        divId = object[i].objName+[i]
        if ($(this).attr('id') == divId){
          hoverCalloutId = "callout"+object[i].objName+[i]
          $('#'+hoverCalloutId).css({'position':'fixed', 'top': e.pageY, 'left': e.pageX})
          $('#'+hoverCalloutId).css('display', 'block')
        }
      }
    })
    $("#rightside").on('mouseleave', 'div', function(){
      for (i = 0; i < index; i++){
        divId = object[i].objName+[i]
        if ($(this).attr('id') == divId){
          hoverCalloutId = "callout"+object[i].objName+[i]
          $('#'+hoverCalloutId).css('display', 'none')
        }
      }
    })
  }

}

function animate(graphArray, side, i){
  setTimeout(function() {
    // console.log(graphArray[i].printableVal)
    if(side == 'l') {
      var shiftLeftValue = "-"+graphArray[i].printableVal.toString()+"px";
    }else {
      var shiftLeftValue = null;
    }

    if (graphArray[i].value != 0){
      $("#"+graphArray[i].objName+[i]).animate({width:graphArray[i].printableVal, left: shiftLeftValue},350)
      var name = graphArray[i].att_Name.replace(/\s/g, "&nbsp;")
      $("#"+graphArray[i].objName+[i]).html(name)
    }
    i++
    if( i < graphArray.length){
      animate(graphArray,side, i)
    }
  },30)
}

function printCalloutVal(object, i)
{

  //get the comparative object
  var element1=$("#select1").val();
  var element2=$("#select2").val();
  var html="";

  //get element id
  var elem1id=find_id(element1);
  var elem2id=find_id(element2);

  //get attribute id
  var attID = getAttID(object.att_Name);

  //get the real values
  realval1=actualValue(attID,elem1id);
  realval2=actualValue(attID,elem2id);

  //content for the callout
  html+="<b>"+object.att_Name+"</b>";
  if (object.objName==element1)
  {
    html+="<p>"+element1+": "+realval1+"  </br>"+element2+": "+realval2+"</br>";

  }
  else{
    html+="<p>"+element2+": "+realval2+"</br>"+element1+": "+realval1+"</br>";
  }

  html+=+object.percentageDiff+"% more</p>";

  return html;
}

//get the actual value
function actualValue(attribute,objectID)
{
  //step through the database
  for(var i=0; i<Object.keys(database.dataset).length; i++) {
    //find the exact object and attribute
    if (database.dataset[i].objID == objectID && database.dataset[i].attID == attribute)
    {
      return database.dataset[i].value;
    }
  }
}

//finds the attribute ID
function getAttID(att_name)
{
  for (var i=0; i<Object.keys(database.attribute).length; i++) {
    if (att_name == database.attribute[i].name)
    return i; //id
  }
}
