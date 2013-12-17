/**
 * Decker.js
 *
 * Minimal slide plugin
 * Requires jQuery... FOR NOW
 *
 * Copyright 2013, Devin Hunt (http://hailpixel.com)
 */

(function(window, $){
  'use strict';

  var KEY_RIGHT = 39,
      KEY_PAGE_DOWN = 34,
      KEY_SPACE = 32,
      KEY_LEFT = 37,
      KEY_PAGE_UP = 33,
      SLIDE_WIDTH = 1280,
      SLIDE_HEIGHT = 720;

  var Decker = function(deckerEl, options) {
    this.currentSlide = 0;
    this.setup(deckerEl, options);
  }

  Decker.prototype = {

    setup: function(el, options) {
      this.$el = el;
      this.slideContainer = this.$('.slides');
      this.slides = this.$('.slide');

      // Setup scaling
      this.slideContainer.css({
        width: SLIDE_WIDTH,
        height:SLIDE_HEIGHT
      });
      $(window).resize($.proxy(this.onResize, this)).resize();

      // Setup interaction
      $('body').keydown($.proxy(this.onKeydown, this));

      // Start the presentation!
      var windowIndex = parseInt(window.location.hash.substring(1), 10);
      this.jump(windowIndex || 0);
    },

    $: function(selector) {
      return this.$el.find(selector);
    },

    next: function() {
      this.jump(this.currentSlide + 1);
    },

    prev: function() {
      this.jump(this.currentSlide - 1);
    },

    jump: function(slideIndex) {
      var index = this.currentSlide = Math.min(this.slides.length - 1, Math.max(0, slideIndex));

      this.slides.removeClass('prev current next');

      this.slides.each(function(i, el) {
        if(i < index) {
          $(el).addClass('prev');
        } else if(i > index) {
          $(el).addClass('next');
        } else {
          $(el).addClass('current');
          var anim = $(el).data('anim');
          if(anim !== undefined) {
            window[anim](el);
          }
        }
      });

      window.location.hash = index;
    },

    onResize: function(event) {
      var winWidth = $(window).width(),
          winHeight = $(window).height(),
          zoom = 1;

      if(winWidth > winHeight) {
        zoom = winHeight / SLIDE_HEIGHT;
      } else {
        zoom = winWidth / SLIDE_WIDTH;
      }
      this.slideContainer.css('zoom', Math.min(1, zoom));

    },

    // Keyboard input malarkey
    onKeydown: function(event) {

      if(event.keyCode == KEY_RIGHT || event.keyCode == KEY_PAGE_DOWN || event.keyCode == KEY_SPACE ) {
        this.next();
        event.preventDefault();
      } else if(event.keyCode == KEY_LEFT || event.keyCode == KEY_PAGE_UP) {
        this.prev();
        event.preventDefault();
      }
    }
  }



  // Add decker function to jquery
  $.extend($.fn, {
    decker: function(options) {
      window.deck = new Decker(this, options); // lol objects on window
      return this;
    }
  });

})(window, window.jQuery);