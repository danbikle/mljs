"""
load_keras1model.py

This script should should load a model from JSON and HDF5.
Then it should use the model to predict.
Ref:
http://machinelearningmastery.com/save-load-keras-deep-learning-models/
blog.fastforwardlabs.com/post/139921712388/hello-world-in-keras-or-scikit-learn-versusa
https://github.com/transcranial/keras-js#usage

Demo:
./keras_tensorflow.bash load_keras1model.py
"""

from keras.models import Sequential
from keras.layers import Dense
from keras.models import model_from_json
import numpy  as np
import pandas as pd

# load json and create model
json_file = open('keras1_model2016.json', 'r')

loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)

# load weights into new model
loaded_model.load_weights("keras1_model2016.hdf5")
print("Loaded model from disk")

# I should get xtest_a from feat.csv
feat_df = pd.read_csv('feat.csv')
xtest_a = np.array(feat_df)[-1:,3:]

# I should predict class of xtest_a:
prediction = loaded_model.predict(xtest_a)
print('prediction:')
print(prediction)

'bye'
