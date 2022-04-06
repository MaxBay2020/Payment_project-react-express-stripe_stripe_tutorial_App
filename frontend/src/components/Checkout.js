import React from 'react'
import axios from 'axios'

const Checkout = () => {
    // 点击按钮后，进行支付
    const checkOut = async () => {
        // 取得购物车中的每个商品的id和数量
        const items = [
            {id: 1, quantity: 2},
            {id: 2, quantity: 5},
            {id: 3, quantity:8},
        ]
        // 后端请求地址如下，我们需要将购物车中每个商品的id和数量发到后端
        const res = await axios.post('http://localhost:5000/checkout', {items})
        if(res.status===200){
            // 我们会从后端接收到支付链接，这个链接是stripe提供给我们的
            // 我们只需要跳转到这个链接，就可以进行支付了
            console.log(res.data?.checkoutURL)
            // 跳转到支付页面
            window.open(res.data?.checkoutURL)
        }
    }

    return (
        <div>
            <button onClick={()=>checkOut()}>Checkout</button>
        </div>
    );
};

export default Checkout;
