<template>
    <li class="nav-item dropdown">
        <a href="#" class="dropdown-toggle nav-link hvr-wobble-horizontal" data-toggle="dropdown">
            <i class="fa fa-bell-o"></i> <span  class="badge badge-pill">{{messages.length}}</span>
        </a>
        <div class="dropdown-menu notifications">
            <div class="topnav-dropdown-header">
                <span class="notification-title">Notifications</span>
                <!-- <a href="javascript:void(0)" class="clear-noti"> Clear All </a> -->
            </div>
            <div class="noti-content">
                <ul class="notification-list">
                    <li class="notification-message" v-for="message in messages">
                        <a :href="nottificationUrl">
                            <div class="media">
                                <span class="avatar">
                                    <img alt="User Pic" :src="message.thumbnail">
                                </span>
                                <div class="media-body">
                                    <p class="noti-details"><span class="noti-title">{{message.title}}</span></p>
                                    <!-- <p class="noti-time"><span class="notification-time">4 mins ago</span></p> -->
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="topnav-dropdown-footer">
                <a :href="nottificationUrl">View all Notifications</a>
            </div>
        </div>
    </li>
</template>
<!-- public/image/admin/image/notification-image.png -->
<!-- 
    {title:"You have new notification", 'thumbnail': '/public/image/dummy-user.png'},{title:"You have new notification", 'thumbnail': '/public/image/dummy-user.png'}
 -->
<script scoped>
    export default {
        props:['userid', 'isadmin','unread'],
        data(){
            return {
                newuserid: this.userid,
                unreadNotification:0,
                nottificationUrl:'',
                messages:[]
            }
        },
        created(){
            var self = this;
            if(this.isadmin == 1){
                this.nottificationUrl = siteurl+"/admin/notifications";
            }else{
                this.nottificationUrl = siteurl+"/user/notifications";
            }
            this.unreadNotification += (this.unread.length) ? this.unread.length : 0;  
            if(this.unread.length){
                this.unread.forEach(item => {
                    var thumbnail = (item.data.userImage) ? siteurl+'/public/uploads/'+item.data.userImage : siteurl+'/public/image/dummy-user.png';
                    self.messages.push({title: item.data.message.slice(0,35).concat('','...'), thumbnail: thumbnail});
                });
            }
        },
        mounted() {  
            var self = this;
            Echo.channel('userNotification')
            .listen('NotifyBroadCastEvent', (data) => {
                // console.log(data); 
                if(this.userid == data.to_user){
                    self.messages.push({title: data.notification.slice(0,35).concat('','...'), 'thumbnail': data.thumbnail})
                    self.unreadNotification += self.messages.length;
                    self.playSound();
                }
            }); 
        },
        methods:{
            playSound(){
                var sound = siteurl+"/public/image/notify.ogg";
                var audio = new Audio(sound);
                audio.play();
            }
        }
    }
</script>
