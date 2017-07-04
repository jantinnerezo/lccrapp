<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Class_list_model extends CI_Model{


		public function class_list($find = NULL, $sem = NULL, $sy = NULL, $id = NULL)
		{ 

			if(!IS_NULL($find)){
				//$this->db->where('(idno = "'.$find.'" or Lastname like "%'.$find.'%" or Name like "%'.$find.'%")');
			}
			if(!IS_NULL($sem)){
				$this->db->where("my_class.semester_id", $sem);
			}
			if(!IS_NULL($sy)){
				$this->db->where("my_class.schoolyear_id", $sy);
			}
			if(!IS_NULL($id)){
				$this->db->where("my_class.instructor_id", $id);
			}

			$this->db->from("my_class");
			$this->db->join("schedule", "schedule.schedule_id = my_class.schedule_id");
			$this->db->join("rooms", "rooms.room_id = my_class.room_id");
			$this->db->join("school_year", "school_year.schoolyear_id = my_class.schoolyear_id");
			$this->db->join("semester", "semester.semester_id = my_class.semester_id");
			
			$this->db->order_by('my_class.datetime_added', 'desc');
			

			$query = $this->db->get();

			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false; 
			}
				
		} 
		public function count($id){

			$query =$this->db->query("SELECT COUNT(*) as counted FROM my_class where instructor_id = '".$id."'");
			
			//$query = $this->db->get('my_class');
			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}
		} 

		public function get_semester()
		{ 

			$this->db->from("semester");
			$this->db->order_by('semester_id', 'asc');
			
			$query = $this->db->get();

			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}
				
		} 
		public function get_schoolyear()
		{ 

			$this->db->from("school_year");
			$this->db->order_by('schoolyear_id', 'asc');
			
			$query = $this->db->get();

			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}
				
		} 
		public function class_schedules()
		{ 

			$this->db->from("schedule");
			$this->db->order_by('schedule_id', 'asc');
			
			$query = $this->db->get();

			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}
				
		} 
		public function get_room()
		{ 

			$this->db->from("rooms");
			$this->db->order_by('room_id', 'asc');
			
			$query = $this->db->get();

			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}
				
		} 
		public function add_class($data)
		{ 
			
			$this->db->insert("my_class", $data);
				
		}
		public function update_class($data, $id)
		{ 
			$this->db->where('class_id', $id);
			$this->db->update("my_class", $data);
				
		}
		public function delete_class($id){

			$this->db->where('class_id', $id)
					 ->delete('my_class');
		} 
		public function currentsem_year(){

			$query = $this->db->query('SELECT (SELECT schoolyear_id FROM school_year WHERE current =  1) as year_id ,(SELECT school_year FROM school_year WHERE current =  1) AS YEAR, (SELECT semester_id FROM semester WHERE current =  1) AS sem_id, (SELECT semester FROM semester WHERE current =  1) AS sem');

			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}
		}

		
		

	

		

}

?>