
// $('#file-submit').fileinput({
//       allowedFileExtensions : ['jpg', 'png','gif']
// });

$(document).ready(function() {

    var hashValue = location.hash; 

    if(hashValue == '#success-cart'){
      $(".cart-widget-handle .function").css({'visibility':'visible', 'opacity':'1'});
      setTimeout(function(){
        $(".cart-widget-handle .function").removeAttr('style');
      
      }, 3000);
    }

    var address_type = $("select[name='bill_select_option']");
   
    address_type.change(function(event){
      var address_id = address_type.val(); 
      if(address_id != "none"){  
          $.ajax({
                url: base_url+"home/get_address_details",
                type: "POST",
                dataType: "json",
                data: {address_id:address_id}
                // cache: false
              })
               .done(function( data ) {  
                  $('#bill_first_name').val(data.fname);
                  $('#bill_last_name').val(data.lname);
                  $('#bill_phone').val(data.phone);
                  $('#bill_email').val(data.email);
                  $('#bill_landline').val(data.landline);
                  $('#bill_address1').val(data.address1);
                  $('#bill_address2').val(data.address2);
                  $('#bill_city').val(data.city);
                  $('#bill_state').val(data.state);
              });

       
      }else{
        $('#bill_first_name').val('');
        $('#bill_last_name').val('');
        $('#bill_phone').val('');
        $('#bill_email').val('');
        $('#bill_landline').val('');
        $('#bill_address1').val('');
        $('#bill_address2').val('');
        $('#bill_city').val('');
        $('#bill_state').val('');
      } 

    });
 var del_address_type = $("select[name='del_select_option']");
     
    del_address_type.change(function(event){
      var address_id = del_address_type.val(); 
      if(address_id != "none"){  
          $.ajax({
                url: base_url+"home/get_address_details",
                type: "POST",
                dataType: "json",
                data: {address_id:address_id}
                // cache: false
              })
               .done(function( data ) {  
                  $('#del_first_name').val(data.fname);
                  $('#del_last_name').val(data.lname);
                  $('#del_phone').val(data.phone);
                  $('#del_email').val(data.email);
                  $('#del_landline').val(data.landline);
                  $('#del_address1').val(data.address1);
                  $('#del_address2').val(data.address2);
                  $('#del_city').val(data.city);
                  $('#del_state').val(data.state);
                  $('#del_landmark').val(data.landmark);
                  $('#del_instruction').val(data.instruction);
              });

       
      }else{
        $('#del_first_name').val('');
        $('#del_last_name').val('');
        $('#del_phone').val('');
        $('#del_email').val('');
        $('#del_landline').val('');
        $('#del_address1').val('');
        $('#del_address2').val('');
        $('#del_city').val('');
        $('#del_state').val('');
        $('#del_landmark').val('');
        $('#del_instruction').val('');
      }
      //get the data

    });


    var gender_opt = $("select[name='gender']"); 
    var qty_cart = $("input[name='quantity_cart']");
    var details_size = $("select[name='pro_size']");  
    check_wishlist();
    
    gender_opt.change(function(event) {  
          var gender_val = $(this).val()
         if(gender_val != ""){  
            //gender selected
            details_size.removeAttr("disabled");
            $("#pro_size option[value='']").attr('selected','selected');
            details_size.val("");
         }else{ 
            $("#pro_size option[value='']").attr('selected','selected');
            details_size.val("");
            details_size.attr("disabled", "disabled");
         }
    });

    details_size.change(function(event) {  
      var pro_details_size = details_size.val(); 
      var pro_id = $("input[name='rate_pro_id']").val();
      check_wishlist();
    /** commented since  stocks isnt needed
      if(pro_details_size && pro_id){
         
         $.ajax({
                url: base_url+"home/check_stock",
                type: "POST",
                data: {pro_size:pro_details_size, pro_id:pro_id}
                // cache: false
              })
               .done(function( data ) { 
                // console.log(data);
                  if(data){
                    //let the user add to cart
                    $("#alert_stock").show();
                    $("#alert_stock").html(data+" item/s left");

                  }else{
                    //alert out of stock

                    $("#alert_stock").show();
                     $("#alert_stock").html("Out of Stock!");
                  }
              });
      }else{
        alert('none');
      }
    */
    });

    //product page quantity
     var cart_qty = $("input[name='cart_qty']"); 
     cart_qty.keyup(function(event) {

      var pro_details_size = details_size.val(); 
      var pro_id = $("input[name='rate_pro_id']").val(); 
      // var cart_qty_val = $("input[name='cart_qty']").val();
 
      if(pro_details_size && pro_id){
        /** commented since stocks is not needed 
         $.ajax({
                url: base_url+"home/check_stock",
                type: "POST",
                data: {pro_size:pro_details_size, pro_id:pro_id, cart_qty:cart_qty_val}
                // cache: false
              })
               .done(function( data ) { 
                // console.log(cart_qty_val);
                  if(data == "1"){
                    $('#btnSubmit').removeAttr("disabled");
                  }else{  
                    $('#btnSubmit').attr("disabled", "disabled"); 
                      $('#alert_ofoutstock').show();
                    setTimeout(function(){ 
                      $('#alert_ofoutstock').hide();
                    }, 3000);
                  }
              });

        */

      }else{
        alert('Please select first size and gender.');
      }
    });


    //cart page quantity
    qty_cart.change(function(event) {  
          var qty_val = $(this).val()
          var input_id = $(this).attr('id');
          var qty_id_arr = $(this).attr('id').split("quantity_cart_");
          var cart_id = qty_id_arr[1]; 
           $.ajax({
              url: base_url+"home/change_cart_qty",
              type: "POST",
              data: {cartid:cart_id, qty_val:qty_val},
              cache: false
            })
              .done(function(res) {
                // console.log(res);
                if(res == "0"){ 
                 $("#"+input_id).addClass('field-error');
                }else{

                   $("#"+input_id).removeClass('field-error');
                }
                // window.location = window.location.href;
                // $( "#step4" ).load( base_url+"home/checkout #step4" );
              });
    }); 

    //rate and review
    $('#btnCommentSubmit').on('click', function() {

      if(!$('#rate_rating').val()){
        alert('Please rate');
        $('#rate_rating').focus().select();
        return false;
      }else{
        rate_rating = $('#rate_rating').val();
      }
      
      if(!$('#rate_fullname').val()){
        alert('Input Name');
        $('#rate_fullname').focus();
        return false;
      }else{
        rate_fullname = $('#rate_fullname').val();
      }
      
      if(!$('#rate_email').val()){
        alert('Input Email');
        $('#rate_email').focus();
        return false;
      }else{
        if (!validateEmail($('#rate_email').val())) {
            alert('Input a valid Email');
            $('#rate_email').focus();
            return false;
        }else{
          rate_email = $('#rate_email').val();
        }
      }

      if(!$('#rate_comment').val()){
        alert('Input Comment');
        $('#rate_comment').focus();
        return false;
      }else{
        rate_comment = $('#rate_comment').val();
      }

      rate_pro_id = $('#rate_pro_id').val();

      $.post( base_url+"home/prod_rate/"+$('#rate_pro_id').val(), { rate_fullname: rate_fullname , rate_email: rate_email, rate_rating: rate_rating, rate_comment: rate_comment, prod_id: rate_pro_id })
        .done(function( data ) {
          alert( "Thank you! Rating and comment is successfully submitted.");
          $('.back-to-top').click();
          location.reload();
        });
      
    });

    /**----------------------------------------*/
    $('#btnSubmit').on('click', function() {

      if($('#pro_size').val()){
        // $('#add_cart_form').submit(); 
      }else{
        alert('Please select size');
        $('#pro_size').focus().select();
      }

      if($('#gender').val()){
        // $('#add_cart_form').submit(); 
      }else{
        alert('Please select gender');
        $('#gender').focus().select();
      }

      if($('#gender').val() && $('#pro_size').val())
        $('#add_cart_form').submit(); 
    });

    $('#wishlist').on('click', function() {

      if($('#pro_size').val()){
        // $('#add_cart_form').submit(); 
      }else{
        alert('Please select size');
        $('#pro_size').focus().select();
      }

      if($('#gender').val()){
        // $('#add_cart_form').submit(); 
      }else{
        alert('Please select gender');
        $('#gender').focus().select();
      }

      if($('#gender').val() && $('#pro_size').val())
        $('#add_to_wishlist_form').submit(); 
    });


    $('#btnPlaceOrder').on('click', function() {

      $.get( base_url+"home/generate_uni_id", function( data ) {
        $('#invid').val(data);
        // console.log(data);
        // console.log($('#invid').val());

      });

      $('#btnPlaceOrder').val('Submitting...');
      setTimeout(exec_payment, 2000);

     
    });

    $('.btn-checkout-nav').on('click', function() {
      location.href = "#form-wizard";
      check_billing_details();
      check_delivery_details();
      restore_checkout_sidebar();
    });

    $('.del_copy_billing').on('click', function() {

      // console.log('del_copy_billing click');
      if($('.del_copy_billing').hasClass('checked')){
      	// console.log('true');
      	$('#del_first_name').val($('#bill_first_name').val());
      	$('#del_last_name').val($('#bill_last_name').val());
        $('#del_phone').val($('#bill_phone').val());
      	$('#del_email').val($('#bill_email').val());
      	$('#del_landline').val($('#bill_landline').val());
      	$('#del_address1').val($('#bill_address1').val());
      	$('#del_address2').val($('#bill_address2').val());
      	$('#del_city').val($('#bill_city').val());
      	$('#del_state').val($('#bill_state').val());
      }else{
  		  $('#del_first_name').val('');
      	$('#del_last_name').val('');
        $('#del_email').val('');
      	$('#del_phone').val('');
      	$('#del_landline').val('');
      	$('#del_address1').val('');
      	$('#del_address2').val('');
      	$('#del_city').val('');
      	$('#del_state').val('');
      }

      	$('.del_first_name small').addClass( "hidden" );
  		  $('.del_first_name input').removeClass( "input-err" );

  		  $('.del_last_name small').addClass( "hidden" );
      	$('.del_last_name input').removeClass( "input-err" );

      	$('.del_phone small').addClass( "hidden" );
  		  $('.del_phone input').removeClass( "input-err" );

    		$('.del_address small').addClass( "hidden" );
    		$('#del_address1').removeClass( "input-err" );

    		$('.del_city small').addClass( "hidden" );
    		$('.del_city input').removeClass( "input-err" );

    		$('.del_state small').addClass( "hidden" );
    		$('.del_state input').removeClass( "input-err" );

    		$('.del_landmark small').addClass( "hidden" );
    		$('.del_landmark input').removeClass( "input-err" );

    });


    $('.btn-checkout-del').on('click', function() {

  		var cont = true;

  		if(!$('.del_first_name input').val()){
    		$('.del_first_name small').removeClass( "hidden" );
    		$('.del_first_name input').addClass( "input-err" );
    		cont = false;
  		}else{
    		$('.del_first_name input').removeClass( "input-err" );
    		$('.del_first_name small').addClass( "hidden" );
  		}

  		if(!$('.del_last_name input').val()){
    		$('.del_last_name small').removeClass( "hidden" );
    		$('.del_last_name input').addClass( "input-err" );
    		cont = false;
  		}else{
    		$('.del_last_name input').removeClass( "input-err" );
    		$('.del_last_name small').addClass( "hidden" );
  		}

      if(!$('.del_email input').val()){
        $('.del_email small').removeClass( "hidden" );
        $('.del_email input').addClass( "input-err" );
        cont = false;
      }else{
        if (!validateEmail($('.del_email input').val())) {
          $('.del_email small').removeClass( "hidden" );
          $('.del_email input').addClass( "input-err" );
          cont = false;
        }else{
          $('.del_email input').removeClass( "input-err" );
          $('.del_email small').addClass( "hidden" );
        }
      }

  		if(!$('.del_phone input').val()){
    		$('.del_phone small').removeClass( "hidden" );
    		$('.del_phone input').addClass( "input-err" );
    		cont = false;
  		}else{
    		$('.del_phone input').removeClass( "input-err" );
    		$('.del_phone small').addClass( "hidden" );
  		}

  		if(!$('#del_address1').val()){
    		$('.del_address small').removeClass( "hidden" );
    		$('#del_address1').addClass( "input-err" );
    		cont = false;
  		}else{
    		$('#del_address1').removeClass( "input-err" );
    		$('.del_address small').addClass( "hidden" );
  		}

  		if(!$('.del_city input').val()){
    		$('.del_city small').removeClass( "hidden" );
    		$('.del_city input').addClass( "input-err" );
    		cont = false;
  		}else{
    		$('.del_city input').removeClass( "input-err" );
    		$('.del_city small').addClass( "hidden" );
  		}

  		if(!$('.del_state input').val()){
    		$('.del_state small').removeClass( "hidden" );
    		$('.del_state input').addClass( "input-err" );
    		cont = false;
  		}else{
    		$('.del_state input').removeClass( "input-err" );
    		$('.del_state small').addClass( "hidden" );
  		}

  		if(!$('.del_landmark input').val()){
    		$('.del_landmark small').removeClass( "hidden" );
    		$('.del_landmark input').addClass( "input-err" );
    		cont = false;
  		}else{
    		$('.del_landmark input').removeClass( "input-err" );
    		$('.del_landmark small').addClass( "hidden" );
  		}
    	
    	if (cont){display_delivery_details();}

    	return cont;
    });

    $('.btn-checkout-bill').on('click', function() {

  		var cont = true;

  		if(!$('.bill_first_name input').val()){
    		$('.bill_first_name small').removeClass( "hidden" );
    		$('.bill_first_name input').addClass( "input-err" );
    		cont = false;
  		}else{
    		$('.bill_first_name input').removeClass( "input-err" );
    		$('.bill_first_name small').addClass( "hidden" );
  		}

  		if(!$('.bill_last_name input').val()){
    		$('.bill_last_name small').removeClass( "hidden" );
    		$('.bill_last_name input').addClass( "input-err" );
    		cont = false;
  		}else{
    		$('.bill_last_name input').removeClass( "input-err" );
    		$('.bill_last_name small').addClass( "hidden" );
  		}

      if(!$('.bill_email input').val()){
        $('.bill_email small').removeClass( "hidden" );
        $('.bill_email input').addClass( "input-err" );
        cont = false;
      }else{
        if (!validateEmail($('.bill_email input').val())) {
            $('.bill_email small').removeClass( "hidden" );
            $('.bill_email input').addClass( "input-err" );
            cont = false;
        }else{
          $('.bill_email input').removeClass( "input-err" );
          $('.bill_email small').addClass( "hidden" );
        }
      }

  		if(!$('.bill_phone input').val()){
    		$('.bill_phone small').removeClass( "hidden" );
    		$('.bill_phone input').addClass( "input-err" );
    		cont = false;
  		}else{
    		$('.bill_phone input').removeClass( "input-err" );
    		$('.bill_phone small').addClass( "hidden" );
  		}

  		if(!$('#bill_address1').val()){
    		$('.bill_address small').removeClass( "hidden" );
    		$('#bill_address1').addClass( "input-err" );
    		cont = false;
  		}else{
    		$('#bill_address1').removeClass( "input-err" );
    		$('.bill_address small').addClass( "hidden" );
  		}

  		if(!$('.bill_city input').val()){
    		$('.bill_city small').removeClass( "hidden" );
    		$('.bill_city input').addClass( "input-err" );
    		cont = false;
  		}else{
    		$('.bill_city input').removeClass( "input-err" );
    		$('.bill_city small').addClass( "hidden" );
  		}

  		if(!$('.bill_state input').val()){
    		$('.bill_state small').removeClass( "hidden" );
    		$('.bill_state input').addClass( "input-err" );
    		cont = false;
  		}else{
    		$('.bill_state input').removeClass( "input-err" );
    		$('.bill_state small').addClass( "hidden" );
  		}
    	
    	if (cont){display_billing_details();}

    	return cont;
    });

    $('.btn-checkout-payment').on('click', function() {

      remove_checkout_sidebar();

      switch($("input[name='payment_type']:checked").val()){
        case 'online':
          $('.checkout-payment').text('Online Payment (Paystack)');
          $('.checkout-desc').text('This process requires you pay online using your credit card.');
          $('.btn-bank-online input').val('Pay Online & Place Order');
          break;
        case 'bank':
          var bank_type = $("#bank_payment_option").val();
          $('.checkout-payment').text('Bank Payment: '+bank_type);
          $('.checkout-desc').text('This process requires you pay directly to a bank account.');
          $('.btn-bank-online input').val('Pay Bank & Place Order');
          break;
        case 'cod':
          $('.checkout-payment').text('COD - Cash on Delivery');
          $('.checkout-desc').text('This process requires you pay in cash when they are delivered.');
          $('.btn-bank-online input').val('Place Order');
          break;
      }

    });

    /**-------------------------------------------*/

    $('#remove-coupon').on('click', function() { 
      $.ajax({
        url: base_url+"home/remove_coupon_cart",
        cache: false
      })
        .done(function() {
          window.location = window.location.href; 
        });
    });

    $('#size-btn').on('click', function() {
      var prod_size = "";

      prod_size = $('#small').val(); 
    });


 


});
  


