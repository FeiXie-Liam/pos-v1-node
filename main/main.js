const Itemlist = require('./itemlist')
const SPCE_SYMBOL = '-';

module.exports = function printInventory(inputs) {

    grouped_input_items = group_input(inputs);

    let items_list = [];

    items_list = create_items_list_from_grouped_items(grouped_input_items);

    console.log(items_list);
    return items_list;
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
    console.log(barcodes.length);
    let items_list = []
    for (let i = 0; i < barcodes.length; ++i) {
        let itemlist = new Itemlist(barcodes[i], grouped_list[barcodes[i]]);
        items_list.push(itemlist);
    }
    return items_list;
}