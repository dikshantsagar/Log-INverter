var ajax=new XMLHttpRequest();
var method = "POST";
var url ="getdata.php";
var asynchronous= true;
var quer="SELECT * FROM stock;"
ajax.open(method,url,asynchronous);
ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
ajax.send("query="+quer);

ajax.onreadystatechange = function ()
{
  if(this.readyState==4 && this.status==200)
  {
    var data=JSON.parse(this.responseText);
    //console.log(this.responseText);
    var tbody=document.getElementById("tablebody");
    setTimeout(function (){

      // thing delayed.
      for(var i=0;i<data.length;i++)
      {
        
        var row=document.createElement("tr");
        var en1=document.createElement("td");
        var en2=document.createElement("td");
        var en3=document.createElement("td");
        var en4=document.createElement("td");
        en1.innerHTML=data[i].model;
        en2.innerHTML=data[i].rate;
        en3.innerHTML=data[i].quantity;
        en4.innerHTML=data[i].type;
        row.appendChild(en1);
        row.appendChild(en2);
        row.appendChild(en3);
        row.appendChild(en4);
        tbody.appendChild(row);
      }
      var l=document.getElementById("loader");
      var bod=document.getElementById("mcard");
      bod.removeChild(l);
    }, 2000);
    
    
  }
}

$("#home").click(function ()
{
  window.location="index.html";
});

$("#update").click(function ()
{ 
  var model=$("#updmodel").val();
  var quan=$("#updquantity").val();
  var query="UPDATE stock SET quantity="+quan+" WHERE model='"+model+"'";
  var ajx=new XMLHttpRequest();                                   // post fix kar.
  var meth="POST";
  var ur="putdata.php";
  ajx.open(meth,ur,asynchronous);
  ajx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajx.send("query="+query);
  window.location="stock.html";
  
  
});

$("#add").click(function()
{
  var model=$("#addmodel").val();
  var quan=$("#addquantity").val();
  var rate=$("#addrate").val();
  var type=$("#addtype").val();
  var query="INSERT INTO stock VALUES('"+model+"',"+rate+","+quan+",'"+type+"');";
  var ajx=new XMLHttpRequest();                                   // post fix kar.
  var meth="POST";
  var ur="putdata.php";
  ajx.open(meth,ur,asynchronous);
  ajx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajx.send("query="+query);
  window.location="stock.html";

});