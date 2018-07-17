const database = require('./datbase')
const SPCE_SYMBOL = '-';
module.exports = function printInventory(inputs) {
    let items = database.loadAllItems();
    let promotions = database.loadPromotions();

    grouped_input_items = group_input(inputs);
    console.log(grouped_input_items);
    return grouped_input_items;
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