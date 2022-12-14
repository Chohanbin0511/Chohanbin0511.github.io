<template>
	<v-row>
		<v-col v-for="(item,idx) in heriImgList" :key="idx" cols="12" sm="12" md="6" lg="6">
			<v-card class="mx-auto mb-1" max-width="400" rounded="xl">
				<v-img
					class="align-end text-white"
					height="300"
					:src="item.imgUrl"
					cover
					@click="goDetailView"
					>
				</v-img>
				<v-card-title color="black" @click="goDetailView"
					>{{ item.title}} </v-card-title
				>
				<!-- <v-card-text @click="goDetailView">
					{{ item.text}} <v-chip color="green"
      text-color="white">{{ item.place}}</v-chip>
				</v-card-text> -->
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
  name: "HeriImgList",
  data() {
    return {
      heriImgList: [
				{ title:"난로 앞 누어있는 헤리", text: "좀 유연하다?", place: "MyHome", date: "시간",imgUrl : require("./img/20220602_heri_01.jpg")},
				{ title:"한손에 헤리", text: "내용입니다.", place: "장소입니다", date: "시간",imgUrl : require("./img/20220602_heri_02.jpg")},
				{ title:"형아 달려", text: "내용입니다.", place: "장소입니다", date: "시간",imgUrl : require("./img/20220602_heri_03.jpg")},
				{ title:"늠름하지", text: "내용입니다.", place: "장소입니다", date: "시간",imgUrl : require("./img/20220602_heri_04.jpg")},
				{ title:"돌프와 함께", text: "내용입니다.", place: "장소입니다", date: "시간",imgUrl : require("./img/20221214_heri_06.jpg")},
				{ title:"우주비행", text: "내용입니다.", place: "장소입니다", date: "시간",imgUrl : require("./img/20221214_heri_07.jpg")},
				{ title:"모해?", text: "내용입니다.", place: "장소입니다", date: "시간",imgUrl : require("./img/20221214_heri_08.jpg")},
				{ title:"뿔헤리", text: "내용입니다.", place: "장소입니다", date: "시간",imgUrl : require("./img/20221214_heri_09.jpg")},
				{ title:"삼각형", text: "내용입니다.", place: "장소입니다", date: "시간",imgUrl : require("./img/20221214_heri_10.jpg")},
			]
    };
  },
  methods: {
    goDetailView() {
			console.log("디테일 보기");
    }
  }
};
</script>

<style scoped>

</style>