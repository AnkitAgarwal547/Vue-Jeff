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
            this.unreadNotification += (this.unread) ? this.unread : 0;
            if(this.isadmin){
                this.nottificationUrl = siteurl+"/admin/notifications";
            }else{
                this.nottificationUrl = siteurl+"/user/notifications";
            }
        },
        mounted() { 
            /*auth_userId
            to_user
            isAdmin
            notification
            thumbnail*/
            var self = this;
            Echo.channel('testingChannel')
            .listen('NotifyBroadCastEvent', (data) => {
                console.warn(data);
                /* if(this.userid != data.to_user && data.isadmin != 1){
                    self.messages.push({title: data.notification.slice(0,35).concat('','...'), 'thumbnail': data.thumbnail})
                    this.playSound();
                } */
                if(this.userid == data.to_user){
                    self.messages.push({title: data.notification.slice(0,35).concat('','...'), 'thumbnail': data.thumbnail})
                    self.unreadNotification += self.messages.length;
                    this.playSound();
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
