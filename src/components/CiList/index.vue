<template>
  <div class="cinema_body">
    <Loading v-if="isLoading"/>
    <ul>
      <li v-for="item in cityList" :key="item.cinemaId">
        <div>
          <span>{{item.name}}</span>
          <span class="q"><span class="price">￥{{ (item.lowPrice / 100) | fixedNumberFilter }}</span> 元起</span>
        </div>
        <div class="address">
          <span>{{item.address}}</span>
          <span>{{item.Distance |  fixedNumberFilter}}km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li>
   
    </ul>

  </div>
</template>

<script>
import BScroll from "better-scroll"
import axios from 'axios'
import { fixedNumberFilter } from "@/helpers/filter_helper.js";
export default {
  name: "CiList",
  data(){
    return{
      cityList:[],
      isLoading:true,
      prevCityId:-1
    }
    
  },
   filters: {
    fixedNumberFilter,
  },
   activated(){
     var cityId=this.$store.state.city.id;
    if(this.prevCityId===cityId){return;}
    this.isLoading=true
    axios({
     url:`https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=8974152`,
     headers: {
       'X-Client-Info':'{"a":"3000","ch":"1002","v":"5.0.4","e":"16343055032882305307705345","bc":"110100"}',
       'X-Host':'mall.film-ticket.cinema.list'
     }
   }).then((res)=>{
     console.log(res);
     var msg = res.data.msg;
     if(msg ==='ok'){
       this.cityList = res.data.data.cinemas
       this.isLoading=false
        this.prevCityId = cityId
       this.$nextTick(
          ()=>{
            new BScroll(".cinema_body")
          }
        )
     }
   })
  }
};
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
