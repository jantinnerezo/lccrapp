
$(document).ready(function() {

    var check_bol = false;
    var tags_list = "";

    $('#btnSubmit').on('click', function() {
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

    $( '#pro_small' ).on( 'change', function() {
      $("#pro_small_qty").prop('disabled', ($( this ).prop('checked')?false:true));
      TotalStock();
    });

    $( '#pro_medium' ).on( 'change', function() {
      $("#pro_medium_qty").prop('disabled', ($( this ).prop('checked')?false:true));
      TotalStock();
    });

    $( '#pro_large' ).on( 'change', function() {
      $("#pro_large_qty").prop('disabled', ($( this ).prop('checked')?false:true));
      TotalStock();
    });

    $( '#pro_xl' ).on( 'change', function() {
      $("#pro_xl_qty").prop('disabled', ($( this ).prop('checked')?false:true));
      TotalStock();
    });

    $( '#pro_small_qty' ).on( 'change', function() {
      // pro_small_qty = ($( '#pro_small'  ).prop('checked')? $("#pro_small_qty").val():0);
      TotalStock();
    });

    $( '#pro_medium_qty' ).on( 'change', function() {
      // pro_medium_qty = ($( '#pro_medium'  ).prop('checked')? $("#pro_medium_qty").val():0);
      TotalStock();
    });

    $( '#pro_large_qty' ).on( 'change', function() {
      // pro_large_qty = ($( '#pro_large'  ).prop('checked')? $("#pro_large_qty").val():0);
      TotalStock();
    });

    $( '#pro_xl_qty' ).on( 'change', function() {
      // pro_xl_qty = ($( '#pro_xl'  ).prop('checked')? $("#pro_xl_qty").val():0);
      TotalStock();
    });

    // stock_qty = TotalStock();
});

function TotalStock(){
    var pro_small_qty = ($( '#pro_small'  ).prop('checked')? $("#pro_small_qty").val():0);
    var pro_medium_qty = ($( '#pro_medium'  ).prop('checked')? $("#pro_medium_qty").val():0);
    var pro_large_qty = ($( '#pro_large'  ).prop('checked')? $("#pro_large_qty").val():0);
    var pro_xl_qty = ($( '#pro_xl'  ).prop('checked')? $("#pro_xl_qty").val():0);

    $("#pro_stock").val(parseInt(pro_small_qty) + parseInt(pro_medium_qty) + parseInt(pro_large_qty) + parseInt(pro_xl_qty));// = (pro_small_qty + pro_medium_qty + pro_large_qty + pro_xl_qty );
    // return(pro_small_qty + pro_medium_qty + pro_large_qty + pro_xl_qty );
}