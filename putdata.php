<?php

$query=$_REQUEST['query'];

$conn = mysqli_connect("localhost","root","","loginverter");

$result=mysqli_query($conn,$query);

echo $result;