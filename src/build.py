import sys, getopt, os
from subprocess import check_output

def get_dirs():
    bytearray_stdout = check_output(["find", ".", "-maxdepth", "1", "-type", "d"])
    return str(bytearray_stdout, 'utf-8').splitlines()

def build_html(inputdir, outputdir):
    print("Inside build_html")
    print("Input dir:", inputdir)
    print("Output dir:", outputdir)


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

    build_html(inputdir=inputdir, outputdir=outputdir)

if __name__ == "__main__":
   main(sys.argv[1:])



def main():

    try:    
        print("Dirs:",get_dirs(output_dir=sys.argv[1]))
    except ArgumentError as e:
        print(e.args)
        print_usage()
