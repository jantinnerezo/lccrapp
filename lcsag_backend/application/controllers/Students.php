<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Students extends CI_Controller {
        
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
     
       $this->load->model('students_model'); 
      
      
    }
     //----------------------------------------------
    public function all_students(){
 
       $find = $this->input->get('find');
       $limit = $this->input->get('limit');
       $offset = $this->input->get('offset');
       $course = $this->input->get('course');
       $year = $this->input->get('year');
       echo json_encode($this->students_model->allstudents($find,$limit,$offset,$course, $year));
     
    }
     //----------------------------------------------
    public function class_students(){
 
       $sort = $this->input->get('sort');
       $find = $this->input->get('find');
       $id = $this->input->get('id');
       echo json_encode($this->students_model->students($sort, $find, $id));
     
    }
     public function save_student(){

         $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
            $data1 = $request->student_id;
            $data2 = $request->class_id;
          
 
        $data = array(

          'student_id' => $data1,
          'class_id' =>$data2
        
        
          );
          echo json_encode($data);
         $this->students_model->add_student($data);
       }
    }
    public function rm_student(){

        $student_id = $this->input->get('student_id');
        $class_id = $this->input->get('class_id');
       echo json_encode($this->students_model->remove_student($student_id,$class_id));
    }
     public function onsave_student(){

        $student_id = $this->input->get('student_id');
        $class_id = $this->input->get('class_id');
       echo json_encode($this->students_model->already_exist($student_id,$class_id));
    }

    public function count_students(){

        $id = $this->input->get('id');
       echo json_encode($this->students_model->students_count($id));
    }
     public function count_allstudents(){

       
       echo json_encode($this->students_model->allstudents_count());
    }
    public function courses(){

       
       echo json_encode($this->students_model->fetch_course());
    }
    public function year_levels(){

       
       echo json_encode($this->students_model->year_level());
    }
    public function display_student_class(){

        $id = $this->input->get('id');
       echo json_encode($this->students_model->student_class_list($id));
    }

   
    public function display_attendance_count(){

        $student_id = $this->input->get('student_id');
        $class_id = $this->input->get('class_id');
       echo json_encode($this->students_model->count_attendance_record($student_id, $class_id));
    }
   


}
