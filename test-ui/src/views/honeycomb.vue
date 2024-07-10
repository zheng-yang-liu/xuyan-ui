<template>
  <div class="box">
    <div class="row">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="row">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="row">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="row">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="row">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="row">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="row">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="row">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="row">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="row">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="row">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref ,onMounted} from 'vue'
const currentIndex= ref<number>({row:0,column:0});
const rowNums = 11;
const rowLength = 14;
let topLeft = 0;
let topRight = 0;
let bottomLeft = 0;
let bottomRight = 0;
const items = ref<HTMLElement[]>([]);

const findValueIn2DArray=(array, value) =>{
  // 遍历二维数组
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      // 如果找到匹配的值，返回其二维坐标
      if (array[i][j] === value) {
        return {row:i,column:j}; // 返回行索引和列索引
      }
    }
  }
  // 如果没有找到匹配的值，返回null（或根据需要返回其他值）
  return null;
}

const hover = (el:any)=>{
  //当前元素的四周的元素缩小，当前元素放大
  currentIndex.value = findValueIn2DArray(items.value,el.target);
  topLeft = currentIndex.value.column-((currentIndex.value.row+1)%2?-1:1);
  topRight = currentIndex.value.column;
  bottomLeft = currentIndex.value.column-((currentIndex.value.row+1)%2?-1:1);
  bottomRight = currentIndex.value.column;
  console.log(topLeft,topRight,bottomLeft,bottomRight)
  items.value[currentIndex.value.row][currentIndex.value.column]?.classList.add('enlarge');

  if(currentIndex.value.column-1>=0){
    items.value[currentIndex.value.row][currentIndex.value.column-1]?.classList.add('narrow');
  }
  if(currentIndex.value.column+1<=rowLength-1){
    items.value[currentIndex.value.row][currentIndex.value.column+1]?.classList.add('narrow');
  }

  if(currentIndex.value.row-1>=0&&topLeft>=0){
    items.value[currentIndex.value.row-1][topLeft]?.classList.add('narrow');
  }
  if(currentIndex.value.row-1>=0&&topRight<=rowLength-1){
    items.value[currentIndex.value.row-1][topRight]?.classList.add('narrow');
  }
  if(currentIndex.value.row+1<=rowNums-1&&bottomLeft>=0){
    items.value[currentIndex.value.row+1][bottomLeft]?.classList.add('narrow');
  }
  if(currentIndex.value.row+1<=rowNums-1&&bottomRight<=rowLength-1){
    items.value[currentIndex.value.row+1][bottomRight]?.classList.add('narrow');
  }





}
const leave = ()=>{
  //所有元素恢复原始大小
  items.value[currentIndex.value.row][currentIndex.value.column]?.classList.remove('enlarge');
  if(currentIndex.value.column-1>=0){
    items.value[currentIndex.value.row][currentIndex.value.column-1]?.classList.remove('narrow');
  }
  if(currentIndex.value.column+1<=rowLength-1){
    items.value[currentIndex.value.row][currentIndex.value.column+1]?.classList.remove('narrow');
  }

  if(currentIndex.value.row-1>=0&&topLeft>=0){
    items.value[currentIndex.value.row-1][topLeft]?.classList.remove('narrow');
  }
  if(currentIndex.value.row-1>=0&&topRight<=rowLength-1){
    items.value[currentIndex.value.row-1][topRight]?.classList.remove('narrow');
  }
  if(currentIndex.value.row+1<=rowNums-1&&bottomLeft>=0){
    items.value[currentIndex.value.row+1][bottomLeft]?.classList.remove('narrow');
  }
  if(currentIndex.value.row+1<=rowNums-1&&bottomRight<=rowLength-1){
    items.value[currentIndex.value.row+1][bottomRight]?.classList.remove('narrow');
  }
}
const convertTo2DArray=(collection, N)=> {
  // 首先，确保我们有一个真正的数组
  const array = Array.isArray(collection) ? collection : Array.from(collection);

  // 计算行数
  const rows = Math.ceil(array.length / N);

  // 初始化二维数组
  const result = [];

  // 填充二维数组
  for (let i = 0; i < rows; i++) {
    // 计算当前行的起始索引
    const start = i * N;
    // 计算当前行的结束索引（注意不要超出原数组长度）
    const end = Math.min(start + N, array.length);
    // 切片并添加到结果数组中
    result.push(array.slice(start, end));
  }

  return result;
}
onMounted(()=>{
  items.value = document.querySelectorAll('.item');


  items.value.forEach(item=> {
    item.addEventListener('mouseover', hover);
  })
  items.value.forEach(item=> {
    item.addEventListener('mouseleave', leave);
  })
  items.value = convertTo2DArray(items.value,rowLength);
  console.log(items.value)
})
</script>

<style lang="scss" scoped>
$n:13;
$size:100vw/$n;
@mixin setSizeSquare($target){
  width: $target !important;
  height: $target !important;
}
.box{
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  .row{
    display: flex;
    &:nth-child(even){
      transform: translateX(-$size/2);
    }
    &:nth-child(n+2){
      margin-top: (-$size/6);
    }
    .item{
      flex-shrink: 0;
      width: $size;
      height: $size;
      background-color: #555555;
      -webkit-clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
      clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
      &:hover{
        cursor: pointer;
      }
    }
  }
}
.default{
  //默认大小
  transform: scale(1);
}
.enlarge{
  //沿元素中心放大
  transform: scale(1.2);
}
.narrow{
  //沿元素中心缩小
  transform: scale(0.6);
}


</style>
