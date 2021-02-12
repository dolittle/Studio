#!/bin/bash
kubectl patch --namespace application-fe7736bb-57fc-4166-bb91-6954f4dd4eb7 deployment prod-events -p '{"spec": { "template": {"metadata": { "labels": { "date": "'`date +'%s'`'" } }}}}'
