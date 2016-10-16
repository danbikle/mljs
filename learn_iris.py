# learn_iris.py
# This script should should learn from iris.csv and then create files which describe a model.
# Later, that model should be served to browsers.
# Then, the browsers should use the model to make predictions.

# Demo:
# keras_theano.bash learn_iris.py

import pandas as pd
import numpy  as np
from keras.models      import Sequential
from keras.layers.core import Dense, Activation

import pdb

iris_df = pd.read_csv('iris.csv', header=None, names=['f1','f2','f3','f4','iristype'])

print(iris_df.head())

'bye'

