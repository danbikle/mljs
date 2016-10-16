/*
  iris12.js
  This script should create a Keras model using JavaScript.
  Ref:
  https://github.com/transcranial/keras-js#usage
  This file should be loaded by iris2.html
*/

function handleClick(event){
    // This function should be called when I click button in iris2.html
    
    // I should copy data from form into mydata:
    var f1_s = document.getElementById("f1").value
    var f2_s = document.getElementById("f2").value
    var f3_s = document.getElementById("f3").value
    var f4_s = document.getElementById("f4").value

    // last row in iris.csv:
    // 5.9,3.0,5.1,1.8,virginica
    // var mydata = [5.9,3.0,5.1,1.8]
    var mydata = [f1_s,f2_s,f3_s,f4_s]

    const model = new KerasJS.Model({
	filepaths: {
	    model:    'iris_model.json',
	    weights:  'iris_model_weights.buf',
	    metadata: 'iris_model_metadata.json'
	}
	,gpu: true
    })

    model.ready().then(() => {
	// input data object keyed by names of the input layers
	// or `input` for Sequential models
	// values are the flattened Float32Array data
	// (input tensor shapes are specified in the model config)
	const inputData = {
	    'input': new Float32Array(mydata)
	}
	// make predictions
	// outputData is an object keyed by names of the output layers
	// or `output` for Sequential models
	model.predict(inputData).then(outputData => {
	    var setosa_prob     = outputData["output"][0]
	    var virginica_prob  = outputData["output"][1]
	    var versicolor_prob = outputData["output"][2]
	    console.log(['setosa_prob', 'virginica_prob', 'versicolor_prob'])
	    console.log([setosa_prob, virginica_prob, versicolor_prob])
	    // I should use d3 to copy prediction from outputData to html page.
	})
    }) // model.ready().then
    
    return false;
} // function handleClick(event)

'bye'
