var app = {

    initialize: function() {
        this.bindEvents();
	},
	
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	
    onDeviceReady: function() {

		app.receivedEvent('deviceready');

		hidePreloader();
		
		var height = '';
		
		height = $(window).height();
		
		$('.container-fluid').css('min-height',height);	
				
		//Create empty array for options to be input
		var options=[];

		$("#options").keyup(function(event) {
			if (event.keyCode === 13) {
				$("#addItem").click();
			}
		});
		
		//When submit option button is clicked:
		$('#addItem').click(function(){			

			//Check if input has text...
			//if empty... do noting
			//if not... continue the code
			if($('#options').val() != '') {

				$('#clear').show();
								
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
				$('#randomize').css('display','block');
				
			}
			
		});
		
		//When choose an option button is clicked
		//Note, we dont need to check if it exists
		//because it would be hidden if no options added
		$('#choose').click(function() {
			
			showPreloader();

			$('#randomized').html('').removeClass('visible');
			
			//Randomize options array from inputs
			var rand = options[Math.floor(Math.random() * options.length)];
			
			//Show the winning choice after choosing
			//to pick random from inputs, css #chosen span
			$('#chosen').html('<div class="heading">Winner:</div> <div><span>'+rand+'!!!</span></div>');
			
			//Add border to winners circle
			$('#chosen').addClass('visible');
			
			$(this).val('Choose Again...');
			
			hidePreloader();
			
		});

		//When randomize button is click
		//Note, we dont need to check if it exists
		//because it would be hidden if no options added
		$('#randomize').click(function() {
			
			showPreloader();

			$('#chosen').html('').removeClass('visible');
			
			//Randomize options array from inputs
			// var rand = options[Math.floor(Math.random() * options.length)];

			function shuffle(array) {
				var currentIndex = array.length, temporaryValue, randomIndex;
			  
				// While there remain elements to shuffle...
				while (0 !== currentIndex) {
			  
				  // Pick a remaining element...
				  randomIndex = Math.floor(Math.random() * currentIndex);
				  currentIndex -= 1;
			  
				  // And swap it with the current element.
				  temporaryValue = array[currentIndex];
				  array[currentIndex] = array[randomIndex];
				  array[randomIndex] = temporaryValue;
				}
			  
				return array;
			}

			var random = shuffle(options);

			//Show the winning choice after choosing
			//to pick random from inputs, css #chosen span	
			for(var i = 0; i < random.length; i++) {
				$('#randomized ul').append('<li>'+random[i]+'</li>');
			}

			//Add border to winners circle
			$('#randomized').addClass('visible');
			
			$(this).val('Randomize Again...');
			
			hidePreloader();
			
		});
		
		//When clear is clicked... start over
		$('#clear').click(function() {
			
			if(options.length != 0) {
			
				//Confirm you want to clear everything
				if(confirm('Are You Sure')) {
					
					showPreloader();

					$('#clear').hide();
				
					//Empty out options array
					options = [];
					
					//Emptyu Out #options-div
					$('#options-div').html('');
					
					//Empty options input
					$('#options').val('');
					
					//Empty out #chosen div
					$('#chosen').html('');
					$('#randomized').html('');
					
					//Hide Choose option button
					$('#choose').css('display','none');
					$('#randomize').css('display','none');
					
					//Reset choose button text
					$('#choose').val('Choose One');
					$('#randomize').val('Randomize Options');
					
					//Show No Options Selected text
					$('#no-options').css('display','block');
					
					//Hide border&padding from #chosen option div
					$('#chosen').html('').removeClass('visible');
					$('#randomized').html('').removeClass('visible');
					
					hidePreloader();
					
				} else {}
				
			}
			
		});

		$(window).resize(function() {
				
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

	},
	
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
	}
	
};