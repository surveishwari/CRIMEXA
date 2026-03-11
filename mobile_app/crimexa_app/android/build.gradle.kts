plugins {
    id("com.android.application")
    id("kotlin-android")
    id("dev.flutter.flutter-gradle-plugin")
}

System.setProperty("ANDROID_NDK_HOME", "C:\\Android\\ndk\\29.0.14206865")

android {
    namespace = "com.example.crimexa_app"
    compileSdk = 33
    ndkVersion = "29.0.14206865"

    defaultConfig {
        applicationId = "com.example.crimexa_app"
        minSdk = 21
        targetSdk = 33
        versionCode = 1
        versionName = "1.0"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget = "11"
    }

    buildTypes {
        release {
            signingConfig = signingConfigs.getByName("debug")
        }
    }

    externalNativeBuild {
        cmake {
            version = "4.1.2"
        }
    }
}

flutter {
    source = "../.."
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}