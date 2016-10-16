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

print('Here is some data I am learning from:')
print(iris_df.head())

xtrain_a = iris_df.values[:, 0:4]
y = iris_df.values[:, 4]

# I should one-hot-encode setosa, virginica, versicolor:
ytrain_l = []
for y_s in y:
  if y_s == 'setosa':
    ytrain_l.append([1,0,0])
  elif y_s == 'virginica':
    ytrain_l.append([0,1,0])
  else:
    ytrain_l.append([0,0,1])

# I should use Keras API to create a neural network model:
model = Sequential()
model.add(Dense(4, input_shape=(4,)))
model.add(Activation('relu'))
model.add(Dense(3))
model.add(Activation('softmax'))
model.compile(loss='categorical_crossentropy', optimizer='adam')
model.fit(xtrain_a, ytrain_l, batch_size=1, nb_epoch=50)

# It should be able to predict now:
print(model.predict(xtrain_a[5:8]), ytrain_l[5:8])
print(model.predict(xtrain_a[55:58]), ytrain_l[55:58])
print(model.predict(xtrain_a[105:108]), ytrain_l[105:108])
# The above predictions should be very accurate.
# Why? Because I am predicting 9 observations from training data.

'bye'

