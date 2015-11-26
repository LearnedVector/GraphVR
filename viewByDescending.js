function viewByDescending(){
  //get the two selections
  var element1=$("#select1").val();
  var element2=$("#select2").val();
  if (element1==element2)
  {
    alert("Cannot pick the same thing")
  }else{
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
                    // console.log("Found match");
                    // console.log(leftGraph[i]);
                    // console.log(rightGraph[j]);
                    var printablevalue_L = calc_difference(leftGraph[i],rightGraph[j]);
                        leftGraph[i].printableVal=printablevalue_L;
                    rightGraph[j].printableVal=0;
                    //make right[i].printableval =0, so we won't print it later
                }
                else
                {
                    var printablevalue_R = calc_difference(rightGraph[j],leftGraph[i]);
                    rightGraph[j].printableVal=printablevalue_R;
                    leftGraph[i].printableVal = 0;
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
  // console.log(graphArray)
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
          html+="<div class='callout' id ='callout"+graphArray[i].objName+[i]+"'>";
          html+=printCalloutVal(graphArray[i])
          html+="</div>";
        }
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
    hoverOver(graphArray, side, graphArray.length)
}
