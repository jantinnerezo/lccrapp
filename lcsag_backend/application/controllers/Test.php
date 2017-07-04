<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller {
        



    public function __construct ()
    {
        parent::__construct();
        //load model -> model_products 
     // $this->load->model('model_products');
      //  $this->load->model('model_settings'); 
       $this->load->model('model_categories'); 
      

        
    }

    public function product_all()
    {   

      //  if($apikey==MA_API_KEY){

           //echo json_encode($this->model_products->all_products());
       // echo json_encode($this->model_categories->all_categories());
        $this->load->view('categories');

     //   }

    }

    /*  public function index()
    {
        echo json_encode($this->model_products->get_allproducts());
    }*/

    
}
