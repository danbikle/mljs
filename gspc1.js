/*
gspc1.js

This script should read gspc2.csv into an array.
It should create rolling means from cp-column.
From those it should create slopes which should then be used as features.
*/

function handleClick(event){
    // This function should be called when I click button in whatif.html
    var whatthis = d3.csv("gspc2.csv", d3csv_cb)
    return false
}

function d3csv_cb(err, datep_a){
    // This callback should read gspc2.csv into an array: datep_a
    if (err) throw err
    // I should get last row in datep_a
    var last_o      = datep_a[datep_a.length-1]
    var lastdate_s  = last_o.cdate+"T20:00:00"
    var lastdate_dt = new Date(lastdate_s).toUTCString()
    var nextdate_dt = new Date(lastdate_dt)
    nextdate_dt.setDate(nextdate_dt.getDate() + 1)//+1day
    var dow_i = nextdate_dt.getDay()
    // I should use dow_i to avoid Sat, Sun.
    if (dow_i == 5) {// Fri
	nextdate_dt.setDate(nextdate_dt.getDate() + 3)//+3days is Monday.
	dow_i = nextdate_dt.getDay() // should be 1 which is Monday.
    }
    var yr_i       = nextdate_dt.getFullYear()
    var moy_i      = 1+nextdate_dt.getMonth()//Jan is 1 not 0
    var dom_i      = nextdate_dt.getDate()
    var nextdate_s = yr_i + '-' + moy_i + '-' + dom_i
    // I should get current price from end-user
    var lastcp_s = document.getElementById("lastcp").value
    // I should push end-user price to end of datep_a:
    datep_a.push({'cdate':nextdate_s, 'cp':lastcp_s})
    // I should prep independent data for the model:
    var feat_a = genf(datep_a)
    keras1_predict(feat_a)
    keras2_predict(feat_a)
    d3.select("#prediction").append("hr")
    return datep_a
}

function keras1_predict(feat_a){
    // I should get the last row of feat_a:
    var last_a = feat_a[feat_a.length-1]
    // I should use keras-js to get a prediction:

    const keras1_model = new KerasJS.Model({
	filepaths: {
	    model:    'keras1_model2016.json',
	    weights:  'keras1_model2016_weights.buf',
	    metadata: 'keras1_model2016_metadata.json'
	}
	,gpu: true
    })

    keras1_model.ready().then(() => {
	// input data object keyed by names of the input layers
	// or `input` for Sequential models
	// values are the flattened Float32Array data
	// (input tensor shapes are specified in the model config)
	const inputData = {
	    'input': new Float32Array(last_a)
	}
	// make predictions
	// outputData is an object keyed by names of the output layers
	// or `output` for Sequential models
	keras1_model.predict(inputData).then(outputData => {
	    var down_prob = outputData.output[0]
	    var up_prob   = outputData.output[1]
            // I should display prediction to end-user:
	    d3.select("#prediction").append("p").html("keras1 Prediction: "+up_prob)
	})
    }) // keras1_model.ready().then
    return true
}

function keras2_predict(feat_a){
    // I should get the last row of feat_a:
    var last_a = feat_a[feat_a.length-1]
    const keras2_model = new KerasJS.Model({
	filepaths: {
	    model:    'keras2_model2016.json',
	    weights:  'keras2_model2016_weights.buf',
	    metadata: 'keras2_model2016_metadata.json'
	}
	,gpu: true
    })

    keras2_model.ready().then(() => {
	const inputData = {
	    'input': new Float32Array(last_a)
	}
	keras2_model.predict(inputData).then(outputData => {
	    var up_prob = outputData.output[1]
	    d3.select("#prediction").append("p").html("keras2 Prediction: "+up_prob)
	})
    })
    return true
}

function genf(datep_a){
    var ma2_a = mvmn(datep_a,2)
    var ma3_a = mvmn(datep_a,3)
    var ma4_a = mvmn(datep_a,4)
    var ma5_a = mvmn(datep_a,5)
    var ma6_a = mvmn(datep_a,6)
    var ma7_a = mvmn(datep_a,7)
    var ma8_a = mvmn(datep_a,8)
    var ma9_a = mvmn(datep_a,9)
    // I should compute features(mvg-avg slopes, date-features):
    var slp2_a = [0]
    var slp3_a = [0]
    var slp4_a = [0]
    var slp5_a = [0]
    var slp6_a = [0]
    var slp7_a = [0]
    var slp8_a = [0]
    var slp9_a = [0]
    var feat_a = [0]
    for (var row_i = 1; row_i <datep_a.length; row_i++ ) {
        // I should get the date of the row:
        var my_dt = new Date(datep_a[row_i].cdate+'T20:00')
	// I should convert my_dt into date-features:
	var utc_dt   = new Date(new Date(my_dt).toUTCString())
        var dow_f    = utc_dt.getDay()      /100.0
        var moy_f    = (1+utc_dt.getMonth())/100.0
        slp2_a[row_i]=100.0*(ma2_a[row_i]-ma2_a[row_i-1])/ma2_a[row_i]
        slp3_a[row_i]=100.0*(ma3_a[row_i]-ma3_a[row_i-1])/ma3_a[row_i]
        slp4_a[row_i]=100.0*(ma4_a[row_i]-ma4_a[row_i-1])/ma4_a[row_i]
        slp5_a[row_i]=100.0*(ma5_a[row_i]-ma5_a[row_i-1])/ma5_a[row_i]
        slp6_a[row_i]=100.0*(ma6_a[row_i]-ma6_a[row_i-1])/ma6_a[row_i]
        slp7_a[row_i]=100.0*(ma7_a[row_i]-ma7_a[row_i-1])/ma7_a[row_i]
        slp8_a[row_i]=100.0*(ma8_a[row_i]-ma8_a[row_i-1])/ma8_a[row_i]
        slp9_a[row_i]=100.0*(ma9_a[row_i]-ma9_a[row_i-1])/ma9_a[row_i]
        feat_a[row_i]=[slp2_a[row_i]
                      ,slp3_a[row_i]
                      ,slp4_a[row_i]
                      ,slp5_a[row_i]
                      ,slp6_a[row_i]
                      ,slp7_a[row_i]
                      ,slp8_a[row_i]
                      ,slp9_a[row_i],dow_f,moy_f]
    }
    // I should compute pctlead:
    var lead_a = datep_a.concat([datep_a[datep_a.length-1]]).slice(1,datep_a.length+1)
    var pctlead_a  = []
    for (var row_i = 0; row_i <datep_a.length; row_i++){
        pctlead_a[row_i] = 100.0*(lead_a[row_i].cp-datep_a[row_i].cp)/datep_a[row_i].cp
    }
    return feat_a
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
