#!/bin/bash

# load_keras1model.bash

# This script should should load a model from JSON and HDF5.
# Then it should use the model to predict.
# Ref:
# http://machinelearningmastery.com/save-load-keras-deep-learning-models/
# blog.fastforwardlabs.com/post/139921712388/hello-world-in-keras-or-scikit-learn-versusa
# https://github.com/transcranial/keras-js#usage

cd `dirname $0`
./keras_theano.bash load_keras1model.py

exit
