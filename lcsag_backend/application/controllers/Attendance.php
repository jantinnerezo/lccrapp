<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Attendance extends CI_Controller {
        
    public function __construct ()
    {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-Auth-Token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
        header("Access-Control-Allow-Methods: GET, HEAD, POST, OPTIONS, PUT, DELETE");
          $method = $_SERVER['REQUEST_METHOD'];
          if($method == "OPTIONS") {
           die();
          }
        parent::__construct();
     
       $this->load->model('attendance_model'); 
      
      
    }
    public function attendance_list(){
      $month =  $this->input->get('month');
      $year =  $this->input->get('year');
      $class_id = $this->input->get('id');
      echo json_encode($this->attendance_model->attendance_records($class_id, $month, $year));
    }
    public function get_id(){
      echo json_encode($this->attendance_model->max_id());
    }
    public function add_attendance(){

         $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
            $data1 = $request->attendance_id;
            $data2 = $request->attendance_label;
            $data3 = $request->attendance_date;
            $data4 = $request->attendance_time;
            $data5 = $request->class_id;
            $data6 = $request->status;
  
        $data = array(

          'attendance_id' => $data1,
          'attendance_label' => $data2,
          'attendance_date' =>$data3,
          'attendance_time' =>$data4,
          'class_id' => $data5,
          'status' => $data6
 
          );
         
          $this->attendance_model->insert_attendance($data);
          echo json_encode($data);
       }
    }
     public function add_student_attendance(){

         $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
            $data1 = $request->student_id;
            $data2 = $request->attendance_id;
            $data3 = $request->status;
  
        $data = array(

          'student_id' => $data1,
          'attendance_id' =>$data2,
          'status' =>$data3,
         
          );
         
          $this->attendance_model->insert_student_attendance($data);
          echo json_encode($data);
       }
    }
    public function count_attendance(){
        $id = $this->input->get('id');    
        echo json_encode($this->attendance_model->count_status($id));
    }
    public function stud_attendance(){
        $id = $this->input->get('id');    
        echo json_encode($this->attendance_model->student_attendance($id));
    }
    public function attendance_details(){
        $id = $this->input->get('id');    
        echo json_encode($this->attendance_model->get_attendance($id));
    }
     public function delete_attendance(){
        $id = $this->input->get('id');    
        echo json_encode($this->attendance_model->remove_attendance($id));
    }
  


}
