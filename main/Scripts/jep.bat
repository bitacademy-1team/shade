SETLOCAL
SET VIRTUAL_ENV=

IF NOT "%VIRTUAL_ENV%"=="" (
SET PATH="%VIRTUAL_ENV%\bin";"%JAVA_HOME%\bin";"%PATH%"
SET PYTHONHOME=%VIRTUAL_ENV%
)

SET cp="C:\Users\wlgud30\anaconda3\envs\main\Lib\site-packages\jep\jep-3.9.1.jar"
IF DEFINED CLASSPATH (
SET cp=%cp%;%CLASSPATH%
)

SET jni_path="C:\Users\wlgud30\anaconda3\envs\main\Lib\site-packages\jep"

SET args=%*
IF "%args%"=="" (
SET args="C:\Users\wlgud30\anaconda3\envs\main\Lib\site-packages\jep\console.py"
)

java -classpath %cp% -Djava.library.path=%jni_path% jep.Run %args%
ENDLOCAL
