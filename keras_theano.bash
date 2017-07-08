#!/bin/bash

# keras_theano.bash
# Ref:
# https://keras.io/backend

# Demo:
# keras_theano.bash learn_iris.py

#export KERAS_BACKEND=tensorflow
export KERAS_BACKEND=theano
python $@
exit
