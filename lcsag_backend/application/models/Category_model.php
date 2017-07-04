<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category_model extends CI_Model{


		public function categories($data_where = NULL, $deleted = NULL, $data_order = NULL)
		{ //$show -> guery to get all products from table products


			
			if(!IS_NULL($data_where))
				$this->db->where($data_where);
			if(!IS_NULL($deleted))
				$this->db->where("deleted", $deleted);
			if(!IS_NULL($data_order))
				$this->db->order_by($data_order);
			
			$show = $this->db->get('category');
			if($show->num_rows() > 0 ) {
				return $show->result();
			} else {
			 	return array();
			} //end if num_rows
					
		} //end function all_products
		


		public function create($data_categories)
		{
			//guery insert into database 	

			$this->db->insert('category',$data_categories);
				
		}//end function create
		
		public function edit($cat_id,$data_categories)
		{
			//guery update FROM .. WHERE id->products
			$this->db->where('id',$cat_id)
					->update('category',$data_categories);
		}
		
		public function delete($cat_id)
		{
			//guery delete id->products
			$this->db->where('id',$cat_id)
					->delete('category');
		} 


		public function category($categ=NULL){
		

			switch($categ) {

					case 'Christian':

						encodeCategory('Christian');

					break;

					case 'Inspirational':

						encodeCategory($categ);

					break;


					case 'Patriotic':

						encodeCategory($categ);

					break;

					case 'Popular':

							encodeCategory($categ);


					break;

					default:

		
							
					break;
			}
		}
		public function encodeCategory($category_name=NULL){


				$getCategories = $this->db->query("SELECT products.pro_title FROM products, category WHERE category.id = products.pro_category and category.category_name = 'Inspiration'");

				return $getCategories->result();
     	
			//$query = $this->db->get_where('category', array('category_name' => $catName))->result();

		}

		public function encodeAll(){


			
		}


}

?>