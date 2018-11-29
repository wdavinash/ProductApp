$(document).ready(function(){
    
    var product_row;
    $('#products_body').html();
    //get Product List
    $.ajax({
        url : 'http://180.151.193.180:8088/product',
        type : 'GET',
        data : {},
        dataType:'json',
        success : function(data) { 
             for(var i=0;i<data.product_list.length;i++)             {
                 //alert(data.product_list[i].id);
                 product_row+= '<tr style="text-align: center; border: 1px solid black; ">'
                 + '<td>'
                 + data.product_list[i].id
                 + '</td><td>'
                 +  data.product_list[i].product_name
                 + '</td><td>'
                 + data.product_list[i].price
                 + '</td>'
                 + '</td><td><button class="ord_prod" id="'
                 + data.product_list[i].id
                 +'" style="font-size: 14px;padding: 8px;background-color: #64ede575;">Order Now'
                 + '</button></td>'
                 + '</tr>';
              
             $('#products_body').html(product_row);        
             }
        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
    });


    //get Agents List
    $.ajax({
        url : 'http://180.151.193.180:8088/agents',
        type : 'GET',
        data : {},
        dataType:'json',
        success : function(data) { 
            //Add marker
        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
    });

    //Order 
    $(document).on('click', '.ord_prod', function(){ 
        var order;
        $('#order_body').html(); 
        $.ajax({
            url : 'http://180.151.193.180:8088/order/save',
            type : 'POST',
            data : {
                product_id: this.id,
                agent_id : 1,
                lat :localStorage.getItem('curr_lat'),
                long:localStorage.getItem('curr_long')
            },
            dataType:'json',
            success : function(data) { 
                addOrder(data);
            },
            error : function(request,error)
            {
                alert("Request: "+JSON.stringify(request));
            }
        });
    
   });

   function addOrder(data){
    $('#order_body').html(' ');
    var order='';
    if(data.order_list.length>0){
        for(var i=0;i<data.order_list.length;i++)             {
            order+= '<tr style="text-align: center; border: 1px solid black; ">'
            + '<td>'
            + data.order_list[i].id
            + '</td><td>'
            +  data.order_list[i].product_name
            + '</td><td>'
            + data.order_list[i].price
            + '</td><td>'
            + data.order_list[i].name
            + '</td><td>'
            +'<button class="ord_view" id="'
            + data.order_list[i].id
            +'" style="font-size: 14px;padding: 8px;background-color: #64ede575;">View'
            + '</button>'
            +'&nbsp;/&nbsp;<button class="ord_del" id="'
           + data.order_list[i].id
            +'" style="font-size: 14px;padding: 8px;background-color: red">Delete'
            + '</button>'
            + '</td></tr>';
        }
    }
    
    $('#order_body').html(order);
}
$(document).on('click', '.ord_view', function(){
    $.ajax({
        url : 'http://180.151.193.180:8088/order/view',
        type : 'POST',
        data : {
            id:this.id
        },
        dataType:'json',
        success : function(data) { 
            alert(JSON.stringify(data));
        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
    }); 

 });

 $(document).on('click', '.ord_del', function(){
    $.ajax({
        url : 'http://180.151.193.180:8088/order/del',
        type : 'POST',
        data : {
            id:this.id
        },
        dataType:'json',
        success : function(data) { 
            alert(JSON.stringify(data));
        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
    });   
   
    $.ajax({
        url : 'http://180.151.193.180:8088/order',
        type : 'GET',
        data : {
            id:this.id
        },
        dataType:'json',
        success : function(data) { 
            addOrder(data);
        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
    }); 
   
});
});