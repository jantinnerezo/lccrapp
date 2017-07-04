 

function sortby_now(){
	var sortby = $('#sortby').val(); 
	var field = 'sortby';
	// submit_url(field, sortby); 
	var newURL = updateURLParameter(window.location.search, field, sortby); 
	window.location = base_url+'product/'+newURL;
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

function submit_url(get_field, get_value){ 

// 	var text = 'http://localhost/mysite/includes/phpThumb.php?src=http://media2.jupix.co.uk/v3/clients/4/properties/795/IMG_795_1_large.jpg&w=592&aoe=1&q=100';
// var newSrc = 'www.google.com';
// var newText = text.replace(/(src=).*?(&)/,'$1' + newSrc + '$2');

	var search = window.location.search;  
	if(get_field == 'sortby'){
		var newSearch = search.replace(/(sortby=).*?(&)/, '/$1' + get_value + '$2');  
	} else if(get_field == 'page'){
		var newSearch = search.replace(/(page=).*?(&)/, '/$1' + get_value + '$2');  
	} else if(get_field == 'q'){
		var newSearch = search.replace(/(q=).*?(&)/, '/$1' + get_value + '$2');  
	} else if(get_field == 'sizes'){
		var newSearch = search.replace(/(sizes=).*?(&)/, '/$1' + get_value + '$2');  
	}else if(get_field == 'price'){
		var newSearch = search.replace(/(price=).*?(&)/, '/$1' + get_value + '$2');  
	}
	// console.log('search '+search);
	// console.log(newSearch);
	window.location = window.location.pathname+newSearch;
}

function gup( name ) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
        return "";
    else
        return results[1];
}

function submitpricerange(){
	var newVal = '';
	var price_from =  $("input[name='price_from']").val();
	var price_to = $("input[name='price_to']").val();
	newVal = price_from+'-'+price_to;
	var field = 'price'; 
	var newURL = updateURLParameter(window.location.search, field, newVal); 
	// window.location = window.location.pathname+newURL; 
	window.location = base_url+'product/'+newURL;
}

function searchkey(element){
	if (event.keyCode == 13){
		var newVal = $(element).val();  
		var field = 'q';  
		var newURL = updateURLParameter(window.location.search, field, newVal); 
		// window.location = window.location.pathname+newURL; 
		newURL = updateURLParameter(newURL, 'page', '1'); 
		window.location = base_url+'product/'+newURL;
	}
}

function ImgThumbURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#file_phot_holder').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function() { 
    "use strict";
	var checkbox = $("input[name='sizes']");
	checkbox.change(function(event) { 
		var new_value = '';
		// var checkbox = event.target;
	    // if (checkbox.checked) {
	        //Checkbox has been checked
	         $("input[name='sizes']:checked").each(function() {
	         	if(new_value)
         		new_value += '-';
		       	new_value += $(this).val();
		     }); 
		var field = 'sizes';
		// submit_url(field, new_value); 
		var newURL = updateURLParameter(window.location.search, field, new_value);  
		// window.location = window.location.pathname+newURL;
		window.location = base_url+'product/'+newURL;
	});


	var radiobtn = $("input[name='price']");
	radiobtn.change(function(event) { 
		var new_value = '';
		var checkbox = event.target; 
        var checked_val = $("input[name=price]:checked").val()
     	if(new_value)
         		new_value += '-';
       	new_value += checked_val 
		var field = 'price'; 
		var newURL = updateURLParameter(window.location.search, field, new_value);  
		// window.location = window.location.pathname+newURL; 
		window.location = base_url+'product/'+newURL;
	});

	$("#file_submit").change(function(){
	    ImgThumbURL(this);
	});


var _URL = window.URL || window.webkitURL;
$(document).ready(function(){
	    $("#file_submit").change(function(e) { 
	        var file, img;
	        if ((file = this.files[0])) {

	        	 var imgvar=this.files[0].size;
			        var imgsize=imgvar/1024; 
			       if(imgsize > 3000){
 					alert('The image should not exceed to 3mb.');
			       }
			        // alert(imgsize);
	           	 img = new Image();
	            img.onload = function() {
	                if(this.width >= 800 || this.height >= 1000){
	                    alert("The image width and height should exceed the minimum of 800 and 1000 respectively. Please retry.");
	                }
	            };
	            img.onerror = function() {
	                alert( "not a valid file: " + file.type);
	            };
	            img.src = _URL.createObjectURL(file);


	        }

	    });
});


});

