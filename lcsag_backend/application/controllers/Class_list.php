<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Class_list extends CI_Controller {
        
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
     
       $this->load->model('class_list_model'); 
      
      
    }
     //----------------------------------------------
    public function classList(){
 
        $find = $this->input->get('find');
        $sem = $this->input->get('sem');
        $sy = $this->input->get('sy');
        $id = $this->input->get('id');
        $sched = $this->input->get('sched');
        echo json_encode($this->class_list_model->class_list($find, $sem, $sy, $id, $sched));
    
    }
     public function count_class(){
 
        
        $id = $this->input->get('id');
        echo json_encode($this->class_list_model->count($id));
    
    }
    //-----------------------------------------------
    public function get_sem(){
 
      
        echo json_encode($this->class_list_model->get_semester());
    
    }
     //-----------------------------------------------
    public function get_sy(){
 
      
        echo json_encode($this->class_list_model->get_schoolyear());
    
    }
      //-----------------------------------------------
    public function classSchedules(){
 
      
        echo json_encode($this->class_list_model->class_schedules());
    
    }
       //-----------------------------------------------
    public function rooms(){
 
      
        echo json_encode($this->class_list_model->get_room());
    
    }
    public function update_class(){

         $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
            $id = $request->class_id;
            $data1 = $request->class_name;
            $data2 = $request->class_desc;
            $data3 = $request->schedule_id;
            $data4 = $request->class_time;
            $data5 = $request->room_id;
            $data6 = $request->class_sem;
            $data7 = $request->class_schoolyear;
            $data8 = $request->id;
 
        $data = array(


          
          'class_name' => $data1,
          'class_desc' =>$data2,
          'schedule_id' =>$data3,
          'class_time' =>$data4,
          'room_id' =>$data5,
          'semester_id' => $data6,
          'schoolyear_id' => $data7,
          'instructor_id'=>$data8
          //'instructor_id' => $this->input->post('instructor_id')
        
          );
          echo json_encode($data);
         $this->class_list_model->update_class($data, $id);
       }
    }

    public function add_class(){

         $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
            $data1 = $request->class_name;
            $data2 = $request->class_desc;
            $data3 = $request->schedule_id;
            $data4 = $request->start_time;
            $data5 = $request->end_time;
            $data6 = $request->room_id;
            $data7 = $request->class_sem;
            $data8 = $request->class_schoolyear;
            $data9 = $request->id;
 
        $data = array(

          'class_name' => $data1,
          'class_desc' =>$data2,
          'schedule_id' =>$data3,
          'start_time' =>$data4,
          'end_time' =>$data5,
          'room_id' =>$data6,
          'semester_id' => $data7,
          'schoolyear_id' => $data8,
          'instructor_id'=>$data9
          //'instructor_id' => $this->input->post('instructor_id')
        
          );
          echo json_encode($data);
         $this->class_list_model->add_class($data);
       }
    }
    public function delete(){
 
        $id = $this->input->get('class_id');
        echo json_encode($this->class_list_model->delete_class($id));
    
    }
    public function sem_year(){

         echo json_encode($this->class_list_model->currentsem_year());
    }

   /* public function addClass(){

         $postdata = file_get_contents("php://input");
         if (isset($postdata)) {
         $request = json_decode($postdata);
         $username = $request->username;
         
         if ($username != "") {
         echo "Server returns: " . $username;
         }
         else {
         echo "Empty username parameter!";
         }
         }
         else {
         echo "Not called properly with username parameter!";
         }

    }*/

    

   
   


}
