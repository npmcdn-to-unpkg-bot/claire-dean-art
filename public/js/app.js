$(window).load(function() {
	$('.main').removeClass('fadein');
	$('.loader').fadeOut(500, 'swing', setTimeout(removeLoader, 600));

	function removeLoader() {
		var loader = document.getElementById('loader');
		document.body.removeChild(loader);
	}
});

$(document).ready(function() {

   //disable right click on all images
   $('img').bind('contextmenu', function(e) {
      return false;
   });

   /* Setup Styling Capabilities for Mobile Devices */
   if ($(window).width() < 1000) {
      $('.main').addClass('mobile');
      createMenuButton();
   } else $('.main').addClass('desktop');

   $(window).resize(function() {
      if ($(window).width() < 1000) {
         $('.main').addClass('mobile');
         $('.main').removeClass('desktop');
         if (!$('.menu-button').length) { //if it exists
            createMenuButton();
         }
      } else {
         $('.main').addClass('desktop');
         $('.main').removeClass('mobile');
         if ($('.menu-button').length) { //if it exists
            $('.menu-button').remove();
         }
      }
   });

   $(window).on('scroll', function() {
      if ($(window).scrollTop() > 25) {
         $('.header').addClass('scrolled');
      } else $('.header').removeClass('scrolled');
   });


   function createMenuButton() {
      var button = document.createElement('div');
         button.className = 'menu-button';
         button.onclick = function() {
            $('.menu-bar').toggleClass('open');
            $('.menu-button').toggleClass('open');
            $('.menu-button-icon').toggleClass('fa-bars');
            $('.menu-button-icon').toggleClass('fa-times');
         }
         var icon = document.createElement('i');
            icon.className = 'menu-button-icon fa fa-bars';
            icon.style.fontSize = '35px';
         button.appendChild(icon);
      $('.header').append(button);
   }


   $('.admin-edit-menu-btn').on('click', function() {
      if (!$('.admin-edit-menu')[0]) {
         var sections = ['Gallery/Upload', 'Gallery', 'About', 'Contact'];
         editmenu = new EditMenu(sections); //global var as there should only be one instance of this menu
         console.log("clicked...")
      } else editmenu.unmount();
   });
});


/* Modal Portal
*  params -> children to sit inside modal
*/
var Modal = function(children) {
   this.portal = false;
   this.children = children;
   this.mount();
}
Modal.prototype.mount = function () {
   if (!this.portal) {
      this.portal = document.createElement('div');
      this.portal.className='modal fade';
      this.portal.id = 'modal-window'
      var backdrop = document.createElement('div');
         backdrop.className="modal-backdrop";
         $(backdrop).click($.proxy(this.hide, this));
      this.portal.appendChild(backdrop);
      $(document.body).prepend(this.portal);
      this.render();
   }
};
Modal.prototype.render = function () {
   setTimeout(this.settle.bind(this), 10);
   var inner = document.createElement('div');
      inner.className = 'modal-inner';
   $(inner).prepend(this.children);
   $(this.portal.childNodes).prepend(inner);
};
Modal.prototype.settle = function() {
   this.portal.className = 'modal fade in';
}
Modal.prototype.hide = function(e) {
   if (e.target==$('.modal-backdrop')[0]) {
      this.portal.className = 'modal fade';
      setTimeout(this.unmount, 500);
   }
}
Modal.prototype.unmount = function () {
   var modal = document.getElementById('modal-window');
   document.body.removeChild(modal);
};


/* Notification Banner */
var Notification = function(status, message, duration) {
   this.status = status;
   this.message = message;
   this.duration = duration;
   if (this.show()) {
      this.hide();
   }
}
Notification.prototype.show = function() {
   var settle = function() {
      loader.className = 'notification-modal ' + this.status;
   }
   var loader = document.createElement('div');
      loader.className = 'in notification-modal ' + this.status;
      loader.id = 'notification-modal';
      switch (this.status) {
         case 'success':
            loader.style.backgroundColor = '#66BB6A';
            break;
         default: loader.style.backgroundColor = '#EF5350';

      }
   var inner = document.createElement('div');
      inner.className = 'notification-inner';
      inner.id = 'notification-inner';
   var pEle = document.createElement('p');
      pEle.className = 'notification-text';
      pEle.id = 'notification-text';
      pEle.innerHTML = this.message;

   inner.appendChild(pEle);
   loader.appendChild(inner);

   $(document.body).prepend(loader);

   //set timing of fade in with updateClass
   setTimeout(settle.bind(this), 10);

   return true;
}
Notification.prototype.hide = function() {
   var modal = document.getElementById('notification-modal');
   var teardown = function() {
      document.body.removeChild(modal);
      console.log("torn down...");
   }
   //stage modal for teardown
   setTimeout(teardown.bind(this), this.duration);
}

/* Admin Page Edit Menu */
var EditMenu = function(sections) {
   this.portal = false;
   this.sections = sections; //array of items + route
   this.mount();
}
EditMenu.prototype.mount = function () {
   if (!this.portal) {
      this.portal = document.createElement('div');
      this.portal.className='admin-edit-menu fade';
      this.portal.id = 'admin-edit-menu'
      var backdrop = document.createElement('ul');
         backdrop.className="admin-edit-menu-list";
         //$(backdrop).click($.proxy(this.hide, this));
      this.portal.appendChild(backdrop);
      $(document.body).prepend(this.portal);
      this.render();
   }
}
EditMenu.prototype.render = function () {
   setTimeout(this.settle.bind(this), 10);
   for (var index = 0; index < this.sections.length; index++) {
      var item = document.createElement('li');
         item.className = 'admin-edit-menu-item';
         item.id = 'edit-menu-item ' + this.sections[index];
         // item.style.height = 100 / this.sections.length + "%";
         var a = document.createElement('a');
            if (/([/])\w+/.test(this.sections[index])) {
               var first = this.sections[index].substring(0, this.sections[index].indexOf('/'));
               var last = this.sections[index].substring(this.sections[index].indexOf('/') + 1, this.sections[index].length);
               a.href = '/admin/' + first.toLowerCase() + '/' + last.toLowerCase();
               a.innerHTML = last;
            } else {
               a.href = '/admin/' + this.sections[index].toLowerCase() + '/edit';
               a.innerHTML = this.sections[index];
            }
            a.className = 'edit-menu-item-link';

            a.style.textDecoration = 'none';
         item.appendChild(a);
      $(this.portal.childNodes).prepend(item);
   }
};
EditMenu.prototype.settle = function () {
   this.portal.className = 'admin-edit-menu fade in';
};
EditMenu.prototype.unmount = function () {
   this.portal.className = 'admin-edit-menu fade';
   setTimeout(this.remove.bind(this), 300);
};
EditMenu.prototype.remove = function () {
   var menu = document.getElementById('admin-edit-menu');
   document.body.removeChild(menu);
};
