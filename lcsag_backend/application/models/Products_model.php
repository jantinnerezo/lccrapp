<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products_model extends CI_Model{


		public function products($data_where = NULL, $deleted = NULL, $data_order = NULL, $limit  = NULL)
		{ //$show -> guery to get all products from table products

			if(!IS_NULL($data_where))
				$this->db->where($data_where);
			if(!IS_NULL($deleted))
				$this->db->where("deleted", $deleted);
			if(!IS_NULL($data_order))
				$this->db->order_by($data_order);

			//$this->db->select('prod_title, prod_price');
			//$this->db->from('products');

				$this->db->select("pro_title");
				$this->db->from("products");
			
				$query = $this->db->get();

				if($query && $query->num_rows()){
					return $query->result();
				}else{
					return false;
				}
				
			
				
		} //end function all_products

		//All products---------------------------------------------------------------------------------------
		public function allproducts($offset = NULL, $limit = NULL, $find = NULL, $data_where = NULL, $sort_by = null, $isFeatured = null){

			$this->db->select("p.*, c.category_name, c.slug as category_slug, MATCH(pro_title, pro_description) AGAINST('".$find."' IN BOOLEAN MODE) AS relevance, IF(pro_price IS NULL OR pro_price = '0.00', pro_sellprice, pro_price) AS s_price", false);
					 $this->db->from("products as p");
					 $this->db->join("category as c", "p.pro_category = c.id"); 
				  
			if(!IS_NULL($limit)){

				$this->db->limit($limit);
			}

			if(!IS_NULL($isFeatured)){

				$this->db->where('is_featured', $isFeatured);
			}

			//Sort products by highest, lowest or newest
			if(!IS_NULL($sort_by)){

				    if($sort_by == "lowest"){
				     $this->db->order_by("s_price", "asc");
				    }elseif($sort_by == "highest"){
				     $this->db->order_by("s_price", "desc");
				    }elseif($sort_by == "newest"){ 
				     $this->db->order_by("pro_datecreated", "desc");
				    } 
				 
				    $this->db->order_by("relevance", "DESC");

			}
			if(!IS_NULL($find)){
				$this->db->where('(pro_description like "%'.$find.'%" or pro_title like "%'.$find.'%")');
			} 	
			if(!IS_NULL($data_where))
				$this->db->where($data_where);
			$query = $this->db->get();
			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}

		}

			//Products Category
		public function category($pro_slug = NULL,  $offset = NULL, $limit = NULL, $find = NULL, $data_where = NULL){

			$offset = 0;
			$this->db->select("p.*, c.category_name, c.slug as category_slug");
			$this->db->from("products as p");
			$this->db->join("category as c", "p.pro_category = c.id"); 
			//$this->db->limit($limit);

			if(!IS_NULL($pro_slug)){

				$this->db->where('slug', $pro_slug);
			}
			if(!IS_NULL($limit)){

				$this->db->limit($limit);
			}
			
			 
			if(!IS_NULL($find)){
				$this->db->where('(pro_description like "%'.$find.'%" or pro_title like "%'.$find.'%")');
			} 	
			if(!IS_NULL($data_where))
				$this->db->where($data_where);
			$query = $this->db->get();
			if($query && $query->num_rows()){
				return $query->result();
			}else{
				return false;
			}

		}

		//View Product---------------------------------------------------------------------------------------
		public function product($product_id){

			$this->db->select('products.pro_title, products.pro_description, products.pro_price, products.pro_sellprice')
					 ->from('products')
					 ->where('pro_id', $product_id)
					 ->limit(1);

			$res = $this->db->get();
			
			if($res->num_rows() > 0){
				return $res->result();
			}
			else{
				return false;
			}
			//count likes
				
		}
		//Product likes
		public function product_likes($product_id = null){

			$this->db->from('prod_likes');
			$this->db->where('pro_id', $product_id);

			$count = $this->db->count_all_results();

			return 'Likes '.$count;
		}
		//Product rates
		public function product_rates($product_id = null){

			$this->db->from('prod_rate');
			$this->db->where('prod_id', $product_id);

			$count = $this->db->count_all_results();

			return 'Rate '.$count;
		}
		//Product Orders---------------------------------------------------------------------------------------
		public function product_orders($order_id = null, $prod_id= null){

			if(!IS_NULL($order_id)){
				$this->db->where('id', $order_id);
			}
			if(!IS_NULL($prod_id)){
				$this->db->where('product_id', $prod_id);
			}
			$this->db->from('orders');

			$res = $this->db->get();

			if($res->num_rows() > 0){
				return $res->result();
			}
			else{

				return false;
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
	 	
		/*public function create($products_data)
		{
			//guery insert into database 	
			$this->db->insert('products',$products_data);
				
		}//end function create
		
		public function edit($prod_id,$products_data)
		{
			//guery update FROM .. WHERE id->products
			$this->db->where('prod_id',$prod_id)
					->update('products',$products_data);
		}
		
		public function delete($prod_id)
		{
			//guery delete id->products
			$this->db->where('prod_id',$prod_id)
					->delete('products');
		} */

		

}

?>