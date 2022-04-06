import express from 'express'
const router = express.Router()

// 引包
import stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()

// 我们需要去stripe官网申请一个密钥，这个密钥绑定我们唯一的项目，不能让别人知道！
// 因此可以储存在.env文件中
const myStripe = stripe(process.env.STRIPE_PRIVATE_KEY)

// 设置我们有什么商品，这个数据一般存储在数据库中
// 注意！stripe要求我们将价格存储为cents分
const storeItems = new Map([
  // 键是物品id，值是购物车中物品的具体信息
  [1, {priceInCents: 1000, name: 'Learn react today'}],
  [2, {priceInCents: 4000, name: 'Learn redux today'}],
  [3, {priceInCents: 7000, name: 'Learn stripe today'}],
])

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 用于支付的路由
router.post('/checkout', async (req,res) => {
  console.log(req.body)
  // 调用stripe中的API，会返回一个session对象，里面的session.url就是我们要支付的地址了
  const session = await myStripe.checkout.sessions.create({
      payment_method_types: ['card'], // 指定可接受支付的方式，card就是信用卡，一般用这个就可以了
      mode: 'payment', // 一次性支付还是订阅支付，payment就是支付一次，subscription就是订阅支付
      // line_items是一个数组，里面存放想购买的商品的信息，如商品名称、单价几数量等
      line_items: req.body.items.map(item => {
          // 根据键值找到对应的值
          const storeItem = storeItems.get(item.id)

          return {
              price_data: {
                  'currency': 'CAD', // 可接受的货币
                  product_data: {   // 商品信息，如商品名称
                      name: storeItem.name
                  },
                  unit_amount: storeItem.priceInCents, // 商品单价
              },
              quantity: item.quantity,
          }
      }),
      // 我们将基本url地址存到env文件中，便于将来项目上线后地址的更改
      success_url: `${process.env.CLIENT_URL}/success`, // 支付成功后跳转到的页面
      cancel_url:  `${process.env.CLIENT_URL}/cancel`,  // 支付失败后跳转到的页面
  })
  // 我们将url返回，前端拿到这个url之后，跳转到这个url来进行支付
  res.send({checkoutURL: session.url})
})

export default router
