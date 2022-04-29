package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BooksystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(BooksystemApplication.class, args);
	}

}
