<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Assessment_model extends CI_Model{

		public function fetch_assessment($class_id, $type_id = null, $term_id = null){

			if(!IS_NULL($type_id)){
				$this->db->where('a.type_id', $type_id);
			}
			if(!IS_NULL($term_id)){
				$this->db->where('a.term_id', $term_id);
			}
			$this->db->from('assessment as a')
					->join('assessment_type as t', 't.type_id = a.type_id')
					 ->where('a.class_id', $class_id)
					 ->order_by('a.datetime_added', 'DESC');
			$query = $this->db->get();

			if($query->num_rows() > 0){
				$sql = $query->result_array();
				$count = count($sql);
			 	$values = array();
			 	for($x = 0; $x < $count; $x++){

			 		$data1 = $sql[$x]['assessment_id'];
					$data2 = $sql[$x]['assessment_name'];
					$data3 = $sql[$x]['type_id'];
					$data4 = $sql[$x]['assessment_totalScore'];
					$data5 = $sql[$x]['class_id'];
					$data6 = $sql[$x]['term_id'];
					$data7 = $sql[$x]['assessment_status'];
					$data8 = $sql[$x]['datetime_added'];
					$type = $sql[$x]['type'];

					$date = strtotime($data8);
					$time = strtotime($data8);

					$finaldate = date('F d, Y', $date);
					$finaltime = date('h:i A', $time);

					$data = array(
					   'assessment_id' => $data1,
					   'assessment_name' => $data2,
					   'type_id' => $data3,
					   'type_name' => $type,
					   'assessment_totalScore' => $data4,
					   'class_id' => $data5,
					   'term_id' => $data6,
					   'assessment_status' => $data7,
			           'date' => $finaldate,
			           'time' =>$finaltime
			         
			          );

					 $values[] = $data;

					
				

			 	}
			 	return $values;
			}else{

				return false;
			}

		}
	
		public function assessment_types(){
			$query = $this->db->get('assessment_type');

			if($query->num_rows() > 0){
				return $query->result();
			}else{

				return false;
			}

		}
		public function current_terms(){
			$query = $this->db->get('term');

			if($query->num_rows() > 0){
				return $query->result();
			}else{

				return false;
			}

		}
		public function new_assessment($data){
			 $this->db->insert('assessment', $data);
		}
		public function insert_student_assessment($data){

			$this->db->insert('student_assessment', $data);
		}
		public function update_student_assessment($id, $data){
			$this->db->where('stud_assessment_id', $id);
			$this->db->update('student_assessment', $data);
		}
		public function update($id, $data){
			 $this->db->where('assessment_id', $id);
			 $this->db->update('assessment', $data);

		}
		public function student_assessment($assessment_id){

			 $this->db->from('student_assessment as sa')
			 		  ->join('all_students as alls', 'alls.student_id = sa.student_id')
			 		  ->where('sa.assessment_id', $assessment_id)
			 		  ->order_by('alls.student_lastname', 'ASC');
			 $query = $this->db->get();

			 if($query->num_rows() > 0){
				return  $query->result_array();

			 }else{

				return false;
			 }
		}
		public function remove_assessment($id){



			 $this->db->where('assessment_id', $id);
			 $this->db->delete('student_assessment');

			  $this->db->where('assessment_id', $id);
			 $this->db->delete('assessment');
			 

		}
		

}

?>