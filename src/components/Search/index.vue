<template>
  <div class="search_body">
	  <Loading v-if="isLoading"/>
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" />
      </div>
    </div>
    <div class="search_result">
      <h3>电影/电视剧/综艺</h3>
      <ul>
        <!-- <li>
          <div class="img"><img src="/images/movie_1.jpg" /></div>
          <div class="info">
            <p><span>无名之辈</span><span>8.5</span></p>
            <p>A Cool Fish</p>
            <p>剧情,喜剧,犯罪</p>
            <p>2018-11-16</p>
          </div>
        </li> -->
        <li v-for="item in movieList" :key="item.filmId">
          <div class="img" @click="handleToDetail(item.filmId)"><img :src="item.poster" /></div>
          <div class="info">
            <p @click="handleToDetail(item.filmId)"><span>{{item.name}}</span><span>8.5</span></p>
            <!-- <p>A Cool Fish</p> -->
            <p>主演:{{item.actors | actorFilter}}</p>
            <p>{{ item.nation }} | {{ item.runtime }}分钟</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import axios from "axios";
import Vue from "vue";
Vue.filter("actorFilter", (data) => data.map((actor) => actor.name).join(" "));
export default {
  name: "Search",
  data() {
    return {
      movieList: [],
      isLoading: true,
      prevCityId: -1,
    };
	
  },
    activated(){
     var cityId=this.$store.state.city.id;
    if(this.prevCityId===cityId){return;}
    this.isLoading=true
    axios({
     url:`https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=1&pageSize=37&type=1&k=8796911`,
     headers: {
       'X-Client-Info':'{"a":"3000","ch":"1002","v":"5.0.4","e":"16343055032882305307705345","bc":"110100"}',
       'X-Host':'mall.film-ticket.film.list'
     }
   }).then((res)=>{
     var msg = res.data.msg;
     if(msg ==='ok'){
       this.movieList = res.data.data.films;
       this.isLoading=false
       this.prevCityId=cityId
        this.$nextTick(
          ()=>{
            new BScroll(".search_body",{
            scrollY: true,
            click: true,
          })
          }
        )
     }
   })
  },
  methods:{
    handleToDetail(filmId){
      this.$router.push('/movie/detail/2/'+filmId)
    }
  }
};
</script>
<style scoped>
#content .search_body {
  flex: 1;
  overflow: auto;
}
.search_body .search_input {
  padding: 8px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.search_body .search_input_wrapper {
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  line-height: 20px;
}
.search_body .search_input_wrapper i {
  font-size: 16px;
  padding: 4px 0;
}
.search_body .search_input_wrapper input {
  border: none;
  font-size: 13px;
  color: #333;
  padding: 4px 0;
  outline: none;
  margin-left: 5px;
  width: 100%;
}
.search_body .search_result h3 {
  font-size: 15px;
  color: #999;
  padding: 9px 15px;
  border-bottom: 1px solid #e6e6e6;
}
.search_body .search_result li {
  border-bottom: 1px #c9c9c9 dashed;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
}
.search_body .search_result .img {
  width: 60px;
  float: left;
}
.search_body .search_result .img img {
  width: 100%;
}
.search_body .search_result .info {
  float: left;
  margin-left: 15px;
  flex: 1;
}
.search_body .search_result .info p {
  height: 22px;
  display: flex;
  line-height: 22px;
  font-size: 12px;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) {
  font-size: 18px;
  flex: 1;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2) {
  font-size: 16px;
  color: #fc7103;
}
</style>
