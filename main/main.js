const Itemlist = require('./itemlist')
const SPCE_SYMBOL = '-';

module.exports = function printInventory(inputs) {

    grouped_input_items = group_input(inputs);

    let items_list = [];

    items_list = create_items_list_from_grouped_items(grouped_input_items);

    print_list(items_list);
};

function group_input(inputs) {
    let grouped_list = new Map();
    inputs.forEach(barcode => {
        contain_spec_symbol(barcode) ?
            grouped_list = push_special_input(grouped_list, barcode) :
            grouped_list = push_general_input(grouped_list, barcode);
    })
    return grouped_list;
}

function contain_spec_symbol(barcode) {
    return barcode.includes(SPCE_SYMBOL) === true;
}

function push_special_input(lst, barcode) {
    let refine_code = barcode.split(SPCE_SYMBOL);
    let times = parseInt(refine_code[1], 10);
    lst = push_general_input(lst, refine_code[0], times);
    return lst;
}

function push_general_input(grouped_list, barcode, times = 1) {
    barcode in grouped_list ? grouped_list[barcode] += times : grouped_list[barcode] = times;
    return grouped_list;
}

function create_items_list_from_grouped_items(grouped_list) {
    let barcodes = Object.keys(grouped_list);
    let items_list = []
    for (let i = 0; i < barcodes.length; ++i) {
        let itemlist = new Itemlist(barcodes[i], grouped_list[barcodes[i]]);
        items_list.push(itemlist);
    }
    return items_list;
}

function print_list(items_list) {
    print_head()

    items_list.forEach(print_item);

    print_divide_line();

    console.log('挥泪赠送商品：');
    items_list.filter(itemlist=>itemlist.is_promoting === true)
    .forEach(print_promotion_info)

    print_divide_line()

    total_price = items_list.reduce((sum, item)=>sum+item.total_price(), 0);
    promotion_price = items_list.reduce((sum, item)=>sum+item.promotion_price(), 0);
    print_total_price(total_price, promotion_price);

    console.log('**********************');
}

function print_head() {
    console.log("***<没钱赚商店>购物清单***");
}

function print_item(itemlist) {
    msg = '名称：' + itemlist.name + '，数量：' + itemlist.item_count + itemlist.unit +
        '，单价：' + itemlist.price.toFixed(2) + '(元)，小计：' + itemlist.total_price().toFixed(2) + '(元)'
    console.log(msg);
}

function print_promotion_info(itemlist){
    msg = '名称：' + itemlist.name + '，数量：' + itemlist.promotion_count() + itemlist.unit;
    console.log(msg);
}

function print_divide_line(){
    console.log('----------------------');
}

function print_total_price(total_price, promotion_price){
    msg = '总计：' + total_price.toFixed(2) + '(元)\n节省：' + promotion_price.toFixed(2) + '(元)';
    console.log(msg);
}