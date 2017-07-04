<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Instructor_model extends CI_Model{


		
		public function signup_instructor($data)
		{ 
		
				$this->db->insert("instructor", $data);
					
		}
		public function already_exist($id){

			$this->db->where("school_id", $id);
			$query = $this->db->get("instructor");


			if($query->num_rows() > 0){
				return true;
			}else{

				return false;
			}
			
		}
		public function check_username($username){

			$this->db->where("instructor_id", $username);
			$query = $this->db->get("instructor");


			if($query->num_rows() > 0){
				return true;
			}else{

				return false;
			}
			
		}

		public function login_instructor($username, $password){

			$this->db->where("instructor_id", $username)
					 ->where("instructor_password", $password)
					 ->where("confirmed", 1)
					 ->from("instructor");

			$instructor_data = $this->db->get();

			if($instructor_data->num_rows() > 0){
				return $instructor_data->result();
			}else{

				return false;
			}
		}
		public function update($id, $data){
			 $this->db->where('instructor_id', $id);
			 $this->db->update('instructor', $data);

		}

		public function fetch_instructors($id){

			$instructors_data  = $this->db->query("select* from instructor where instructor_id != '".$id."'");

			//$instructors_data = $this->db->get('instructor');

			if($instructors_data->num_rows() > 0){
				return $instructors_data->result();
			}else{

				return false;
			}

		}

}

?>