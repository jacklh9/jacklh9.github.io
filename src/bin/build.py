import getopt, glob, os, sys
from subprocess import check_output
from os.path import basename


def build_dir(inputdir, outputdir, templatesdir, links):
  print("Building dir:", inputdir)
  srcs = glob.glob(os.path.join(inputdir, '*.src'))
  for src in srcs:
    build_html(src, templatesdir, links)    


def build_dirs(inputdir, outputdir, templatesdir, links):

  build_dir(inputdir=inputdir, outputdir=outputdir, 
    templatesdir=templatesdir, links=links)

  subdirs = get_subdirs(dir=inputdir)

  # process subdirs
  if len(subdirs) > 0:
      for dir in subdirs:
          path = os.path.join(inputdir, basename(dir))
          build_dirs(inputdir=path, outputdir=outputdir, templatesdir=templatesdir, links=links)


def build_html(source, templatesdir, links):
  base_name = os.path.splitext(src)[0]
  html = open(os.path.join(outputdir, base_name + ".html"))

  # ...

  #for link in links.extend(glob.glob(os.path.join(dir,"*.link")))
  pass
  # TODO


def get_subdirs(dir):
  dirs = [d for d in os.listdir(path=dir) if os.path.isdir(os.path.join(dir,d))]
  return dirs

def print_usage():
  text="""{program} [options]

  OPTIONS
    -i, --input <directory>       Top-level directory of HTML src files
    -o, --output <directory>      Directory to write HTML files
    -t, --templates <directory>   Templates directory

  TEMPLATES
    Format: NN_name.tmpl

    NN = two-digit number indicating order to apply template.
    name = any arbitrary name. Use underscore (_) or dashes (-) to
      indicate spaces (e.g., 10_html-to-head.tmpl)
    
    RESERVED TEMPLATE NAMES
      "main" and "link" are reserved names (e.g., 20_main.tmpl). Use
        these to indicate when to insert the <link> and <main> content.

  DIRECTORIES
    The top-level directory's link file (e.g., default.link) will be
      inserted to all subdirectories' "link" tags.

  """  # End here-doc

  print(text.format(program=basename(sys.argv[0])))


def main(argv):
  inputdir = None
  outputdir = None
  templatesdir = None

  try:
    opts, args = getopt.getopt(argv,"hi:o:t:", 
      ["input=", "output=", "templates="])
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
    elif opt in ("-t", "--templates"):
       templatesdir = arg

  if None in (inputdir, outputdir, templatesdir):
      print("ERROR: Must provide all required options. See usage below.\n")
      print_usage()
      sys.exit(2)

  build_dirs(inputdir=inputdir, outputdir=outputdir, 
    templatesdir=templatesdir, links=[])

if __name__ == "__main__":
  main(sys.argv[1:])

