import getopt, glob, os, sys
from subprocess import check_output
from os.path import basename


def build_dir(inputdir, outputdir, links):
    print("Building dir:", inputdir)
    srcs = glob.glob(os.path.join(inputdir, '*.src'))
    for src in srcs:
      base_name = os.path.splitext(src)[0]
      print("HTML NAME:", base_name + ".html")
      html = open(os.path.join(outputdir, base_name + ".html"))
      # combine parent links as well
      
      #for link in links.extend(glob.glob(os.path.join(dir,"*.link")))
      pass
      # TODO


def build_dirs(inputdir, outputdir, links):
    build_dir(inputdir=inputdir, outputdir=outputdir, links=links)
    subdirs = get_subdirs(dir=inputdir)

    # process subdirs
    if len(subdirs) > 0:
        for dir in subdirs:
            path = os.path.join(inputdir, basename(dir))
            build_dirs(inputdir=path, outputdir=outputdir, links=links)

def get_subdirs(dir):
    dirs = [d for d in os.listdir(path=dir) if os.path.isdir(os.path.join(dir,d))]
    return dirs

def print_usage():
    print(basename(sys.argv[0]), "-i <input-dir> -o <output-dir>")
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

    build_dirs(inputdir=inputdir, outputdir=outputdir, links=[])

if __name__ == "__main__":
   main(sys.argv[1:])

