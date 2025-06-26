#!/bin/bash

echo "--- Locating Java 11 home directory..."
JAVA_11_HOME=$(/usr/libexec/java_home -v 11)

# Error checking: Ensure Java 11 is installed.
if [ -z "$JAVA_11_HOME" ]; then
  echo "--- FATAL ERROR: Java 11 not found."
  echo "--- Please install it via Homebrew: 'brew install openjdk@11'"
  exit 1
fi

echo "--- Java 11 found at: $JAVA_11_HOME"
echo "--- Forcing Maven to run with Java 11."

# This is the key change: We use the full path to the Java executable.
# It tells the system EXACTLY which Java to use to run Maven.
$JAVA_11_HOME/bin/java -jar /opt/homebrew/Cellar/maven/3.9.10/libexec/boot/plexus-classworlds-2.7.0.jar -Dclassworlds.conf=/opt/homebrew/Cellar/maven/3.9.10/libexec/bin/m2.conf -Dmaven.home=/opt/homebrew/Cellar/maven/3.9.10/libexec -Dmaven.multiModuleProjectDirectory=../parabank ../parabank/pom.xml jetty:run

# Note: The above is a very long line. It is a more direct way to run the 'mvn' command.
# If you encounter issues, you can simplify the script to set the PATH directly, which is another robust method.
# Alternate robust script content:
# #!/bin/bash
# export JAVA_HOME=$(/usr/libexec/java_home -v 11)
# export PATH=$JAVA_HOME/bin:$PATH
# cd ../parabank
# mvn jetty:run