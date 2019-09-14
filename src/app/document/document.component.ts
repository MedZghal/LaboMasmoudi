import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

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
    this.initfiles();
  }

  initfiles() {

    $("#file").fileinput('destroy');
    $("#file").fileinput({
      initialPreview: [
        './assets/files/Manuel.pdf',
        './assets/files/LIS_PR_02.pdf',
        './assets/files/ORG_MQ_05.pdf',
        './assets/files/ORG_MQ_06.pdf'
      ],
      initialPreviewConfig: [
        {type: "pdf", size: 18000, caption: "Manuel.pdf", key: '1'},
        {type: "pdf", size: 18000, caption: "Conditions physiologiques de pré-prélèvement et renseignements cliniques.pdf", key: '2'},
        {type: "pdf", size: 18000, caption: "Politique_Qualité.pdf", key: '3'},
        {type: "pdf", size: 18000, caption: "Charte_éthique.pdf", key: '4'}
      ],
      initialPreviewAsData: true,
      fileActionSettings: {
        'showRemove':false,
        'showDrag' :false,
        'zoomIcon': '<i class="fas fa-search-plus text-primary"></i>',
        'downloadIcon': '<i class="fas fa-download text-primary"></i>',
        'indicatorNew': '&nbsp;'
      },
      language: 'fr', // utilise le js de traduction
      showClose: false,
      showCaption: false,
      showBrowse: false,
      overwriteInitial: false,
      purifyHtml: true,
      showUpload: false,
      browseClass: "btn btn-primary btn-block",
      preferIconicPreview: true,
      previewFileIconSettings: {
        'doc': '<i class="fa fa-file-word text-primary"></i>',
        'xls': '<i class="fa fa-file-excel text-success"></i>',
        'ppt': '<i class="fa fa-file-powerpoint text-danger"></i>',
        'jpg': '<i class="fas fa-file-image text-danger"></i>',
        'gif': '<i class="fas fa-file-image text-muted"></i>',
        'png': '<i class="fas fa-file-image text-primary"></i>',
        'pdf': '<i class="fa fa-file-pdf text-danger"></i>',
        'zip': '<i class="fa fa-file-archive text-muted"></i>',
        'htm': '<i class="fa fa-file-code text-info"></i>',
        'txt': '<i class="fa fa-file-text text-info"></i>',
        'mov': '<i class="fa fa-file-movie text-warning"></i>',
        'mp3': '<i class="fa fa-file-audio text-warning"></i>',
      },
      previewFileExtSettings: {
        'doc': function (ext) {
          return ext.match(/(doc|docx)$/i);
        },
        'xls': function (ext) {
          return ext.match(/(xls|xlsx)$/i);
        },
        'ppt': function (ext) {
          return ext.match(/(ppt|pptx)$/i);
        },
        'zip': function (ext) {
          return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
        },
        'htm': function (ext) {
          return ext.match(/(php|js|css|htm|html)$/i);
        },
        'txt': function (ext) {
          return ext.match(/(txt|ini|md)$/i);
        },
        'mov': function (ext) {
          return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
        },
        'mp3': function (ext) {
          return ext.match(/(mp3|wav)$/i);
        },
      }
    });
    $("#file").fileinput('enable');
  }
}
