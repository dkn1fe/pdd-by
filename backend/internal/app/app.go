package app

import "api/internal/server"

func App(){
	s := server.New()
	s.Run()
}