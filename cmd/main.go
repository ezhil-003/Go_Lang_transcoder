package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"time"
)

func main() {
	gin.SetMode(gin.DebugMode)
	r := gin.Default()

	r.Use(func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
        c.Next()
    })


	r.GET("/test", func(c *gin.Context) {
		c.String(http.StatusOK, "Test endpoint")
	})

	r.POST("/convert", func(c *gin.Context) {
		// Receive WAV file from frontend
		file, _, err := c.Request.FormFile("file")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		defer file.Close()
		// Create a temporary directory if it doesn't exist
		tempDir := "temp"
		if _, err := os.Stat(tempDir); err == nil {
			log.Printf("Directory %s exists", tempDir)
		} else if os.IsNotExist(err) {
			log.Printf("Directory %s does not exist", tempDir)
		} else {
			log.Printf("Error checking directory %s: %v", tempDir, err)
		}

		if _, err := os.Stat(tempDir); os.IsNotExist(err) {

			if err := os.Mkdir(tempDir, 0755); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		}

		// Create a temporary file to store the WAV file
		tempFile, err := os.CreateTemp(tempDir, "*.wav")
		if err != nil {
			log.Printf("Error creating temporary WAV file: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer tempFile.Close()

		// Save the received WAV file to the temporary file
		_, err = io.Copy(tempFile, file)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		tempFilePath := tempFile.Name()
		log.Printf("Temporary WAV file path: %s", tempFilePath)

		outputFileName := fmt.Sprintf("output_%d.mp3", time.Now().UnixNano())

		// Convert WAV to MP3 using ffmpeg
		outputPath := filepath.Join(tempDir, outputFileName)
		cmd := exec.Command("ffmpeg", "-i", tempFilePath, outputPath)
		err = cmd.Run()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Read the converted MP3 file
		convertedFile, err := os.ReadFile(outputPath)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Send the converted file back to the frontend
		c.Data(http.StatusOK, "audio/mpeg", convertedFile)
	})

	r.Run(":8080")
}
