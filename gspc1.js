/*
gspc1.js

This script should read gspc2.csv into an array.
It should create a 3 day moving average from cp-column which has 2 rows preceding and current row in the window.
*/

var whatthis = d3.csv("gspc2.csv", d3csv_cb)

function d3csv_cb(err, datep_a){
    // This callback should read gspc2.csv into an array: datep_a
    if (err) throw err
    var ma2_a = mvmn(datep_a,2)
    var ma3_a = mvmn(datep_a,3)
    var ma4_a = mvmn(datep_a,4)
    var ma5_a = mvmn(datep_a,5)
    var ma6_a = mvmn(datep_a,6)
    var ma7_a = mvmn(datep_a,7)
    var ma8_a = mvmn(datep_a,8)
    var ma9_a = mvmn(datep_a,9)
    // I should compute features(mvg avg slopes):
    var slp2_a = [0]
    var slp3_a = [0]
    var slp4_a = [0]
    var slp5_a = [0]
    var slp6_a = [0]
    var slp7_a = [0]
    var slp8_a = [0]
    var slp9_a = [0]
    for (var row_i = 1; row_i <datep_a.length; row_i++ ) {
	slp2_a[row_i]=(ma2_a[row_i]-ma2_a[row_i-1])/ma2_a[row_i]
	slp3_a[row_i]=(ma3_a[row_i]-ma3_a[row_i-1])/ma3_a[row_i]
	slp4_a[row_i]=(ma4_a[row_i]-ma4_a[row_i-1])/ma4_a[row_i]
	slp5_a[row_i]=(ma5_a[row_i]-ma5_a[row_i-1])/ma5_a[row_i]
	slp6_a[row_i]=(ma6_a[row_i]-ma6_a[row_i-1])/ma6_a[row_i]
	slp7_a[row_i]=(ma7_a[row_i]-ma7_a[row_i-1])/ma7_a[row_i]
	slp8_a[row_i]=(ma8_a[row_i]-ma8_a[row_i-1])/ma8_a[row_i]
	slp9_a[row_i]=(ma9_a[row_i]-ma9_a[row_i-1])/ma9_a[row_i]
    }
    // I should compute pctlead:
    var lead_a = datep_a.concat([datep_a[datep_a.length-1]]).slice(1,datep_a.length+1)
    var pctlead_a  = []
    for (var row_i = 0; row_i <datep_a.length; row_i++){
	pctlead_a[row_i] = 100.0*(lead_a[row_i].cp-datep_a[row_i].cp)/datep_a[row_i].cp
    }
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

function getlag_a(my_a){
    // This function should return array which lags by 1.
    var lag_a = [my_a[0]].concat(my_a).slice(0,my_a.length)
    // Above, I prepend 1 elem. I slice off last elem.
    // visualization:
    // [0].concat([0,1,2]).slice(0,3) == [0,0,1]
    return lag_a
}
