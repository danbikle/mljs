# learn_iris.py
# This script should should learn from iris.csv and then create files which describe a model.
# Later, that model should be served to browsers.
# Then, the browsers should use the model to make predictions.
# Ref:
# blog.fastforwardlabs.com/post/139921712388/hello-world-in-keras-or-scikit-learn-versusa
# https://github.com/transcranial/keras-js#usage
# Demo:
# ./keras_theano.bash learn_iris.py

import pandas as pd
import numpy  as np
from keras.models      import Sequential
from keras.layers.core import Dense, Activation

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
iris_model = Sequential()
iris_model.add(Dense(4, input_shape=(4,)))
iris_model.add(Activation('relu'))
# I should enhance by inserting a hidden layer of 5 neurons:
iris_model.add(Dense(5))
iris_model.add(Activation('relu'))
iris_model.add(Dense(3))
iris_model.add(Activation('softmax'))
iris_model.compile(loss='categorical_crossentropy', optimizer='adam')
iris_model.fit(xtrain_a, ytrain_l, batch_size=1, nb_epoch=50)

# It should be able to predict now:
print(iris_model.predict(xtrain_a[5:8]),     ytrain_l[5:8])     # setosa
print(iris_model.predict(xtrain_a[55:58]),   ytrain_l[55:58])   # virginica
print(iris_model.predict(xtrain_a[105:108]), ytrain_l[105:108]) # versicolor
print('The above predictions should be very accurate.')
print('Why? Because I am predicting 9 observations from training data.')

# I should see something like this:

# Epoch 49/50
# 150/150 [==============================] - 0s - loss: 0.1248     
# Epoch 50/50
# 150/150 [==============================] - 0s - loss: 0.1225     
# [[  9.97313321e-01   1.37829959e-09   2.68668961e-03]
#  [  9.94969487e-01   1.17714860e-08   5.03050396e-03]
#  [  9.96361196e-01   3.88746857e-09   3.63882259e-03]] [[1, 0, 0], [1, 0, 0], [1, 0, 0]]
# [[  1.90880179e-04   2.22244650e-01   7.77564466e-01]
#  [  1.89746832e-04   1.26144037e-01   8.73666227e-01]
#  [  1.11184418e-02   2.75740940e-02   9.61307466e-01]] [[0, 0, 1], [0, 0, 1], [0, 0, 1]]
# [[  3.29889738e-09   9.73381996e-01   2.66179908e-02]
#  [  1.71358806e-06   9.05099630e-01   9.48986858e-02]
#  [  3.97775324e-08   9.26391065e-01   7.36088976e-02]] [[0, 1, 0], [0, 1, 0], [0, 1, 0]]
# dan@pavlap:~/mljs $ 
# dan@pavlap:~/mljs $ 
# dan@pavlap:~/mljs $ 

# I should save the iris_model:
# ref:
# https://github.com/transcranial/keras-js#usage
iris_model.save_weights('iris_model.hdf5')
with open('iris_model.json', 'w') as f:
  f.write(iris_model.to_json())
print('iris_model saved as: iris_model.hdf5 and iris_model.json')

# I should run this shell command:
# python encoder.py iris_model.hdf5
#from subprocess import call
#call(["python","encoder.py","iris_model.hdf5"])

# I should create iris_model_weights.buf, iris_model_metadata.json:
import encoder
enc = encoder.Encoder('iris_model.hdf5')
enc.serialize()
enc.save()

'bye'

