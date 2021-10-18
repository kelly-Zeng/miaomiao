<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
		<div id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="movieList.poster"/>
					</div>
					<div class="detail_list_info">
						<h2>{{movieList.name}}</h2>
						<!-- <p>A Cool Fish</p> -->
						<p>{{movieList.grade}}分</p>
						<p>{{movieList.category}}</p>
						<p>{{ movieList.nation }} | {{ movieList.runtime }}分钟</p>
						<!-- <p>{{ (movieList.premiereAt * 1000) | dateFilter }}上映</p> -->
                        <p>演职人员：{{ movieList.actors | actorFilter }}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>电影详情：{{movieList.synopsis}}</p>
			</div>
            <br>
			<div class="detail_player swiper-container" ref="detail_player">
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="(item,index) in movieList.photos" :key="index">
						<div>
                            <!-- <p>剧照：</p> -->
                            <!-- <br> -->
							<img :src="item" width="100px" height="80px"/>
						</div>
                        <br>
						
						<!-- <p>剧照:{{item}}</p> -->
					</li>
					<!-- <li class="swiper-slide">
						<div>
							<img src="/images/person_1.webp" alt="">
						</div>
						<p>陈建斌</p>
						<p>马先勇</p>
					</li>
					<li class="swiper-slide">
						<div>
							<img src="/images/person_1.webp" alt="">
						</div>
						<p>陈建斌</p>
						<p>马先勇</p>
					</li>
					<li class="swiper-slide">
						<div>
							<img src="/images/person_1.webp" alt="">
						</div>
						<p>陈建斌</p>
						<p>马先勇</p>
					</li>
					<li class="swiper-slide">
						<div>
							<img src="/images/person_1.webp" alt="">
						</div>
						<p>陈建斌</p>
						<p>马先勇</p>
					</li>
					<li class="swiper-slide">
						<div>
							<img src="/images/person_1.webp" alt="">
						</div>
						<p>陈建斌</p>
						<p>马先勇</p>
					</li> -->
				</ul>
			</div>
            
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header';
import axios from "axios";
import Vue from "vue";
// import { verticalDivider, dateFilter } from "@/helpers/filter_helper.js";
Vue.filter("actorFilter", (data) => data.map((actor) => actor.name).join(" "));
export default {
    name:'Detail',
//       filters: {
//     verticalDivider,
//     dateFilter,
//   },
    data(){
        return{
             movieList: {}
        }
    },
    components:{
        Header
    },
    props:['filmId'],
   
    
    methods:{
        handleToBack(){
            this.$router.back();
        }
    },
    mounted(){
        // console.log(this.filmId);
         axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.filmId}`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16343055032882305307705345","bc":"610900"}',
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res)=>{
        var msg = res.data.msg;
        if(msg==="ok"){
            this.movieList=res.data.data.film;
            this.$nextTick(()=>{
                new Swiper(this.$refs.detail_player,{
                    slidesPerView:'auto',
                    freeMode:true,
                    freeModeSticky:true
                })
            })
        }
        console.log(res);
    })
    }
}
</script>
<style scoped>
#detailContrainer{ position: absolute; left:0; top:0; z-index: 100; width:100%; min-height:100%; background:white;}
#detailContrainer.slide-enter-active{ animation:.3s slideMove;}
@keyframes slideMove{
    0%{ transform : translateX(100%); }
    100%{ transform : translateX(0); }
}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>