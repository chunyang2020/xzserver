export default function (detail){
    return(
        `
            <div>
                <h2>${detail.lname}</h2>
                <h4>${detail.title}</h4>
                <div class="price">
                    <div class="pro_price"><b>学员售价：</b><span>￥${detail.price}</span></div>
                    <div class="promise">
                        <b>服务承诺：</b>
                        <span>${detail.promise}</span>
                    </div>
                </div>
                <p class="parameter">
                    <b>客服：</b>
                    <span class="connect">联系客服</span>
                    <img class="gif" src="../img/product_detail/kefuf.gif">
                </p>
                <p class="style choose_color">
                    <s class="color">颜色：</s>
                    <input type="button" class="i1" value="黑色" title="黑色">
                    <input type="button" class="i2" value="灰色" title="灰色">
                    <input type="button" class="i3" value="金色" title="金色">
                    <input type="button" class="i4" value="白色" title="白色">
                </p>
                <p class="size">
                    <s>规格：</s>
                    <span class="avenge"
                        style="border: 1px solid rgb(102, 102, 102); color: rgb(102, 102, 102);">15寸 15
                        1T</span>
                    <span class="avenge"
                        style="border: 1px solid rgb(102, 102, 102); color: rgb(102, 102, 102);">18寸 18
                        2T</span>
                    <span class="avenge"
                        style="border: 1px solid rgb(102, 102, 102); color: rgb(102, 102, 102);">19寸 19
                        3T</span>
                </p>
                <div class="message"></div>
                <p class="account">
                    <s>数量：</s>
                    <button class="numberMinus">-</button>
                    <input type="text" value="1" class="number" id="buy-num" disabled="disabled">
                    <button class="numberAdd">+</button>
                </p>
                <div class="shops">
                    <a href="javascript:" class="buy lf" id="buy_now">立即购买</a>
                    <a href="javascript:" class="shop lf" id="add_cart">
                        <img src="../img/product_detail/product_detail_img7.png" alt="">加入购物车
                    </a>
                    <a href="javascript:" class="collection lf" id="collect">
                        <span>收藏</span>
                        <b><img src="../img/product_detail/product_detail_img6.png" alt=""></b>
                    </a>
                </div>
            </div>
        `
    )
}