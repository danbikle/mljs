/*
gspc1.js

This script should read gspc2.csv into an array.
It should create a 3 day moving average from cp-column which has 2 rows preceding and current row in the window.
*/


var whatthis = d3.csv("gspc2.csv", d3csv_cb)

function d3csv_cb(err, datep_a){
    // This callback should read gspc2.csv into an array: datep_a
    if (err) throw err
    datep_a
    var ma3 = mvmn(datep_a)
    'bye'
    return datep_a
}

function mvmn(datep_a){
    // This function should return moving average from cp-column
    datep_a
    var mean_a = []
    var window_i = 3
    for (var row_i = window_i; row_i <datep_a.length; row_i++ ) {
	var myslice_a = datep_a.slice(row_i - window_i, row_i)
	var cp_a      = myslice_a.map(function(row){return row.cp})
	mean_a.push(d3.mean(cp_a))
	'loop'
    }
    var initial_slice_a = datep_a.slice(0, window_i).map(function(row){return row.cp})
    'bye'
    var return_this= initial_slice_a.concat(mean_a)
    return_this.length == datep_a.length
    return return_this
}
