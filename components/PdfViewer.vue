<template>
    <div>
        <iframe :src="imgPath" class="pdf-iframe" autoplay="false" width='500' height='508' allowfullscreen webkitallowfullscreen></iframe>
    </div>
</template>
 
<script scoped>
    export default {
        props:['filepath'],
        data(){
            return {
                imgPath: '',  
            }
        },
        created(){
          this.imgPath= this.filepath;
          // pdfjs-dist/web/viewer.html?file=http://localhost/js-viewer/viewer-js/images/sample.pdf 
        },
        mounted() {  
          // this.imgPath = siteurl+'/public/pdfjs-dist/web/viewer-v2.html?file='+this.filepath; 
        }, 
    }
</script>
<style scoped>
.pdf-iframe{
  width:100%;
  min-height:508px;
}
</style>