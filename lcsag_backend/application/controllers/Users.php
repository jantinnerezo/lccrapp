<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller {
        



    public function __construct ()
    {
       parent::__construct();
     
       $this->load->model('user_model'); 
      
    }

    public function login(){


      $username = $this->input->get('username');
      $password = $this->input->get('password');
       echo json_encode($this->user_model->check_usr($username, $password));


    }
    public function profile(){

      $user_id = $this->input->get('user_id');
      echo json_encode($this->user_model->user_profile($user_id));


    }
    public function register(){

      $firstname = $this->input->get('firstname');
      $lastname = $this->input->get('lastname');
      $username = $this->input->get('username');
      echo json_encode($this->user_model->register($firstname, $lastname, $username, $email));

    }
    public function wishlist(){

      $user_id = $this->input->get('user_id');

      echo json_encode($this->user_model->customer_wishlist($user_id));
    }

    
}
