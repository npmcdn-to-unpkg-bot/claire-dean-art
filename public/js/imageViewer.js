

var ImageViewer = function(currImage, imagesArr, pathsArr) {
   this.currImage = currImage;
   this.images = imagesArr;
   this.paths = pathsArr;
   this.portal = false;
   this.imageInView = false;
   this.imageInPre = false;
   this.imageInPost = false;
   this.currImageIndex = 0;
   this.setViewerPosition();
}

ImageViewer.prototype.indexOf = function () {
   console.log(this.images.indexOf(currImage));

};

ImageViewer.prototype.setViewerPosition = function () {
   console.log("index: ", this.images.indexOf(this.currImage));
   console.log("this.currImage: ", this.currImage);
   this.currImageIndex = this.images.indexOf(this.currImage);
   var index = this.currImageIndex;
   this.imageInView = this.paths[index];
   console.log("currImageIndex: ", this.currImageIndex);
   if (index == this.paths.length - 1) {
      this.imageInPre = this.paths[index - 1];
      this.imageInPost = this.paths[0];
   } else if (index == 0) {
      this.imageInPost = this.paths[index + 1];
      this.imageInPre = this.paths[this.paths.length - 1];
   } else {
      this.imageInPre = this.paths[index - 1];
      this.imageInPost = this.paths[index + 1];
   }
};

ImageViewer.prototype.mount = function () {
   if (!this.portal) {
      this.portal = document.createElement('div');
      this.portal.className='image-viewer fade';
      this.portal.id = 'image-viewer-window'
      var backdrop = document.createElement('div');
         backdrop.className="image-viewer-backdrop";
         $(backdrop).click($.proxy(this.hide, this));
      this.portal.appendChild(backdrop);
      $(document.body).prepend(this.portal);
      this.render();
   }
};

ImageViewer.prototype.render = function () {
   setTimeout(this.settleOnMount.bind(this), 10);
   var left = document.createElement('div');
      left.className = 'image-viewer-inner off-left';
      left.id = 'left-inner';
      var leftImage = document.createElement('img');
         leftImage.className = 'image';
         leftImage.style.backgroundImage = 'url('+ this.imageInPre +')';
      left.appendChild(leftImage);
   var inner = document.createElement('div');
      inner.className = 'image-viewer-inner in-view';
      inner.id = 'inview-inner';
      var image = document.createElement('img');
         image.className = 'image';
         image.style.backgroundImage = 'url('+ this.imageInView +')';
      inner.appendChild(image);
   var right = document.createElement('div');
      right.className = 'image-viewer-inner off-right';
      right.id = 'right-inner';
      var rightImage = document.createElement('img');
         rightImage.className = 'image';
         rightImage.style.backgroundImage = 'url('+ this.imageInPost +')';
      right.appendChild(rightImage);

   $('.image-viewer-backdrop').prepend(left);
   $(this.portal.childNodes).append(inner);
   $('.image-viewer-backdrop').append(right);
   this.mountNav();
};
ImageViewer.prototype.settleOnMount = function () {
   this.portal.className = 'image-viewer fade in';
};

ImageViewer.prototype.swipeRight = function (e) {
   // this.currImage = this.imageInPost;

   this.currImage = (this.currImageIndex == this.images.length - 1) ? this.images[0] : this.images[this.currImageIndex + 1];
   this.setViewerPosition();
   var offLeft = document.getElementsByClassName('off-left');
      $(offLeft).remove();
   var inView = document.getElementsByClassName('in-view');
      $(inView).addClass('off-left');
      $(inView).removeClass('in-view');
   var offRight = document.getElementsByClassName('off-right');
      $(offRight).addClass('in-view');
      $(offRight).removeClass('off-right');
   var newOffRight = document.createElement('div');
      newOffRight.className = 'image-viewer-inner off-right';
      newOffRight.id = 'right-inner';
      var image = document.createElement('img');
         image.className = 'image';
         image.style.backgroundImage = 'url('+ this.imageInPost +')';
      newOffRight.appendChild(image);
   $('.image-viewer-backdrop').append(newOffRight);
   //setTimeout(this.removeOffScreen(), 500);
};

ImageViewer.prototype.swipeLeft = function (e) {
   this.currImage = (this.currImageIndex == 0) ? this.images[this.images.length - 1] : this.images[this.currImageIndex - 1];
   this.setViewerPosition();
   var offRight = document.getElementsByClassName('off-right');
      $(offRight).remove();
   var inView = document.getElementsByClassName('in-view');
      $(inView).addClass('off-right');
      $(inView).removeClass('in-view');
   var offLeft = document.getElementsByClassName('off-left');
      $(offLeft).addClass('in-view');
      $(offLeft).removeClass('off-left');
   var newOffLeft = document.createElement('div');
      newOffLeft.className = 'image-viewer-inner off-left';
      newOffLeft.id = 'right-inner';
      var image = document.createElement('img');
         image.className = 'image';
         image.style.backgroundImage = 'url('+ this.imageInPre +')';
      newOffLeft.appendChild(image);
   $('.image-viewer-backdrop').prepend(newOffLeft);
   //setTimeout(this.removeOffScreen(), 500);
};

ImageViewer.prototype.removeOffScreen = function () {
   if ($('.off-right').length > 0) {
      $('.off-right').remove();
   }
   if ($('.off-left').length > 0) {
      $('.off-left').remove();
   }
};

ImageViewer.prototype.mountNav = function () {
   var navBox = document.createElement('div');
      navBox.className = 'nav-box';
   var left = document.createElement('div');
      left.className = 'nav-arrow fa fa-chevron-left';
      $(left).click($.proxy(this.swipeLeft, this));
   var right = document.createElement('div');
      right.className = 'nav-arrow fa fa-chevron-right';
      $(right).click($.proxy(this.swipeRight, this));
   navBox.appendChild(left);
   navBox.appendChild(right);
   $('.image-viewer').prepend(navBox);
};


ImageViewer.prototype.hide = function(e) {
   if (e.target==$('.image-viewer-backdrop')[0]) {
      this.portal.className = 'image-viewer fade';
      setTimeout(this.unmount, 500);
   }
}
ImageViewer.prototype.unmount = function () {
   var modal = document.getElementById('image-viewer-window');
   document.body.removeChild(modal);
};
