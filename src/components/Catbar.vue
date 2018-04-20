<template>
<section class="cat-bar">
    <div class="cat-filter" v-show="!isBrief">
        <ul class="cat-filter-list" ref="typeList">
            <li v-for="btype in typeList" 
                :class="['cat-filter-item', {active: btype.value === selectedType }]" 
                :data-value="btype.value" 
                :data-name="btype.name" 
                :key="btype.name" 
                @click="filterChange($event, 'type')"> 
                {{ type.name }}
            </li>
        </ul>
    </div>

    <div class="cat-filter" v-show="!isBrief">
        <ul class="cat-filter-list" ref="minorList">
            <li v-for="minor in minorList" 
                :class="['cat-filter-item', { active: minor === selectedMinor }]"
                :data-value="minor"
                :key="minor"
                @click="filterChange($event, 'minor')">
            {{ minor }}
            </li>
        </ul>
    </div>

</section>
</template>

<script>
import api from "../fetch/api";
import { debounce } from "../util/util";

export default {
  name: "catbar",
  props: {
    gender: String,
    major: String
  },

  data() {
    return {
      typeList: [
        {
          value: "hot",
          name: "热门"
        },
        {
          value: "new",
          name: "新书"
        },
        {
          value: "reputation",
          name: "好评"
        },
        {
          value: "over",
          name: "完结"
        },
        {
          value: "monthly",
          name: "包月"
        }
      ],
      selectedType: "hot",
      selectedTypeName: "热门",
      minorList: ["全部"],
      selectedMinor: "全部",
      isBrief: false,
      $docElement: null,
      $body: null
    };
  },

  created: function() {
    api.getMinorList().then(data => {
      for (let [index, elem] of data[this.gender].entries()) {
        if (elem.major === this.major) {
          this.minorList.push(...elem.mins);
          return;
        }
      }
    });
  },

  mounted: function() {
    this.$docElement = document.documentElement;
    this.$body = document.body;
    window.addEventListener("scroll", debounce(this.showBrief));
  },

  methods: {
    showBrief: function() {
      if (this.$body.scrollTop + this.$docElement.scrollTop > 40) {
        this.isBrief = true;
      } else {
        this.isBrief = false;
      }
    },

    filterChange: function(e, type) {
      let curTargetData = e.curTargetData.dataset;
      if (type === "type") {
        this.selectedType = curTargetData.value;
        this.selectedTypeName = curTargetData.name;
      } else {
        this.selectedMinor = curTargetData.value;
      }
      this.$emit(
        "filter-change",
        this.selectedType,
        this.selectedMinor === "全部" ? "" : this.selectedMinor
      );
    },

    spreadFilter: function() {
      this.isBrief = false;
    }
  }
};
</script>

