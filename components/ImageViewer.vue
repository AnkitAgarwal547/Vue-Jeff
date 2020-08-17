<template>
    <div>
        <img :src="imgsrc" ref='imgView' id="newImg" class="img-fluid d-block mx-auto" alt="Responsive image" style="padding: 36px;"> 
    </div>
</template>
 
<script scoped>
    export default {
        props:['imgsrc'],
        data(){
            return {
                imgPath: this.imgsrc, 
            }
        },
        created(){ 
        },
        mounted() {  
            this.imageViewer();
        },
        methods:{ 
            imageViewer:function(){ 
                if(jQuery(this.$refs.imgView).is(":visible") == false) return false;
                const viewer = new Viewer(document.getElementById('newImg'), {
                  inline: true,
                  viewed() {
                    viewer.zoomTo(1);
                  },
                  toolbar:{
                      zoomIn: 4,
                      zoomOut: 4,
                      // oneToOne: 4,
                      reset: 4,
                      rotateLeft: 4,
                      rotateRight: 4,
                      flipHorizontal: 4,
                      flipVertical: 4,
                    }
                });
            }
        }
    }
</script>
