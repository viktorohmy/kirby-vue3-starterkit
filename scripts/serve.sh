#!/bin/bash

cd "$(dirname "$0")/../"
php -S 127.0.0.1:8080 -t public/ server.php
