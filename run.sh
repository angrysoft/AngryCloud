#!/bin/bash

case "$1" in 
    "debug")
        source .env
        ./gradlew bootRun --debug-jvm --args='--spring.profiles.active=dev'
    ;;

    "test")
        source .env
        ./gradlew test
    ;;
    *)
        source .env
        ./gradlew bootRun --args='--spring.profiles.active=dev'
    ;;
esac

