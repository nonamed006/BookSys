package com.example.demo.vo;

import lombok.Data;

@Data
public class Book {
	private int no;
	private String title;
	private String writer;
	private int price;
	private String reg_date;
	private String rent_date;
	private String return_date;
	private String use_yn;
	private String img;
}
