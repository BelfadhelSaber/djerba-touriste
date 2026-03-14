@echo off
echo Starting Djerba Touriste Backend...
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot
set PATH=C:\maven\apache-maven-3.9.6\bin;%PATH%
cd /d "%~dp0"
echo Maven Path:
call mvn --version
echo Starting Spring Boot...
call mvn spring-boot:run
$env:JAVA_HOME = 'C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot'; $env:PATH = 'C:\maven\apache-maven-3.9.6\bin;' + $env:PATH; mvn spring-boot:run
