var ajax=new XMLHttpRequest();
var method = "POST";
var url ="getdata.php";
var asynchronous= true;
var quer="SELECT * FROM sale;"
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
        var en8=document.createElement("td");
        var en9=document.createElement("td");
        
        en1.innerHTML=data[i].billno;
        en2.innerHTML=data[i].emp_id;
        en3.innerHTML=data[i].cust_id;
        en4.innerHTML=data[i].model;
        en5.innerHTML=data[i].rate;
        en6.innerHTML=data[i].quantity;
        en7.innerHTML=data[i].total;
        en8.innerHTML=data[i].purchase;
        en9.innerHTML=data[i].warranty_validity;
        row.appendChild(en1);
        row.appendChild(en2);
        row.appendChild(en3);
        row.appendChild(en4);
        row.appendChild(en5);
        row.appendChild(en6);
        row.appendChild(en7);
        row.appendChild(en8);
        row.appendChild(en9);
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

$("#sale").click(function()
{
  var eid=$("#seid").val();
  var cid=$("#scid").val();
  var model=$("#smodel").val();
  var rate=$("#srate").val();
  var quan=$("#squantity").val();
  var d=new Date();
  var date=d.getDate().toString()+"/"+d.getMonth().toString()+"/"+d.getFullYear().toString();
  var wdate=d.getDate().toString()+"/"+d.getMonth().toString()+"/"+(d.getFullYear()+3).toString();
  var query="INSERT INTO sale (emp_id,cust_id,model,rate,quantity,total,purchase,warranty_validity) VALUES('"+eid+"','"+cid+"','"+model+"',"+rate+","+quan+","+rate*quan+",'"+date+"','"+wdate+"');";
  
  var gq1="SELECT no_of_sales FROM employee WHERE id='"+eid+"';";
  var gq2="SELECT no_of_sales FROM customer WHERE id='"+cid+"';";
  var ajx=new XMLHttpRequest();                                   // post fix kar.
  var meth="POST";
  var ur="putdata.php";
  ajx.open(meth,ur,asynchronous);
  ajx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajx.send("query="+query);
  var c1;
  var c2;

  var aj1=new XMLHttpRequest();

  aj1.open("POST","getdata.php",asynchronous);
  aj1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  aj1.send("query="+gq1);
  console.log(gq1);
  aj1.onreadystatechange=function()
  {
    if(this.readyState==4 && this.status==200)
    {
      var t=JSON.parse(aj1.responseText);
      c1=t[0].no_of_sales;
      console.log(c1);
      var query2="UPDATE employee SET no_of_sales="+(parseInt(c1)+1)+" WHERE id='"+eid+"';";
      ajx.open(meth,ur,asynchronous);
      ajx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      ajx.send("query="+query2);
      console.log(query2);
    }
  }

  var aj2=new XMLHttpRequest();
  aj2.open("POST","getdata.php",asynchronous);
  aj2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  aj2.send("query="+gq2);
  aj2.onreadystatechange=function()
  {
    if(this.readyState==4 && this.status==200)
    {
      t=JSON.parse(aj2.responseText);
      c2=t[0].no_of_sales;
      var query3="UPDATE customer SET no_of_sales="+(parseInt(c2)+1)+" WHERE id='"+cid+"';";
      ajx.open(meth,ur,asynchronous);
      ajx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      ajx.send("query="+query3);
      console.log(query3);
    }
  }

  //window.location="sale.html";

})