function check_wishlist(){
   var gender_opt = $("select[name='gender']");
   var details_size = $("select[name='pro_size']"); 
    $("input[name='wishlist_size']").val(details_size.val());
    $("input[name='wishlist_gender']").val(gender_opt.val());
   if(details_size.val() && gender_opt.val()){ 
      $('#wishlist').removeAttr("disabled"); 
      $('#btnSubmit').removeAttr("disabled"); //stocks not needed
   }else{
      // $('#wishlist').attr("disabled", "disabled");
   }
}

function exec_payment(){

    switch($("input[name='payment_type']:checked").val()){
    case 'online':
      pay_online();
      break;
    case 'bank':
      var bank_payment = $("#bank_payment_option").val();
      $('.bank-option').text(bank_payment);
      if(bank_payment == "Diamond Bank PLC"){
        $('.acct-num').text('0085516891');
      }else{
         $('.acct-num').text('0019901331');
      }
      $('#ModalBankPayment').modal('show'); 
      break;
    case 'cod':
      $('#checkout-form').submit();
      break;
  }

}

function remove_checkout_sidebar() {

  $('.checkout-main').removeClass( "col-md-8" );
  $('.checkout-main').addClass( "col-md-12" );

  $('.checkout-summary').addClass( "hidden" );

}

