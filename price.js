today_formattedDate="";
$(document).ready(function()
{
	
	

	
	
	$('#Proceed').bind('click', function() {
	        populateDate();
            processSentInventoryInsert();
	        $("clearOnPlace").html("");
			// send_info();
            });
	
	
	
	
});//end of doc


function processSentInventoryInsert() {
        var items=cart.getCartArray();
	for(var i=0;i<items.length;i++)
	{
		
		var cookieItem_sku=items[i][0];
		var cookieItem_quan=parseInt(items[i][1]);
		cart.delete(cookieItem_sku);
       
		insert_Sentform_data(cookieItem_sku,cookieItem_quan);
	}		
        
  }
	
function insert_Sentform_data(sk,qu) {
    var sku = sk;
	var date =  today_formattedDate;
	var quantity =  qu;
	

	 var url = '/jadrn043/servlet/update_tables?action=Sent&RSsku=';
	 url += sku + "&RSdate=" + date + "&RSquantity=" + quantity;
	   
        var req = new HttpRequest(url, handleSentInsertData);
        req.send();
        }

	function handleSentInsertData(response) {
		   var str="<br><a align=\"right\" href=\"http://jadran.sdsu.edu/jadrn043/proj3.html\">CONTINUE SHOPPING</a> "  ;
       if (response==1)
	   {  

    $('body').html("<h1>Thank you,sucessfully placed order.<br>Your order is on your way.Typical shipping time is 5-7 days.</h1>"+str);
     // $('#fetch_Sdata').html("<h1>Thank you,sucessfully placed order.<br>Your order is on your way.Typical shipping time is 5-7 days.</h1>"); 
	   }
	   else if(response == -2)
	   {
		 //$('#fetch_Sdata').html("<h1>Exceeding available quantity</h1>");
$('body').html("<h1>Exceeding available quantity</h1>"+str);		 
         		 
	   }
	   else if(response == 6)
	   {
		// $('#fetch_Sdata').html("<h1>Product Not available</h1>"); 
$('body').html("<h1>Product Not available</h1>"+str);		
	   }
       else
       {
		 // $('#fetch_Sdata').html("<h1>Error:Please try again</h1>");  
$('body').html("<h1>Product Not available</h1>"+str);		 
	   }		   
        			   
               }	
	
//getting todays date

function populateDate()
 {
	 
	 //code to set todays date
	    var today_date = new Date();
        var today_year=today_date.getFullYear();
        var today_month = today_date.getMonth() + 1;

        var today_day = today_date.getDate();
		
		if (today_day<10)
		{
			today_day="0"+today_day;
		}
		if (today_month<10)
		{
			today_month="0"+today_month;
		}
        today_formattedDate=today_year+"-"+today_month+"-"+today_day;

        
 }	