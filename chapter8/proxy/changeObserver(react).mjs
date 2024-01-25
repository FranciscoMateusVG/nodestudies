function createObservable(target, observer) {
  const observable = new Proxy(target, {
    set: function (obj, propertyName, value) {
      if (value !== obj[propertyName]) {
        const previousValue = obj[propertyName]
        obj[propertyName] = value
        observer({ propertyName, previousValue, currentValue: value })
      }
      return true
    }
  })
  return observable
}

function calculateTotal(invoice) {
  return invoice.subtotal - invoice.discount + invoice.tax
}

const invoice = {
  subtotal: 100,
  discount: 10,
  tax: 5
}

let total = calculateTotal(invoice)
console.log(`Starting total: ${total}`)

const obsInvoice = createObservable(
  invoice,
  ({ propertyName, previousValue, currentValue }) => {
    total = calculateTotal(obsInvoice)
    console.log(
      `Total changed: ${propertyName} ${previousValue} -> ${currentValue} = ${total}`
    )
  }
)

obsInvoice.subtotal = 200
obsInvoice.discount = 20
obsInvoice.tax = 10

console.log(`Final total: ${total}`)
console.log(`Invoice: ${JSON.stringify(invoice)}`)
