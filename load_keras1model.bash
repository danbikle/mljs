#!/bin/bash

# load_keras1model.bash

# This script should should load a model from JSON and HDF5.
# Then it should use the model to predict.
# Ref:
# http://machinelearningmastery.com/save-load-keras-deep-learning-models/
# blog.fastforwardlabs.com/post/139921712388/hello-world-in-keras-or-scikit-learn-versusa
# https://github.com/transcranial/keras-js#usage

cd `dirname $0`

# I should get prices:
./curl_gspc.bash

# I should compute features from the prices:
python genf.py SLOPES='[2,3,4,5,6,7,8,9]'
# The above call should give me feat.csv

# I should load a model from JSON and HDF5.
# Then, I should predict:
./keras_tensorflow.bash load_keras1model.py

exit
