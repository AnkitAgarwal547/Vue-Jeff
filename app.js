require('./bootstrap');

Vue.component('notification-component', require('./components/NotificationComponent.vue').default);
Vue.component('user-notification-component', require('./components/UserNotificationComponent.vue').default);
// ImageViewer Component
Vue.component('img-viewer', require('./components/ImageViewer.vue').default);
// Video Viewer Component
Vue.component('video-viewer', require('./components/VideoViewer.vue').default);
// PDF Viewer Component
Vue.component('pdf-viewer', require('./components/PdfViewer.vue').default);
// Draggable
// Vue.component('sample', require('./components/simple.vue').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#notification',
    created(){ 
    },
    mounted(){ 
    }
});
