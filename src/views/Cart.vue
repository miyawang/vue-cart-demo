<template>
  <div class="cart">
    <nav>
      <button @click="backUp">返回</button>
        购物车
      <button @click="edit">{{editingMsg}}</button>
    </nav>
    <main>
      <ul>
        <li
          v-for="(good, goodIndex) in goodsList"
          :key="good.id"
         >
          <div class="check-container" @click="selectSingel(good.id)" v-show="!editing">
            <input 
              type="checkbox" 
              :checked="allSelectData.indexOf(good.id)!=-1">
          </div>
          <div class="check-container" @click="rmSelectSingel(good.id)" v-show="editing">
            <input 
              type="checkbox" 
              :checked="removeListData.indexOf(good.id)!=-1">
          </div>
          <router-link class="card" to="/">
            <img :src="good.img" alt="" class="card-img">
            <div class="card-info">
              <h3>{{good.title}}</h3>
              <p>产品描述和规格</p>
              <span>&yen;{{good.price}}</span>

              <!-- 显示状态 -->
              <div class="card-counter" v-show="!editing">
                ×<span>{{good.number}}</span>
                <!---->
              </div>
              <!-- 编辑状态 -->
              <div class="card-counter" v-show="editing">
                <button @click="reduce(good)" :disabled="good.number === 1">&minus;</button>
                <input type="num"  v-model="good.number"/>
                <button @click="plus(good)">&plus;</button>
              </div>
            </div>
          </router-link>
           <div class="remove" v-show="editing" @click.stop="removeSingel(good,goodIndex,good.id)">删除</div>
          </li>
      </ul>
    </main>
    <footer>
      <div class="select-all" v-show="!editing">
        <input type="checkbox" @click="selectAll" v-model="allChecked" id="selectAllG">
        <label for="selectAllG">全选</label> 
      </div>
      <div class="select-all" v-show="editing">
        <input type="checkbox" @click="removeAll" v-model="removedAllChecked" id="selectAllG">
        <label for="selectAllG">全选</label> 
      </div>
      <!-- 显示状态 -->
      <div class="total-price" v-show="!editing">
        合计：¥<span>{{totalPrice}}</span>
        <button
          :class="{balance: allSelectData.length}"
          :disabled="!allSelectData.length" 
          @click.stop="balance">
            结算 ({{allSelectData.length}})
        </button>       
      </div>

       <!-- 编辑状态 -->
      <div class="total-price" v-show="editing">
        <button href="javascript:;"
          :class="{balance: allSelectData.length || removeListData.length}"
          @click="removeList()"
          >
          删除
        </button>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsList: [
        {id:1, number: 2, title:'Apple MacBook Air 13.3英寸笔记本电脑 银色(2017款Core i5 处理器/8GB内', price: 5980, img: require('../assets/image/1.png')},
        {id:2, number: 3, title:'Apple MacBook Pro 13.3英寸笔记本电脑 深空灰色 2018新款（四核八代i5 8G ', price: 12500,img: require('../assets/image/2.png')},
        {id:3, number: 1,title:'Apple MacBook Pro 15.4英寸笔记本电脑 深空灰色 配备2018新款（六核八代i7 ', price: 16500,img: require('../assets/image/3.png')},
        {id:4, number: 2,title:'Apple MacBook Pro 13.3英寸笔记本电脑 银色 2018新款（四核八代i5 8G 256G固', price: 12600,img: require('../assets/image/4.png')},
        {id:5, number: 3,title:'Apple MacBook Pro 13.3英寸笔记本电脑 银色（2017款Core i5处理器/8GB内', price: 10380,img: require('../assets/image/5.png')},
        {id:6, number: 2,title:'Apple MacBook Pro 15.4英寸笔记本电脑 深空灰色 配备2018新款（六核八代i7 ', price: 19500,img: require('../assets/image/6.png')},

      ],
      //控制全选
      allChecked:false,
      removedAllChecked: false,
      //商品数据选中
      allSelectData : [],
      removeListData: [],
      editing: false,
      editingMsg: '编辑',
    }
  },
  methods: {
    backUp() {
      alert('返回');
    },
    // 编辑 与 完成  切换
    edit() {
      this.editing = !this.editing;      
      this.editingMsg = this.editing ? '完成' : '编辑'
    },
    //单击全选按钮
    selectAll(){
        if(!event.currentTarget.checked){
            //取消全选
            this.allSelectData = [];
        }else{
            //全选
            this.goodsList.forEach(good => {
                this.allSelectData.push(good.id);
            })
        }
    },
    selectSingel(id){
        //知道当前点击商品对应的商品编号是否在allSelectData数组中
        var res = this.allSelectData.indexOf(id);
        res == -1 ? this.allSelectData.push(id) : this.allSelectData.splice(res,1);
        this.allChecked = this.goodsList.length === this.allSelectData.length;
    },
    // 单个删除按钮
    rmSelectSingel(id) {
      var res = this.removeListData.indexOf(id);
      res == -1 ? this.removeListData.push(id) : this.removeListData.splice(res,1);
      this.removedAllChecked = this.goodsList.length === this.removeListData.length;
    },
    // 单个按钮删除
    removeSingel(good,goodIndex,id) {
      this.goodsList.splice(goodIndex,1);
    },
    // 全选删除
    removeAll(id) {
      console.log(event.currentTarget.checked);
        if(!event.currentTarget.checked){
            //取消全选
            this.removeListData = [];
        }else{
            //全选
            this.goodsList.forEach(good => {
              this.removeListData.push(good.id);
          })
        }
    },
    removeList() {
       alert(`删除${this.removeListData.length}项`);   
    },
    reduce(good) {
      if(good.number===1) {
        return
      } else {
        good.number--
      }
      alert(good.number);
    },
    plus(good) {
        good.number++;
        alert(good.number);
    },
    balance() {
      alert('去结算')
    }
  },
  computed: {
    totalPrice(){
        var total=0;
        this.goodsList.forEach((good, index)=>{
            var res = this.allSelectData.indexOf(good.id, index);
            //计算总价只计算在allSelectData商品
            if(res != -1){
                total += good.number * good.price;
            }
        })
        return total;
    },    
  },  
}
</script>
<style lang="less">
@import "../assets/style/common.less";
  .cart {
    background-color: @borderColor;
    height: calc(100vh - 60px);
    overflow-y: scroll;
    >nav {
      .flexbox();
      font-size: 14px;
      color:#fff;
      text-align: center;
      background-color: @tertiaryColor;
      height: 44px;
      >button {
        color: #fff;
        padding: 0 20px;
        font-size: 14px;
      }
    }
    >main {
      margin-top: 5px;
      >ul {
        >li {
          background-color: @bgColor;
          margin:1px 0;
          padding: 0 15px;
          .flexbox(space-between,center,row,nowrap);
          >.check-container {
            flex-basis: 20px;
            // border: 1px solid red;
          }
          >.card {
            color: #333;
            .flexbox(space-between,center,row,nowrap);
            img {
              flex: 2;
              width: 90px;
              // height: 60px;
              margin: 0 10px;
            }
            .card-info {
              flex: 7;
              width: 200px;
              position: relative;
              font-size: 14px;
              h3 {
                font-size: 16px;
                .textoverflow();
              }
              span {
                color: @primaryColor;
              }
              .card-counter {
                position: absolute;
                right: 0;
                bottom: 5px;
                .flexbox(space-between,center,row,nowrap);
                button {
                  width: 22px;
                }
                input {
                  width: 40px;
                  text-align: center;
                  border: 1px solid @tipColor;
                }
                span {
                  color: #666;
                }
              }
            }
          }
          >.remove {
            background-color: @bgColor;
            border: 1px solid @tipColor;
            color: @primaryColor;
            flex-basis: 20px;
            text-align: center;
            align-items: stretch;
            height: 100%;
          }
        }
      }
    }
    >footer {
      height: 48px;
      position: fixed;
      bottom: 0;
      width: 100%;
      .flexbox();
      >.select-all {
        margin-left: 20px;
        flex: .5;
      }
      >.total-price {
        .flexbox(center,center,row,nowrap);
        >span {
          color: @primaryColor;
          font-size: 16px;
        }
        >button {
          position: relative;
          right: 0;
          height: 40px;
          width: 80px;
          border: none;
          border-radius: 2px;
          font-size: 16px;
          margin-left: 10px;
          :disabled {
            background-color: @tipColor;
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
        >.balance {
          background-color: @primaryColor;
          color: @bgColor;
        }
      }
    }
  }

</style>

