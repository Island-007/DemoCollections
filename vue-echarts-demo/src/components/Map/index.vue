<template>
  <div>
    <BreadCrumb
      :breadcrumbList="breadcrumbList"
      @click-breadcrumb="handleClickBreadcrumb"
    />
    <div class="map-container">
      <div id="map" style="width: 1200px; height: 900px" class="map"></div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "./BreadCrumb";
import dataList from "../../data/chinaDataList.js";
import debounce from 'lodash'
export default {
  name: "Map",
  components: {
    BreadCrumb,
  },
  data() {
    return {
      map: null,
      dataList: dataList,
      mapInfo: {
        mapCode: "100000",
        mapName: "china",
        name: "中国",
      },
      breadcrumbList: [],
      mapOption: {
        tooltip: {
          show: false,
        },
        geo: {
          map: "", //使用registerMap注册的地图名称
          roam: false,
          zoom: 1,
          itemStyle: {
            areaColor: "#101847",
            borderColor: "#4393c2",
            borderWidth: 1,
            label: {
              show: true,
              fontSize: 12,
              textStyle: {
                color: "#000",
              },
            },
          },
          select: {
            label: {
              color: "#fff",
            },
            itemStyle: {
              areaColor: "#4393c2",
            },
          },
          emphasis: {
            label: {
              color: "#fff",
            },
            itemStyle: {
              areaColor: "#4393c2",
            },
          },
        },
        series: [
          {
            name: "省份",
            type: "map",
            map: "", //使用registerMap注册的地图名称
            geoIndex: 0,
            data: [],
          },
        ],
      },
    };
  },
  mounted() {
    this.map = this.$echarts.init(document.getElementById("map"));
    this.breadcrumbList.push(JSON.parse(JSON.stringify(this.mapInfo)));
    this.renderMap(this.dataList);
    this.handleMapClick();
    window.addEventListener('resize',this.resizeCharts)
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.resizeCharts)
  },
  methods: {
    resizeCharts() {
      console.log('resize')
      this.map.resize()
    },
    renderMap(data = []) {
      this.$axios.get(`/JSON/${this.mapInfo.mapCode}.json`).then((res) => {
        const geoJson = res.data;
        this.$echarts.registerMap(this.mapInfo.mapName, geoJson);
        this.mapOption.geo.map = this.mapInfo.mapName;
        this.mapOption.series[0].map = this.mapInfo.mapName;
        this.mapOption.series[0].data = data;
        if (this.mapInfo.mapName === "china") {
          this.mapOption.geo.zoom = 1.2;
        } else {
          this.mapOption.geo.zoom = 0.7;
        }
        this.map.setOption(this.mapOption);
      });
    },
    handleMapClick() {
      this.map.on("click", (params) => {
        if (params.data && params.data.adcode) {
          this.mapInfo.mapName = params.name;
          this.mapInfo.mapCode = params.data.adcode;
          this.mapInfo.name = params.data.name;
          this.breadcrumbList = this.breadcrumbList.concat(JSON.parse(JSON.stringify(this.mapInfo)));
          this.renderMap();
        }
      });
    },
    handleClickBreadcrumb(item, index) {
      this.mapInfo = item;
      this.breadcrumbList = this.breadcrumbList.slice(0, index + 1);
      item.mapCode === "100000"
        ? this.renderMap(this.dataList)
        : this.renderMap();
      console.log(this.breadcrumbList, "list");
    },
  },
};
</script>

<style scoped>
.map {
  box-sizing: border-box;
  margin: 20px auto;
}
</style>
