<template>
    <div>
        <!-- <img :src="imgsrc" id="vue-video" class="img-fluid d-block mx-auto" alt="Responsive image" style="padding: 36px;">  -->
        <video
          id="my-video"
          class="video-js vjs-big-play-centered "
          controls
          preload="auto"
          width="640"
          height="264"
          :poster="poster"
          data-setup="{}"
        >
        <!-- MY_VIDEO_POSTER.jpg -->
          <source :src="imgPath" type="video/mp4" />
          <source :src="imgPath" type="video/webm">
          <source :src="imgPath" type="video/ogg">
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank"
              >supports HTML5 video</a
            >
          </p>
        </video>
    </div>
</template>
 
<script scoped>
    export default {
        props:['imgsrc','imgpath'],
        data(){
            return {
                imgPath: '',
                poster: this.imgpath 
            }
        },
        created(){
          var audio = ['mp3','ogg','wma','m3u','wav'];
          this.imgPath = siteurl+'/public/uploads/'+this.imgsrc;
          // console.log(this.imgsrc.split('.'))
          if(audio.includes(this.imgsrc.split('.')[1].toLocaleLowerCase())){
            this.poster = siteurl+'/public/image/admin/image/audio.jpg';
          } 
        },
        watch:{
          imgPath:function(){
            var player = videojs('my-video');
          }
        },
        mounted() { 
          var player = videojs('my-video');
          /*var options = {};
          var player = videojs('my-video', options, function onPlayerReady() {
            // videojs.log('Your player is ready!');
           
            // In this context, `this` is the player that was created by Video.js.
            // this.play();
           
            // How about an event listener?
            this.on('ended', function() {
              videojs.log('Awww...over so soon?!');
            });
          });  */
        }, 
    }
</script>
<style scoped>
#my-video{
  width:100%;
  min-height:508px;
}
</style>