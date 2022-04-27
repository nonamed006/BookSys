package com.example.demo.vo;

import lombok.Data;

@Data
public class Book {
	private int no;
	private String title;
	private String writer;
	private String contents;
	private int price;
	private String reg_date;
	private int usebook;
	private String img;
	private String publisher;
}
