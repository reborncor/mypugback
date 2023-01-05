echo Debut du build...
docker build . -t joumichy/mypugrelease
docker push joumichy/mypugrelease
echo Fin du build