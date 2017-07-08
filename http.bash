#!/bin/bash

# http:.bash

# This script should start a simple web-server.
# Ref:
# http://ml4.herokuapp.com/cclasses/class06#node

# I should cd to the right place:

cd `dirname $0`

node_modules/http-server/bin/http-server
exit
