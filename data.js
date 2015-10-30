var database = {

    obj:{
        0:{
            name: "UMKC",
            catID: 0
        },
        1:{
            name: "MU",
            catID: 0
        }
    },

    dataset:{
        0:{
            value: 22188,
            objID: 0,
            attID: 0
        },
        1:{
            value: 19647,
            objID: 1,
            attID: 0
        },
        2:{
            value: 34935,
            objID: 0,
            attID: 1
        },
        3:{
            value: 34000,
            objID: 1,
            attID: 1
        },
        4:{
            value: 15259,
            objID: 0,
            attID: 2
        },
        5:{
            value: 32341,
            objID: 1,
            attID: 2
        },
        6:{
            value: 467007,
            objID: 0,
            attID: 3
        },
        7:{
            value: 115276,
            objID: 1,
            attID: 3
        },
        8:{
            value: 56,
            objID: 0,
            attID: 4
        },
        9:{
            value: 81,
            objID: 1,
            attID: 4
        },
        10:{
            value: 35,
            objID: 0,
            attID: 5
        },
        11:{
            value: 69,
            objID: 1,
            attID: 5
        }
    },

    attribute:{
        0:{
            name: "in-state tuition",
            warning: false,
            importance: 3
        },
        1:{
            name: "Out-of-State Tuition",
            warning: true,
            importance: 3
        },
        2: {
            name: "Student-Size",
            warning: false,
            importance: 1
        },
        3: {
            name: "City Population",
            warning: false,
            importance: 3,
        },
        4: {
            name: "Acceptance Rate",
            warning: false,
            importance: 2
        },
        5: {
            name: "Graduation Rate",
            warning: false,
            importance: 3
        }
    },

    category:{
        0:{
            name: "colleges"
        }
    }

}









<!---FUNCTIONS-------------------------------------------------------->
    
    
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

function generate_chart(){
    //get the two selections
    var element1=$("#select1").val();
    var element2=$("#select2").val();

    //find the id of the selection
    var elem1id=find_id(element1);
    var elem2id=find_id(element2);
    
    //arrays to store values from dataset
    var leftGraphArray = find_values(elem1id);
    var rightGraphArray = find_values(elem2id);
    
    console.log(leftGraphArray);
    
    //get differences array
   var differenceArray = getdifferenceArray(leftGraphArray,rightGraphArray);
    
    //print out the array
    
    
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
function find_values(elemid){
    var graphArray = [];
    for(var i=0; i<Object.keys(database.dataset).length; i++) {
        if(database.dataset[i].objID == elemid)
        {
          var value = database.dataset[i].value
          var attID = database.dataset[i].attID
          var attName = database.attribute[attID].name
          var attWarning = database.attribute[attID].warning
          var attImportance = database.attribute[attID].importance
          
          graphArray.push({name: attName, value: value, warning: attWarning, importance: attImportance})
        }
    }
    
    return graphArray;
}

//takes in array, returns array of differences
function getdifferenceArray(leftGraph,rightGraph)
{
    var leftGraphdiff = [];
    var rightGraphdiff = [];
    
    for (var i=0; i<leftGraph.length; i++) {
        for (var j=0; j<rightGraph.length; j++)
        { //find identical attribute to compare
            if (leftGraph[i].name == rightGraph[j].name)
            {
                //compare if left value is bigger
                if (leftGraph[i].value > rightGraph[j].value)
                {
                    var percentDifference = calc_difference(leftGraph[i].value,rightGraph[j].value);
                }
                else
                {
                    var percentDifference = calc_difference(rightGraph[j].value,leftGraph[i].value);
                }
                
            }
        
        }
    }
}

                        
function calc_difference(bignum, smallnum)
{
    var percentdifference = Math.abs((bignum-smallnum)/(bignum+smallnum))
    return percentdifference;
}