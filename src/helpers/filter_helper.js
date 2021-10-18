import Vue from "vue"
// import dayjs from "dayjs"

export const actorFilter = Vue.filter("actorFilter", (data) => data.map((actor) => actor.name).join(" "))
export const fixedNumberFilter = Vue.filter("fixedNumberFilter", (data) => data.toFixed(2))
export const verticalDivider = Vue.filter("verticalDivider", (data) => data.replace(/\|/g," | "))
export const dateFilter = Vue.filter("dateFilter", (mills) => dayjs(mills).format('YYYY-MM-DD'))