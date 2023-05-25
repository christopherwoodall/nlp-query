# Test Firefox
test:
  web-ext run

# Firefox self-published ext
# https://extensionworkshop.com/documentation/manage/updating-your-extension/#enable-update
ff:
  web-ext sign --channel unlisted
