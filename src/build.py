import sys, getopt, os
from subprocess import check_output
from os.path import basename

def get_subdirs(dir):
    dirs = [d for d in os.listdir(dir) if os.path.isdir(d)]
    print("Dirs:",dirs)
    return dirs

def build_dirs(inputdir, outputdir):
    subdirs = get_subdirs(dir=inputdir)

    if len(subdirs) > 0:
        for dir in subdirs:
            path = inputdir + "/" + basename(dir)
            print("Found dir:", path)
            build_dirs(inputdir=path, outputdir=outputdir)



def print_usage():
    print(os.path.basename(sys.argv[0]), "-i <input-dir> -o <output-dir>")
    print("\n\tRun command from directory containing build files and")
    print("\tbuild subdirectories. Default files should be in")
    print("\tdirectory entitled 'default'.")
    print("\n\tFiles required:")
    print("\tTBD")


def main(argv):
    inputdir = None
    outputdir = None
    try:
      opts, args = getopt.getopt(argv,"hi:o:",["input=","output="])
    except getopt.GetoptError:
      print_usage()
      sys.exit(2)

    for opt, arg in opts:
      if opt == '-h':
         print_usage()
         sys.exit()
      elif opt in ("-i", "--input"):
         inputdir = arg
      elif opt in ("-o", "--output"):
         outputdir = arg

    if None in (inputdir, outputdir):
        print_usage()
        sys.exit(2)

    build_dirs(inputdir=inputdir, outputdir=outputdir)

if __name__ == "__main__":
   main(sys.argv[1:])



def main():

    try:    
        print("Dirs:",get_dirs(output_dir=sys.argv[1]))
    except ArgumentError as e:
        print(e.args)
        print_usage()
