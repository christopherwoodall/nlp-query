#! /usr/bin/env bash

input="96x96.png"

ffmpeg -i $input -vf scale=16:16 16x16.png
ffmpeg -i $input -vf scale=32:32 32x32.png
ffmpeg -i $input -vf scale=48:48 48x48.png
ffmpeg -i $input -vf scale=128:128 128x128.png