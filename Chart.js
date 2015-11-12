function init(){
    load_selectoptions();
}

function load_selectoptions(){
    var data = database["obj"];
    var html="";
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
function get_info(){
    //get the two selections
    var element1=$("#select1").val();
    var element2=$("#select2").val();

    if (element1==element2)
    {
      alert("Cannot pick the same thing")
    }
    else{

      clear_info()

      //set header to elementname
      $("#elem1-header").append(element1);
      $("#elem2-header").append(element2);

      //find the id of the selection
      var elem1id=find_id(element1);
      var elem2id=find_id(element2);

      //arrays to store values from dataset
      var leftGraphArray = find_values(elem1id,element1);
      var rightGraphArray = find_values(elem2id,element2);

      //find the differences in values of attributes
      getdifferenceArray(leftGraphArray,rightGraphArray);
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

//Parameters: Array of original values for Lgraph & Rgraph
function getdifferenceArray(leftGraph,rightGraph)
{
    //First, we compare the graphs and find like attributes
    for (var i=0; i<leftGraph.length; i++) {
        for (var j=0; j<rightGraph.length; j++)
        { //find identical attribute to compare
            if (leftGraph[i].att_Name == rightGraph[j].att_Name)
            {
                if (leftGraph[i].value > rightGraph[j].value)
                {
                    console.log("Found match");
                    console.log(leftGraph[i]);
                    console.log(rightGraph[j]);
                    var printablevalue_L = calc_difference(leftGraph[i],rightGraph[j]);
                        leftGraph[i].printableVal=printablevalue_L;
                    rightGraph[j].printableVal=0;
                    //make right[i].printableval =0, so we won't print it later
                }
                else
                {
                    var printablevalue_R = calc_difference(rightGraph[j],leftGraph[i]);
                    rightGraph[j].printableVal=printablevalue_R;
                    leftGraph[i].printableVal=0;
                //make left[i] printable =0, so we won't print it later
                }
            }
            //else, if no same attribute,
            //We need to do something with that value and make it printable.
        }
    } //endfor

    //sort both arrays by value number in descending order
    leftGraph.sort(descending);
    rightGraph.sort(descending);

    //print arrays
    printGraph(leftGraph,"l");
    printGraph(rightGraph,"r");
}


function calc_difference(bignum, smallnum)
{
    var percentdifference = (Math.abs((bignum.value-smallnum.value)/(bignum.value+smallnum.value)))
    
//store percent diff into the array with 2 decimal point    
bignum.percentageDiff=parseFloat(percentdifference*285).toFixed(2);
    
    //convert value into a printable pixel
    var max=285* (Math.random()*(1.4-1)+1)
    var printable_value = max - (max*percentdifference)
    
    return printable_value;
}

function descending(a,b){
    return b.printableVal-a.printableVal;
}

function printGraph(graphArray, side)
{
    var html=""
    for (var i=0; i<graphArray.length;i++)
    {
        if (graphArray[i].warning == true){
            var warning = "warning"
        }else {
            var warning = ""
        }
        if (graphArray[i].printableVal != 0){
          html+="<div id='"+graphArray[i].objName+[i]+"' class='"+warning+" generalbar importance"+graphArray[i].importance+"'></div>"
          html+="<div class='callout'>";
          html+=printCalloutVal(graphArray[i])
          html+="</div>";
        }
    }
    if (side=='l')
    {
        $("#leftside").append(html);
    }
    else{
        $("#rightside").append(html);
    }
    var index = 0;
    animate(graphArray, side, index)
}

function animate(graphArray, side, i){
    setTimeout(function() {
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

function viewByImportance()
{
 $("#viewDescending").removeClass("active");
 $("#viewImportance").addClass("active");    
}

function printCalloutVal(object)
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