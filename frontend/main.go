package main

import (
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"runtime"
)

func main() {
	port := "3000"
	dir := "./dist"

	fs := http.FileServer(http.Dir(dir))
	http.Handle("/", fs)

	go func() {
		fmt.Printf("Serving %s at http://localhost:%s\n", dir, port)
		err := http.ListenAndServe(":"+port, nil)
		if err != nil {
			fmt.Println("Server error:", err)
			os.Exit(1)
		}
	}()

	openBrowser("http://localhost:" + port)

	select {}
}

func openBrowser(url string) {
	var cmd *exec.Cmd

	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("cmd", "/c", "start", url)
	case "darwin":
		cmd = exec.Command("open", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}

	if err := cmd.Start(); err != nil {
		fmt.Println("Failed to open browser:", err)
	}
}
