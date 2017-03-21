+function(t){"use strict";var s=function(e,i){this.$element=t(e),this.options=t.extend({},s.DEFAULTS,i),this.state=null,this.placement=null,this.options.recalc&&(this.calcClone(),t(window).on("resize",t.proxy(this.recalc,this))),this.options.autohide&&t(document).on("click",t.proxy(this.autohide,this)),this.options.toggle&&this.toggle(),this.options.disablescrolling&&(this.options.disableScrolling=this.options.disablescrolling,delete this.options.disablescrolling)};s.DEFAULTS={toggle:!0,placement:"auto",autohide:!0,recalc:!0,disableScrolling:!0},s.prototype.offset=function(){switch(this.placement){case"left":case"right":return this.$element.outerWidth();case"top":case"bottom":return this.$element.outerHeight()}},s.prototype.calcPlacement=function(){function s(t,s){return"auto"===n.css(s)?t:"auto"===n.css(t)?s:parseInt(n.css(t),10)>parseInt(n.css(s),10)?s:t}if("auto"!==this.options.placement)return void(this.placement=this.options.placement);this.$element.hasClass("in")||this.$element.css("visiblity","hidden !important").addClass("in");var e=t(window).width()/this.$element.width(),i=t(window).height()/this.$element.height(),n=this.$element;this.placement=e>=i?s("left","right"):s("top","bottom"),"hidden !important"===this.$element.css("visibility")&&this.$element.removeClass("in").css("visiblity","")},s.prototype.opposite=function(t){switch(t){case"top":return"bottom";case"left":return"right";case"bottom":return"top";case"right":return"left"}},s.prototype.getCanvasElements=function(){var s=this.options.canvas?t(this.options.canvas):this.$element,e=s.find("*").filter(function(){return"fixed"===t(this).css("position")}).not(this.options.exclude);return s.add(e)},s.prototype.slide=function(s,e,i){if(!t.support.transition){var n={};return n[this.placement]="+="+e,s.animate(n,350,i)}var a=this.placement,o=this.opposite(a);s.each(function(){"auto"!==t(this).css(a)&&t(this).css(a,(parseInt(t(this).css(a),10)||0)+e),"auto"!==t(this).css(o)&&t(this).css(o,(parseInt(t(this).css(o),10)||0)-e)}),this.$element.one(t.support.transition.end,i).emulateTransitionEnd(350)},s.prototype.disableScrolling=function(){var s=t("body").width(),e="padding-"+this.opposite(this.placement);if(void 0===t("body").data("offcanvas-style")&&t("body").data("offcanvas-style",t("body").attr("style")||""),t("body").css("overflow","hidden"),t("body").width()>s){var i=parseInt(t("body").css(e),10)+t("body").width()-s;setTimeout(function(){t("body").css(e,i)},1)}},s.prototype.show=function(){if(!this.state){var s=t.Event("show.bs.offcanvas");if(this.$element.trigger(s),!s.isDefaultPrevented()){this.state="slide-in",this.calcPlacement();var e=this.getCanvasElements(),i=this.placement,n=this.opposite(i),a=this.offset();e.index(this.$element)!==-1&&(t(this.$element).data("offcanvas-style",t(this.$element).attr("style")||""),this.$element.css(i,-1*a),this.$element.css(i)),e.addClass("canvas-sliding").each(function(){void 0===t(this).data("offcanvas-style")&&t(this).data("offcanvas-style",t(this).attr("style")||""),"static"===t(this).css("position")&&t(this).css("position","relative"),"auto"!==t(this).css(i)&&"0px"!==t(this).css(i)||"auto"!==t(this).css(n)&&"0px"!==t(this).css(n)||t(this).css(i,0)}),this.options.disableScrolling&&this.disableScrolling();var o=function(){"slide-in"==this.state&&(this.state="slid",e.removeClass("canvas-sliding").addClass("canvas-slid"),this.$element.trigger("shown.bs.offcanvas"))};setTimeout(t.proxy(function(){this.$element.addClass("in"),this.slide(e,a,t.proxy(o,this))},this),1)}}},s.prototype.hide=function(s){if("slid"===this.state){var e=t.Event("hide.bs.offcanvas");if(this.$element.trigger(e),!e.isDefaultPrevented()){this.state="slide-out";var i=t(".canvas-slid"),n=(this.placement,-1*this.offset()),a=function(){"slide-out"==this.state&&(this.state=null,this.placement=null,this.$element.removeClass("in"),i.removeClass("canvas-sliding"),i.add(this.$element).add("body").each(function(){t(this).attr("style",t(this).data("offcanvas-style")).removeData("offcanvas-style")}),this.$element.trigger("hidden.bs.offcanvas"))};i.removeClass("canvas-slid").addClass("canvas-sliding"),setTimeout(t.proxy(function(){this.slide(i,n,t.proxy(a,this))},this),1)}}},s.prototype.toggle=function(){"slide-in"!==this.state&&"slide-out"!==this.state&&this["slid"===this.state?"hide":"show"]()},s.prototype.calcClone=function(){this.$calcClone=this.$element.clone().html("").addClass("offcanvas-clone").removeClass("in").appendTo(t("body"))},s.prototype.recalc=function(){if("none"!==this.$calcClone.css("display")&&("slid"===this.state||"slide-in"===this.state)){this.state=null,this.placement=null;var s=this.getCanvasElements();this.$element.removeClass("in"),s.removeClass("canvas-slid"),s.add(this.$element).add("body").each(function(){t(this).attr("style",t(this).data("offcanvas-style")).removeData("offcanvas-style")})}},s.prototype.autohide=function(s){0===t(s.target).closest(this.$element).length&&this.hide()};var e=t.fn.offcanvas;t.fn.offcanvas=function(e){return this.each(function(){var i=t(this),n=i.data("bs.offcanvas"),a=t.extend({},s.DEFAULTS,i.data(),"object"==typeof e&&e);n||i.data("bs.offcanvas",n=new s(this,a)),"string"==typeof e&&n[e]()})},t.fn.offcanvas.Constructor=s,t.fn.offcanvas.noConflict=function(){return t.fn.offcanvas=e,this},t(document).on("click.bs.offcanvas.data-api","[data-toggle=offcanvas]",function(s){var e,i=t(this),n=i.attr("data-target")||s.preventDefault()||(e=i.attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,""),a=t(n),o=a.data("bs.offcanvas"),l=o?"toggle":i.data();s.stopPropagation(),o?o.toggle():a.offcanvas(l)})}(window.jQuery),function(t){"use strict";function s(){var t=document.createElement("bootstrap"),s={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var e in s)if(void 0!==t.style[e])return{end:s[e]};return!1}t.fn.emulateTransitionEnd=function(s){var e=!1,i=this;t(this).one("bsTransitionEnd",function(){e=!0});var n=function(){e||t(i).trigger(t.support.transition.end)};return setTimeout(n,s),this},t(function(){t.support.transition=s(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(s){if(t(s.target).is(this))return s.handleObj.handler.apply(this,arguments)}})})}(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9mZmNhbnZhcy5qcyIsInRyYW5zaXRpb24uanMiXSwibmFtZXMiOlsiJCIsIk9mZkNhbnZhcyIsImVsZW1lbnQiLCJvcHRpb25zIiwidGhpcyIsIiRlbGVtZW50IiwiZXh0ZW5kIiwiREVGQVVMVFMiLCJzdGF0ZSIsInBsYWNlbWVudCIsInJlY2FsYyIsImNhbGNDbG9uZSIsIndpbmRvdyIsIm9uIiwicHJveHkiLCJhdXRvaGlkZSIsImRvY3VtZW50IiwidG9nZ2xlIiwiZGlzYWJsZXNjcm9sbGluZyIsImRpc2FibGVTY3JvbGxpbmciLCJwcm90b3R5cGUiLCJvZmZzZXQiLCJvdXRlcldpZHRoIiwib3V0ZXJIZWlnaHQiLCJjYWxjUGxhY2VtZW50IiwiYWIiLCJhIiwiYiIsImNzcyIsInBhcnNlSW50IiwiaGFzQ2xhc3MiLCJhZGRDbGFzcyIsImhvcml6b250YWwiLCJ3aWR0aCIsInZlcnRpY2FsIiwiaGVpZ2h0IiwicmVtb3ZlQ2xhc3MiLCJvcHBvc2l0ZSIsImdldENhbnZhc0VsZW1lbnRzIiwiY2FudmFzIiwiZml4ZWRfZWxlbWVudHMiLCJmaW5kIiwiZmlsdGVyIiwibm90IiwiZXhjbHVkZSIsImFkZCIsInNsaWRlIiwiZWxlbWVudHMiLCJjYWxsYmFjayIsInN1cHBvcnQiLCJ0cmFuc2l0aW9uIiwiYW5pbSIsImFuaW1hdGUiLCJlYWNoIiwib25lIiwiZW5kIiwiZW11bGF0ZVRyYW5zaXRpb25FbmQiLCJib2R5V2lkdGgiLCJwcm9wIiwidW5kZWZpbmVkIiwiZGF0YSIsImF0dHIiLCJwYWRkaW5nIiwic2V0VGltZW91dCIsInNob3ciLCJzdGFydEV2ZW50IiwiRXZlbnQiLCJ0cmlnZ2VyIiwiaXNEZWZhdWx0UHJldmVudGVkIiwiaW5kZXgiLCJjb21wbGV0ZSIsImhpZGUiLCJmYXN0IiwicmVtb3ZlRGF0YSIsIiRjYWxjQ2xvbmUiLCJjbG9uZSIsImh0bWwiLCJhcHBlbmRUbyIsImUiLCJ0YXJnZXQiLCJjbG9zZXN0IiwibGVuZ3RoIiwib2xkIiwiZm4iLCJvZmZjYW52YXMiLCJvcHRpb24iLCIkdGhpcyIsIkNvbnN0cnVjdG9yIiwibm9Db25mbGljdCIsImhyZWYiLCJwcmV2ZW50RGVmYXVsdCIsInJlcGxhY2UiLCIkY2FudmFzIiwic3RvcFByb3BhZ2F0aW9uIiwialF1ZXJ5IiwidHJhbnNpdGlvbkVuZCIsImVsIiwiY3JlYXRlRWxlbWVudCIsInRyYW5zRW5kRXZlbnROYW1lcyIsIldlYmtpdFRyYW5zaXRpb24iLCJNb3pUcmFuc2l0aW9uIiwiT1RyYW5zaXRpb24iLCJuYW1lIiwic3R5bGUiLCJkdXJhdGlvbiIsImNhbGxlZCIsIiRlbCIsImV2ZW50Iiwic3BlY2lhbCIsImJzVHJhbnNpdGlvbkVuZCIsImJpbmRUeXBlIiwiZGVsZWdhdGVUeXBlIiwiaGFuZGxlIiwiaXMiLCJoYW5kbGVPYmoiLCJoYW5kbGVyIiwiYXBwbHkiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiJDQW1CQSxTQUFBQSxHQUFBLFlBS0EsSUFBQUMsR0FBQSxTQUFBQyxFQUFBQyxHQUNBQyxLQUFBQyxTQUFBTCxFQUFBRSxHQUNBRSxLQUFBRCxRQUFBSCxFQUFBTSxVQUFBTCxFQUFBTSxTQUFBSixHQUNBQyxLQUFBSSxNQUFBLEtBQ0FKLEtBQUFLLFVBQUEsS0FFQUwsS0FBQUQsUUFBQU8sU0FDQU4sS0FBQU8sWUFDQVgsRUFBQVksUUFBQUMsR0FBQSxTQUFBYixFQUFBYyxNQUFBVixLQUFBTSxPQUFBTixRQUdBQSxLQUFBRCxRQUFBWSxVQUNBZixFQUFBZ0IsVUFBQUgsR0FBQSxRQUFBYixFQUFBYyxNQUFBVixLQUFBVyxTQUFBWCxPQUVBQSxLQUFBRCxRQUFBYyxRQUFBYixLQUFBYSxTQUVBYixLQUFBRCxRQUFBZSxtQkFDQWQsS0FBQUQsUUFBQWdCLGlCQUFBZixLQUFBRCxRQUFBZSx1QkFDQWQsTUFBQUQsUUFBQWUsa0JBSUFqQixHQUFBTSxVQUNBVSxRQUFBLEVBQ0FSLFVBQUEsT0FDQU0sVUFBQSxFQUNBTCxRQUFBLEVBQ0FTLGtCQUFBLEdBR0FsQixFQUFBbUIs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a0MsR0FBQTdHLE1BQUEsTUFBQTBFLEdBQUFvQyxVQUFBQyxRQUFBQyxNQUFBaEgsS0FBQWlILGlCQUtBdkIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBvZmZjYW52YXMuanMgdjMuMS4zXG4gKiBodHRwOi8vamFzbnkuZ2l0aHViLmlvL2Jvb3RzdHJhcC9qYXZhc2NyaXB0LyNvZmZjYW52YXNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCBBcm5vbGQgRGFuaWVsc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIilcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuK2Z1bmN0aW9uICgkKSB7IFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIE9GRkNBTlZBUyBQVUJMSUMgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgT2ZmQ2FudmFzID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gJChlbGVtZW50KVxuICAgIHRoaXMub3B0aW9ucyAgPSAkLmV4dGVuZCh7fSwgT2ZmQ2FudmFzLkRFRkFVTFRTLCBvcHRpb25zKVxuICAgIHRoaXMuc3RhdGUgICAgPSBudWxsXG4gICAgdGhpcy5wbGFjZW1lbnQgPSBudWxsXG4gICAgXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZWNhbGMpIHtcbiAgICAgIHRoaXMuY2FsY0Nsb25lKClcbiAgICAgICQod2luZG93KS5vbigncmVzaXplJywgJC5wcm94eSh0aGlzLnJlY2FsYywgdGhpcykpXG4gICAgfVxuICAgIFxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b2hpZGUpXG4gICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuYXV0b2hpZGUsIHRoaXMpKVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50b2dnbGUpIHRoaXMudG9nZ2xlKClcbiAgICBcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVzY3JvbGxpbmcpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmRpc2FibGVTY3JvbGxpbmcgPSB0aGlzLm9wdGlvbnMuZGlzYWJsZXNjcm9sbGluZ1xuICAgICAgICBkZWxldGUgdGhpcy5vcHRpb25zLmRpc2FibGVzY3JvbGxpbmdcbiAgICB9XG4gIH1cblxuICBPZmZDYW52YXMuREVGQVVMVFMgPSB7XG4gICAgdG9nZ2xlOiB0cnVlLFxuICAgIHBsYWNlbWVudDogJ2F1dG8nLFxuICAgIGF1dG9oaWRlOiB0cnVlLFxuICAgIHJlY2FsYzogdHJ1ZSxcbiAgICBkaXNhYmxlU2Nyb2xsaW5nOiB0cnVlXG4gIH1cblxuICBPZmZDYW52YXMucHJvdG90eXBlLm9mZnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICBzd2l0Y2ggKHRoaXMucGxhY2VtZW50KSB7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgIGNhc2UgJ3JpZ2h0JzogIHJldHVybiB0aGlzLiRlbGVtZW50Lm91dGVyV2lkdGgoKVxuICAgICAgY2FzZSAndG9wJzpcbiAgICAgIGNhc2UgJ2JvdHRvbSc6IHJldHVybiB0aGlzLiRlbGVtZW50Lm91dGVySGVpZ2h0KClcbiAgICB9XG4gIH1cbiAgXG4gIE9mZkNhbnZhcy5wcm90b3R5cGUuY2FsY1BsYWNlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnBsYWNlbWVudCAhPT0gJ2F1dG8nKSB7XG4gICAgICAgIHRoaXMucGxhY2VtZW50ID0gdGhpcy5vcHRpb25zLnBsYWNlbWVudFxuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgXG4gICAgaWYgKCF0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpbicpKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmNzcygndmlzaWJsaXR5JywgJ2hpZGRlbiAhaW1wb3J0YW50JykuYWRkQ2xhc3MoJ2luJylcbiAgICB9IFxuICAgIFxuICAgIHZhciBob3Jpem9udGFsID0gJCh3aW5kb3cpLndpZHRoKCkgLyB0aGlzLiRlbGVtZW50LndpZHRoKClcbiAgICB2YXIgdmVydGljYWwgPSAkKHdpbmRvdykuaGVpZ2h0KCkgLyB0aGlzLiRlbGVtZW50LmhlaWdodCgpXG4gICAgICAgIFxuICAgIHZhciBlbGVtZW50ID0gdGhpcy4kZWxlbWVudFxuICAgIGZ1bmN0aW9uIGFiKGEsIGIpIHtcbiAgICAgIGlmIChlbGVtZW50LmNzcyhiKSA9PT0gJ2F1dG8nKSByZXR1cm4gYVxuICAgICAgaWYgKGVsZW1lbnQuY3NzKGEpID09PSAnYXV0bycpIHJldHVybiBiXG4gICAgICBcbiAgICAgIHZhciBzaXplX2EgPSBwYXJzZUludChlbGVtZW50LmNzcyhhKSwgMTApXG4gICAgICB2YXIgc2l6ZV9iID0gcGFyc2VJbnQoZWxlbWVudC5jc3MoYiksIDEwKVxuICBcbiAgICAgIHJldHVybiBzaXplX2EgPiBzaXplX2IgPyBiIDogYVxuICAgIH1cbiAgICBcbiAgICB0aGlzLnBsYWNlbWVudCA9IGhvcml6b250YWwgPj0gdmVydGljYWwgPyBhYignbGVmdCcsICdyaWdodCcpIDogYWIoJ3RvcCcsICdib3R0b20nKVxuICAgICAgXG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuY3NzKCd2aXNpYmlsaXR5JykgPT09ICdoaWRkZW4gIWltcG9ydGFudCcpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2luJykuY3NzKCd2aXNpYmxpdHknLCAnJylcbiAgICB9XG4gIH1cbiAgXG4gIE9mZkNhbnZhcy5wcm90b3R5cGUub3Bwb3NpdGUgPSBmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgc3dpdGNoIChwbGFjZW1lbnQpIHtcbiAgICAgIGNhc2UgJ3RvcCc6ICAgIHJldHVybiAnYm90dG9tJ1xuICAgICAgY2FzZSAnbGVmdCc6ICAgcmV0dXJuICdyaWdodCdcbiAgICAgIGNhc2UgJ2JvdHRvbSc6IHJldHVybiAndG9wJ1xuICAgICAgY2FzZSAncmlnaHQnOiAgcmV0dXJuICdsZWZ0J1xuICAgIH1cbiAgfVxuICBcbiAgT2ZmQ2FudmFzLnByb3RvdHlwZS5nZXRDYW52YXNFbGVtZW50cyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIFJldHVybiBhIHNldCBjb250YWluaW5nIHRoZSBjYW52YXMgcGx1cyBhbGwgZml4ZWQgZWxlbWVudHNcbiAgICB2YXIgY2FudmFzID0gdGhpcy5vcHRpb25zLmNhbnZhcyA/ICQodGhpcy5vcHRpb25zLmNhbnZhcykgOiB0aGlzLiRlbGVtZW50XG4gICAgXG4gICAgdmFyIGZpeGVkX2VsZW1lbnRzID0gY2FudmFzLmZpbmQoJyonKS5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJCh0aGlzKS5jc3MoJ3Bvc2l0aW9uJykgPT09ICdmaXhlZCdcbiAgICB9KS5ub3QodGhpcy5vcHRpb25zLmV4Y2x1ZGUpXG4gICAgXG4gICAgcmV0dXJuIGNhbnZhcy5hZGQoZml4ZWRfZWxlbWVudHMpXG4gIH1cbiAgXG4gIE9mZkNhbnZhcy5wcm90b3R5cGUuc2xpZGUgPSBmdW5jdGlvbiAoZWxlbWVudHMsIG9mZnNldCwgY2FsbGJhY2spIHtcbiAgICAvLyBVc2UgalF1ZXJ5IGFuaW1hdGlvbiBpZiBDU1MgdHJhbnNpdGlvbnMgYXJlbid0IHN1cHBvcnRlZFxuICAgIGlmICghJC5zdXBwb3J0LnRyYW5zaXRpb24pIHtcbiAgICAgIHZhciBhbmltID0ge31cbiAgICAgIGFuaW1bdGhpcy5wbGFjZW1lbnRdID0gXCIrPVwiICsgb2Zmc2V0XG4gICAgICByZXR1cm4gZWxlbWVudHMuYW5pbWF0ZShhbmltLCAzNTAsIGNhbGxiYWNrKVxuICAgIH1cblxuICAgIHZhciBwbGFjZW1lbnQgPSB0aGlzLnBsYWNlbWVudFxuICAgIHZhciBvcHBvc2l0ZSA9IHRoaXMub3Bwb3NpdGUocGxhY2VtZW50KVxuICAgIFxuICAgIGVsZW1lbnRzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJCh0aGlzKS5jc3MocGxhY2VtZW50KSAhPT0gJ2F1dG8nKVxuICAgICAgICAkKHRoaXMpLmNzcyhwbGFjZW1lbnQsIChwYXJzZUludCgkKHRoaXMpLmNzcyhwbGFjZW1lbnQpLCAxMCkgfHwgMCkgKyBvZmZzZXQpXG4gICAgICBcbiAgICAgIGlmICgkKHRoaXMpLmNzcyhvcHBvc2l0ZSkgIT09ICdhdXRvJylcbiAgICAgICAgJCh0aGlzKS5jc3Mob3Bwb3NpdGUsIChwYXJzZUludCgkKHRoaXMpLmNzcyhvcHBvc2l0ZSksIDEwKSB8fCAwKSAtIG9mZnNldClcbiAgICB9KVxuICAgIFxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vbmUoJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kLCBjYWxsYmFjaylcbiAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCgzNTApXG4gIH1cblxuICBPZmZDYW52YXMucHJvdG90eXBlLmRpc2FibGVTY3JvbGxpbmcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYm9keVdpZHRoID0gJCgnYm9keScpLndpZHRoKClcbiAgICB2YXIgcHJvcCA9ICdwYWRkaW5nLScgKyB0aGlzLm9wcG9zaXRlKHRoaXMucGxhY2VtZW50KVxuXG4gICAgaWYgKCQoJ2JvZHknKS5kYXRhKCdvZmZjYW52YXMtc3R5bGUnKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAkKCdib2R5JykuZGF0YSgnb2ZmY2FudmFzLXN0eWxlJywgJCgnYm9keScpLmF0dHIoJ3N0eWxlJykgfHwgJycpXG4gICAgfVxuICAgICAgXG4gICAgJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJylcblxuICAgIGlmICgkKCdib2R5Jykud2lkdGgoKSA+IGJvZHlXaWR0aCkge1xuICAgICAgdmFyIHBhZGRpbmcgPSBwYXJzZUludCgkKCdib2R5JykuY3NzKHByb3ApLCAxMCkgKyAkKCdib2R5Jykud2lkdGgoKSAtIGJvZHlXaWR0aFxuICAgICAgXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCdib2R5JykuY3NzKHByb3AsIHBhZGRpbmcpXG4gICAgICB9LCAxKVxuICAgIH1cbiAgfVxuXG4gIE9mZkNhbnZhcy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSkgcmV0dXJuXG4gICAgXG4gICAgdmFyIHN0YXJ0RXZlbnQgPSAkLkV2ZW50KCdzaG93LmJzLm9mZmNhbnZhcycpXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHN0YXJ0RXZlbnQpXG4gICAgaWYgKHN0YXJ0RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5zdGF0ZSA9ICdzbGlkZS1pbidcbiAgICB0aGlzLmNhbGNQbGFjZW1lbnQoKTtcbiAgICBcbiAgICB2YXIgZWxlbWVudHMgPSB0aGlzLmdldENhbnZhc0VsZW1lbnRzKClcbiAgICB2YXIgcGxhY2VtZW50ID0gdGhpcy5wbGFjZW1lbnRcbiAgICB2YXIgb3Bwb3NpdGUgPSB0aGlzLm9wcG9zaXRlKHBsYWNlbWVudClcbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQoKVxuXG4gICAgaWYgKGVsZW1lbnRzLmluZGV4KHRoaXMuJGVsZW1lbnQpICE9PSAtMSkge1xuICAgICAgJCh0aGlzLiRlbGVtZW50KS5kYXRhKCdvZmZjYW52YXMtc3R5bGUnLCAkKHRoaXMuJGVsZW1lbnQpLmF0dHIoJ3N0eWxlJykgfHwgJycpXG4gICAgICB0aGlzLiRlbGVtZW50LmNzcyhwbGFjZW1lbnQsIC0xICogb2Zmc2V0KVxuICAgICAgdGhpcy4kZWxlbWVudC5jc3MocGxhY2VtZW50KTsgLy8gV29ya2Fyb3VuZDogTmVlZCB0byBnZXQgdGhlIENTUyBwcm9wZXJ0eSBmb3IgaXQgdG8gYmUgYXBwbGllZCBiZWZvcmUgdGhlIG5leHQgbGluZSBvZiBjb2RlXG4gICAgfVxuXG4gICAgZWxlbWVudHMuYWRkQ2xhc3MoJ2NhbnZhcy1zbGlkaW5nJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGlmICgkKHRoaXMpLmRhdGEoJ29mZmNhbnZhcy1zdHlsZScpID09PSB1bmRlZmluZWQpICQodGhpcykuZGF0YSgnb2ZmY2FudmFzLXN0eWxlJywgJCh0aGlzKS5hdHRyKCdzdHlsZScpIHx8ICcnKVxuICAgICAgaWYgKCQodGhpcykuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykgJCh0aGlzKS5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJylcbiAgICAgIGlmICgoJCh0aGlzKS5jc3MocGxhY2VtZW50KSA9PT0gJ2F1dG8nIHx8ICQodGhpcykuY3NzKHBsYWNlbWVudCkgPT09ICcwcHgnKSAmJlxuICAgICAgICAgICgkKHRoaXMpLmNzcyhvcHBvc2l0ZSkgPT09ICdhdXRvJyB8fCAkKHRoaXMpLmNzcyhvcHBvc2l0ZSkgPT09ICcwcHgnKSkge1xuICAgICAgICAkKHRoaXMpLmNzcyhwbGFjZW1lbnQsIDApXG4gICAgICB9XG4gICAgfSlcbiAgICBcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVTY3JvbGxpbmcpIHRoaXMuZGlzYWJsZVNjcm9sbGluZygpXG4gICAgXG4gICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuc3RhdGUgIT0gJ3NsaWRlLWluJykgcmV0dXJuXG4gICAgICBcbiAgICAgIHRoaXMuc3RhdGUgPSAnc2xpZCdcblxuICAgICAgZWxlbWVudHMucmVtb3ZlQ2xhc3MoJ2NhbnZhcy1zbGlkaW5nJykuYWRkQ2xhc3MoJ2NhbnZhcy1zbGlkJylcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignc2hvd24uYnMub2ZmY2FudmFzJylcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCQucHJveHkoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdpbicpXG4gICAgICB0aGlzLnNsaWRlKGVsZW1lbnRzLCBvZmZzZXQsICQucHJveHkoY29tcGxldGUsIHRoaXMpKVxuICAgIH0sIHRoaXMpLCAxKVxuICB9XG5cbiAgT2ZmQ2FudmFzLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKGZhc3QpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSAhPT0gJ3NsaWQnKSByZXR1cm5cblxuICAgIHZhciBzdGFydEV2ZW50ID0gJC5FdmVudCgnaGlkZS5icy5vZmZjYW52YXMnKVxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzdGFydEV2ZW50KVxuICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuc3RhdGUgPSAnc2xpZGUtb3V0J1xuXG4gICAgdmFyIGVsZW1lbnRzID0gJCgnLmNhbnZhcy1zbGlkJylcbiAgICB2YXIgcGxhY2VtZW50ID0gdGhpcy5wbGFjZW1lbnRcbiAgICB2YXIgb2Zmc2V0ID0gLTEgKiB0aGlzLm9mZnNldCgpXG5cbiAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZSAhPSAnc2xpZGUtb3V0JykgcmV0dXJuXG4gICAgICBcbiAgICAgIHRoaXMuc3RhdGUgPSBudWxsXG4gICAgICB0aGlzLnBsYWNlbWVudCA9IG51bGxcbiAgICAgIFxuICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaW4nKVxuICAgICAgXG4gICAgICBlbGVtZW50cy5yZW1vdmVDbGFzcygnY2FudmFzLXNsaWRpbmcnKVxuICAgICAgZWxlbWVudHMuYWRkKHRoaXMuJGVsZW1lbnQpLmFkZCgnYm9keScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuYXR0cignc3R5bGUnLCAkKHRoaXMpLmRhdGEoJ29mZmNhbnZhcy1zdHlsZScpKS5yZW1vdmVEYXRhKCdvZmZjYW52YXMtc3R5bGUnKVxuICAgICAgfSlcblxuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdoaWRkZW4uYnMub2ZmY2FudmFzJylcbiAgICB9XG5cbiAgICBlbGVtZW50cy5yZW1vdmVDbGFzcygnY2FudmFzLXNsaWQnKS5hZGRDbGFzcygnY2FudmFzLXNsaWRpbmcnKVxuICAgIFxuICAgIHNldFRpbWVvdXQoJC5wcm94eShmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuc2xpZGUoZWxlbWVudHMsIG9mZnNldCwgJC5wcm94eShjb21wbGV0ZSwgdGhpcykpXG4gICAgfSwgdGhpcyksIDEpXG4gIH1cblxuICBPZmZDYW52YXMucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ3NsaWRlLWluJyB8fCB0aGlzLnN0YXRlID09PSAnc2xpZGUtb3V0JykgcmV0dXJuXG4gICAgdGhpc1t0aGlzLnN0YXRlID09PSAnc2xpZCcgPyAnaGlkZScgOiAnc2hvdyddKClcbiAgfVxuXG4gIE9mZkNhbnZhcy5wcm90b3R5cGUuY2FsY0Nsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kY2FsY0Nsb25lID0gdGhpcy4kZWxlbWVudC5jbG9uZSgpXG4gICAgICAuaHRtbCgnJylcbiAgICAgIC5hZGRDbGFzcygnb2ZmY2FudmFzLWNsb25lJykucmVtb3ZlQ2xhc3MoJ2luJylcbiAgICAgIC5hcHBlbmRUbygkKCdib2R5JykpXG4gIH1cblxuICBPZmZDYW52YXMucHJvdG90eXBlLnJlY2FsYyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy4kY2FsY0Nsb25lLmNzcygnZGlzcGxheScpID09PSAnbm9uZScgfHwgKHRoaXMuc3RhdGUgIT09ICdzbGlkJyAmJiB0aGlzLnN0YXRlICE9PSAnc2xpZGUtaW4nKSkgcmV0dXJuXG4gICAgXG4gICAgdGhpcy5zdGF0ZSA9IG51bGxcbiAgICB0aGlzLnBsYWNlbWVudCA9IG51bGxcbiAgICB2YXIgZWxlbWVudHMgPSB0aGlzLmdldENhbnZhc0VsZW1lbnRzKClcbiAgICBcbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpbicpXG4gICAgXG4gICAgZWxlbWVudHMucmVtb3ZlQ2xhc3MoJ2NhbnZhcy1zbGlkJylcbiAgICBlbGVtZW50cy5hZGQodGhpcy4kZWxlbWVudCkuYWRkKCdib2R5JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuYXR0cignc3R5bGUnLCAkKHRoaXMpLmRhdGEoJ29mZmNhbnZhcy1zdHlsZScpKS5yZW1vdmVEYXRhKCdvZmZjYW52YXMtc3R5bGUnKVxuICAgIH0pXG4gIH1cbiAgXG4gIE9mZkNhbnZhcy5wcm90b3R5cGUuYXV0b2hpZGUgPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KHRoaXMuJGVsZW1lbnQpLmxlbmd0aCA9PT0gMCkgdGhpcy5oaWRlKClcbiAgfVxuXG4gIC8vIE9GRkNBTlZBUyBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBvbGQgPSAkLmZuLm9mZmNhbnZhc1xuXG4gICQuZm4ub2ZmY2FudmFzID0gZnVuY3Rpb24gKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLm9mZmNhbnZhcycpXG4gICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBPZmZDYW52YXMuREVGQVVMVFMsICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PT0gJ29iamVjdCcgJiYgb3B0aW9uKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLm9mZmNhbnZhcycsIChkYXRhID0gbmV3IE9mZkNhbnZhcyh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gICQuZm4ub2ZmY2FudmFzLkNvbnN0cnVjdG9yID0gT2ZmQ2FudmFzXG5cblxuICAvLyBPRkZDQU5WQVMgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLm9mZmNhbnZhcy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4ub2ZmY2FudmFzID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gT0ZGQ0FOVkFTIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLmJzLm9mZmNhbnZhcy5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9b2ZmY2FudmFzXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzICAgPSAkKHRoaXMpLCBocmVmXG4gICAgdmFyIHRhcmdldCAgPSAkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpXG4gICAgICAgIHx8IGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICB8fCAoaHJlZiA9ICR0aGlzLmF0dHIoJ2hyZWYnKSkgJiYgaHJlZi5yZXBsYWNlKC8uKig/PSNbXlxcc10rJCkvLCAnJykgLy9zdHJpcCBmb3IgaWU3XG4gICAgdmFyICRjYW52YXMgPSAkKHRhcmdldClcbiAgICB2YXIgZGF0YSAgICA9ICRjYW52YXMuZGF0YSgnYnMub2ZmY2FudmFzJylcbiAgICB2YXIgb3B0aW9uICA9IGRhdGEgPyAndG9nZ2xlJyA6ICR0aGlzLmRhdGEoKVxuXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgaWYgKGRhdGEpIGRhdGEudG9nZ2xlKClcbiAgICAgIGVsc2UgJGNhbnZhcy5vZmZjYW52YXMob3B0aW9uKVxuICB9KVxuXG59KHdpbmRvdy5qUXVlcnkpO1xuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHRyYW5zaXRpb24uanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyN0cmFuc2l0aW9uc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIENTUyBUUkFOU0lUSU9OIFNVUFBPUlQgKFNob3V0b3V0OiBodHRwOi8vd3d3Lm1vZGVybml6ci5jb20vKVxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Jvb3RzdHJhcCcpXG5cbiAgICB2YXIgdHJhbnNFbmRFdmVudE5hbWVzID0ge1xuICAgICAgV2Via2l0VHJhbnNpdGlvbiA6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgIE1velRyYW5zaXRpb24gICAgOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICBPVHJhbnNpdGlvbiAgICAgIDogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICAgIHRyYW5zaXRpb24gICAgICAgOiAndHJhbnNpdGlvbmVuZCdcbiAgICB9XG5cbiAgICBmb3IgKHZhciBuYW1lIGluIHRyYW5zRW5kRXZlbnROYW1lcykge1xuICAgICAgaWYgKGVsLnN0eWxlW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgZW5kOiB0cmFuc0VuZEV2ZW50TmFtZXNbbmFtZV0gfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZSAvLyBleHBsaWNpdCBmb3IgaWU4ICggIC5fLilcbiAgfVxuXG4gIC8vIGh0dHA6Ly9ibG9nLmFsZXhtYWNjYXcuY29tL2Nzcy10cmFuc2l0aW9uc1xuICAkLmZuLmVtdWxhdGVUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlXG4gICAgdmFyICRlbCA9IHRoaXNcbiAgICAkKHRoaXMpLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkgeyBjYWxsZWQgPSB0cnVlIH0pXG4gICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBpZiAoIWNhbGxlZCkgJCgkZWwpLnRyaWdnZXIoJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kKSB9XG4gICAgc2V0VGltZW91dChjYWxsYmFjaywgZHVyYXRpb24pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gICQoZnVuY3Rpb24gKCkge1xuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uID0gdHJhbnNpdGlvbkVuZCgpXG5cbiAgICBpZiAoISQuc3VwcG9ydC50cmFuc2l0aW9uKSByZXR1cm5cblxuICAgICQuZXZlbnQuc3BlY2lhbC5ic1RyYW5zaXRpb25FbmQgPSB7XG4gICAgICBiaW5kVHlwZTogJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kLFxuICAgICAgZGVsZWdhdGVUeXBlOiAkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsXG4gICAgICBoYW5kbGU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pcyh0aGlzKSkgcmV0dXJuIGUuaGFuZGxlT2JqLmhhbmRsZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxufShqUXVlcnkpO1xuIl19
