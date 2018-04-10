#!/bin/bash

rm -rfd Pods
rm Podfile.lock
pod cache clean --all
rm -rfd ~/Library/Developer/Xcode/DerivedData/*
pod install

