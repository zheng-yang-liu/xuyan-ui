cd ..
del /f /s /q "%cd%\yarn.lock"
rd /s /q "%cd%\node_modules"
call yarn install