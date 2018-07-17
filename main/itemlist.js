const database = require('./datbase')
let items = database.loadAllItems();
let promotions = database.loadPromotions();
module.exports = class Itemlist {
  constructor(barcode, item_count) {
    let item_info = items.find(item => item.barcode === barcode);
    this.name = item_info.name;
    this.unit = item_info.unit;
    this.price = item_info.price;
    this.item_count = item_count;

    promotions[0].barcodes.includes(barcode) ?
      this.is_promoting = true :
      this.is_promoting = false;
  }

  total_price() {
    return this.price * this.item_count - this.promotion_price();
  }

  promotion_price() {
    let promotion_price = 0;
    this.is_promoting ?
      promotion_price = this.price * this.promotion_count() :
      promotion_price = 0;
    return promotion_price;
  }

  promotion_count() {
    return Math.floor(this.item_count / 3);
  }
}