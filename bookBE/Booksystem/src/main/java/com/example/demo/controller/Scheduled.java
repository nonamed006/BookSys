package com.example.demo.controller;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.dto.RentMailDto;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.MailsendService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Scheduled {
	
	private final UserRepository userRepository;
	private final MailsendService mailsendService;
		//0 0 0 * * * => 매일 00시에 실행 0/30 * * * * ? => 30초마다 실행 테스트시
	// 반납일자 지나면 대여자에게 반납 알림 메일 전송 위한 스케줄러
	@org.springframework.scheduling.annotation.Scheduled(cron= "0 0 0 * * *")
	public void sendSchedule() {
		List<RentMailDto> rentMail = userRepository.sendMail();
		
		for(int i=0; i<rentMail.size(); i++) {
			System.out.println("###");
			mailsendService.setMail(rentMail.get(i).getUser_id()+"@samwooim.com");
			mailsendService.setTitle("대여하신 도서 반납일입니다.");
			mailsendService.setContents("대여하신 도서 "+rentMail.get(i).getTitle() +"의 도서 반납 예정일 "+rentMail.get(i).getRent_date()+" 입니다.");
			mailsendService.sendMail();
			System.out.println("###");
		}
	}
}
