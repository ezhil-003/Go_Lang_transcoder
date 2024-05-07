# Audio Transcodeing Engine Using Go Language

"Life starts with the Sound of the Heart Beats"

An Audio transcoding engine can convert audio files from one format to another,
making it suitable for most cases and environments.

Our transcoding engine will offer a range of advanced features to ensure
optimal performance and user experience. To achieve speed and performance we
use Go language a modern C language which is faster, more robust and easier to
implement as C, The Go language directly compiles a high-level language
directly to the machine code instead of creating class files or interpreter
memory, the executions are faster than C, along with this we use ffmpeg Tool
Kit for faster conversion rates while transcoding audio.

## Introduction

To demonstrate the capabilities of our audio transcoding engine, we have
developed a prototype REST API module using the Gin framework within the Go
programming language.
In addition to the REST API module, we have developed a React front end to
provide a user-friendly interface for interacting with our transcoding engine.

## Prerequisites

I made this Project in the MacBook Pro M3 Chip

- MacOS 14.3.1
- Go SDK 1.21.6
- Zed 0.128.3 (Code Editor)
- Node.JS 21.7.1 Jvascript Runtime for React
- 2 Core Processor
- 8GB RAM
- Windows/Linux/MacOS

## Installation

-First install GO SDK on your device.
-Then install node on your device.
-Install FFMPEG cmd tool kit from its official page,
for mac

     brew install ffmpeg

-Run 
    npm install 
to install depndencies.
-Now Run 

    go run main.go
    
command to run the project.

## Console Log for GIN Backend API

ezhilsivarajradhakrishnan@Ezhils-MacBook-Pro cmd % go run main.go
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.

- using env: export GIN_MODE=release
- using code: gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET /test --> main.main.func2 (4 handlers)
[GIN-debug] POST /convert --> main.main.func3 (4 handlers)
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
[GIN-debug] Listening and serving HTTP on :8080
[GIN] 2024/05/07 - 12:32:32 | 200 | 7.541µs | ::1 | GET "/test"
2024/05/07 12:32:48 Directory temp exists
2024/05/07 12:32:48 Temporary WAV file path: temp/1562843887.wav
[GIN] 2024/05/07 - 12:32:49 | 200 | 733.861ms | ::1 | POST "/convert"

## Go responds in just 7.541µs for test request.
