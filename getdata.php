<?php

$query=$_REQUEST['query'];
$conn = mysqli_connect("localhost","root","","loginverter");

$result = mysqli_query($conn,$query);

$data=array();
while($row=mysqli_fetch_assoc($result))
{
    $data[]=$row;
}


echo json_encode($data);