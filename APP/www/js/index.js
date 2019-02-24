var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$(document).ready(function() {
	
    hidePreloader();
		
	var height = '';
	
	height = $(window).height();
	
	$('.container-fluid').css('min-height',height);	
	        
	//Create empty array for options to be input
	var options=[];
	
	//When submit option button is clicked:
	$('#submit').click(function(){
		
		//Check if input has text...
		//if empty... do noting
		//if not... continue the code
		if($('#options').val() != '') {
			
			var count = options.length + 1;
			
			//Add the input field data to the #options div (for html)
			$('#options-div').append('<div class="items">'+$('#options').val()+'</div>');
			
			//Add the input field data to the options array (for randomizing)
			options.push($('#options').val());
			
			//Empty #options input after an #options is submitted
			$('#options').val('');
			
			//Hide "No Options Yet" after at least 1 #options
			$('#no-options').css('display','none');
			
			//Show Choose an options button after at least 1 #options
			$('#choose').css('display','block');
			
		}
		
	});
	
	//When choose an option button is click
	//Note, we done need to check if it exists
	//because it would be hidden if no options added
	$('#choose').click(function() {
        
        showPreloader();
		
		//Randomize options array from inputs
		var rand = options[Math.floor(Math.random() * options.length)];
		
		//Show the winning choice after choosing
		//to pick random from inputs, css #chosen span
		$('#chosen').html('WINNER: <div><span>'+rand+'!!!</span></div>');
		
		//Add border to winners circle
		$('#chosen').css('border','1px solid #000000').css('padding','20px');
        
        $(this).val('CHOOSE AGAIN...');
        
        hidePreloader();
		
	});
	
	//When clear is clicked... start over
	$('#clear').click(function() {
		
		if(options.length != 0) {
		
			//Confirm you want to clear everything
			if(confirm('Are You Sure')) {
                
                showPreloader();
			
				//Empty out options array
				options = [];
				
				//Emptyu Out #options-div
				$('#options-div').html('');
				
				//Empty options input
				$('#options').val('');
				
				//Empty out #chosen div
				$('#chosen').html('');
				
				//Hide Choose option button
				$('#choose').css('display','none');
                
                //Reset choose button text
                $('#choose').val('MAKE A CHOICE!!!');
				
				//Show No Options Selected text
				$('#no-options').css('display','block');
				
				//Hide border&padding from #chosen option div
				$('#chosen').css('border','none').css('padding','0');
                
                hidePreloader();
				
			} else {}
			
		}
		
	});
	
	$('.fa-trash').click(function() {
	
		"use strict";
		
		var id = $(this).attr('id');
		console.log($(this).attr('id'));
				
	});
	
});

$(window).resize(function() {
	
	"use strict";
	
	var height = '';
	
	height = $(window).height();
	
	$('.container-fluid').css('min-height',height);		
	
});

function showPreloader() {
	"use strict";
	$('body').css({'overflow':'hidden'});
	$('#preloader').show(); // will fade out the white DIV that covers the website. 
	$('#status').show(); // will first fade out the loading animation 
}

function hidePreloader() {
	"use strict";
	$('#status').delay(1000).fadeOut(); // will first fade out the loading animation 
	$('#preloader').delay(1000).fadeOut('slow'); // will fade out the white DIV that covers the website. 
	$('body').delay(1000).css({'overflow':'visible'});
}