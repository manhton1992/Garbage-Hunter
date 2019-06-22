#!/bin/bash

# remove the old key
ssh-keygen -R 18.185.118.198

# disable the host key checking.
bash ./deploy/disableHostKeyChecking.sh


# we have already setup the DEPLOYER_SERVER in our gitlab settings which is a
# comma seperated values of ip addresses.
DEPLOY_SERVERS=$DEPLOY_SERVERS

# lets split this string and convert this into array
# In UNIX, we can use this commond to do this
# ${string//substring/replacement}
# our substring is "," and we replace it with nothing.
ALL_SERVERS=(${DEPLOY_SERVERS//,/ })
echo "ALL_SERVERS ${ALL_SERVERS}"

# Lets iterate over this array and ssh into each EC2 instance
# Once inside the server, run updateAndRestart.sh

chmod 600 ./deploy/garbage-hunter-ss19.pem

for server in "${ALL_SERVERS[@]}"
do
  echo "deploying to ${server}"
  ssh -i ./deploy/garbage-hunter-ss19.pem ubuntu@${server} 'bash' < ./deploy/updateAndRestart.sh
done
