/*
gspc1.js

This script should read gspc2.csv into an array.
*/


d3.csv("gspc2.csv", d3csv_cb)

function d3csv_cb(err, datep_a){
    // This callback should read gspc2.csv into an array: datep_a
    if (err) throw err
    datep_a
    'bye'
}
