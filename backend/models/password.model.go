package models

import "gorm.io/gorm"

type Folder struct {
	gorm.Model
	Name      string     `gorm:"not null" json:"name"`
	Passwords []Password `json:"passwords"`
	Number	  int		 `json:"number"`
}

type Password struct {
	gorm.Model
	Title    string `gorm:"not null" json:"title"`
	Type	 string	`gorm:"not null" json:"type"`
	Login	 string	`gorm:"not null" json:"login"`
	Password string `gorm:"not null" json:"password"`
	Lenght	 int 	`gorm:"not null" json:"longueur"`
	Note	 string	`json:"Note"`

	FolderID uint   `json:"folder_id"`
	Folder   Folder `json:"folder"`
}