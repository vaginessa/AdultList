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

	$(".porn__list--link").each(function() {
        $(this).parent().prepend("<img width='16px' height='16px' src='" + $(this).attr("href") + "/favicon.ico' />");
    });
	
	// ========= R e m o v e   c l a s s e s ===========
	$('.form__input--validate').on('focus',function() {
		if($(this).hasClass('validate')) {
			$(this).removeClass('validate');
			$(this).next().addClass('hidden');
		}
	});
	// ========= =========== =========== ===========

	
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