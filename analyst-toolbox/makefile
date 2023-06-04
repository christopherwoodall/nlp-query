#SHELL = powershell
#.SHELLFLAGS = -Command

# Final output of all js files combined.
compiled=./dist/annalyst-app-prod.js

# Test Firefox
test:
  web-ext run

# Firefox self-published ext
# https://extensionworkshop.com/documentation/manage/updating-your-extension/#enable-update
make-ff:
  web-ext sign --channel unlisted

build:
	@powershell -Command Get-Content ./src/modules/analyst-app.module.ipv4.js > $(compiled)
	@powershell -Command Get-Content ./src/analyst-app.core.js >> $(compiled)
	@powershell -Command Get-Content ./src/analyst-app.js >> $(compiled)
