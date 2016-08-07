Polymer({

      is: 'epic-card',

      properties: {
          /**
           * The title of the card.
           */
           type: {
             type: String,
             value: '',
             notify: true,
            },
            headingOverImage: {
                type: Boolean,
                value: false,
                notify: true
            },
           href: {
             type: String,
             value: '#',
             notify: true
         },
          heading: {
            type: String,
            value: '',
            notify: true
          },

          subheading: {
            type: String,
            value: '',
            notify: true
          },

          /**
           * The url of the title image of the card.
           */
          image: {
            type: String,
            value: '',
            notify: true,
            observer:'_imageChanged'
            },

          /**
           * The embed URL for video. Used only with cards with `type=video`
           */
          video: {
            type: String,
            value: '',
            notify: true,
           },

           videoThumbnail: {
               type: String,
               notify: true,
               computed: '_computeVideoThumbnail(type, video)',
           },

           coverImage: {
               type: String,
               notify: true,
               computed: '_computeCoverImage(type, videoThumbnail)'
           },

          /**
           * When `true`, any change to the image url property will cause the
           * `placeholder` image to be shown until the image is fully rendered.
           */
          preloadImage: {
            type: Boolean,
            value: true,
            notify: true
          },

          /**
           * When `preloadImage` is true, setting `fadeImage` to true will cause the
           * image to fade into place.
           */
          fadeImage: {
            type: Boolean,
            value: false,
            notify: true
          },

          /**
           * The z-depth of the card, from 0-5.
           */
          elevation: {
            type: Number,
            value: 5,
            notify:true,
            reflectToAttribute: true
        },

        imageSizing: {
            type: String,
            value: 'cover',
            notify:true
        },

        imagePosition: {
            type: String,
            value: 'center',
            notify:true
        },

        placeholder: {
            type: String,
            notify:true,
            value:''
        },

          /**
           * Set this to true to animate the card shadow when setting a new
           * `z` value.
           */
          animatedShadow: {
            type: Boolean,
            value: false
          }
      },

      observers: [
        //   '_setCoverImageSizing(imageSizing, imagePosition, isReady)'
      ],

      listeners: {
      },

      ready: function(){
          this.isReady = true;
      },

      _handleTap: function(e){

      },
      _isVideoType: function(type){
        //   console.log(type);
          return type === 'video';
      },

      _imageChanged(image, oldImage){
           console.log(image, oldImage);
      },

      _typeChanged: function(type){
          if(type === 'video'){

            //   this.customStyle['--epic-card-overlay-width'] = image.width;
            //   this.customStyle['--epic-card-overlay-height'] = image.height;

            //   this.updateStyles();
          }
      },

      _computeOverlayHeading: function(heading, headingOverImage){

          if(!headingOverImage || !heading){
              return '';
          } else {
              return heading;
          }
      },

      _setCoverImageSizing: function(imageSizing, imagePosition, isReady) {
        //   var imageElement = this.$.epicPaperCard.querySelector('iron-image');
          if(!imageElement) {
              return;
          }

          if(imageSizing) {
              imageElement.sizing = imageSizing;
          }

          if(imagePosition) {
              imageElement.position = imagePosition;
          }
          return;
      },

      _computeVideoThumbnail: function(type, video) {
          if(type != 'video'){
              return '';
          }

          if (video.indexOf('youtube.com') !== -1) {
              var videoId = video.match(/(?:.?|)youtube\.com\/(?:embed\/|watch\?v\=)([^\?\v$^]+)/i)[1];
              var thumbnailUrl = 'http://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
              return thumbnailUrl;

          } else if (video.indexOf('vimeo.com') !== -1) {
              return '';
          }

      },

      _computeCoverImage(type, videoThumbnail) {
          if(this.image){
              return this.image;
          }

          if(type === 'video' && videoThumbnail) {
              return videoThumbnail;
          }
      }

    });