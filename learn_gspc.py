# learn_gspc.py

# learn_gspc.py

# This script should learn from gspc2.csv and then create files which describe a model.
# Later, that model should be served to browsers.
# Then, the browsers should use the model to make predictions.

# https://github.com/transcranial/keras-js#usage
# Demo:
# ./keras_theano.bash learn_gspc.py

import pandas as pd
import numpy  as np
from keras.models      import Sequential
from keras.layers.core import Dense, Activation

gspc_df = pd.read_csv('gspc2.csv')

'bye'
