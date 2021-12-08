#!/usr/bin/env bash


/usr/bin/supervisord -c /opt/app/Deploy/supervisor.conf


while true; do
sleep 300
done
