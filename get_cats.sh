export CEERS_DIR=/Users/stephenwilkins/Dropbox/Research/data/images/jwst/ceers/cats
# export CAT=CEERS_NIRCam1_v0.2-F22
export CAT=CEERS_NIRCam6_v0.2-high-z.v0.1

cp $CEERS_DIR/$CAT.xml cats/
cp -r $CEERS_DIR/$CAT cats/
