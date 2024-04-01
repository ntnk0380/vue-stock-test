import Vuex from 'vuex'
import axios from "axios";
const store = new Vuex.Store({
  state: {
    stockData:[],
  },
  mutations: {
    setStock (state, data) {
      data.map(item => {
        state.stockData.push(item)
      })
    },
  },
  actions:{
    onAddStock (context, data) {
      context.commit('setStock',data)
    },
    
    // async onActionGetStock (context, data){
    //   console.log('onActionGetStock',data);
    //   if (data) {
    //     await context.commit('getStockApi', data)
    //   }else{
    //     const response = await axios.get('/stock').then((result) => {
    //       return result.data || [];
    //     }).catch((err) => {
    //       return []
    //       console.log(err);
    //     });
    //     console.log(response)
    //     await context.commit('getStockApi', response)

    //   }
    // }
  },
  getters:{
    stock (state) {
      return state.stockData
    }
  }
})

export default store