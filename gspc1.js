/*
gspc1.js

This script should read gspc2.csv into an array.
It should create a 3 day moving average from cp-column which has 2 rows preceding and current row in the window.
*/

var whatthis = d3.csv("gspc2.csv", d3csv_cb)

function d3csv_cb(err, datep_a){
    // This callback should read gspc2.csv into an array: datep_a
    if (err) throw err
    var ma2 = mvmn(datep_a,2)
    return datep_a
}

function mvmn(datep_a,window_i){
    // This function should return moving average, over window_i, from cp-column
    var mean_a = []
    for (var row_i = 0; row_i < window_i; row_i++ ) {
	// This data is in 1950. I will not need it.
	mean_a[row_i] = 0 // good enough.
    }
    // I should finish filling mean_a
    for (var row_i = window_i; row_i <datep_a.length; row_i++ ) {
	var myslice_a = datep_a.slice(row_i - window_i+1, row_i+1)
	var cp_a      = myslice_a.map(function(row){return row.cp})
	mean_a[row_i] = d3.mean(cp_a) // mvg avg for this row
    }
    return mean_a
}
