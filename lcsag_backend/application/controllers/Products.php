<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products extends CI_Controller {
        
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
     
       $this->load->model('products_model'); 
       $this->load->model('category_model'); 
      
    }
     //----------------------------------------------
    public function allproducts()
    {   

        $offset = $this->input->get('offset');
        $limit = $this->input->get('limit'); 
        $find = $this->input->get('find');

    
        $data_where = $this->input->get('data_where');
        $sortby = $this->input->get('sort_by');
        $featured = $this->input->get('featured');
        echo json_encode($this->products_model->allproducts($offset,$limit,$find,$data_where, $sortby, $featured));
    
    }
    //----------------------------------------------
    public function categories()
    {   
        $category = $this->input->get('category');
        $offset = $this->input->get('offset');
        $limit = $this->input->get('limit'); 
        $find = $this->input->get('find');
        $data_where = $this->input->get('data_where');
        
        echo json_encode($this->products_model->category($category,$offset,$limit,$find,$data_where));
    
    }
    //----------------------------------------------
    public function view_product(){

        $product_id = $this->input->get('product_id');
        echo json_encode($this->products_model->product($product_id));
        echo json_encode($this->products_model->product_likes($product_id));
        echo json_encode($this->products_model->product_rates($product_id));

    }
     //----------------------------------------------
    public function orders(){

        $order_id =$this->input->get('order_id');
        $prod_id = $this->input->get('prod_id');

        echo json_encode($this->products_model->product_orders($order_id, $prod_id));
        
    }
    //-----------------------------------------------
    public function wishlist(){

        $user_id = $this->input->get('user_id');
        echo json_encode($this->products_model->customer_wishlist($user_id));
    }


}
