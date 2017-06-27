var ProjectApp = function (){
	// ============================ All vars ================================
	var copyrightYear = document.getElementById('year');
	// ============================================================
	// ============================Helper functions ================================
	function addClass(elem, clas) {
		elem.classList.add(clas);
	}
	function removeClass(elem, clas) {
		elem.classList.remove(clas);
	}	
	// ============================================================

	// ============================copyright year================================
	var year = new Date(),
		now = year.getFullYear();
	copyrightYear.innerHTML = now
	// ============================================================
};

window.addEventListener('DOMContentLoaded', function() {
	new ProjectApp();
}) 
// ============================================================

// ========= ========= ========= JQUERY =========== ========= =========
$(document).ready(function() {
	//  ========= M a i n   v a r i a b l e s =========
	var html = $('body').width();
	// ========= =========== =========== ===========
	// ========== G o   t o   u p   b t n ==========
	var top_show = 150,
		delay = 1000; 

	$(window).scroll(function () {
		if ($(this).scrollTop() > top_show) $('.btn__up').fadeIn();
		else $('.btn__up').fadeOut();
	});

	$('.btn__up').click(function () { 
		$('body, html').animate({
			scrollTop: 0
		}, delay);
	});
	// ========= =========== =========== ===========

	// ========= S m o o t h   s c r o l l i n g   t o   t h e   a n c h o r s ===========
	$('.smooth__scroll').on('click', function (event) {
			event.preventDefault();
			var id = $(this).attr('href'),
				top = $(id).offset().top;

			$('html, body').animate({scrollTop: top}, 'slow');
		});
	});	
	// ========= =========== =========== ===========

	var maxheight = 0;

	$(".selector").each(function() {
	  		if($(this).height() > maxheight) { maxheight = $(this).height(); }
		});

	$(".selector").height(maxheight);


	// ========= O w l   c a r o u s e l ===========
	// $('#slider').owlCarousel({
	// 	loop:true,
	//     nav:true,
	//     dots: true,
	//     navText: ['',''],
	//     margin:20,
	//     mouseDrag: true,
	//     touchDrag: true,
	//     items:1,
	//     autoplay: true,
	//     autoplayTimeout: 2500,
	//     autoplayHoverPause: true	   
	// });

	// ========= =========== =========== ===========

	// ========= F a n c y b o x ===========
	// $(".fancybox").fancybox({
	// 	openEffect  : 'elastic',
	// 	closeEffect : 'elastic'
 //  	});
	// ========= =========== =========== ===========

	// ========= In p u t   t e l e p h o n e   m a s k ===========
	// $('input.phone__input').mask('+7 (999) 999-99-99');
	// ========= =========== =========== ===========

	// ========= D i s a b l e   m a p    s c r o l l i n g ===========
	var onMapMouseleaveHandler = function (event) {
		var that = $(this);

		that.on('click', onMapClickHandler);
		that.off('mouseleave', onMapMouseleaveHandler);
		that.find('iframe').css("pointer-events", "none");
	}

	var onMapClickHandler = function (event) {
		var that = $(this);

		that.off('click', onMapClickHandler);
		that.find('iframe').css("pointer-events", "auto");
		that.on('mouseleave', onMapMouseleaveHandler);
	}
	// Enable map zooming with mouse scroll when the user clicks the map
	$('.google__map').on('click', onMapClickHandler);
	// ========= =========== =========== ===========

	// ========= G o o g l e   m a p   s t y l e s ===========
	var latitude = 56.625860, // coordinates 
		longitude = 47.934437, // coordinates 
		map_zoom = 16, 
		marker_url = 'img/map-ic.png'; // map marker 
	// Styles
	var style =  [
					{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
					{elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
					{elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
					{
						featureType: 'administrative.locality',
						elementType: 'labels.text.fill',
						stylers: [{color: '#d59563'}]
					},
					{
						featureType: 'poi',
						elementType: 'labels.text.fill',
						stylers: [{color: '#d59563'}]
					},
					{
						featureType: 'poi.park',
						elementType: 'geometry',
						stylers: [{color: '#263c3f'}]
					},
					{
						featureType: 'poi.park',
						elementType: 'labels.text.fill',
						stylers: [{color: '#6b9a76'}]
					},
					{
						featureType: 'road',
						elementType: 'geometry',
						stylers: [{color: '#a0951c'}]
					},
					{
						featureType: 'road',
						elementType: 'geometry.stroke',
						stylers: [{color: '#ddcd20'}]
					},
					{
						featureType: 'road',
						elementType: 'labels.text.fill',
						stylers: [{color: '#ddcd20'}]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry',
						stylers: [{color: '#a0951c'}]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry.stroke',
						stylers: [{color: '#1f2835'}]
					},
					{
						featureType: 'road.highway',
						elementType: 'labels.text.fill',
						stylers: [{color: '#f3d19c'}]
					},
					{
						featureType: 'transit',
						elementType: 'geometry',
						stylers: [{color: '#2f3948'}]
					},
					{
						featureType: 'transit.station',
						elementType: 'labels.text.fill',
						stylers: [{color: '#d59563'}]
					},
					{
						featureType: 'water',
						elementType: 'geometry',
						stylers: [{color: '#17263c'}]
					},
					{
						featureType: 'water',
						elementType: 'labels.text.fill',
						stylers: [{color: '#515c6d'}]
					},
					{
						featureType: 'water',
						elementType: 'labels.text.stroke',
						stylers: [{color: '#17263c'}]
					}
				];
		// Create the point
		var map_options = {
			center: new google.maps.LatLng(latitude, longitude),
			zoom: map_zoom,
			panControl: false,
			zoomControl: true,
			mapTypeControl: false,
			streetViewControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
			styles: style
		};
		// Init map
		var map = new google.maps.Map(document.getElementById('map'), map_options),
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(latitude, longitude),
				map: map,
				visible: true,
				icon: marker_url
			});
	// ========= =========== =========== ===========

	// ========= R e m o v e   c l a s s e s ===========
	$('.form__input--validate').on('focus',function() {
		if($(this).hasClass('validate')) {
			$(this).removeClass('validate');
			$(this).next().addClass('hidden');
		}
	});
	// ========= =========== =========== ===========

	// ========= Ajax form ===========
	// $(".contact__form").submit(function(e) {
	// 	e.preventDefault();
	//  //Change
	// 	var th = $(this);
	// 	$.ajax({
	// 		type: "POST",
	// 		url: "mail.php", //Change
	// 		data: th.serialize()
	// 	}).done(function() {
	// 		setTimeout(function() {
	// 			// Done Functions
	// 			th.trigger("reset");
	// 		}, 1000);
	// 		return false;
	// 	});
	$('.form__contact').submit(function(e) {
		e.preventDefault();

		var that = $(this);
			inputs = that.find('.form__input--validate'),
			flag = true;

		// Validate
		$(inputs).each(function() {
			if(!$(this).val() || $(this).val() == "") {
				$(this).addClass('validate');
				$(this).next().removeClass('hidden');
				flag = false;
			}
		});

		if(!flag) {return false;}

		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: that.serialize()
		}).done(function() {
			// add active clases
			setTimeout(function() {
				// remove active classes
				that.trigger("reset");
			}, 2000);
		});

	});
	// ========= =========== =========== ===========
});
// ========= =========== =========== ===========  ========= =========== =========== ===========