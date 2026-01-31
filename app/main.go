package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"time"
)

func main() {
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	// 1. Start Node.js backend
	backendDir := filepath.Join(cwd, "backend")
	nodeCmd := exec.Command("node", "server.js")
	nodeCmd.Dir = backendDir
	nodeCmd.Stdout = os.Stdout
	nodeCmd.Stderr = os.Stderr

	fmt.Println("Starting backend in ./backend...")
	if err := nodeCmd.Start(); err != nil {
		log.Fatalf("Failed to start node server: %v", err)
	}

	// 2. Setup Static File Server
	distDir := filepath.Join(cwd, "dist")
	if _, err := os.Stat(distDir); os.IsNotExist(err) {
		log.Fatalf("Error: Directory %s does not exist", distDir)
	}

	url := "http://localhost:3000"
	fs := http.FileServer(http.Dir(distDir))
	http.Handle("/", fs)

	// 3. Open Browser in a separate goroutine
	go func() {
		// Give the server a moment to start
		time.Sleep(1 * time.Second)
		fmt.Printf("Serving frontend at %s\n", url)
		openBrowser(url)
	}()

	// 4. Start Server (Blocking)
	if err := http.ListenAndServe(":3000", nil); err != nil {
		log.Fatal(err)
	}
}

// openBrowser handles the cross-platform command to open a URL
func openBrowser(url string) {
	var err error

	switch runtime.GOOS {
	case "linux":
		err = exec.Command("xdg-open", url).Start()
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin": // macOS
		err = exec.Command("open", url).Start()
	default:
		err = fmt.Errorf("unsupported platform")
	}

	if err != nil {
		log.Printf("Could not open browser: %v", err)
	}
}
