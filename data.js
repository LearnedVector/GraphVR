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

