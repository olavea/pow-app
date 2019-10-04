import React from "react"

const Product = () => {
  const stripe = window.Stripe("pk_test_XiirziufElakjoOpyuyCrPfo")

  const placeOrder = (sku) => {
    stripe.redirectToCheckout({
      items: [
        {
          sku,
          quantity: 1,
        },
      ],
      successUrl: "http://localhost:8000/success",
      cancelUrl: "http://localhost:8000/cancel",
    })
  }
  return (
    <div>
      <article>
        <img
          src="https://d1wqzb5bdbcre6.cloudfront.net/00891067cbd2b909f38d3f2956ef57e0c4e4ffea/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f666c5f746573745f3473523339776a6669514a39536c526e5847443236526170"
          alt="POW!"
        />

        <button onClick={() => placeOrder("sku_Fvit7rtTpQFLdF")}>
          A year of POW!
        </button>
      </article>
    </div>
  )
}

export default Product
