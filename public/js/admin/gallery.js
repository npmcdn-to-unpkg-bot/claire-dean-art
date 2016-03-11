
$(document).ready(function() {

   /* Masonry, Packery, and Draggabilly Functions */
      $('.grid').packery({
         // options
         itemSelector: '.grid-item',
         gutter: 10,
         columnWidth: 300
      });

		var images = [];
		var paths = [];
		var imgViewer = false;

		var gridItems = $('.grid').packery('getItemElements');
		$( gridItems ).map( function( i, itemElem ) {
			paths.push($(itemElem).children().attr('src'));
			images.push(itemElem.id);
			$(itemElem).on('click touchstart', function() {
			   imgViewer = new ImageViewer(itemElem.id, images, paths);
				imgViewer.mount();
			});
		});
});
