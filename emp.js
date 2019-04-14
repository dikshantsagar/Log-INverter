var ajax=new XMLHttpRequest();
var method = "POST";
var url ="getdata.php";
var asynchronous= true;
var quer="SELECT * FROM employee;"
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
        var en5=document.createElement("td");
        var en6=document.createElement("td");
        var en7=document.createElement("td");
        var b=document.createElement("button");
        b.className="btn btn-warning";
        b.innerHTML="Pay";
        var bd=document.createElement("button");
        bd.className="btn btn-warning disabled";
        bd.innerHTML="Pay";
        if(data[i].due=="T")
        {
          en7.appendChild(b);
          
        }
        else{
          en7.appendChild(bd);
        }

        
        en1.innerHTML=data[i].id;
        en2.innerHTML=data[i].name;
        en3.innerHTML=data[i].salary;
        en4.innerHTML=data[i].address;
        en5.innerHTML=data[i].phone;
        en6.innerHTML=data[i].no_of_sales;
        
        row.appendChild(en1);
        row.appendChild(en2);
        row.appendChild(en3);
        row.appendChild(en4);
        row.appendChild(en5);
        row.appendChild(en6);
        row.appendChild(en7);
        
        

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

$("#add").click(function()
{
  var id=$("#id").val();
  var name=$("#name").val();
  var sal=$("#sal").val();
  var addr=$("#addr").val();
  var ph=$("#phone").val();
  var query="INSERT INTO employee VALUES('"+id+"','"+name+"',"+sal+",'"+addr+"','"+ph+"',0,'F');"
  var ajx=new XMLHttpRequest();                                   // post fix kar.
  var meth="POST";
  var ur="putdata.php";
  ajx.open(meth,ur,asynchronous);
  ajx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajx.send("query="+query);
  window.location="employee.html";
});