<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Students_model extends CI_Model{


		public function allstudents($find = NULL, $limit = null, $offset = null, $course = NULL, $year=NULL)
		{ 

			if(!IS_NULL($find)){
				$this->db->where('(student_id like "%'.$find.'%" or student_lastname like "%'.$find.'%" or student_firstname like "%'.$find.'%")');
			}
			
			if(!IS_NULL($course) && !IS_NULL($year) ){

				$this->db->where('(student_course like "%'.$course.'%" and student_course like "%'.$year.'%")');
			}
			else if(!IS_NULL($course) && IS_NULL($year)){

				$this->db->where('(student_course like "%'.$course.'%")');
			}
			else if(IS_NULL($course) && !IS_NULL($year)){

				$this->db->where('(student_course like "%'.$year.'%")');
			}
			
			$this->db->from("all_students");
			$this->db->limit($limit, $offset);
					
			
			$this->db->order_by('student_lastname', 'asc');
			
			$query = $this->db->get();

			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}
				
		} 
		public function students($sort = NULL, $find = NULL, $class_id)
		{ 


			/*$this->db->from("student_class, all_students, my_class")
					 ->where("student_class.student_id", "all_students.student_id")
					 ->where("student_class.class_id", "my_class.class_id")
					 ->where("student_class.class_id", $class_id)
					 ->order_by('all_students.student_lastname', 'asc');
			
			
			$this->db->from('student_class as s');
			$this->db->join('all_students as a', "a.student_id = s.student_id");	
			$this->db->where('(a.student_id like "%'.$find.'%" or a.student_lastname like "%'.$find.'% or a.student_firstname like "%'.$find.'%")');
			$this->db->where('s.class_id', $class_id);
			$this->db->order_by('a.student_lastname', 'ASC');*/

			//$query = $this->db->query("select* from all_students, student_class where student_class.student_id = all_students.student_id and (all_students.student_id like '%".$find."%' or all_students.student_lastname like '%".$find."%' or all_students.student_firstname like '%".$find."%') and student_class.class_id = '".$class_id."'");
			//$query = $this->db->get();
			$query = $this->db->query("select* from all_students, student_class where student_class.student_id = all_students.student_id and (all_students.student_id like '%".$find."%' or all_students.student_lastname like '%".$find."%' or all_students.student_firstname like '%".$find."%') and student_class.class_id = '".$class_id."' ORDER BY all_students.student_lastname ASC");
			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}
				
		} 
		public function add_student($data)
		{ 
			
			$this->db->insert("student_class", $data);
				
		}
		public function remove_student($student_id, $class_id)
		{ 
			$this->db->where('student_id' , $student_id);
			$this->db->where('class_id' , $class_id);
			$this->db->delete("student_class");

				
		}
		public function students_count($class_id)
		{ 

			/*$this->db->from("student_class, all_students, my_class")
					 ->where("student_class.student_id", "all_students.student_id")
					 ->where("student_class.class_id", "my_class.class_id")
					 ->where("student_class.class_id", $class_id)
					 ->order_by('all_students.student_lastname', 'asc');*/
			$query = $this->db->query('SELECT COUNT(*) as counted from student_class where class_id = '. $class_id);

			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}
				
		} 
		public function allstudents_count()
		{ 

			$query = $this->db->query('SELECT COUNT(*) as counted from all_students');

			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}
				
		} 
		public function already_exist($student_id, $class_id)
		{ 

			$this->db->from('student_class')
					 ->where('student_id', $student_id)
					 ->where('class_id', $class_id);
			$query = $this->db->get();

			if($query && $query->num_rows()){
				return true;
			}else{
				return false;
			}
				
		} 
		public function fetch_course(){

			$query = $this->db->get('course');

			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}
				
		}
		public function year_level(){

			$query = $this->db->get('year_level');

			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}
				
		}
		public function student_class_list($id){

			$query = $this->db->query("SELECT* from student_class, my_class, instructor where student_class.class_id = my_class.class_id and instructor.instructor_id = my_class.instructor_id and student_class.student_id = '".$id."'");
			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}
				
		}
		public function count_attendance_record($student_id, $class_id){

			$query = $this->db->query("SELECT (SELECT COUNT(*) from student_attendance, attendance where student_attendance.attendance_id = attendance.attendance_id and student_attendance.status = '1' and attendance.class_id and student_id = '".$student_id."' and attendance.class_id = '".$class_id."') as present , (SELECT COUNT(*) from student_attendance, attendance where student_attendance.attendance_id = attendance.attendance_id and student_attendance.status = '2' and attendance.class_id and student_id = '".$student_id."' and attendance.class_id = '".$class_id."') as late  , (SELECT COUNT(*) from student_attendance, attendance where student_attendance.attendance_id = attendance.attendance_id and student_attendance.status = '3' and attendance.class_id and student_id = '".$student_id."' and attendance.class_id = '".$class_id."') as absent ");
			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}
		}


	

		

}

?>