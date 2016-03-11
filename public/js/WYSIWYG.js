
var fontFormat = {
   bold: 'fa-bold',
   italic: 'fa-italic',
   underline: 'fa-underline',
   font: 'fa-font'
}
var textAlignment = {
   left: 'fa-align-left',
   center: 'fa-align-center',
   right: 'fa-align-right',
   ol: 'fa-list-ol',
   ul: 'fa-list-ul',
   indent: 'fa-indent',
   outdent: 'fa-outdent'
}

var handleStyle = {
   height: '35px',
   width: '100%',
   position: 'relative',
   textAlign: 'center',
   fontSize: '50px',
}

var availableFontSizes = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72];


var WYSIWYG = function() {
   this.menu = false;
};


WYSIWYG.prototype.operationSelect = function (e) {
   e.preventDefault();
   console.log("id: ", e.target.id);
   console.log("target: ", e.target.getAttribute('size'));
   switch (e.target.id) {

      case 'bold': this.bold(); break;
      case 'italic': this.italic(); break;
      case 'underline': this.underline(); break;
      case 'font': this.fontSelections(); break;
      case 'select-font-size': this.setFontSize(e.target.getAttribute('size')); break;
      case 'left': this.justifyLeft(); break;
      case 'center': this.justifyCenter(); break;
      case 'right': this.justifyRight(); break;
      case 'ol': this.insertOrderedList(); break;
      case 'ul': this.insertUnorderedList(); break;
      case 'indent': this.indent(); break;
      case 'outdent': this.outdent(); break;


      default: return;
   }
};


WYSIWYG.prototype.buildMenu = function () {
   var box = document.createElement('div');
      box.className = 'wysiwyg-operations-box';
      box.style.top = '-100px';
      box.style.left = '1000px';
      $(box).draggable({
         handle: '.wysiwyg-operations-box-handle'
      });
      var handle = document.createElement('div');
         handle.className = "wysiwyg-operations-box-handle fa fa-ellipsis-h";
         $(handle).on('mousedown', function(){
            $(handle).addClass('is-dragging');
         }).on('mouseup', function() {
            $(handle).removeClass('is-dragging');
         });
         for (var key in handleStyle) {
            handle.style[key] = handleStyle[key];
         }
   var fontFormatBox = document.createElement('div');
      fontFormatBox.className = 'wysiwyg-operations-format-items-box';
   var textAlignmentBox = document.createElement('div');
      textAlignmentBox.className = 'wysiwyg-operations-format-items-box';
   for (var item in fontFormat) {
      var formatItem = document.createElement('button');
         formatItem.id = item;
         formatItem.className = (
            'wysiwyg-operations-item '
            + item.toString()
            + ' fa ' + fontFormat[item]
         );
         $(formatItem).click($.proxy(this.operationSelect, this));
      fontFormatBox.appendChild(formatItem);
   }
   for (var item in textAlignment) {
      var justifyItem = document.createElement('button');
         justifyItem.id = item;
         justifyItem.className = (
            'wysiwyg-operations-item '
            + item.toString()
            + ' fa ' + textAlignment[item]
         );
         $(justifyItem).click($.proxy(this.operationSelect, this));
      textAlignmentBox.appendChild(justifyItem);
   }
   box.appendChild(handle);
   box.appendChild(fontFormatBox);
   box.appendChild(textAlignmentBox);
   $(document.body).append(box);
   this.menu = box;
};

WYSIWYG.prototype.getSelectedText = function () {
   var text = "";
   var style;
   if (window.getSelection) {
      text = window.getSelection().toString();
   } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
   }
   return text;
};

/* Text Formatting */
   WYSIWYG.prototype.underline = function () {
      document.execCommand("underline", false, null);
   };
   WYSIWYG.prototype.bold = function () {
      document.execCommand("bold", false, null);
   };
   WYSIWYG.prototype.italic = function () {
      document.execCommand("italic", false, null);
   };







/// ***** FIXME!!!!

   WYSIWYG.prototype.setFontSize = function (size) {
      console.log("size: ", size)
      var currtext = this.getSelectedText();
      var spanString = $('<span/>', {
        'text': currtext
     }).css('font-size', size + 'px').prop('outerHTML');
      document.execCommand("insertHTML", false, spanString);
   };
   WYSIWYG.prototype.increaseFontSize = function () {
      var currtext = this.getSelectedText();
      var spanString = $('<span/>', {
        'text': currtext
     }).css('font-size', '20px').prop('outerHTML');
      document.execCommand("insertHTML", false, spanString);
   };
   WYSIWYG.prototype.decreaseFontSize = function () {
      document.execCommand("decreaseFontSize", false, null);
   };






/* Positioning */
   WYSIWYG.prototype.justifyCenter = function () {
      document.execCommand("justifyCenter", false, null);
   };
   WYSIWYG.prototype.justifyFull = function () {
      document.execCommand("justifyFull", false, null);
   };
   WYSIWYG.prototype.justifyLeft = function () {
      document.execCommand("justifyLeft", false, null);
   };
   WYSIWYG.prototype.justifyRight = function () {
      document.execCommand("justifyRight", false, null);
   };
   WYSIWYG.prototype.indent = function () {
      document.execCommand("indent", false, null);
   };
   WYSIWYG.prototype.outdent = function () {
      document.execCommand("outdent", false, null);
   };
   WYSIWYG.prototype.insertOrderedList = function () {
      document.execCommand("insertOrderedList", false, null);
   };
   WYSIWYG.prototype.insertUnorderedList = function () {
      document.execCommand("insertUnorderedList", false, null);
   };

/* Events */
   WYSIWYG.prototype.undo = function () {
      document.execCommand("undo", false, null);
   };
   WYSIWYG.prototype.redo = function () {
      document.execCommand("redo", false, null);
   };

   WYSIWYG.prototype.fontSelections = function (e) {
      console.log("this.menu: ", $(this.menu).children().find('#font'))
      console.log("width: ", $(window).width());
      var top = $(this.menu).position().top;
      var left = $(this.menu).position().left;
      var boxwidth = $(this.menu).width();
      console.log("boxwidth: ", boxwidth)
      console.log("pos: ", $(this.menu).position());

      if (!$('.wysiwyg-selections-box')[0]) {
         var selectionsBox = document.createElement('ul');
            selectionsBox.className = 'wysiwyg-selections-box font-size';
            selectionsBox.style.top = top + 80 + "px";
            selectionsBox.style.left = left - 50 + "px";

            for (var size in availableFontSizes) {
               var currSize = document.createElement('button');
                  currSize.innerHTML = availableFontSizes[size] + 'px';
                  currSize.id = 'select-font-size';
                  currSize.className = 'selections-box-item font-size';
                  $(currSize).attr('size', availableFontSizes[size]);
                  $(currSize).click($.proxy(this.operationSelect, this));
               selectionsBox.appendChild(currSize);
            }
         $(document.body).append(selectionsBox);
      } else {
         $('.wysiwyg-selections-box').remove();
      }
   };
