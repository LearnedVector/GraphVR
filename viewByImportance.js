function viewByImportance(){
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
  }
}
