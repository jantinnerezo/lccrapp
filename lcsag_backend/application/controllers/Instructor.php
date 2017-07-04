<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Instructor extends CI_Controller {
        
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
     
       $this->load->model('instructor_model'); 
       $this->load->library('encrypt'); 
      
      
    }
  
    public function signup(){

        $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);
            $instructor_id = $request->username;
            $sid = $request->id;
            $lastname = $request->lastname;
            $firstname = $request->firstname;
            $password = $request->password;
            $confirmed = $request->confirmed;
           
       /* $data = array(

          'school_id' => $this->input->get('id'),
          'instructor_lastname' =>$this->input->get('lastname'),
          'instructor_firstname' => $this->input->get('firstname'),
          'instructor_username' => $this->input->get('username'),
          'instructor_password' => $this->input->get('password')
        
          );*/

        $encrypt_pass = $this->encrypt->encode($password);
        
        if($encrypt_pass){

           $data = array(
                
                'instructor_id'=>$instructor_id,
                'school_id' => $sid,
                'instructor_lastname' => $lastname,
                'instructor_firstname' => $firstname,
                'instructor_password' => $password,
                'confirmed' => $confirmed
             );

            $this->instructor_model->signup_instructor($data);

        }
      }

    }
    public function login(){

            $username =  $this->input->get('username');
            $password =  $this->input->get('password');
            echo json_encode($this->instructor_model->login_instructor($username, $password));
      
    }

    public function signup_error(){

        $id =  $this->input->get('id');
        echo json_encode($this->instructor_model->already_exist($id));
    }
     public function username_check(){

        $username =  $this->input->get('username');
        echo json_encode($this->instructor_model->check_username($username));
    }
     public function update_profile(){

         $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);

    
     
            $id = $request->instructor_id;
            $data1 = $request->school_id;
            $data2 = $request->instructor_firstname;
            $data3 = $request->instructor_lastname;
            $data4 = $request->instructor_username;
            $data5 = $request->instructor_password;
         
 
        $data = array(

          'school_id' => $data1,
          'instructor_firstname' =>$data2,
          'instructor_lastname' => $data3,
          'instructor_username' =>$data4,
          'instructor_password'=>$data5
  
          );
          
          $this->instructor_model->update($id,$data);
       }
    }

    public function instructors(){

            $id =  $this->input->get('id');
            echo json_encode($this->instructor_model->fetch_instructors($id));
        
  
    }
 
   
   


}
