import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CountUp} from 'countup.js';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {BackendService} from './backend.service';
import {BehaviorSubject} from 'rxjs';
declare const $: any;
declare const AOS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements  OnInit{

  Abonnez:FormGroup;

  constructor(private router: Router ,
              private authenticationService :BackendService){

  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    sessionStorage.setItem("LogInSt",this.authenticationService.isAuthenticated()+'');
  }

  ngOnInit(): void {

    if (sessionStorage.getItem("LogInSt")) {
      let stat:any = sessionStorage.getItem("LogInSt");
      console.log(stat);
      if(!stat)
        this.authenticationService.logout();
    }

    AOS.init({
      duration: 800,
      easing: 'slide'
    });


    $(window).stellar({
      responsive: true,
      parallaxBackgrounds: true,
      parallaxElements: true,
      horizontalScrolling: false,
      hideDistantElements: false,
      scrollProperty: 'scroll'
    });


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

    let carousel = function() {
      $('.home-slider').owlCarousel({
        loop:true,
        autoplay: true,
        margin:0,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        mouseDrag:false,
        touchDrag:false,
        nav:false,
        lazyLoad:true,
        autoplayTimeout:11000,
        videoHeight:500,
        autoplayHoverPause: true,
        items: 1,
        navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
        responsive:{
          0:{
            items:1
          },
          600:{
            items:1
          },
          1000:{
            items:1
          }
        }
      });
      $('.carousel-testimony').owlCarousel({
        autoplay: true,
        center: true,
        loop: true,
        items:1,
        margin: 30,
        stagePadding: 0,
        nav: false,
        navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
        responsive:{
          0:{
            items: 1
          },
          600:{
            items: 1
          },
          1000:{
            items: 1
          }
        }
      });

    };
    carousel();

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



    // scroll
    let scrollWindow = function() {
      $(window).scroll(function(){
        let $w = $(this),
          st = $w.scrollTop(),
          navbar = $('.ftco_navbar'),

          sd = $('.js-scroll-wrap');

        if (st > 150) {
          if ( !navbar.hasClass('scrolled') ) {
            navbar.addClass('scrolled');
          }
        }
        if (st < 150) {
          if ( navbar.hasClass('scrolled') ) {
            navbar.removeClass('scrolled sleep');
          }
        }
        if ( st > 350 ) {
          if ( !navbar.hasClass('awake') ) {
            navbar.addClass('awake');
            $("#ScrollTop").css("display", "block");
          }

          if(sd.length > 0) {
            sd.addClass('sleep');
          }
        }
        if ( st < 350 ) {
          if ( navbar.hasClass('awake') ) {
            navbar.removeClass('awake');
            navbar.addClass('sleep');
            $("#ScrollTop").css("display", "none");
          }
          if(sd.length > 0) {
            sd.removeClass('sleep');
          }
        }
      });
    };
    scrollWindow();


    let counter = function() {

      $('#section-counter').waypoint( function( direction ) {

        if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

          //let comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
          $('.number').each(function(){
            let $this = $(this),
              num = $this.data('number');
            console.log(this);
            let demo = new CountUp(this, num, this.options);
            if (!demo.error) {
              demo.start();
            } else {
              console.error(demo.error);
            }
          });

        }

      } , { offset: '95%' } );

    };
    counter();

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


    // magnific popup
    $('.image-popup').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        verticalFit: true
      },
      zoom: {
        enabled: true,
        duration: 300 // don't foget to change the duration also in CSS
      }
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    });


    $('.appointment_date').datepicker({
      'format': 'm/d/yyyy',
      'autoclose': true
    });

    $('.appointment_time').timepicker();



  }
  title = 'LaboMasmoudi';

  ScrollBackTop(){
    let body = $("html, body");
    body.stop().animate({scrollTop:0}, 500, 'swing');
  }

  LogIn(){
    this.authenticationService.authenticationState.next(false);
    this.router.navigate(['/login']);
  }

}
