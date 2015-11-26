function viewByImportance()
{
  //get the two selections
  var element1=$("#select1").val();
  var element2=$("#select2").val();
  if (element1==element2)
  {
    alert("Cannot pick the same thing")
  }
  else
  {
    clear_info()
    //set header to elementname
    $("#elem1-header").append(element1);
    $("#elem2-header").append(element2);

    //find the id of the selection
    var elem1id=find_id(element1);
    var elem2id=find_id(element2);

    //arrays to store values from dataset
    var leftGraphArray = find_values(elem1id,element1)
    var rightGraphArray = find_values(elem2id,element2)


    getDiffArrayImportance(leftGraphArray, rightGraphArray)

    //find sort the graph by importance first
    leftGraphArray.sort(sortByImportance)
    rightGraphArray.sort(sortByImportance)
    //after that sort the graph by warning at the bottom
    sortByWarning(leftGraphArray)
    sortByWarning(rightGraphArray)

    sortImpLvl(leftGraphArray)
    sortImpLvl(rightGraphArray
    )
    //print out graph
    printByImportance(leftGraphArray, "l")
    printByImportance(rightGraphArray, "r")

  }
}

function sortByImportance(a,b)
{
    return b.importance - a.importance
}

function sortByWarning(object){

  //this block of code will push warning to the bottom
  lastIndex = (object.length - 1)
  i = 0
  while (i < object.length){
    if(object[i].warning == true && i <= lastIndex){
      tempObj = object[i]
      for (j = i; j < lastIndex; j++){
        object[j] = object[j+1]
      }
      object[lastIndex] = tempObj
      lastIndex--
    }
    else{
      i++
    }
  }
}

function sortImpLvl(object){
  //now to sort each importance level by value in descending order
  i = 0 ,i1 = 0, i2 = 0 ,i3 = 0, iw = 0
  var importance3Object = []
  var importance2Object = []
  var importance1Object = []
  var warningObject = []
  while (i < object.length){
    // console.log("masterloop")

    if (object[i].importance == 3){
      // console.log("found3")
      if (object[i].warning == true){
        warningObject[iw] = object[i]
        iw++
        // console.log("addToWarningObjectFrom3")
      }else{
        importance3Object[i3] = object[i]
        i3++
        // console.log("addobjectto3")
      }
    }//end of importance 3 conditional statement
    else if (object[i].importance == 2){
      // console.log("found2")
      if(object[i].warning == true){
        warningObject[iw] = object[i]
        iw++
        // console.log("addToWarningObjectFrom2")
      }else{
        importance2Object[i2] = object[i]
        i2++
        // console.log("addobjectto2")
      }
    }//end of importance 2 conditional
    else if(object[i].importance == 1){
      // console.log("found1")
      if(object[i].warning == true){
        warningObject[i1] == object[i]
        i1++
        // console.log("addToWarningObjectFrom1")
      }else{
        importance1Object[i1] = object[i]
        i1++
      }
    }//end of importance 1 conditional
    i++; //increase if not find object with importance
  }

  importance3Object.sort(descending)
  importance2Object.sort(descending)
  importance1Object.sort(descending)
  warningObject.sort(descending)

  index = 0, index3 = 0, index2 = 0, index1 = 0, indexw = 0;
  while(index3 < i3){
    object[index] = importance3Object[index3]
    index++
    index3++
  }
  while(index2 < i2){
    object[index] = importance2Object[index2]
    index++
    index2++
  }
  while(index1 < i1){
    object[index] = importance1Object[index1]
    index++
    index1++
  }
  while(indexw < iw){
    object[index] = warningObject[indexw]
    index++
    indexw++
  }
  console.log(object)
}

function getDiffArrayImportance(leftGraph,rightGraph){
      //First, we compare the graphs and find like attributes
      for (var i=0; i<leftGraph.length; i++) {
          for (var j=0; j<rightGraph.length; j++)
          { //find identical attribute to compare
              if (leftGraph[i].att_Name == rightGraph[j].att_Name)
              {
                  if (leftGraph[i].value > rightGraph[j].value)
                  {
                      // console.log("Found match");
                      // console.log(leftGraph[i]);
                      // console.log(rightGraph[j]);
                      var printablevalue_L = calc_difference(leftGraph[i],rightGraph[j]);
                          leftGraph[i].printableVal=printablevalue_L;
                          rightGraph[j].printableVal= 400 - printablevalue_L;
                      //make right[i].printableval =0, so we won't print it later
                  }
                  else
                  {
                      var printablevalue_R = calc_difference(rightGraph[j],leftGraph[i]);
                      rightGraph[j].printableVal=printablevalue_R;
                      leftGraph[i].printableVal = 400 - printablevalue_R;
                  //make left[i] printable =0, so we won't print it later
                  }
              }
              //else, if no same attribute,
              //We need to do something with that value and make it printable.
          }
      } //endfor
}
function printByImportance(graphArray, side){
  console.log(graphArray)
  var html=""
  for (var i=0; i<graphArray.length;i++)
  {
      if (graphArray[i].warning == true){
          var warning = "warning"
      }else {
          var warning = ""
      }
        html+="<div id='"+graphArray[i].objName+[i]+"' class='"+warning+" generalbar importance"+graphArray[i].importance+"'></div>"
        html+="<div class='callout' id ='callout"+graphArray[i].objName+[i]+"'>";
        html+=printCalloutVal(graphArray[i])
        html+="</div>";
  }
  if (side=='l')
  {
      $("#leftside").append(html)
  }
  else{
      $("#rightside").append(html)
  }
  var index = 0;
  animate(graphArray, side, index)
}
