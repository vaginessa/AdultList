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

	$('.list__title').on('click',function() {
		if(html < 702) {
			$(this).next().slideToggle(300);
		}
	});
	// ========= =========== =========== ===========
});
// ========= =========== =========== ===========  ========= =========== =========== ===========