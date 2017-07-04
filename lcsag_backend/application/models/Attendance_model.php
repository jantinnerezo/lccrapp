<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Attendance_model extends CI_Model{
		
		public function attendance_records($class_id, $month = null, $year = null){


			 $this->db->from('attendance')
					  ->where('(attendance_date like "%'.$month.'%" and attendance_date like "%'.$year.'%")')
			 		  ->where('class_id', $class_id)
			 		  ->order_by('datetime_added', 'DESC');
			 $query = $this->db->get();

			 if($query->num_rows() > 0){
				return  $query->result_array();
				/*$count = count($sqldate);
			 	$values = array();
			 	for($x = 0; $x < $count; $x++){

			 		$id = $sqldate[$x]['attendance_id'];
					$getdate = $sqldate[$x]['attendance_date'];
					$gettime = $sqldate[$x]['attendance_time'];

					$date = strtotime($getdate);
					$time = strtotime($gettime);

					$finaldate = date('F d, Y', $date);
					$finaltime = date('h:i A', $time);

					$data = array(
					   'id' => $id,
			          'date' => $finaldate,
			          'time' =>$finaltime
			         
			          );

					 $values[] = $data;

					
				

			 	}*/

				
				
			 }else{

				return false;
			 }
		}
		
		public function max_id(){
			$query = $this->db->query('SELECT MAX(attendance_id) as id from attendance');

			if($query->num_rows() > 0){
				return $query->result();
				
			}else{

				return false;
			}

		}
		public function insert_attendance($data){
			 $this->db->insert('attendance', $data);

		}
		public function insert_student_attendance($data){
			 $this->db->insert('student_attendance', $data);
		}
		public function remove_attendance($id){



			 $this->db->where('attendance_id', $id);
			 $this->db->delete('student_attendance');

			  $this->db->where('attendance_id', $id);
			 $this->db->delete('attendance');
			 

		}
		public function count_status($id){

			$query = $this->db->query("SELECT (SELECT count(*) from student_attendance where status = '1' and attendance_id = '".$id."') as present, (SELECT count(*) from student_attendance where status = '2' and attendance_id = '".$id."') as late, (SELECT count(*) from student_attendance where status = '3' and attendance_id = '".$id."') as absent");

			if($query->num_rows() >0){
				return $query->result();
			}
			else{

				return false;
			}

		}
		public function get_attendance($attendance_id){


				$this->db->where('attendance_id', $attendance_id);
			 $query = $this->db->get('attendance');

			 if($query->num_rows() > 0){
				return  $query->result_array();

			 }else{

				return false;
			 }
		}
		
		public function student_attendance($attendance_id){

			 $this->db->from('student_attendance as sa')
			 		  ->join('all_students as alls', 'alls.student_id = sa.student_id')
			 		  ->where('sa.attendance_id', $attendance_id)
			 		  ->order_by('alls.student_lastname', 'ASC');
			 $query = $this->db->get();

			 if($query->num_rows() > 0){
				return  $query->result_array();

			 }else{

				return false;
			 }
		}


	
}

?>