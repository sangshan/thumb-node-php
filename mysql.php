<?php
class mysql{
  var $count;
  var $conn;
  function __construct(){
    header('Content-type:text/html; charset=utf-8');
    $this->conn = new mysqli('localhost', 'root', '', 'myDB');
    if($_REQUEST['method']=='get'){
      $this->select();
    }else{
      $this->update();
    }
  }
  function select(){
    $sql = "SELECT * FROM `fabulous` WHERE 1";
    $result = $this->conn->query($sql);
    while($row = $result->fetch_assoc()) {
      $this->count=$row["count"];
    }
  }
  function update(){
    $this->select();
    $sql = "UPDATE `fabulous` SET `count`=".($this->count+1)." WHERE 1";
    $result = $this->conn->query($sql);
    if($result){
      $this->select();
    }
  }
  function __destruct(){
    echo json_encode(array('count'=>$this->count, 'code'=>0),JSON_UNESCAPED_UNICODE);
    $this->conn->close();
  }
}
$a=new mysql();
?>  