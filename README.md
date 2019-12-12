- build android

      // 打包
      cd android
      ./gradlew assembleRelease

      // 安装
      cd android/app/build/outputs/apk
      adb install app-release.apk
