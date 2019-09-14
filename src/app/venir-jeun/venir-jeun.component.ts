import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-venir-jeun',
  templateUrl: './venir-jeun.component.html',
  styleUrls: ['./venir-jeun.component.scss']
})
export class VenirJeunComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let body = $("html, body");
    body.stop().animate({scrollTop:0}, 500, 'swing');

    let fullHeight = function() {

      $('.js-fullheight').css('height', $(window).height());
      $(window).resize(function(){
        $('.js-fullheight').css('height', $(window).height());
      });

    };
    fullHeight();

    // loader
    let loader = function() {
      setTimeout(function() {
        if($('#ftco-loader').length > 0) {
          $('#ftco-loader').removeClass('show');
        }
      }, 1000);
    };
    loader();

    // Scrollax
    $.Scrollax();


    $('nav .dropdown').hover(function(){
      let $this = $(this);
      // 	 timer;
      // clearTimeout(timer);
      $this.addClass('show');
      $this.find('> a').attr('aria-expanded', true);
      // $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
      $this.find('.dropdown-menu').addClass('show');
    }, function(){
      let $this = $(this);
      // timer;
      // timer = setTimeout(function(){
      $this.removeClass('show');
      $this.find('> a').attr('aria-expanded', false);
      // $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
      $this.find('.dropdown-menu').removeClass('show');
      // }, 100);
    });


    $('#dropdown04').on('show.bs.dropdown', function () {
      console.log('show');
    });



    let contentWayPoint = function() {
      let i = 0;
      $('.ftco-animate').waypoint( function( direction ) {

        if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

          i++;

          $(this.element).addClass('item-animate');
          setTimeout(function(){

            $('body .ftco-animate.item-animate').each(function(k){
              let el = $(this);
              setTimeout( function () {
                let effect = el.data('animate-effect');
                if ( effect === 'fadeIn') {
                  el.addClass('fadeIn ftco-animated');
                } else if ( effect === 'fadeInLeft') {
                  el.addClass('fadeInLeft ftco-animated');
                } else if ( effect === 'fadeInRight') {
                  el.addClass('fadeInRight ftco-animated');
                } else {
                  el.addClass('fadeInUp ftco-animated');
                }
                el.removeClass('item-animate');
              },  k * 50, 'easeInOutExpo' );
            });

          }, 100);

        }

      } , { offset: '95%' } );
    };
    contentWayPoint();
  }

}
