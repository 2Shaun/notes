# PiLFS

## Preparing boot SD Card

1. make card writable from command prompt
  - run `diskpart`, `list disk`, `select disk n`, `attributes disk clear readonly`
2. format drive with Disk Management
  - clear all volumes, create a new volume, format as FAT32

## GNU coreutils

This package contains the basic file, shell and text manipulation utilities which are expected to exist on every operating system.

Specifically, this package includes: arch base64 basename cat chcon chgrp chmod chown chroot cksum comm cp csplit cut date dd df dir dircolors dirname du echo env expand expr factor false flock fmt fold groups head hostid id install join link ln logname ls md5sum mkdir mkfifo mknod mktemp mv nice nl nohup nproc od paste pathchk pinky pr printenv printf ptx pwd readlink rm rmdir runcon sha*sum seq shred sleep sort split stat stty sum sync tac tail tee test timeout touch tr true truncate tsort tty uname unexpand uniq unlink users vdir wc who whoami yes