<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model{


	public function login_user($username = NULL, $password = NULL){


	

		if(!IS_NULL($username) && !IS_NULL($password)){

			$this->load->library('encrypt');
			$this->db->select('usr_password')
					->from('users')
					->where('usr_name', $username)
					->limit(1);
			$res = $this->db->get();
			if($res->num_rows() > 0){

				  $row_result =  $res->row();
				   $usr_password = $this->encrypt->decode($row_result, $password);

				    if($usr_password == $password){
				     return $row_result;
				    } else{
				     return array();
				    }
				    return $row_result;
				
			}else{
				$message = 'Invalid username and password!';
				return $message;
				//return array();

			}
		
		}

		else{

			return false;
		}

	
	}

	public function register_user($firstname = null, $lastname= null, $username = null, $email= null, $password = null, $confirm = null){

		//Check fields
		if(IS_NULL($firstname) && IS_NULL($lastname)){
				return 'Please enter your first name and last name';
		}
		if(IS_NULL($username)){
				return 'You must create a username!';
		}
		if(IS_NULL($email)){
				return 'Email address required!';
		}
		if(IS_NULL($password)){
				return 'You must create a password!';
		}
		else{
				//Check username if already existed!

				if($password < 6){
					return 'Password must be atleast 6 characters!';
				}

				//Check if confirm password mismatch!
				if($confirm != $password){

					return 'Password typed mismatch!';
				}

				$this->db->from('users')
						->where('usr_name', $username);

				$getusern = $this->db->get();

				if($getusern->result() == $username){

					return $getusern->result().' already exist!';
				}

			else
			{

					/*$data = array(
						'first_name' => $firstname ,
						'last_name' => $lastname ,
						'usr_name' => $username,
						'usr_email' => $email,
						'usr_password' => $password,
						'last_name' => 'My date',
						'gender' => 'My date',
						'bdate' => 'My date',
						'photo' => 'My date',
						'usr_email' => 'My date',
						'usr_email' => 'My date'
						);*/

			}

		}


	}


	public function forgot_password($email){

		if(IS_NULL($email)){

			return false;
		}

		$this->db->where('usr_email', $email);
		$res= $this->db->get();

		if($res->num_rows() > 0){
			return $res->result();
		}
		else{

			return false;
		}
	}

	public function user_profile($user_id){

		if(!IS_NULL($user_id)){

			$this->db->where('usr_id', $user_id);
			$res = $this->db->get('users');
				if($res->num_rows() > 0){
					return $res->result();
		}
				else{
			
				return false;
					}
		}
		else{

			return false;
		}
		
	

	

	}



	public function check_usr($username = null, $password = null)
  	{
			   //$username = set_value('username'); 
			   // $password = set_value('password'); 

			  // $password =set_value('password'); 
			   $stuts = '1';
			   $gry = $this->db->where('usr_name',$username)
			       // ->where('usr_password',$password)
			       ->where('stuts',$stuts)
			       ->limit(1)
			       ->get('users');
			   if($gry->num_rows() > 0)
			   {
			    // return $gry->row(); 
			    $row_result =  $gry->row();
			    $usr_password = $this->encrypt->decode($row_result->usr_password);
			    if($usr_password == $password){
			     return $row_result;
			    } else{
			     return array();
			    }
			   }else{
			     return array();
			   }
			    
    
  }

  public function customer_wishlist($user_id = null){


  	

  		$this->db->select('products.pro_title, products.pro_price')
  				->from('products, users')
  				->join('customer_wishlist', 'customer_wishlist.prod_id = products.pro_id and customer_wishlist.usr_id = users.usr_id');
  				//->join('customer_wishlist', 'customer_wishlist.usr_id =	users.usr_id')
  		

  	
  		if(!IS_NULL($user_id)){
  			$this->db->where('users.usr_id',$user_id);
  		}
  			$res = $this->db->get();

  		if($res->num_rows() > 0){
  			return $res->result();
  		}
  		else{

  			return false;
  		}


  }








		

}

?>