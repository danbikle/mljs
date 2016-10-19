# learn_tst_rpt.py

# This script should learn from observations in feat.csv

# Then it should test its learned models on observations later than the training observations.

# Next it should report effectiveness of the models.

# Demo:
# ./keras_theano.bash learn_tst_rpt.py TRAINSIZE=25 TESTYEAR=2016

# Above demo will train from 25 years of observations and predict each day of 2016

import numpy  as np
import pandas as pd
import pdb

# I should check cmd line args
import sys
if (len(sys.argv) != 3):
  print('You typed something wrong:')
  print('Demo:')
  print("python genf.py TRAINSIZE=25 TESTYEAR=2016")
  sys.exit()

# I should get cmd line args:
trainsize     = int(sys.argv[1].split('=')[1])
testyear_s    =     sys.argv[2].split('=')[1]
train_end_i   = int(testyear_s)
train_end_s   =     testyear_s
train_start_i = train_end_i - trainsize
train_start_s = str(train_start_i)
# train and test observations should not overlap:
test_start_i  = train_end_i
test_start_s  = str(test_start_i)
test_end_i    = test_start_i+1
test_end_s    = str(test_end_i)

feat_df  = pd.read_csv('feat.csv')
train_sr = (feat_df.cdate > train_start_s) & (feat_df.cdate < train_end_s)
test_sr  = (feat_df.cdate > test_start_s)  & (feat_df.cdate < test_end_s)
train_df = feat_df[train_sr]
test_df  = feat_df[test_sr]

# I should get training data:
xtrain_a = np.array(train_df)[:,3:]
ytrain_a = np.array(train_df.pctlead)

# I should get classification from ytrain_a:
class_train_a   = (ytrain_a > np.mean(ytrain_a))
class_train1h_l = [[0,1] if cl else [1,0] for cl in class_train_a]
# [0,1] means up-observation
# [1,0] means down-observation
ytrain1h_a = np.array(class_train1h_l)

#
# I should build a Keras model:
from keras.models      import Sequential
from keras.layers.core import Dense, Activation

# I should use Keras API to create a neural network model.
# Ref:
# https://keras.io/getting-started/sequential-model-guide

# I should look at the last observation to see number of inputs
input_i = len(xtrain_a[-1])

# I should look at the last observation to see number of outputs:

print(ytrain1h_a[-1])
output_i = len(ytrain1h_a[-1])
# This is a classification model.
# The number of outputs should be the number of classes I want to predict.
# Usually for stockmarket, the number of classes is 2 (below-mean, above-mean).

gspc_model = Sequential()
gspc_model.add(Dense(input_i, input_shape=(input_i,)))
gspc_model.add(Activation('relu'))
gspc_model.add(Dense(output_i))
gspc_model.add(Activation('softmax'))
gspc_model.compile(loss='categorical_crossentropy', optimizer='adam')
gspc_model.fit(xtrain_a, ytrain1h_a, batch_size=1, nb_epoch=11)

# I should get test data:
xtest_a = np.array(test_df)[:,3:]
ytest_a = np.array(test_df.pctlead)

# It should be able to predict now:
predictions_a = gspc_model.predict(xtest_a)
predictions_a[-10:]

'bye'
