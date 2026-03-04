package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	dir := "./backend"

	// 1. Verify directory
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		fmt.Printf("ERROR: Directory '%s' not found.\n", dir)
		exitPrompt()
		return
	}

	fmt.Printf("Starting npm install in %s...\n", dir)

	// 2. Use "cmd /C" so Windows can find the npm script
	// cmd /C runs the command and then terminates, but our Go app stays open
	cmd := exec.Command("cmd", "/C", "npm install")
	cmd.Dir = dir
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	// 3. Run and check for errors
	err := cmd.Run()
	if err != nil {
		fmt.Printf("\nEXECUTION FAILED: %v\n", err)
	} else {
		fmt.Println("\nSUCCESS: Packages installed successfully.")
	}

	// 4. Keep the window open
	exitPrompt()
}

func exitPrompt() {
	fmt.Println("\n-------------------------------------------")
	fmt.Println("Process finished. Press 'Enter' to exit...")
	fmt.Scanln()
}
