const data = [
  {
    supplier: '供应商2',
    isChecked: false,
    data: [

      {
        isChecked: false,
        itemId: "abcbbea5-d4f1-4eaa-ac2d-f6c3fd4d6700",
        itemPrimaryId: '23',
        skuId: "dbde9cd6-e475-4570-8d13-3b2fcfba6eec",
        title: '订单支付测试',
        img: 'http://img.chslab.com:8780/img/Sk8M8QmIM.jpeg',
        desc: 'xs，黄色',
        price: 30,
        amount: 2,
        supplier: '供应商2',
        supplierId: 999,
        logistics: {
          continue_number : 3,
          first_cost : "100.00" ,
          first_number : 2 ,
          full_cost : "300.00" ,
          id : 9 ,
          is_extract : false ,
          is_full_cost : true,   // 是否满额包邮
          is_limit_area : true,
          is_to_pay : false    // 是否允许到付
        },
        templateBase: {
          cash_on_delivery : false,
          id : 15,
          is_id_card : false,
          is_show_sales : true,
          is_use_coupon : true,
          max_points : "20.00",
          member_level_discount : true,
          need_points : 100000,
          show_inventory : false,
        },
      },

    ]
  },

]

export default data
