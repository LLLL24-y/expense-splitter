<?php
$conn=mysqli_connect("localhost","root","","expense_splitter");
if(!$conn){
    die("Connection failed". mysqli_connect_error());
}
?>