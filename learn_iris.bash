#!/bin/bash

# learn_iris.bash

# This script should learn from iris.csv and then create files which describe a model.
# Later, that model should be served to browsers.
# Then, the browsers should use the model to make predictions.

cd `dirname $0`
./keras_tensorflow.bash learn_iris.py
echo These files describe iris_model:
ls -la iris_model*
date

exit
