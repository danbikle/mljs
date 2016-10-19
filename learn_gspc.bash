#!/bin/bash

# learn_gspc.bash

# This script should learn from gspc2.csv and then create files which describe a model.
# Later, that model should be served to browsers.
# Then, the browsers should use the model to make predictions.

cd `dirname $0`
./keras_theano.bash learn_gspc.py
echo These files describe gspc_model:
ls -la gspc_model*
date

exit
