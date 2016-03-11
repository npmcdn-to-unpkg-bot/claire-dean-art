

$(document).ready(function() {

   //initial setup -> if this fails, beforeSend should grab correct token
   $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
   });

   var Img = function(elem, pos) {
      this.elem = elem.id;
      this.pos = pos;
   }

   var currImgOrder = [];


   //save order on page load
      $(window).on('load', function(){
         orderItems();
      });

      //set order when clicking save
      $('.save-gallery-btn').on('click', function(e) {
         e.preventDefault();
         orderItems();
      });
      //save each time items are positioned
      $('.grid').on( 'dragItemPositioned', orderItems );

      /*
      * Maps elements in grid and saves the order in the database
      *  Triggered -> on window load and when an image is dragged and set
      *
      *  elem = {tag}.{classname} --> ex: div.grid-item
      *  pos = order # of element
      */
      function orderItems() {
         var itemElems = $('.grid').packery('getItemElements');
         var ordered = [];
         $( itemElems ).each( function( i, itemElem ) {
           ordered.push(new Img(itemElem, i));
         });
         setOrder(ordered);
      }

      function setOrder(order) {

         $.ajax({
            url: "/admin/gallery/set-order",
            type:"POST",
            beforeSend: function (xhr) {
               var token = $('meta[name="csrf-token"]').attr('content');
               xhr.setRequestHeader('X-CSRF-TOKEN', token);
            },
            data: {
               'orderArray' : order
            },
            success:function(res) {
               if (res.status == 'success') {
                  new Notification(res.status, res.message, 3000);
               }
            },
            error:function(){
               new Notification('error', 'Layout not saved. Please try again.', 3000);
            }
          });
      }
   /* Image Reordering Methods */

   /* Masonry, Packery, and Draggabilly Functions */
      $('.grid').packery({
         // options
         itemSelector: '.grid-item',
         gutter: 10,
         columnWidth: 300
      });

      // make all grid-items draggable
      $('.grid').find('.grid-item').each( function( i, gridItem ) {
         var draggie = new Draggabilly( gridItem );
         // bind drag events to Packery
         $('.grid').packery( 'bindDraggabillyEvents', draggie );
      });

      function scrollPage(e) {
         $("html, body").scrollTop(function(i, v) {
            if (e.clientY < 150 || e.clientY > 450) {
               var h = $(window).height();
               var y = e.clientY - h / 2;
               return v + y * 0.05;
            } else {
               return;
            }
         });
      }

      $('.grid').on('mousedown', function() {
         $(document).on('mousemove', function(e) {
            scrollPage(e);
         });
      });

      $(document).mouseup(function() {
         console.log("mouseup")
          $(document).off("mousemove");
      });



      // $('.toolbar-edit-title').on('click', function() {
      //    handleGetTitle();
      // });
      //$('.toolbar-edit-title').click(handleGetTitle());

      // function handleGetTitle() {
      //    console.log("here! WOO")
      // }




      /* Toolbar Image Functions
      *     Edit Title, Edit Description, Delete Image
      */
      $('.toolbar-edit-title').on('click', function() {
         var imageSlug = $(this).parent().parent().attr('id');

         $.ajax({
            url: "/admin/gallery/get-title",
            type:"POST",
            beforeSend: function (xhr) {
               var token = $('meta[name="csrf-token"]').attr('content');
               xhr.setRequestHeader('X-CSRF-TOKEN', token);
            },
            data: {
               'image' : imageSlug
            },
            success:function(res) {
               var child = document.createElement('div');
                  child.className = "image-editable edit-title";
                  var title = document.createElement('h1');
                     title.innerHTML = "Edit Image Title";
                     var titleToEditBox = document.createElement('div');
                        titleToEditBox.className = "edit-title-box";
                        var titleToEdit = document.createElement('div');
                           titleToEdit.className = 'title-to-edit';
                           titleToEdit.contentEditable = true;
                           titleToEdit.innerHTML = res.imageTitle;

                           $(titleToEdit).on('keyup', function() {
                              console.log("changed...");

                              // if (!delay)
                              //    var delay = setTimeout()
                              // else clearTimeout(delay);

                           });
                  title.appendChild(titleToEditBox);
               child.appendChild(title);
               child.appendChild(titleToEdit);
               new Modal(child);
            },
            error:function(){
               new Notification('error', 'There was an error getting the image title', 3000);
            }
         });
      });
      $('.toolbar-edit-description').on('click', function() {
         var child = document.createElement('div');
            child.className = "image-edit edit-description";
            var title = document.createElement('h1');
               title.innerHTML = "Edit Description";
            child.appendChild(title);
         new Modal(child);
      });
      $('.toolbar-edit-delete').on('click', function() {
         var imageID = $(this).parent().attr('this-image');

         var child = document.createElement('div');
            child.className = "image-edit delete-image";
            var title = document.createElement('h2');
               title.innerHTML = "Are you sure you want to delete this image?";
            var subtitle = document.createElement('p');
               subtitle.innerHTML = $(this).parent().attr('this-image') + ' will be deleted.'
            var deleteBtn = document.createElement('div');
               deleteBtn.innerHTML = "Delete this bitch!";
               $(deleteBtn).on('click', function() {
                  handleDeleteImage(imageID, openModal.unmount);
                  $('.grid').packery('remove', $('#'+imageID)).packery('shiftLayout');
               });
            child.appendChild(title);
            child.appendChild(subtitle);
            child.appendChild(deleteBtn);
         var openModal = new Modal(child);
      });

      function handleDeleteImage(imgToRemove, callback) {
         $.ajax({
            url: "/admin/gallery/remove-image",
            type:"POST",
            beforeSend: function (xhr) {
               var token = $('meta[name="csrf-token"]').attr('content');
               xhr.setRequestHeader('X-CSRF-TOKEN', token);
            },
            data: {
               'image' : imgToRemove
            },
            success:function(res) {
               if (res.status == 'success') {
                  setTimeout(callback, 100);
                  new Notification(res.status, res.message, 3000);
               }
            },
            error:function(){
               new Notification('error', 'There was an error deleting this image. Please try again.', 3000);
            }
          });
      }

      // function handleGetTitle(slug) {
      //    $.ajax({
      //       url: "/admin/gallery/get-title",
      //       type:"POST",
      //       beforeSend: function (xhr) {
      //          var token = $('meta[name="csrf-token"]').attr('content');
      //          xhr.setRequestHeader('X-CSRF-TOKEN', token);
      //       },
      //       data: {
      //          'image' : slug
      //       },
      //       success:function(res) {
      //          return res.imageTitle;
      //       },
      //       error:function(){
      //          new Notification('error', 'There was an error getting the image title', 3000);
      //          return 'There was an error getting the title.'
      //       }
      //     });
      // }
      /* Admin Edit Page Menu - Routes to Edit Pages */

});