function restore_checkout_sidebar() {

  $('.checkout-main').removeClass( "col-md-12" );
  $('.checkout-main').addClass( "col-md-8" );

  $('.checkout-summary').removeClass( "hidden" );

}

function check_billing_details() {

	if($('#step-bill').hasClass('complete')){
		
		$('.side-billing').removeClass( "hidden" );
		display_billing_details();
	}else{
		$('.side-billing').addClass( "hidden" );
	}

}

function check_delivery_details() {

	if($('#step-bill').hasClass('complete')){
		
		$('.side-billing').removeClass( "hidden" );
		display_billing_details();
	}else{
		$('.side-billing').addClass( "hidden" );
	}

}

function display_billing_details() {

	$('.side-billing').removeClass( "hidden" );
	$('.side-billing .bill-fullname').text($('#bill_first_name').val() + " " + $('#bill_last_name').val() + " / " + $('#bill_email').val());
	$('.side-billing .bill-phone').text($('#bill_phone').val());

	if($('#bill_landline').val()){
		$('.side-billing .bill-landline').text($('#bill_landline').val());
	}else{
		$('.side-billing .bill-landline-icon').addClass( "hidden" );
		$('.side-billing .bill-landline').addClass( "hidden" );
	}

	$('.side-billing .bill-address').text($('#bill_address1').val() + ", " + $('#bill_address2').val() + ", " + $('#bill_city').val() + ", " + $('#bill_state').val());

}

