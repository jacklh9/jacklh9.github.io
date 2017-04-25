#!/usr/bin/python


def list_dirs():
    build_dirs=`find . -maxdepth 1 -type d`
    print($build_dirs)
    

def do_things():
    #for dir in $build_dir

list_dirs()

