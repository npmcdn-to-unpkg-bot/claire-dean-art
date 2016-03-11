

$(document).ready(function() {

   var Editor = new WYSIWYG();
   Editor.buildMenu();



   //initial setup -> if this fails, beforeSend should grab correct token
   $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
   });

// var pageHTMLContent = $('.editable-content').toString();
// var pageHTMLContent = document.body.innerHTML;
var pageHTMLContent = document.getElementById('all-editable-content').innerHTML;
console.log("html: ", pageHTMLContent)
console.log("encoded: ", encodeURIComponent(pageHTMLContent))

   $('.save-wysiwig').on('click', function() {
      //console.log($('.editable-content').children());
      pageHTMLContent = document.getElementById('all-editable-content').innerHTML;
      $.ajax({
         url: "/admin/about/edit/save-page",
         type:"POST",
         beforeSend: function (xhr) {
            var token = $('meta[name="csrf-token"]').attr('content');
            xhr.setRequestHeader('X-CSRF-TOKEN', token);
         },
         data: {
            'content' : encodeURIComponent(pageHTMLContent)
         },
         success:function(res) {
            if (res.status == 'success') {
               console.log("response: " , res)
               //new Notification(res.status, res.message, 3000);
            }
         },
         error:function(){
            //new Notification('error', 'Layout not saved. Please try again.', 3000);
         }
      });
   });

});