function display_delivery_details() {

	$('.side-delivery').removeClass( "hidden" );
	$('.side-delivery .del-fullname').text($('#del_first_name').val() + " " + $('#del_last_name').val() + " / " + $('#del_email').val());
	$('.side-delivery .del-phone').text($('#del_phone').val());

	if($('#del_landline').val()){
		$('.side-delivery .del-landline').text($('#del_landline').val());
	}else{
		$('.side-delivery .del-landline-icon').addClass( "hidden" );
		$('.side-delivery .del-landline').addClass( "hidden" );
	}

	$('.side-delivery .del-address').text($('#del_address1').val() + ", " + $('#del_address2').val() + ", " + $('#del_city').val() + ", " + $('#del_state').val());

}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


function submitCheckoutform(){
  $('#checkout-form').submit();
}

function pay_online(){

  // $('#invid').val('data');

    // key: 'pk_test_863984767cee4c35582dba15b598d6263c901b12', 
    // key: 'pk_live_4b9242596871afcf5a96431e98a3fee66ea97e65', 
    var handler = PaystackPop.setup({
        key: 'pk_live_4b9242596871afcf5a96431e98a3fee66ea97e65', 
        email: $('#bill_email').val(),
        amount: $('#order_total').val()*100,
        ref: $('#invid').val(),
        callback: function(response) {
          
          document.getElementById("trans_id").value = response.trxref;
          submitCheckoutform();
          
        },
        onClose: function() {
          //suppressed
          window.location.replace("paycancel.php");
        }
        
      });
      handler.openIframe();
}

function displayPayment(element){
  value_elem = $(element).val();
  if(value_elem == "bank"){
    $("#bank_payment_option").show();
  }else{
     $("#bank_payment_option").hide();
  }
}