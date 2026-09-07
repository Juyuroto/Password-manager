package models

import "gorm.io/gorm"

type Folder struct {
	gorm.Model
	Name      string     `gorm:"not null" json:"name"`
	Passwords []Password `json:"passwords"`
	UserID    uint       `gorm:"not null" json:"user_id"`
    User      User       `json:"-"`
}

type Password struct {
	gorm.Model
	Title    string `gorm:"not null" json:"title"`
	Type	 string	`gorm:"not null" json:"type"`
	Login	 string	`gorm:"not null" json:"login"`
	Password string `gorm:"not null" json:"password"`
	Note	 string	`json:"Note"`
	UserID   uint   `gorm:"not null" json:"user_id"`
    User     User   `json:"-"`

	FolderID uint   `json:"folder_id"`
	Folder   Folder `json:"folder"`
}