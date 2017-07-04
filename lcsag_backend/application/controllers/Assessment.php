<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Assessment extends CI_Controller {
        
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
     
       $this->load->model('assessment_model'); 
      
      
    }
    public function assessments(){
      $class_id = $this->input->get('id');
      $type_id = $this->input->get('type_id');
      $term_id = $this->input->get('term');
      echo json_encode($this->assessment_model->fetch_assessment($class_id, $type_id, $term_id));
    }
    public function types(){
      echo json_encode($this->assessment_model->assessment_types());
    }
    public function terms(){
      echo json_encode($this->assessment_model->current_terms());
    }
   
    public function add_assessment(){

         $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
            $data1 = $request->assessment_name;
            $data2 = $request->type_id;
            $data3 = $request->assessment_score;
            $data4 = $request->class_id;
            $data5 = $request->term_id;
            $data6 = $request->assessment_status;
      
 
        $data = array(

          'assessment_name' => $data1,
          'type_id' =>$data2,
          'assessment_totalScore' => $data3,
          'class_id' => $data4,
          'term_id' =>$data5,
          'assessment_status'=>$data6,
  
          );
          
          $this->assessment_model->new_assessment($data);
       }
    }


     public function add_student_assessment(){

         $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
            $data1 = $request->student_id;
            $data2 = $request->assessment_id;
            $data3 = $request->stud_score;
            $data4 = $request->status;
         
      
 
        $data = array(

          'student_id' => $data1,
          'assessment_id' =>$data2,
          'stud_score' => $data3,
          'status' => $data4,

          );
          
          $this->assessment_model->insert_student_assessment($data);
       }
    }

     public function update_assessment(){

         $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
            $id = $request->assessment_id;
            $data1 = $request->assessment_name;
            $data2 = $request->type_id;
            $data3 = $request->assessment_score;
            $data4 = $request->term_id;
            $data5 = $request->assessment_status;
      
 
        $data = array(

          'assessment_name' => $data1,
          'type_id' =>$data2,
          'assessment_totalScore' => $data3,
          'term_id' =>$data4,
          'assessment_status'=>$data5
  
          );
          
          $this->assessment_model->update($id,$data);
       }
    }

     public function update_stud_assessment(){

        
         $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
            $id = $request->stud_id;
            $data1 = $request->student_id;
            $data2 = $request->assessment_id;
            $data3 = $request->stud_score;
            $data4 = $request->status;
         
      
 
        $data = array(

          'student_id' => $data1,
          'assessment_id' =>$data2,
          'stud_score' => $data3,
          'status' => $data4,

          );
          
          $this->assessment_model->update_student_assessment($id,$data);
       }
    }
    public function stud_assessment(){
        $id = $this->input->get('id');    
        echo json_encode($this->assessment_model->student_assessment($id));
    }
   public function delete_assessment(){
        $id = $this->input->get('id');    
        echo json_encode($this->assessment_model->remove_assessment($id));
    }


}
