
  get_cities();    
 $('#select2-states').on('change', function(){
    get_cities(); 
  });

 function get_cities(){
    var url_location = window.location.href;
    var get_last_url = url_location.split("/");
     var last_url = "";
     var counterpart = 0;
    for(var i=get_last_url.length-1; i>-1;i--){
          check_url = get_last_url[i]; 
          if(check_url){
            ++counterpart;
            last_url += check_url;
            if(counterpart == 2){
                break; 
            }
          }
    }  
      if(last_url == "addusers" ){
     	var state_id = $('#select2-states option:selected').val(); 
     	var city_id = $('#select2-cities').data('value');
        if(state_id == ""){
    		$("#city_id").val(""); 
    		$("#select2-cities").attr("disabled");
    	}else{ 
    		$("#select2-cities").removeAttr("disabled");
    	}
    	// console.log(city_id+" city");
        $.post(url_location+"get_cities/",{state_id:state_id, city_id:city_id},function(result){        
            $('#select2-cities').html(result); 

            $("#select2-cities").select2();  
          });
        // return false;
    }
 } 

 function delete_banner(id){
  var confirm_delete = confirm("Are you sure you want to delete?");
  if (confirm_delete == true) {
    var the_id= id;
     var url_location = window.location.href;
    $.post(url_location+"ajax_delete",{id:the_id},function(result){
        //$('#tr_' + the_id).remove();
        window.location.reload();
    });
  }
}

$(document).ready(function(){  
    $('.reorder_link').on('click',function(){
        $("ul.reorder-photos-list").sortable({ tolerance: 'pointer' });
        $('.reorder_link').html('<span class="glyphicon glyphicon-floppy-disk"></span> Save Reordering');
        $('.reorder_link').attr("id","save_reorder");
        $('#reorder-helper').slideDown('slow');
        $('.image_link').attr("href","javascript:void(0);");
        $('.image_link').css("cursor","move");
        $("#save_reorder").click(function( e ){
            if( !$("#save_reorder i").length )
            {   
                $(this).html('').prepend('<img src="localhost/connectnigeria/cnlive2/teeshirt/assets/img/refresh-animated.gif" />');
                $("ul.reorder-photos-list").sortable('destroy');
                $("#reorder-helper").html( "Reordering Photos - This could take a moment. Please don't navigate away from this page." ).removeClass('light_box').addClass('notice notice_error');
                var h = [];
                $("ul.reorder-photos-list li").each(function() {  h.push($(this).attr('id').substr(9));  });
                var url_location = window.location.href;
                $.ajax({
                    type: "POST",
                    url: url_location + "/ajax_changeorder",
                    data: {ids: " " + h + ""},
                    success: function(html) 
                    {
                        window.location.reload();
                    }
                }); 
                return false;
            }   
            e.preventDefault();     
        });
    });
});

var _URL = window.URL || window.webkitURL;
$(document).ready(function(){
    $("#file_name").change(function(e) { 
        var file, img;


        if ((file = this.files[0])) {
            img = new Image();
            img.onload = function() {
                if(this.width != 1600 || this.height != 622){
                    alert("The image width and height doesn't fit the required size. Please retry.");
                }
            };
            img.onerror = function() {
                alert( "not a valid file: " + file.type);
            };
            img.src = _URL.createObjectURL(file);


        }

    });
});


function update_live_banners(){
   $.ajax({
    type: "POST",
    // url: "cronjob/offline_homepagebanners/", 
    success: function(html) 
    {
      alert("Successfully updated the banners.");
    }
  }); 
}

$(document).ready(function() {
    // $('#wizard').smartWizard();

    $('.buttonNext').addClass('btn btn-success');
    $('.buttonPrevious').addClass('btn btn-primary');
    $('.buttonFinish').addClass('btn btn-default');


}); 
 

function filter_category(){
    var filter_category = $('.filter_category').val(); 
    var field = 'category_id';
    // submit_url(field, sortby); 
    var newURL = updateURLParameter(window.location.search, 'page', ''); 
     newURL = updateURLParameter(newURL, field, filter_category);  
    window.location =  [location.protocol, '//', location.host, location.pathname].join('')+newURL;
}

function search_product(){
     
    var search_product = $('#search_product').val(); 
    var field = 'search';
    // submit_url(field, sortby); 
    var newURL = updateURLParameter(window.location.search, 'page', ''); 
     newURL = updateURLParameter(newURL, field, search_product);  
    window.location =  [location.protocol, '//', location.host, location.pathname].join('')+newURL; 

}
function input_search_product(){
    //search product 
    if (event.keyCode == 13){
        search_product();
    } 
}


function updateURLParameter(url, param, paramVal){
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (i=0; i<tempArray.length; i++){
            if(tempArray[i].split('=')[0] != param){
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}
 
  var _URL = window.URL || window.webkitURL;
  $(document).ready(function(){
    $("#userfile").change(function(e) { 
      var file, img; 
      if ((file = this.files[0])) {
        img = new Image();
        img.onload = function() {
          if(this.width != 800 || this.height != 1000){
            $("#btnSubmit").attr("disabled", "disabled");
            alert("The image width and height doesn't fit the required size. Please retry.");
          }else{ 
            $("#btnSubmit").removeAttr("disabled");
          }
        };
        img.onerror = function() {
          alert( "not a valid file: " + file.type);
        };
        img.src = _URL.createObjectURL(file);


      }

    });
  });  


$(document).ready(function() {
//turn to inline mode
    $.fn.editable.defaults.mode = 'inline';
    $(document).ready(function() {
        $('.order_qty').editable({
             success: function(response, newValue) {
                    location.reload();
                }
        });
        $('.order_qty').editable( 'option', 
            'validate', function(value) {
                 if($.trim(value) == '') {
                    return 'This field is required';
                }
                else if(!$.isNumeric(value)){
                    return 'This field should be an integer.'
                }
                else if($.isNumeric(value) && value <= 0){
                    return 'This field should be greater than 0.'
                }
            }
            

        ); 
    });

     $('.order_note_btn').on('click', function() {
        // console.log($('#MyPillbox').pillbox('items'));
        $.each($('#MyPillbox').pillbox('items'), function( index, value ) {
          tags_list += ((index!=0)?", ":"") + value.text;
        });

        console.log(tags_list);
        $('#pro_tags').val(tags_list);
        // if ($('#is_add').val()=='1'){
          $('#product_form').submit();
        // }else{
          // $('#product_edit').submit();
        // }

    });
});
