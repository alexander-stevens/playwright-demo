#!/bin/bash

echo "--- Preparing to run ParaBank with Java 11..."

# Find the location of Java 11
export JAVA_HOME=$(/usr/libexec/java_home -v 11)

# Check if JAVA_HOME was found
if [ -z "$JAVA_HOME" ]; then
  echo "--- FATAL ERROR: Java 11 not found."
  echo "--- Please make sure it is installed, e.g., 'brew install openjdk@11'"
  exit 1
fi

echo "--- Using Java 11 found at: $JAVA_HOME"
echo "--- Temporarily adding Java 11 to the PATH..."

# Prepend the Java 11 bin directory to the system's PATH variable.
# This ensures that when 'mvn' is called, it uses this Java version.
export PATH=$JAVA_HOME/bin:$PATH

echo "--- Verifying Java version being used:"
java -version

echo "--- Starting ParaBank server..."

# Navigate to the application directory and run it.
# Because of the PATH modification, this will use Java 11.
cd ../parabank && mvn jetty:run