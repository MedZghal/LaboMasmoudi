import { Component, OnInit } from '@angular/core';
import {circle, circleMarker, latLng, marker, polygon, tileLayer} from 'leaflet';
import {FormGroup} from '@angular/forms';
declare const $: any;
declare const L: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm:FormGroup;
  constructor() {

  }

  ngOnInit() {
    let greenIcon = L.icon({
      iconUrl: 'assets/images/LOGOLABO.png',

      iconSize:     [40, 80], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    let map = L.map('map', {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      center: latLng(36.843043, 10.1653395),
      zoom: 15
    });
    L.marker([36.842520, 10.165277 ], {icon: greenIcon}).addTo(map).bindPopup("<span>Laboratoire D'analyses Médicales senda Jeribi Masmoudi</span><br>\n" +
      "<div>مخبر التحاليل الطبية سندة جريبي مصمودي</span> </div>");

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
